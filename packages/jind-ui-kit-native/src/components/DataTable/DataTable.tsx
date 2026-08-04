import {
  type ReactNode,
  type Ref,
  memo,
  useCallback,
  useMemo,
  useState,
} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
  type ListRenderItemInfo,
  type TextStyle,
  type ViewStyle,
} from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';
import { Checkbox } from '../Checkbox/Checkbox';
import { Pagination } from '../Pagination/Pagination';
import { SearchInput } from '../SearchInput/SearchInput';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface DataColumn<T> {
  key: string;
  header: string;
  sortable?: boolean;
  render?: (value: unknown, row: T) => ReactNode;
  width?: number;
  align?: 'left' | 'center' | 'right';
}

export interface DataTableProps<T extends Record<string, unknown>> {
  columns: DataColumn<T>[];
  data: T[];
  rowKey?: string | ((row: T) => string);
  sortable?: boolean;
  searchable?: boolean;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  paginated?: boolean;
  pageSize?: number;
  page?: number;
  onPageChange?: (page: number) => void;
  rowCount?: number;
  selectable?: boolean;
  selectedRows?: T[];
  onSelectionChange?: (rows: T[]) => void;
  serverSide?: boolean;
  onSortChange?: (
    key: string | null,
    direction: 'asc' | 'desc' | null,
  ) => void;
  loading?: boolean;
  emptyMessage?: string;
  onRowPress?: (row: T) => void;
  style?: ViewStyle;
  ref?: Ref<View>;
}

// ---------------------------------------------------------------------------
// Helpers (ported from the web DataTable, platform-agnostic)
// ---------------------------------------------------------------------------

function getCellValue<T extends Record<string, unknown>>(
  row: T,
  key: string,
): unknown {
  return row[key];
}

function compareValues(a: unknown, b: unknown, dir: 'asc' | 'desc'): number {
  const multiplier = dir === 'asc' ? 1 : -1;
  if (a == null && b == null) return 0;
  if (a == null) return 1 * multiplier;
  if (b == null) return -1 * multiplier;
  if (typeof a === 'number' && typeof b === 'number')
    return (a - b) * multiplier;
  return String(a).localeCompare(String(b)) * multiplier;
}

function applySearch<T extends Record<string, unknown>>(
  row: T,
  search: string,
  columns: DataColumn<T>[],
): boolean {
  const lower = search.toLowerCase();
  return columns.some((col) => {
    const value = getCellValue(row, col.key);
    if (value == null) return false;
    return String(value).toLowerCase().includes(lower);
  });
}

function getRowKey<T extends Record<string, unknown>>(
  row: T,
  index: number,
  rowKey?: string | ((row: T) => string),
): string {
  if (!rowKey) return String(index);
  if (typeof rowKey === 'function') return rowKey(row);
  return String(row[rowKey] ?? index);
}

// ---------------------------------------------------------------------------
// Internal sub-components
// ---------------------------------------------------------------------------

interface HeaderCellProps {
  column: DataColumn<Record<string, unknown>>;
  isSortable: boolean;
  sortKey: string | null;
  sortDir: 'asc' | 'desc' | null;
  onSort: (key: string) => void;
  headerStyle: TextStyle;
  cellStyle: ViewStyle;
  activeSortColor: string;
  defaultTextColor: string;
}

const HeaderCellInner = ({
  column,
  isSortable,
  sortKey,
  sortDir,
  onSort,
  headerStyle,
  cellStyle,
  activeSortColor,
  defaultTextColor,
}: HeaderCellProps) => {
  const isActive = sortKey === column.key;
  const indicator = isActive
    ? sortDir === 'asc'
      ? ' ▲'
      : ' ▼'
    : '';

  const content = (
    <Text
      style={[
        headerStyle,
        {
          textAlign: column.align ?? 'left',
          color: isActive ? activeSortColor : defaultTextColor,
        },
      ]}
      numberOfLines={1}
    >
      {column.header}
      {indicator}
    </Text>
  );

  if (isSortable) {
    return (
      <Pressable
        style={cellStyle}
        onPress={() => onSort(column.key)}
        accessibilityRole="button"
        accessibilityLabel={`Sort by ${column.header}`}
      >
        {content}
      </Pressable>
    );
  }

  return <View style={cellStyle}>{content}</View>;
};

const HeaderCell = memo(HeaderCellInner);

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

function DataTableInner<T extends Record<string, unknown>>({
  columns,
  data,
  rowKey,
  sortable = false,
  searchable = false,
  searchValue: searchValueProp,
  onSearchChange,
  paginated = false,
  pageSize = 10,
  page: pageProp,
  onPageChange,
  rowCount,
  selectable = false,
  selectedRows,
  onSelectionChange,
  serverSide = false,
  onSortChange,
  loading = false,
  emptyMessage = 'No data',
  onRowPress,
  style,
  ref,
}: DataTableProps<T>) {
  const theme = useTheme();

  // ---- Internal state (controlled/uncontrolled) ----

  const [internalSearch, setInternalSearch] = useState('');
  const searchValue = searchValueProp ?? internalSearch;
  const handleSearchChange = useCallback(
    (val: string) => {
      setInternalSearch(val);
      onSearchChange?.(val);
    },
    [onSearchChange],
  );

  const [internalPage, setInternalPage] = useState(1);
  const currentPage = pageProp ?? internalPage;
  const handlePageChange = useCallback(
    (p: number) => {
      setInternalPage(p);
      onPageChange?.(p);
    },
    [onPageChange],
  );

  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<'asc' | 'desc' | null>(null);

  const handleSort = useCallback(
    (key: string) => {
      let newKey: string | null;
      let newDir: 'asc' | 'desc' | null;

      if (sortKey !== key) {
        newKey = key;
        newDir = 'asc';
      } else if (sortDir === 'asc') {
        newKey = key;
        newDir = 'desc';
      } else {
        newKey = null;
        newDir = null;
      }

      setSortKey(newKey);
      setSortDir(newDir);
      onSortChange?.(newKey, newDir);

      if (!serverSide) {
        handlePageChange(1);
      }
    },
    [sortKey, sortDir, onSortChange, serverSide, handlePageChange],
  );

  // ---- Selection ----

  const selected = selectedRows ?? [];

  const selectedKeySet = useMemo(() => {
    const set = new Set<string>();
    for (let i = 0; i < selected.length; i++) {
      set.add(getRowKey(selected[i], -1, rowKey));
    }
    return set;
  }, [selected, rowKey]);

  const handleToggleRow = useCallback(
    (row: T) => {
      const key = getRowKey(row, -1, rowKey);
      const isSelected = selectedKeySet.has(key);
      const next = isSelected
        ? selected.filter((r) => getRowKey(r, -1, rowKey) !== key)
        : [...selected, row];
      onSelectionChange?.(next);
    },
    [selected, selectedKeySet, rowKey, onSelectionChange],
  );

  // ---- Client-side data pipeline ----

  const processedData = useMemo(() => {
    if (serverSide) return data;

    let result = data;

    // Search
    if (searchValue) {
      result = result.filter((row) => applySearch(row, searchValue, columns));
    }

    // Sort
    if (sortKey && sortDir) {
      result = [...result].sort((a, b) =>
        compareValues(
          getCellValue(a, sortKey),
          getCellValue(b, sortKey),
          sortDir,
        ),
      );
    }

    return result;
  }, [data, serverSide, searchValue, columns, sortKey, sortDir]);

  const totalItems = serverSide ? (rowCount ?? data.length) : processedData.length;
  const totalPages = paginated ? Math.max(1, Math.ceil(totalItems / pageSize)) : 1;
  const safePage = Math.min(Math.max(1, currentPage), totalPages);

  const displayedData = useMemo(() => {
    if (!paginated || serverSide) return processedData;
    const start = (safePage - 1) * pageSize;
    return processedData.slice(start, start + pageSize);
  }, [processedData, paginated, serverSide, safePage, pageSize]);

  // ---- Select all ----

  const allSelected =
    selectable &&
    displayedData.length > 0 &&
    displayedData.every((row) =>
      selectedKeySet.has(getRowKey(row, -1, rowKey)),
    );

  const someSelected =
    selectable &&
    !allSelected &&
    displayedData.some((row) =>
      selectedKeySet.has(getRowKey(row, -1, rowKey)),
    );

  const handleSelectAll = useCallback(() => {
    if (!onSelectionChange) return;

    if (allSelected) {
      // Deselect all displayed rows
      const displayedKeys = new Set(
        displayedData.map((r) => getRowKey(r, -1, rowKey)),
      );
      onSelectionChange(
        selected.filter((r) => !displayedKeys.has(getRowKey(r, -1, rowKey))),
      );
    } else {
      // Select all displayed rows (merge with existing)
      const existing = new Set(selected.map((r) => getRowKey(r, -1, rowKey)));
      const toAdd = displayedData.filter(
        (r) => !existing.has(getRowKey(r, -1, rowKey)),
      );
      onSelectionChange([...selected, ...toAdd]);
    }
  }, [
    allSelected,
    displayedData,
    selected,
    rowKey,
    onSelectionChange,
  ]);

  // ---- Styles ----

  const borderColor = theme.semantic.border.default;
  const headerBg = theme.semantic.surface.subtle;
  const rowBg = theme.semantic.surface.card;
  const primaryFill = theme.semantic.fill.primary;
  const textPrimary = theme.semantic.text.primary;
  const textMuted = theme.semantic.text.muted;

  const containerStyle: ViewStyle = {
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor,
    backgroundColor: rowBg,
    overflow: 'hidden',
    ...style,
  };

  const headerRowStyle: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: headerBg,
    borderBottomWidth: 1,
    borderBottomColor: borderColor,
    minHeight: 44,
    paddingHorizontal: theme.space[4],
  };

  const dataRowStyle: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 48,
    paddingHorizontal: theme.space[4],
    borderBottomWidth: 1,
    borderBottomColor: borderColor,
    backgroundColor: rowBg,
  };

  const headerTextStyle: TextStyle = {
    ...theme.typeVariants.label,
    color: textPrimary,
    fontWeight: theme.fontWeight.bold,
  };

  const cellTextStyle: TextStyle = {
    ...theme.typeVariants.body,
    color: textPrimary,
  };

  const makeCellStyle = useCallback(
    (col: DataColumn<T>): ViewStyle => ({
      flex: col.width ? 0 : 1,
      width: col.width,
      paddingVertical: theme.space[4],
      paddingHorizontal: theme.space[4],
    }),
    [theme.space],
  );

  const checkboxCellStyle: ViewStyle = {
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
  };

  // ---- Render helpers ----

  const renderHeader = useCallback(() => {
    return (
      <View style={headerRowStyle}>
        {selectable && (
          <View style={checkboxCellStyle}>
            <Checkbox
              checked={allSelected}
              indeterminate={someSelected}
              onChange={handleSelectAll}
            />
          </View>
        )}
        {columns.map((col) => {
          const colSortable = sortable && (col.sortable !== false);
          return (
            <HeaderCell
              key={col.key}
              column={col as DataColumn<Record<string, unknown>>}
              isSortable={colSortable}
              sortKey={sortKey}
              sortDir={sortDir}
              onSort={handleSort}
              headerStyle={headerTextStyle}
              cellStyle={makeCellStyle(col)}
              activeSortColor={primaryFill}
              defaultTextColor={textPrimary}
            />
          );
        })}
      </View>
    );
  }, [
    selectable,
    allSelected,
    someSelected,
    handleSelectAll,
    columns,
    sortable,
    sortKey,
    sortDir,
    handleSort,
    headerTextStyle,
    makeCellStyle,
    primaryFill,
    textPrimary,
    headerRowStyle,
    checkboxCellStyle,
  ]);

  const renderRow = useCallback(
    ({ item, index }: ListRenderItemInfo<T>) => {
      const key = getRowKey(item, index, rowKey);
      const isSelected = selectedKeySet.has(key);

      const rowContent = (
        <>
          {selectable && (
            <View style={checkboxCellStyle}>
              <Checkbox
                checked={isSelected}
                onChange={() => handleToggleRow(item)}
              />
            </View>
          )}
          {columns.map((col) => {
            const value = getCellValue(item, col.key);
            const cellContent = col.render ? (
              col.render(value, item)
            ) : (
              <Text
                style={[
                  cellTextStyle,
                  { textAlign: col.align ?? 'left' },
                ]}
                numberOfLines={2}
              >
                {value == null ? '' : String(value)}
              </Text>
            );

            return (
              <View key={col.key} style={makeCellStyle(col)}>
                {typeof cellContent === 'string' ||
                typeof cellContent === 'number' ? (
                  <Text
                    style={[
                      cellTextStyle,
                      { textAlign: col.align ?? 'left' },
                    ]}
                  >
                    {cellContent}
                  </Text>
                ) : (
                  cellContent
                )}
              </View>
            );
          })}
        </>
      );

      const pressedRowStyle: ViewStyle = {
        ...dataRowStyle,
        backgroundColor: isSelected
          ? `${primaryFill}18`
          : dataRowStyle.backgroundColor,
      };

      if (onRowPress) {
        return (
          <Pressable
            style={({ pressed }) => [
              pressedRowStyle,
              pressed && { opacity: 0.7 },
            ]}
            onPress={() => onRowPress(item)}
            accessibilityRole="button"
          >
            {rowContent}
          </Pressable>
        );
      }

      return <View style={pressedRowStyle}>{rowContent}</View>;
    },
    [
      rowKey,
      selectedKeySet,
      selectable,
      columns,
      onRowPress,
      handleToggleRow,
      makeCellStyle,
      cellTextStyle,
      dataRowStyle,
      checkboxCellStyle,
      primaryFill,
    ],
  );

  const keyExtractor = useCallback(
    (item: T, index: number) => getRowKey(item, index, rowKey),
    [rowKey],
  );

  const renderEmpty = useCallback(
    () => (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          paddingVertical: theme.space[12],
        }}
      >
        <Text style={{ ...theme.typeVariants.body, color: textMuted }}>
          {emptyMessage}
        </Text>
      </View>
    ),
    [emptyMessage, textMuted, theme.typeVariants.body, theme.space],
  );

  const renderFooter = useCallback(() => {
    if (!paginated || totalPages <= 1) return null;

    return (
      <View
        style={{
          paddingVertical: theme.space[4],
          paddingHorizontal: theme.space[4],
          borderTopWidth: 1,
          borderTopColor: borderColor,
          alignItems: 'center',
        }}
      >
        <Pagination
          page={safePage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </View>
    );
  }, [
    paginated,
    totalPages,
    safePage,
    handlePageChange,
    borderColor,
    theme.space,
  ]);

  // ---- Main render ----

  return (
    <View ref={ref} style={containerStyle}>
      {/* Search bar */}
      {searchable && (
        <View
          style={{
            padding: theme.space[4],
            borderBottomWidth: 1,
            borderBottomColor: borderColor,
          }}
        >
          <SearchInput
            value={searchValue}
            onChange={handleSearchChange}
            placeholder="Search..."
          />
        </View>
      )}

      {/* Table content */}
      <View style={{ position: 'relative' }}>
        <FlatList<T>
          data={displayedData}
          renderItem={renderRow}
          keyExtractor={keyExtractor}
          ListHeaderComponent={renderHeader}
          ListEmptyComponent={renderEmpty}
          ListFooterComponent={renderFooter}
          stickyHeaderIndices={[0]}
          scrollEnabled={true}
          showsVerticalScrollIndicator={true}
        />

        {/* Loading overlay */}
        {loading && (
          <View
            style={{
              ...StyleSheet.absoluteFillObject,
              backgroundColor: 'rgba(255, 255, 255, 0.6)',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <ActivityIndicator size="large" color={primaryFill} />
          </View>
        )}
      </View>
    </View>
  );
}

// memo does not preserve generics, so we cast while keeping the generic signature
export const DataTable = memo(DataTableInner) as typeof DataTableInner;
