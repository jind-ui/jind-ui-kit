import {
  useMemo,
  useState,
  useEffect,
  useCallback,
  useRef,
  type CSSProperties,
  type ReactNode,
  type Ref,
} from 'react';
import { useTheme } from '../../theme/ThemeProvider';
import { transition, mergeStyles } from '../../utils/styles';

/* ─── Types ─── */

export type FilterOperator =
  | 'contains'
  | 'equals'
  | 'startsWith'
  | 'endsWith'
  | 'gt'
  | 'gte'
  | 'lt'
  | 'lte'
  | 'isEmpty'
  | 'isNotEmpty'
  | 'isAnyOf';

export interface FilterItem {
  field: string;
  operator: FilterOperator;
  value?: string;
}

export interface FilterModel {
  items: FilterItem[];
  logicOperator?: 'and' | 'or';
}

export interface DataColumn<T> {
  key: string;
  header: string;
  sortable?: boolean;
  filterable?: boolean;
  hideable?: boolean;
  render?: (value: unknown, row: T) => ReactNode;
  width?: number | string;
  minWidth?: number;
  align?: 'left' | 'center' | 'right';
}

export interface DataTableProps<T extends Record<string, unknown>> {
  columns: DataColumn<T>[];
  data: T[];
  rowKey?: string | ((row: T) => string);

  // Sorting
  sortable?: boolean;

  // Filtering
  filterable?: boolean;
  filterModel?: FilterModel;
  onFilterModelChange?: (model: FilterModel) => void;

  // Search
  searchable?: boolean;
  searchValue?: string;
  onSearchChange?: (value: string) => void;

  // Pagination
  paginated?: boolean;
  pageSize?: number;
  page?: number;
  onPageChange?: (page: number) => void;
  rowCount?: number;

  // Selection
  selectable?: boolean;
  selectedRows?: T[];
  onSelectionChange?: (rows: T[]) => void;

  // Column visibility
  columnVisibility?: Record<string, boolean>;
  onColumnVisibilityChange?: (model: Record<string, boolean>) => void;

  // Column reordering
  reorderable?: boolean;
  columnOrder?: string[];
  onColumnOrderChange?: (order: string[]) => void;

  // Server-side mode
  serverSide?: boolean;
  onSortChange?: (key: string | null, direction: 'asc' | 'desc' | null) => void;
  loading?: boolean;

  // Persistence
  storageKey?: string;

  // Misc
  emptyMessage?: string;
  onRowClick?: (row: T) => void;
  onCellClick?: (value: unknown, row: T, columnKey: string, event: React.MouseEvent<HTMLTableCellElement>) => void;
  toolbar?: boolean;
  style?: CSSProperties;
  ref?: Ref<HTMLDivElement>;
}

/* ─── Helpers ─── */

type SortDirection = 'asc' | 'desc' | null;

interface PersistedState {
  columnVisibility?: Record<string, boolean>;
  columnOrder?: string[];
  sortKey?: string | null;
  sortDir?: SortDirection;
  filterModel?: FilterModel;
  pageSize?: number;
}

function loadStorage(key: string): PersistedState | null {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function saveStorage(key: string, state: PersistedState) {
  try {
    localStorage.setItem(key, JSON.stringify(state));
  } catch {
    // quota exceeded — silently skip
  }
}

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
  if (typeof a === 'number' && typeof b === 'number') return (a - b) * multiplier;
  return String(a).localeCompare(String(b)) * multiplier;
}

function applyFilterItem<T extends Record<string, unknown>>(
  row: T,
  item: FilterItem,
): boolean {
  const raw = getCellValue(row, item.field);
  const str = raw == null ? '' : String(raw).toLowerCase();
  const val = (item.value ?? '').toLowerCase();

  switch (item.operator) {
    case 'contains': return str.includes(val);
    case 'equals': return str === val;
    case 'startsWith': return str.startsWith(val);
    case 'endsWith': return str.endsWith(val);
    case 'gt': return Number(raw) > Number(item.value);
    case 'gte': return Number(raw) >= Number(item.value);
    case 'lt': return Number(raw) < Number(item.value);
    case 'lte': return Number(raw) <= Number(item.value);
    case 'isEmpty': return raw == null || str === '';
    case 'isNotEmpty': return raw != null && str !== '';
    case 'isAnyOf': {
      if (!item.value) return true;
      const vals = item.value.split(',').map((v) => v.toLowerCase());
      return vals.includes(str);
    }
    default: return true;
  }
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

const OPERATORS: { value: FilterOperator; label: string }[] = [
  { value: 'contains', label: 'contains' },
  { value: 'equals', label: 'equals' },
  { value: 'startsWith', label: 'starts with' },
  { value: 'endsWith', label: 'ends with' },
  { value: 'gt', label: '>' },
  { value: 'gte', label: '>=' },
  { value: 'lt', label: '<' },
  { value: 'lte', label: '<=' },
  { value: 'isEmpty', label: 'is empty' },
  { value: 'isNotEmpty', label: 'is not empty' },
  { value: 'isAnyOf', label: 'is any of' },
];

const NO_VALUE_OPS = new Set<FilterOperator>(['isEmpty', 'isNotEmpty']);
const MULTI_SELECT_OPS = new Set<FilterOperator>(['isAnyOf']);

function getRowKey<T extends Record<string, unknown>>(
  row: T,
  index: number,
  rowKey?: string | ((row: T) => string),
): string {
  if (!rowKey) return String(index);
  if (typeof rowKey === 'function') return rowKey(row);
  return String(row[rowKey] ?? index);
}

/* ─── FilterValueSelect ─── */

function FilterValueSelect<T extends Record<string, unknown>>({
  field,
  data,
  value,
  onChange,
  inputStyle,
  theme: t,
}: {
  field: string;
  data: T[];
  value: string;
  onChange: (value: string) => void;
  inputStyle: CSSProperties;
  theme: ReturnType<typeof useTheme>;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const uniqueValues = useMemo(() => {
    const seen = new Set<string>();
    for (const row of data) {
      const raw = row[field];
      if (raw != null && String(raw) !== '') seen.add(String(raw));
    }
    return Array.from(seen).sort((a, b) => a.localeCompare(b));
  }, [data, field]);

  const selected = useMemo(() => {
    if (!value) return new Set<string>();
    return new Set(value.split(','));
  }, [value]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  const toggle = (val: string) => {
    const next = new Set(selected);
    if (next.has(val)) next.delete(val);
    else next.add(val);
    onChange(Array.from(next).join(','));
  };

  const label = selected.size === 0
    ? 'Select values...'
    : selected.size <= 2
      ? Array.from(selected).join(', ')
      : `${selected.size} selected`;

  return (
    <div ref={ref} style={{ position: 'relative', flex: 1, minWidth: 120 }}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        style={{
          ...inputStyle,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: 'pointer',
          textAlign: 'left',
          color: selected.size === 0 ? t.semantic.text.muted : t.semantic.text.primary,
        }}
      >
        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{label}</span>
        <span style={{ fontSize: 10, marginLeft: 4, flexShrink: 0, color: t.semantic.text.muted }}>▼</span>
      </button>
      {open && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          marginTop: 2,
          background: t.semantic.surface.card,
          border: `1px solid ${t.semantic.border.default}`,
          borderRadius: t.radius.sm,
          boxShadow: t.shadow.md,
          zIndex: 20,
          maxHeight: 200,
          overflowY: 'auto',
          padding: '4px 0',
        }}>
          {uniqueValues.length === 0 && (
            <div style={{
              padding: '6px 10px',
              fontFamily: t.fontFamily.sans,
              fontSize: t.fontSize[13],
              color: t.semantic.text.muted,
            }}>
              No values
            </div>
          )}
          {uniqueValues.map((val) => {
            const checked = selected.has(val);
            return (
              <div
                key={val}
                onClick={() => toggle(val)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '5px 10px',
                  cursor: 'pointer',
                  fontFamily: t.fontFamily.sans,
                  fontSize: t.fontSize[13],
                  color: t.semantic.text.primary,
                  transition: `background ${t.duration.fast}ms`,
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.background = t.semantic.surface.hover; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.background = 'transparent'; }}
              >
                <div style={{
                  width: 14,
                  height: 14,
                  borderRadius: 3,
                  border: `1.5px solid ${checked ? t.semantic.fill.primary : t.semantic.border.default}`,
                  background: checked ? t.semantic.fill.primary : 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  transition: transition('background', 'border-color'),
                }}>
                  {checked && <span style={{ color: '#fff', fontSize: 9, fontWeight: t.fontWeight.bold }}>✓</span>}
                </div>
                {val}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* ─── DataTable ─── */

export function DataTable<T extends Record<string, unknown>>({
  columns: columnsProp,
  data,
  rowKey,
  sortable = false,
  filterable = false,
  filterModel: filterModelProp,
  onFilterModelChange,
  searchable = false,
  searchValue: searchProp,
  onSearchChange,
  paginated = false,
  pageSize: pageSizeProp = 10,
  page: pageProp,
  onPageChange,
  rowCount,
  selectable = false,
  selectedRows,
  onSelectionChange,
  columnVisibility: visibilityProp,
  onColumnVisibilityChange,
  reorderable = false,
  columnOrder: orderProp,
  onColumnOrderChange,
  serverSide = false,
  onSortChange,
  loading = false,
  storageKey,
  emptyMessage = 'No data',
  onRowClick,
  onCellClick,
  toolbar = false,
  style,
  ref,
}: DataTableProps<T>) {
  const theme = useTheme();
  const persistedRef = useRef<PersistedState | null>(null);

  // Load persisted state once
  if (storageKey && !persistedRef.current) {
    persistedRef.current = loadStorage(storageKey) ?? {};
  }
  const persisted = persistedRef.current;

  // ─── Column visibility ───
  const [internalVisibility, setInternalVisibility] = useState<Record<string, boolean>>(
    visibilityProp ?? persisted?.columnVisibility ?? {},
  );
  const visibility = visibilityProp ?? internalVisibility;
  const setVisibility = useCallback((model: Record<string, boolean>) => {
    if (onColumnVisibilityChange) {
      onColumnVisibilityChange(model);
    } else {
      setInternalVisibility(model);
    }
  }, [onColumnVisibilityChange]);

  // ─── Column order ───
  const [internalOrder, setInternalOrder] = useState<string[]>(
    orderProp ?? persisted?.columnOrder ?? columnsProp.map((c) => c.key),
  );
  const columnOrder = orderProp ?? internalOrder;
  const setColumnOrder = useCallback((order: string[]) => {
    if (onColumnOrderChange) {
      onColumnOrderChange(order);
    } else {
      setInternalOrder(order);
    }
  }, [onColumnOrderChange]);

  // Compute visible columns in order
  const columns = useMemo(() => {
    const colMap = new Map(columnsProp.map((c) => [c.key, c]));
    const ordered: DataColumn<T>[] = [];
    for (const key of columnOrder) {
      const col = colMap.get(key);
      if (col && visibility[key] !== false) {
        ordered.push(col);
      }
    }
    // Add any new columns not yet in the order
    for (const col of columnsProp) {
      if (!columnOrder.includes(col.key) && visibility[col.key] !== false) {
        ordered.push(col);
      }
    }
    return ordered;
  }, [columnsProp, columnOrder, visibility]);

  // ─── Sort ───
  const [sortKey, setSortKey] = useState<string | null>(persisted?.sortKey ?? null);
  const [sortDir, setSortDir] = useState<SortDirection>(persisted?.sortDir ?? null);

  // ─── Filter model ───
  const [internalFilterModel, setInternalFilterModel] = useState<FilterModel>(
    filterModelProp ?? persisted?.filterModel ?? { items: [], logicOperator: 'and' },
  );
  const filterModel = filterModelProp ?? internalFilterModel;
  const setFilterModel = useCallback((model: FilterModel) => {
    if (onFilterModelChange) {
      onFilterModelChange(model);
    } else {
      setInternalFilterModel(model);
    }
  }, [onFilterModelChange]);

  // ─── Search ───
  const [internalSearch, setInternalSearch] = useState('');
  const searchValue = searchProp ?? internalSearch;
  const setSearch = useCallback((v: string) => {
    if (onSearchChange) onSearchChange(v);
    else setInternalSearch(v);
  }, [onSearchChange]);

  // ─── Pagination ───
  const [internalPage, setInternalPage] = useState(1);
  const page = pageProp ?? internalPage;
  const setPage = useCallback((p: number) => {
    if (onPageChange) onPageChange(p);
    else setInternalPage(p);
  }, [onPageChange]);
  const pageSize = pageSizeProp;

  // ─── Selection ───
  const [internalSelection, setInternalSelection] = useState<T[]>([]);
  const selection = selectedRows ?? internalSelection;
  const setSelection = useCallback((rows: T[]) => {
    if (onSelectionChange) onSelectionChange(rows);
    else setInternalSelection(rows);
  }, [onSelectionChange]);

  // ─── Toolbar panels ───
  const [showFilters, setShowFilters] = useState(false);
  const [showColumns, setShowColumns] = useState(false);

  // ─── Column drag state ───
  const [dragCol, setDragCol] = useState<string | null>(null);
  const [dragOverCol, setDragOverCol] = useState<string | null>(null);

  // ─── Persist state ───
  useEffect(() => {
    if (!storageKey) return;
    saveStorage(storageKey, {
      columnVisibility: visibility,
      columnOrder,
      sortKey,
      sortDir,
      filterModel,
      pageSize,
    });
  }, [storageKey, visibility, columnOrder, sortKey, sortDir, filterModel, pageSize]);

  // ─── Client-side processing (skipped in server mode) ───
  const filteredData = useMemo(() => {
    if (serverSide) return data;
    let result = data;

    // Apply search
    if (searchValue) {
      result = result.filter((row) => applySearch(row, searchValue, columnsProp));
    }

    // Apply filter model
    if (filterModel.items.length > 0) {
      const logic = filterModel.logicOperator ?? 'and';
      result = result.filter((row) => {
        const results = filterModel.items.map((item) => applyFilterItem(row, item));
        return logic === 'and' ? results.every(Boolean) : results.some(Boolean);
      });
    }
    return result;
  }, [data, searchValue, filterModel, serverSide, columnsProp]);

  const sortedData = useMemo(() => {
    if (serverSide || !sortKey || !sortDir) return filteredData;
    return [...filteredData].sort((a, b) =>
      compareValues(getCellValue(a, sortKey), getCellValue(b, sortKey), sortDir),
    );
  }, [filteredData, sortKey, sortDir, serverSide]);

  const totalItems = serverSide ? (rowCount ?? data.length) : sortedData.length;
  const totalPages = paginated ? Math.max(1, Math.ceil(totalItems / pageSize)) : 1;
  const safePage = Math.min(page, totalPages);
  const displayedData = paginated && !serverSide
    ? sortedData.slice((safePage - 1) * pageSize, safePage * pageSize)
    : sortedData;

  const startItem = totalItems === 0 ? 0 : (safePage - 1) * pageSize + 1;
  const endItem = Math.min(safePage * pageSize, totalItems);

  // ─── Handlers ───
  const handleSort = (key: string) => {
    let newKey: string | null;
    let newDir: SortDirection;

    if (sortKey === key) {
      if (sortDir === 'asc') { newKey = key; newDir = 'desc'; }
      else { newKey = null; newDir = null; }
    } else {
      newKey = key; newDir = 'asc';
    }

    setSortKey(newKey);
    setSortDir(newDir);
    if (!serverSide) setPage(1);
    if (onSortChange) onSortChange(newKey, newDir);
  };

  const isRowSelected = (row: T) => selection.includes(row);
  const allSelected = displayedData.length > 0 && displayedData.every((r) => selection.includes(r));
  const someSelected = !allSelected && displayedData.some((r) => selection.includes(r));

  const toggleRow = (row: T) => {
    setSelection(isRowSelected(row) ? selection.filter((r) => r !== row) : [...selection, row]);
  };

  const toggleAll = () => {
    if (allSelected) {
      setSelection(selection.filter((r) => !displayedData.includes(r)));
    } else {
      const s = [...selection];
      for (const row of displayedData) if (!s.includes(row)) s.push(row);
      setSelection(s);
    }
  };

  // Column drag handlers
  const handleDragStart = (key: string) => {
    if (!reorderable) return;
    setDragCol(key);
  };

  const handleDragOver = (key: string, e: React.DragEvent) => {
    if (!reorderable || !dragCol) return;
    e.preventDefault();
    setDragOverCol(key);
  };

  const handleDrop = (key: string) => {
    if (!reorderable || !dragCol || dragCol === key) {
      setDragCol(null);
      setDragOverCol(null);
      return;
    }
    const newOrder = [...columnOrder];
    const fromIdx = newOrder.indexOf(dragCol);
    const toIdx = newOrder.indexOf(key);
    if (fromIdx === -1 || toIdx === -1) return;
    newOrder.splice(fromIdx, 1);
    newOrder.splice(toIdx, 0, dragCol);
    setColumnOrder(newOrder);
    setDragCol(null);
    setDragOverCol(null);
  };

  // ─── Filter row management ───
  const addFilter = () => {
    const filterableColumns = columnsProp.filter((c) => c.filterable !== false);
    if (filterableColumns.length === 0) return;
    setFilterModel({
      ...filterModel,
      items: [...filterModel.items, { field: filterableColumns[0].key, operator: 'contains', value: '' }],
    });
  };

  const updateFilter = (index: number, patch: Partial<FilterItem>) => {
    const items = filterModel.items.map((item, i) => (i === index ? { ...item, ...patch } : item));
    setFilterModel({ ...filterModel, items });
  };

  const removeFilter = (index: number) => {
    setFilterModel({ ...filterModel, items: filterModel.items.filter((_, i) => i !== index) });
  };

  // ─── Styles ───

  const wrapperStyle: CSSProperties = mergeStyles(
    {
      borderRadius: theme.radius.md,
      overflow: 'hidden',
      border: `1px solid ${theme.semantic.border.default}`,
      background: theme.semantic.surface.card,
    },
    style,
  );

  const toolbarStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    padding: `${theme.space[4]}px ${theme.space[6]}px`,
    borderBottom: `1px solid ${theme.semantic.border.subtle}`,
    flexWrap: 'wrap',
  };

  const toolbarBtnStyle = (active: boolean): CSSProperties => ({
    display: 'inline-flex',
    alignItems: 'center',
    gap: 4,
    height: 30,
    padding: '0 10px',
    border: `1px solid ${active ? theme.semantic.fill.primary : theme.semantic.border.subtle}`,
    borderRadius: theme.radius.sm,
    background: active ? `${theme.semantic.fill.primary}12` : 'transparent',
    color: active ? theme.semantic.fill.primary : theme.semantic.text.secondary,
    fontFamily: theme.fontFamily.sans,
    fontSize: theme.fontSize[13],
    fontWeight: theme.fontWeight.medium,
    cursor: 'pointer',
    outline: 'none',
    transition: transition('border-color', 'color', 'background'),
  });

  const searchInputStyle: CSSProperties = {
    marginLeft: 'auto',
    height: 30,
    width: 200,
    padding: `0 ${theme.controlPadding.field}px`,
    border: `1px solid ${theme.semantic.border.default}`,
    borderRadius: theme.radius.sm,
    background: theme.semantic.surface.card,
    fontFamily: theme.fontFamily.sans,
    fontSize: theme.fontSize[13],
    color: theme.semantic.text.primary,
    outline: 'none',
    boxSizing: 'border-box',
    transition: transition('border-color'),
  };

  const panelStyle: CSSProperties = {
    padding: `${theme.space[4]}px ${theme.space[6]}px`,
    borderBottom: `1px solid ${theme.semantic.border.subtle}`,
    background: theme.semantic.surface.subtle,
  };

  const filterRowStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
    flexWrap: 'wrap',
  };

  const filterSelectStyle: CSSProperties = {
    height: 28,
    padding: '0 6px',
    border: `1px solid ${theme.semantic.border.default}`,
    borderRadius: theme.radius.xs,
    background: theme.semantic.surface.card,
    fontFamily: theme.fontFamily.sans,
    fontSize: theme.fontSize[13],
    color: theme.semantic.text.primary,
    outline: 'none',
    boxSizing: 'border-box',
  };

  const filterInputStyle: CSSProperties = {
    height: 28,
    flex: 1,
    minWidth: 120,
    padding: '0 6px',
    border: `1px solid ${theme.semantic.border.default}`,
    borderRadius: theme.radius.xs,
    background: theme.semantic.surface.card,
    fontFamily: theme.fontFamily.sans,
    fontSize: theme.fontSize[13],
    color: theme.semantic.text.primary,
    outline: 'none',
    boxSizing: 'border-box',
  };

  const smallBtnStyle: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 24,
    height: 24,
    border: 'none',
    borderRadius: theme.radius.xs,
    background: 'transparent',
    color: theme.semantic.text.muted,
    fontFamily: theme.fontFamily.sans,
    fontSize: 14,
    cursor: 'pointer',
    outline: 'none',
    transition: transition('color'),
  };

  const colToggleStyle = (visible: boolean): CSSProperties => ({
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    padding: '4px 0',
    fontFamily: theme.fontFamily.sans,
    fontSize: theme.fontSize[13],
    color: visible ? theme.semantic.text.primary : theme.semantic.text.muted,
    cursor: 'pointer',
    userSelect: 'none',
  });

  const tableStyle: CSSProperties = { width: '100%', borderCollapse: 'collapse' };

  const thStyle = (col: DataColumn<T>): CSSProperties => ({
    padding: `${theme.space[4]}px ${theme.space[6]}px`,
    textAlign: col.align ?? 'left',
    background: dragOverCol === col.key ? `${theme.semantic.fill.primary}18` : theme.semantic.surface.subtle,
    fontFamily: theme.fontFamily.sans,
    fontSize: theme.fontSize[13],
    fontWeight: theme.fontWeight.semibold,
    color: theme.semantic.text.secondary,
    lineHeight: 1.4,
    width: col.width,
    minWidth: col.minWidth,
    userSelect: 'none',
    cursor: reorderable ? 'grab' : ((sortable && col.sortable !== false) || col.sortable) ? 'pointer' : 'default',
    whiteSpace: 'nowrap',
    borderBottom: `1px solid ${theme.semantic.border.subtle}`,
    boxSizing: 'border-box',
    transition: transition('background-color'),
  });

  const checkboxThStyle: CSSProperties = {
    padding: `${theme.space[4]}px ${theme.space[6]}px`,
    background: theme.semantic.surface.subtle,
    borderBottom: `1px solid ${theme.semantic.border.subtle}`,
    width: 40,
    textAlign: 'center',
    boxSizing: 'border-box',
  };

  const tdStyle = (col: DataColumn<T>): CSSProperties => ({
    padding: `${theme.space[4]}px ${theme.space[6]}px`,
    textAlign: col.align ?? 'left',
    fontFamily: theme.fontFamily.sans,
    fontSize: theme.fontSize[14],
    fontWeight: theme.fontWeight.regular,
    color: theme.semantic.text.primary,
    lineHeight: theme.lineHeight.normal,
    width: col.width,
    minWidth: col.minWidth,
    borderBottom: `1px solid ${theme.semantic.border.subtle}`,
    boxSizing: 'border-box',
  });

  const checkboxTdStyle: CSSProperties = {
    padding: `${theme.space[4]}px ${theme.space[6]}px`,
    width: 40,
    textAlign: 'center',
    borderBottom: `1px solid ${theme.semantic.border.subtle}`,
    boxSizing: 'border-box',
  };

  const emptyStyle: CSSProperties = {
    padding: `${theme.space[12]}px ${theme.space[7]}px`,
    textAlign: 'center',
    fontFamily: theme.fontFamily.sans,
    fontSize: theme.fontSize[14],
    color: theme.semantic.text.muted,
  };

  const loadingOverlayStyle: CSSProperties = {
    position: 'absolute',
    inset: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: `${theme.semantic.surface.card}CC`,
    zIndex: 2,
    fontFamily: theme.fontFamily.sans,
    fontSize: theme.fontSize[14],
    color: theme.semantic.text.secondary,
  };

  const paginationBarStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: `${theme.space[4]}px ${theme.space[7]}px`,
    borderTop: `1px solid ${theme.semantic.border.subtle}`,
  };

  const pageInfoStyle: CSSProperties = {
    fontFamily: theme.fontFamily.sans,
    fontSize: theme.fontSize[13],
    color: theme.semantic.text.secondary,
  };

  const pageButtonsStyle: CSSProperties = { display: 'flex', alignItems: 'center', gap: 4 };

  const basePageBtnStyle: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 32,
    minWidth: 32,
    padding: '0 6px',
    borderRadius: theme.radius.md,
    border: 'none',
    background: 'none',
    fontFamily: theme.fontFamily.sans,
    fontSize: theme.fontSize[14],
    fontWeight: theme.fontWeight.medium,
    lineHeight: 1,
    cursor: 'pointer',
    outline: 'none',
    boxSizing: 'border-box',
    color: theme.semantic.text.primary,
    transition: transition('background-color', 'color'),
  };

  // ─── Render helpers ───

  const sortIndicator = (key: string) => {
    const isActive = sortKey === key;
    const ascColor = isActive && sortDir === 'asc' ? theme.semantic.fill.primary : theme.semantic.text.muted;
    const descColor = isActive && sortDir === 'desc' ? theme.semantic.fill.primary : theme.semantic.text.muted;
    return (
      <span style={{ display: 'inline-flex', flexDirection: 'column', marginLeft: 4, fontSize: 9, lineHeight: 1, verticalAlign: 'middle' }}>
        <span style={{ color: ascColor }}>{'▲'}</span>
        <span style={{ color: descColor }}>{'▼'}</span>
      </span>
    );
  };

  const renderCheckbox = (checked: boolean, indeterminate: boolean, onChange: () => void) => {
    const boxStyle: CSSProperties = {
      width: 16, height: 16, borderRadius: theme.radius.xs,
      border: `1.5px solid ${checked || indeterminate ? theme.semantic.fill.primary : theme.semantic.border.default}`,
      background: checked || indeterminate ? theme.semantic.fill.primary : theme.semantic.surface.card,
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      cursor: 'pointer', boxSizing: 'border-box', flexShrink: 0, verticalAlign: 'middle',
      transition: transition('background', 'border-color'),
    };
    return (
      <div
        style={boxStyle}
        onClick={(e) => { e.stopPropagation(); onChange(); }}
        onKeyDown={(e) => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); e.stopPropagation(); onChange(); } }}
        role="checkbox"
        aria-checked={indeterminate ? 'mixed' : checked}
        tabIndex={0}
      >
        <span style={{ color: theme.semantic.text.inverse, fontSize: 10, lineHeight: 1, fontWeight: theme.fontWeight.bold, visibility: checked || indeterminate ? 'visible' : 'hidden' }}>
          {indeterminate ? '—' : '✓'}
        </span>
      </div>
    );
  };

  function DataRow({ row, index }: { row: T; index: number }) {
    const [hovered, setHovered] = useState(false);
    const selected = isRowSelected(row);
    const rowStyle: CSSProperties = {
      background: selected
        ? `${theme.semantic.fill.primary}0A`
        : hovered ? theme.semantic.surface.hover : undefined,
      cursor: onRowClick && !onCellClick ? 'pointer' : undefined,
      transition: `background ${theme.duration.fast}ms ${theme.easing.standard}`,
    };

    return (
      <tr style={rowStyle} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} onClick={onRowClick ? () => onRowClick(row) : undefined}>
        {selectable && (
          <td style={checkboxTdStyle}>
            {renderCheckbox(selected, false, () => toggleRow(row))}
          </td>
        )}
        {columns.map((col) => {
          const value = getCellValue(row, col.key);
          const cellClickable = !!onCellClick;
          const cellStyle: CSSProperties = cellClickable
            ? { ...tdStyle(col), cursor: 'pointer' }
            : tdStyle(col);
          return (
            <td
              key={col.key}
              style={cellStyle}
              role={cellClickable ? 'gridcell' : undefined}
              tabIndex={cellClickable ? 0 : undefined}
              onClick={cellClickable ? (e: React.MouseEvent<HTMLTableCellElement>) => onCellClick!(value, row, col.key, e) : undefined}
              onKeyDown={cellClickable ? (e: React.KeyboardEvent<HTMLTableCellElement>) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onCellClick!(value, row, col.key, e as unknown as React.MouseEvent<HTMLTableCellElement>);
                }
              } : undefined}
            >
              {col.render ? col.render(value, row) : (value as ReactNode)}
            </td>
          );
        })}
      </tr>
    );
  }

  const renderPageButtons = () => {
    const buttons: ReactNode[] = [];
    const prevDisabled = safePage <= 1;
    const nextDisabled = safePage >= totalPages;

    buttons.push(
      <button key="prev" type="button" disabled={prevDisabled} aria-label="Previous page" onClick={() => setPage(safePage - 1)}
        style={{ ...basePageBtnStyle, color: prevDisabled ? theme.semantic.text.muted : theme.semantic.text.primary, cursor: prevDisabled ? 'default' : 'pointer', opacity: prevDisabled ? 0.5 : 1, pointerEvents: prevDisabled ? 'none' : undefined }}>
        {'←'}
      </button>,
    );

    for (let i = 1; i <= totalPages; i++) {
      const isActive = i === safePage;
      buttons.push(
        <button key={i} type="button" aria-label={`Page ${i}`} aria-current={isActive ? 'page' : undefined} onClick={() => setPage(i)}
          style={{ ...basePageBtnStyle, backgroundColor: isActive ? theme.semantic.fill.primary : 'transparent', color: isActive ? '#fff' : theme.semantic.text.primary, cursor: isActive ? 'default' : 'pointer' }}>
          {i}
        </button>,
      );
    }

    buttons.push(
      <button key="next" type="button" disabled={nextDisabled} aria-label="Next page" onClick={() => setPage(safePage + 1)}
        style={{ ...basePageBtnStyle, color: nextDisabled ? theme.semantic.text.muted : theme.semantic.text.primary, cursor: nextDisabled ? 'default' : 'pointer', opacity: nextDisabled ? 0.5 : 1, pointerEvents: nextDisabled ? 'none' : undefined }}>
        {'→'}
      </button>,
    );
    return buttons;
  };

  // ─── Render ───

  const filterableColumns = columnsProp.filter((c) => c.filterable !== false);
  const selectionCount = selection.length;

  return (
    <div ref={ref} style={wrapperStyle}>
      {/* Toolbar */}
      {toolbar && (
        <div style={toolbarStyle}>
          {filterable && (
            <button type="button" style={toolbarBtnStyle(showFilters)} onClick={() => { setShowFilters(!showFilters); setShowColumns(false); }}>
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M2 4h12M4 8h8M6 12h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
              Filters {filterModel.items.length > 0 && `(${filterModel.items.length})`}
            </button>
          )}
          <button type="button" style={toolbarBtnStyle(showColumns)} onClick={() => { setShowColumns(!showColumns); setShowFilters(false); }}>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M2 3h12v10H2V3zm4 0v10m4-10v10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            Columns
          </button>
          {selectable && selectionCount > 0 && (
            <span style={{ fontFamily: theme.fontFamily.sans, fontSize: theme.fontSize[13], color: theme.semantic.fill.primary, fontWeight: theme.fontWeight.medium }}>
              {selectionCount} row{selectionCount !== 1 ? 's' : ''} selected
            </span>
          )}
          {searchable && (
            <input
              type="text"
              placeholder="Search..."
              value={searchValue}
              onChange={(e) => { setSearch(e.target.value); if (!serverSide) setPage(1); }}
              style={searchInputStyle}
              aria-label="Search table"
            />
          )}
        </div>
      )}

      {/* Legacy filter (non-toolbar mode) */}
      {filterable && !toolbar && (
        <div style={{ display: 'flex', alignItems: 'center', padding: `${theme.space[6]}px ${theme.space[7]}px`, borderBottom: `1px solid ${theme.semantic.border.subtle}` }}>
          <input
            type="text"
            placeholder="Filter..."
            value={searchValue}
            onChange={(e) => { setSearch(e.target.value); if (!serverSide) setPage(1); }}
            style={{
              width: '100%', maxWidth: 320, height: theme.controlHeight.sm,
              padding: `0 ${theme.controlPadding.field}px`, border: `1px solid ${theme.semantic.border.default}`,
              borderRadius: theme.radius.md, background: theme.semantic.surface.card,
              fontFamily: theme.fontFamily.sans, fontSize: theme.fontSize[14], color: theme.semantic.text.primary,
              outline: 'none', boxSizing: 'border-box', transition: transition('border-color'),
            }}
            aria-label="Filter table"
          />
        </div>
      )}

      {/* Filter panel */}
      {showFilters && (
        <div style={panelStyle}>
          {filterModel.items.map((item, idx) => (
            <div key={idx} style={filterRowStyle}>
              {idx > 0 && (
                <select
                  style={{ ...filterSelectStyle, width: 60 }}
                  value={filterModel.logicOperator ?? 'and'}
                  onChange={(e) => setFilterModel({ ...filterModel, logicOperator: e.target.value as 'and' | 'or' })}
                >
                  <option value="and">AND</option>
                  <option value="or">OR</option>
                </select>
              )}
              {idx === 0 && <span style={{ ...filterSelectStyle, border: 'none', background: 'transparent', fontWeight: theme.fontWeight.medium, width: 60 }}>Where</span>}
              <select style={filterSelectStyle} value={item.field} onChange={(e) => updateFilter(idx, { field: e.target.value })}>
                {filterableColumns.map((c) => <option key={c.key} value={c.key}>{c.header}</option>)}
              </select>
              <select style={filterSelectStyle} value={item.operator} onChange={(e) => updateFilter(idx, { operator: e.target.value as FilterOperator })}>
                {OPERATORS.map((op) => <option key={op.value} value={op.value}>{op.label}</option>)}
              </select>
              {!NO_VALUE_OPS.has(item.operator) && MULTI_SELECT_OPS.has(item.operator) && (
                <FilterValueSelect
                  field={item.field}
                  data={data}
                  value={item.value ?? ''}
                  onChange={(v) => updateFilter(idx, { value: v })}
                  inputStyle={filterInputStyle}
                  theme={theme}
                />
              )}
              {!NO_VALUE_OPS.has(item.operator) && !MULTI_SELECT_OPS.has(item.operator) && (
                <input type="text" style={filterInputStyle} value={item.value ?? ''} onChange={(e) => updateFilter(idx, { value: e.target.value })} placeholder="Value" />
              )}
              <button type="button" style={smallBtnStyle} onClick={() => removeFilter(idx)} aria-label="Remove filter">✕</button>
            </div>
          ))}
          <button type="button" style={{ ...toolbarBtnStyle(false), marginTop: 4, height: 26, fontSize: theme.fontSize[12] }} onClick={addFilter}>
            + Add filter
          </button>
        </div>
      )}

      {/* Column visibility panel */}
      {showColumns && (
        <div style={panelStyle}>
          <div style={{ fontFamily: theme.fontFamily.sans, fontSize: theme.fontSize[12], fontWeight: theme.fontWeight.semibold, color: theme.semantic.text.muted, marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Toggle columns
          </div>
          {columnsProp.map((col) => {
            if (col.hideable === false) return null;
            const visible = visibility[col.key] !== false;
            return (
              <div key={col.key} style={colToggleStyle(visible)} onClick={() => setVisibility({ ...visibility, [col.key]: !visible })}>
                <div style={{
                  width: 14, height: 14, borderRadius: 3,
                  border: `1.5px solid ${visible ? theme.semantic.fill.primary : theme.semantic.border.default}`,
                  background: visible ? theme.semantic.fill.primary : 'transparent',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0, transition: transition('background', 'border-color'),
                }}>
                  {visible && <span style={{ color: '#fff', fontSize: 9, fontWeight: theme.fontWeight.bold }}>✓</span>}
                </div>
                {col.header}
              </div>
            );
          })}
          <div style={{ marginTop: 8, display: 'flex', gap: 8 }}>
            <button type="button" style={{ ...toolbarBtnStyle(false), height: 24, fontSize: theme.fontSize[12] }}
              onClick={() => setVisibility(Object.fromEntries(columnsProp.filter((c) => c.hideable !== false).map((c) => [c.key, true])))}>
              Show all
            </button>
            <button type="button" style={{ ...toolbarBtnStyle(false), height: 24, fontSize: theme.fontSize[12] }}
              onClick={() => setVisibility(Object.fromEntries(columnsProp.filter((c) => c.hideable !== false).map((c) => [c.key, false])))}>
              Hide all
            </button>
          </div>
        </div>
      )}

      {/* Table */}
      <div style={{ overflowX: 'auto', position: 'relative' }}>
        {loading && <div style={loadingOverlayStyle}>Loading...</div>}
        <table style={tableStyle} role={onCellClick ? 'grid' : undefined}>
          <thead>
            <tr>
              {selectable && (
                <th style={checkboxThStyle}>
                  {renderCheckbox(allSelected, someSelected, toggleAll)}
                </th>
              )}
              {columns.map((col) => {
                const isSortable = (sortable && col.sortable !== false) || col.sortable;
                return (
                  <th
                    key={col.key}
                    style={thStyle(col)}
                    onClick={() => isSortable && handleSort(col.key)}
                    draggable={reorderable}
                    onDragStart={() => handleDragStart(col.key)}
                    onDragOver={(e) => handleDragOver(col.key, e)}
                    onDrop={() => handleDrop(col.key)}
                    onDragEnd={() => { setDragCol(null); setDragOverCol(null); }}
                    aria-sort={sortKey === col.key && sortDir ? (sortDir === 'asc' ? 'ascending' : 'descending') : undefined}
                  >
                    {col.header}
                    {isSortable && sortIndicator(col.key)}
                    {reorderable && <span style={{ marginLeft: 4, opacity: 0.3, fontSize: 10 }}>⠿</span>}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {displayedData.length === 0 ? (
              <tr>
                <td colSpan={columns.length + (selectable ? 1 : 0)} style={emptyStyle}>
                  {loading ? '' : emptyMessage}
                </td>
              </tr>
            ) : (
              displayedData.map((row, index) => (
                <DataRow key={getRowKey(row, index, rowKey)} row={row} index={index} />
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {paginated && totalPages > 1 && (
        <div style={paginationBarStyle}>
          <span style={pageInfoStyle}>
            {selectionCount > 0 ? `${selectionCount} selected · ` : ''}
            Showing {startItem}–{endItem} of {totalItems}
          </span>
          <div style={pageButtonsStyle}>{renderPageButtons()}</div>
        </div>
      )}
    </div>
  );
}
