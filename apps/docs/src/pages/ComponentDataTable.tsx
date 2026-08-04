import React, { useState, useCallback, useRef, useEffect } from 'react';
import { DataTable, Icon, Badge, Text, HStack, VStack, useTheme } from 'jind-ui-kit';
import type { DataColumn, FilterModel } from 'jind-ui-kit';
import { Preview } from '../components/Preview';
import { PropsTable } from '../components/PropsTable';
import { ViewMarkdown } from '../components/ViewMarkdown';

const dataTableProps = [
  { name: 'columns', type: 'DataColumn<T>[]', description: 'Column definitions' },
  { name: 'data', type: 'T[]', description: 'Array of row objects' },
  { name: 'rowKey', type: 'string | (row) => string', description: 'Unique key for each row' },
  { name: 'sortable', type: 'boolean', default: 'false', description: 'Enable sorting on all columns' },
  { name: 'filterable', type: 'boolean', default: 'false', description: 'Enable per-column filter panel' },
  { name: 'filterModel', type: 'FilterModel', description: 'Controlled filter model (items + logicOperator)' },
  { name: 'onFilterModelChange', type: '(model) => void', description: 'Callback when filters change' },
  { name: 'searchable', type: 'boolean', default: 'false', description: 'Show search input in toolbar' },
  { name: 'searchValue', type: 'string', description: 'Controlled search value' },
  { name: 'onSearchChange', type: '(value) => void', description: 'Callback when search changes' },
  { name: 'paginated', type: 'boolean', default: 'false', description: 'Enable pagination' },
  { name: 'pageSize', type: 'number', default: '10', description: 'Rows per page' },
  { name: 'page', type: 'number', description: 'Controlled current page' },
  { name: 'onPageChange', type: '(page) => void', description: 'Callback when page changes' },
  { name: 'rowCount', type: 'number', description: 'Total row count for server-side pagination' },
  { name: 'selectable', type: 'boolean', default: 'false', description: 'Checkbox row selection' },
  { name: 'selectedRows', type: 'T[]', description: 'Controlled selected rows' },
  { name: 'onSelectionChange', type: '(rows) => void', description: 'Callback when selection changes' },
  { name: 'columnVisibility', type: 'Record<string, boolean>', description: 'Controlled column visibility' },
  { name: 'onColumnVisibilityChange', type: '(model) => void', description: 'Callback when visibility changes' },
  { name: 'reorderable', type: 'boolean', default: 'false', description: 'Allow dragging columns to reorder' },
  { name: 'columnOrder', type: 'string[]', description: 'Controlled column order' },
  { name: 'onColumnOrderChange', type: '(order) => void', description: 'Callback when order changes' },
  { name: 'serverSide', type: 'boolean', default: 'false', description: 'Server-side mode — disables client sorting/filtering' },
  { name: 'onSortChange', type: '(key, dir) => void', description: 'Callback when sort changes (server-side)' },
  { name: 'loading', type: 'boolean', default: 'false', description: 'Show loading overlay' },
  { name: 'storageKey', type: 'string', description: 'localStorage key for persisting column order, visibility, sort, and filters' },
  { name: 'toolbar', type: 'boolean', default: 'false', description: 'Show toolbar with filter/column/search controls' },
  { name: 'emptyMessage', type: 'string', default: "'No data'", description: 'Empty state message' },
  { name: 'onRowClick', type: '(row) => void', description: 'Row click callback' },
  { name: 'onCellClick', type: '(value, row, columnKey, event) => void', description: 'Cell click callback — receives value, row, column key, and MouseEvent. Use event.stopPropagation() to prevent onRowClick from also firing.' },
];

const columnProps = [
  { name: 'key', type: 'string', description: 'Property key to read from each row' },
  { name: 'header', type: 'string', description: 'Column header text' },
  { name: 'sortable', type: 'boolean', description: 'Override table-level sortable for this column' },
  { name: 'filterable', type: 'boolean', description: 'Whether this column appears in filter dropdown (default: true)' },
  { name: 'hideable', type: 'boolean', description: 'Whether this column can be hidden via the columns panel (default: true)' },
  { name: 'render', type: '(value, row) => ReactNode', description: 'Custom cell renderer' },
  { name: 'width', type: 'number | string', description: 'Fixed column width' },
  { name: 'minWidth', type: 'number', description: 'Minimum column width' },
  { name: 'align', type: "'left' | 'center' | 'right'", default: "'left'", description: 'Cell text alignment' },
];

interface Person {
  id: number;
  name: string;
  role: string;
  department: string;
  status: string;
  salary: number;
  [key: string]: unknown;
}

const sampleData: Person[] = [
  { id: 1, name: 'Alice Johnson', role: 'Designer', department: 'Product', status: 'Active', salary: 95000 },
  { id: 2, name: 'Bob Smith', role: 'Engineer', department: 'Engineering', status: 'Active', salary: 120000 },
  { id: 3, name: 'Clara Lee', role: 'PM', department: 'Product', status: 'Away', salary: 110000 },
  { id: 4, name: 'David Park', role: 'Engineer', department: 'Engineering', status: 'Active', salary: 115000 },
  { id: 5, name: 'Eva Chen', role: 'Designer', department: 'Product', status: 'Active', salary: 98000 },
  { id: 6, name: 'Frank Ruiz', role: 'QA', department: 'Engineering', status: 'Inactive', salary: 88000 },
  { id: 7, name: 'Grace Kim', role: 'Engineer', department: 'Engineering', status: 'Active', salary: 125000 },
  { id: 8, name: 'Henry Wu', role: 'PM', department: 'Product', status: 'Active', salary: 112000 },
  { id: 9, name: 'Iris Tanaka', role: 'Designer', department: 'Design', status: 'Away', salary: 92000 },
  { id: 10, name: 'Jack Rivera', role: 'Engineer', department: 'Engineering', status: 'Active', salary: 118000 },
  { id: 11, name: 'Karen Li', role: 'QA', department: 'Engineering', status: 'Active', salary: 90000 },
  { id: 12, name: 'Leo Nakamura', role: 'PM', department: 'Product', status: 'Active', salary: 108000 },
];

const basicColumns: DataColumn<Person>[] = [
  { key: 'name', header: 'Name' },
  { key: 'role', header: 'Role' },
  { key: 'department', header: 'Department' },
  { key: 'status', header: 'Status' },
];

const fullColumns: DataColumn<Person>[] = [
  { key: 'name', header: 'Name', hideable: false, minWidth: 160 },
  { key: 'role', header: 'Role' },
  { key: 'department', header: 'Department' },
  { key: 'status', header: 'Status' },
  { key: 'salary', header: 'Salary', align: 'right', render: (v) => `$${(v as number).toLocaleString()}` },
];

const roleIcons: Record<string, string> = {
  Designer: 'palette',
  Engineer: 'code',
  PM: 'clipboard',
  QA: 'shield-check',
};

function StatusBadge({ status }: { status: string }) {
  const theme = useTheme();
  const colorMap: Record<string, string> = {
    Active: theme.colors.green[600],
    Away: theme.colors.amber[600],
    Inactive: theme.colors.gray[500],
  };
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      fontSize: theme.fontSize[13], color: colorMap[status] ?? theme.semantic.text.primary,
    }}>
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: colorMap[status] ?? theme.semantic.text.muted }} />
      {status}
    </span>
  );
}

const richColumns: DataColumn<Person>[] = [
  { key: 'name', header: 'Name', hideable: false, minWidth: 160 },
  {
    key: 'role', header: 'Role',
    render: (v) => (
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
        <Icon name={roleIcons[v as string] ?? 'user'} size={14} />
        {v as string}
      </span>
    ),
  },
  { key: 'department', header: 'Department' },
  { key: 'status', header: 'Status', render: (v) => <StatusBadge status={v as string} /> },
  { key: 'salary', header: 'Salary', align: 'right', render: (v) => `$${(v as number).toLocaleString()}` },
];

const iconOnlyColumns: DataColumn<Person>[] = [
  {
    key: 'role', header: '', width: 40, align: 'center',
    render: (v) => <Icon name={roleIcons[v as string] ?? 'user'} size={16} />,
  },
  { key: 'name', header: 'Name', minWidth: 140 },
  { key: 'department', header: 'Department' },
  { key: 'status', header: 'Status', render: (v) => <StatusBadge status={v as string} /> },
];

function SelectionDemo() {
  const [selected, setSelected] = useState<Person[]>([]);
  const theme = useTheme();

  return (
    <div>
      <DataTable
        columns={richColumns}
        data={sampleData.slice(0, 6)}
        rowKey="id"
        selectable
        selectedRows={selected}
        onSelectionChange={setSelected}
        sortable
        toolbar
        searchable
      />
      {selected.length > 0 && (
        <div style={{
          marginTop: 8, padding: '8px 12px', borderRadius: 6,
          background: theme.semantic.surface.subtle,
          fontFamily: theme.fontFamily.sans, fontSize: theme.fontSize[13],
          color: theme.semantic.text.secondary,
        }}>
          Selected: {selected.map((r) => r.name).join(', ')}
        </div>
      )}
    </div>
  );
}

function FilterDemo() {
  const [filterModel, setFilterModel] = useState<FilterModel>({
    items: [{ field: 'department', operator: 'isAnyOf', value: 'Engineering' }],
    logicOperator: 'and',
  });

  return (
    <DataTable
      columns={fullColumns}
      data={sampleData}
      filterable
      filterModel={filterModel}
      onFilterModelChange={setFilterModel}
      sortable
      toolbar
      searchable
      paginated
      pageSize={5}
    />
  );
}

function FullFeatureDemo() {
  return (
    <DataTable
      columns={richColumns}
      data={sampleData}
      rowKey="id"
      sortable
      filterable
      searchable
      selectable
      paginated
      pageSize={5}
      reorderable
      toolbar
      storageKey="jind-datatable-demo"
    />
  );
}

interface Project {
  id: number;
  name: string;
  team: string[];
  tags: string[];
  progress: number;
  tasks: { label: string; done: boolean }[];
  [key: string]: unknown;
}

const projectData: Project[] = [
  {
    id: 1, name: 'Design System v2', team: ['Alice', 'Eva', 'Iris'],
    tags: ['design', 'ui', 'tokens'],
    progress: 72,
    tasks: [
      { label: 'Token migration', done: true },
      { label: 'Component audit', done: true },
      { label: 'Docs update', done: false },
    ],
  },
  {
    id: 2, name: 'API Gateway', team: ['Bob', 'David'],
    tags: ['backend', 'infra'],
    progress: 45,
    tasks: [
      { label: 'Rate limiting', done: true },
      { label: 'Auth middleware', done: false },
      { label: 'Load testing', done: false },
    ],
  },
  {
    id: 3, name: 'Mobile App', team: ['Clara', 'Grace', 'Jack'],
    tags: ['mobile', 'react-native'],
    progress: 88,
    tasks: [
      { label: 'Onboarding flow', done: true },
      { label: 'Push notifications', done: true },
      { label: 'App Store submission', done: false },
    ],
  },
  {
    id: 4, name: 'Analytics Dashboard', team: ['Henry', 'Karen'],
    tags: ['data', 'visualization'],
    progress: 30,
    tasks: [
      { label: 'Chart components', done: true },
      { label: 'Real-time updates', done: false },
      { label: 'Export to PDF', done: false },
    ],
  },
];

const tagTones: Record<string, 'info' | 'success' | 'warning' | 'error' | 'neutral'> = {
  design: 'info', ui: 'info', tokens: 'info',
  backend: 'neutral', infra: 'warning',
  mobile: 'success', 'react-native': 'success',
  data: 'neutral', visualization: 'info',
};

function ProgressBar({ value }: { value: number }) {
  const theme = useTheme();
  const color = value >= 75 ? theme.colors.green[500]
    : value >= 50 ? theme.colors.amber[500]
    : theme.colors.blue[500];
  return (
    <HStack gap={2} style={{ alignItems: 'center' }}>
      <div style={{
        flex: 1, height: 6, borderRadius: 3,
        background: theme.semantic.surface.subtle,
        overflow: 'hidden',
      }}>
        <div style={{
          width: `${value}%`, height: '100%', borderRadius: 3,
          background: color,
          transition: 'width 0.3s ease',
        }} />
      </div>
      <Text style={{ fontSize: theme.fontSize[12], color: theme.semantic.text.muted, minWidth: 32, textAlign: 'right' }}>
        {value}%
      </Text>
    </HStack>
  );
}

function EmbeddedContentDemo() {
  const theme = useTheme();

  const embeddedColumns: DataColumn<Project>[] = [
    {
      key: 'name', header: 'Project', minWidth: 160,
      render: (v) => (
        <VStack gap={1}>
          <Text style={{ fontWeight: theme.fontWeight.semibold, fontSize: theme.fontSize[14] }}>
            {v as string}
          </Text>
        </VStack>
      ),
    },
    {
      key: 'tags', header: 'Tags', minWidth: 180,
      render: (_, row) => (
        <HStack gap={1} style={{ flexWrap: 'wrap' }}>
          {(row as Project).tags.map((tag) => (
            <Badge key={tag} tone={tagTones[tag] ?? 'neutral'}>{tag}</Badge>
          ))}
        </HStack>
      ),
    },
    {
      key: 'team', header: 'Team', minWidth: 140,
      render: (_, row) => (
        <VStack gap={1}>
          {(row as Project).team.map((name) => (
            <HStack key={name} gap={2} style={{ alignItems: 'center' }}>
              <Icon name="user" size={12} color={theme.semantic.text.muted} />
              <Text style={{ fontSize: theme.fontSize[13] }}>{name}</Text>
            </HStack>
          ))}
        </VStack>
      ),
    },
    {
      key: 'progress', header: 'Progress', minWidth: 140,
      render: (v) => <ProgressBar value={v as number} />,
    },
    {
      key: 'tasks', header: 'Task List', minWidth: 180,
      render: (_, row) => (
        <VStack gap={1}>
          {(row as Project).tasks.map((task) => (
            <HStack key={task.label} gap={2} style={{ alignItems: 'center' }}>
              <Icon
                name={task.done ? 'check-circle' : 'circle'}
                size={13}
                color={task.done ? theme.colors.green[500] : theme.semantic.text.muted}
              />
              <Text style={{
                fontSize: theme.fontSize[13],
                color: task.done ? theme.semantic.text.secondary : theme.semantic.text.primary,
                textDecoration: task.done ? 'line-through' : 'none',
              }}>
                {task.label}
              </Text>
            </HStack>
          ))}
        </VStack>
      ),
    },
  ];

  return (
    <DataTable
      columns={embeddedColumns}
      data={projectData}
      rowKey="id"
      sortable
    />
  );
}

function ServerSideFilterDemo() {
  const theme = useTheme();
  const allData = useRef(sampleData);
  const [data, setData] = useState<Person[]>(sampleData.slice(0, 5));
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [rowCount, setRowCount] = useState(sampleData.length);
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<'asc' | 'desc' | null>(null);
  const [filterModel, setFilterModel] = useState<FilterModel>({ items: [], logicOperator: 'and' });
  const [search, setSearch] = useState('');
  const [log, setLog] = useState<string[]>([]);

  const fetchData = useCallback((params: {
    page?: number; sort?: string | null; dir?: 'asc' | 'desc' | null;
    filters?: FilterModel; search?: string;
  }) => {
    const p = params.page ?? page;
    const sk = params.sort !== undefined ? params.sort : sortKey;
    const sd = params.dir !== undefined ? params.dir : sortDir;
    const fm = params.filters ?? filterModel;
    const q = params.search ?? search;

    setLoading(true);
    const entry = `fetch(page=${p}, sort=${sk}:${sd}, filters=${fm.items.length}, search="${q}")`;
    setLog((prev) => [entry, ...prev].slice(0, 6));

    setTimeout(() => {
      let result = [...allData.current];

      if (q) {
        const lower = q.toLowerCase();
        result = result.filter((r) =>
          Object.values(r).some((v) => v != null && String(v).toLowerCase().includes(lower)),
        );
      }

      if (fm.items.length > 0) {
        result = result.filter((row) => {
          return fm.items.every((item) => {
            const val = String(row[item.field] ?? '').toLowerCase();
            const target = (item.value ?? '').toLowerCase();
            switch (item.operator) {
              case 'contains': return val.includes(target);
              case 'equals': return val === target;
              case 'isAnyOf': return target.split(',').map((v) => v.toLowerCase()).includes(val);
              case 'gt': return Number(row[item.field]) > Number(item.value);
              case 'lt': return Number(row[item.field]) < Number(item.value);
              default: return true;
            }
          });
        });
      }

      if (sk && sd) {
        result.sort((a, b) => {
          const av = a[sk], bv = b[sk];
          const cmp = typeof av === 'number' && typeof bv === 'number'
            ? av - bv : String(av).localeCompare(String(bv));
          return sd === 'asc' ? cmp : -cmp;
        });
      }

      setRowCount(result.length);
      setData(result.slice((p - 1) * 5, p * 5));
      setLoading(false);
    }, 400);
  }, [page, sortKey, sortDir, filterModel, search]);

  useEffect(() => { fetchData({}); }, []);

  return (
    <div>
      <DataTable
        columns={fullColumns}
        data={data}
        rowKey="id"
        serverSide
        sortable
        filterable
        searchable
        paginated
        pageSize={5}
        toolbar
        rowCount={rowCount}
        loading={loading}
        filterModel={filterModel}
        searchValue={search}
        page={page}
        onSortChange={(key, dir) => {
          setSortKey(key); setSortDir(dir);
          fetchData({ sort: key, dir });
        }}
        onFilterModelChange={(model) => {
          setFilterModel(model); setPage(1);
          fetchData({ filters: model, page: 1 });
        }}
        onSearchChange={(q) => {
          setSearch(q); setPage(1);
          fetchData({ search: q, page: 1 });
        }}
        onPageChange={(p) => {
          setPage(p);
          fetchData({ page: p });
        }}
      />
      {log.length > 0 && (
        <div style={{
          marginTop: 12, padding: '10px 14px', borderRadius: 6,
          background: theme.semantic.surface.subtle,
          fontFamily: theme.fontFamily.mono, fontSize: theme.fontSize[12],
          color: theme.semantic.text.secondary, lineHeight: 1.6,
          maxHeight: 120, overflowY: 'auto',
        }}>
          {log.map((entry, i) => (
            <div key={i} style={{ opacity: 1 - i * 0.12 }}>{entry}</div>
          ))}
        </div>
      )}
    </div>
  );
}

export function ComponentDataTable() {
  return (
    <div className="page-container">
      <div className="page-header">
        <ViewMarkdown slug="data-table" />
        <h1 className="page-title">DataTable</h1>
        <p className="page-description">
          Full-featured data grid with sorting, per-column filtering, search,
          pagination, checkbox selection, column visibility, column reordering,
          server-side mode, and localStorage persistence.
        </p>
      </div>

      <div className="section">
        <h2 className="section-title">Basic Table</h2>
        <Preview
          align="column"
          code={`<DataTable columns={columns} data={data} />`}
        >
          <DataTable columns={basicColumns} data={sampleData.slice(0, 5)} />
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">Icon Cells</h2>
        <p className="section-text">
          Use the <code>Icon</code> component inside a column's <code>render</code> prop
          for icon-only or icon-with-text cells. The first column below renders just an icon
          with no text — great for compact status indicators or role markers.
        </p>
        <Preview
          align="column"
          code={`const roleIcons = { Designer: 'palette', Engineer: 'code', PM: 'clipboard', QA: 'shield-check' };

const columns = [
  {
    key: 'role', header: '', width: 40, align: 'center',
    render: (v) => <Icon name={roleIcons[v]} size={16} />,
  },
  { key: 'name', header: 'Name' },
  { key: 'department', header: 'Department' },
  { key: 'status', header: 'Status', render: (v) => <StatusBadge status={v} /> },
];`}
        >
          <DataTable columns={iconOnlyColumns} data={sampleData.slice(0, 6)} rowKey="id" />
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">Embedded Components</h2>
        <p className="section-text">
          The <code>render</code> prop returns <code>ReactNode</code>, so you can embed <em>any</em> React
          component inside a cell — <code>Badge</code> groups, task lists, progress bars, nested layouts,
          or even another <code>DataTable</code>. The cell has no <code>overflow: hidden</code>, so
          multi-line content expands the row naturally.
        </p>
        <Preview
          align="column"
          code={`const columns = [
  { key: 'name', header: 'Project',
    render: (v) => <Text style={{ fontWeight: 600 }}>{v}</Text>,
  },
  { key: 'tags', header: 'Tags',
    render: (_, row) => (
      <HStack gap={1} style={{ flexWrap: 'wrap' }}>
        {row.tags.map(t => <Badge key={t} tone="info">{t}</Badge>)}
      </HStack>
    ),
  },
  { key: 'team', header: 'Team',
    render: (_, row) => (
      <VStack gap={1}>
        {row.team.map(name => (
          <HStack key={name} gap={2}>
            <Icon name="user" size={12} />
            <Text>{name}</Text>
          </HStack>
        ))}
      </VStack>
    ),
  },
  { key: 'progress', header: 'Progress',
    render: (v) => <ProgressBar value={v} />,
  },
  { key: 'tasks', header: 'Task List',
    render: (_, row) => (
      <VStack gap={1}>
        {row.tasks.map(t => (
          <HStack key={t.label} gap={2}>
            <Icon name={t.done ? 'check-circle' : 'circle'} size={13} />
            <Text>{t.label}</Text>
          </HStack>
        ))}
      </VStack>
    ),
  },
];`}
        >
          <EmbeddedContentDemo />
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">Cell Click</h2>
        <p className="section-text">
          Use <code>onCellClick</code> to handle clicks on individual cells. The handler
          receives the cell value, the full row, the column key, and the native event.
          Call <code>event.stopPropagation()</code> to prevent <code>onRowClick</code> from
          also firing. Cells become focusable and respond to <kbd>Enter</kbd>/<kbd>Space</kbd>.
        </p>
        <Preview
          align="column"
          code={`<DataTable
  columns={columns}
  data={data}
  onCellClick={(value, row, columnKey, event) => {
    event.stopPropagation();
    alert(\`Clicked "\${value}" in column "\${columnKey}"\`);
  }}
/>`}
        >
          <DataTable
            columns={basicColumns}
            data={sampleData.slice(0, 4)}
            onCellClick={(value, _row, columnKey, event) => {
              event.stopPropagation();
              alert(`Clicked "${value}" in column "${columnKey}"`);
            }}
          />
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">Checkbox Selection</h2>
        <p className="section-text">
          Use <code>selectable</code> to add checkbox row selection. Control the state
          with <code>selectedRows</code> and <code>onSelectionChange</code>.
          The header checkbox supports select-all and indeterminate states.
        </p>
        <Preview
          align="column"
          code={`const [selected, setSelected] = useState([]);

<DataTable
  columns={columns}
  data={data}
  selectable
  selectedRows={selected}
  onSelectionChange={setSelected}
  toolbar
  searchable
/>`}
        >
          <SelectionDemo />
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">Per-Column Filters</h2>
        <p className="section-text">
          Enable <code>filterable</code> + <code>toolbar</code> to get a filter panel.
          Each filter row has a column, operator, and value. Multiple filters combine
          with <code>AND</code>/<code>OR</code> logic. Available operators:
        </p>
        <ul className="section-text" style={{ paddingLeft: 24 }}>
          <li><code>contains</code>, <code>equals</code>, <code>startsWith</code>, <code>endsWith</code> — string matching</li>
          <li><code>&gt;</code>, <code>&gt;=</code>, <code>&lt;</code>, <code>&lt;=</code> — numeric comparison</li>
          <li><code>is empty</code>, <code>is not empty</code> — null/empty checks</li>
          <li><code>is any of</code> — multi-select from unique column values (checkbox dropdown)</li>
        </ul>
        <p className="section-text">
          The <code>is any of</code> operator automatically extracts unique values from the
          selected column and presents them as a checkbox dropdown for multi-select filtering.
        </p>
        <Preview
          align="column"
          code={`const [filterModel, setFilterModel] = useState({
  items: [{ field: 'department', operator: 'isAnyOf', value: 'Engineering' }],
  logicOperator: 'and',
});

<DataTable
  columns={columns}
  data={data}
  filterable
  filterModel={filterModel}
  onFilterModelChange={setFilterModel}
  toolbar
  searchable
  paginated
  pageSize={5}
/>`}
        >
          <FilterDemo />
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">Column Reordering & Visibility</h2>
        <p className="section-text">
          Use <code>reorderable</code> to allow drag-and-drop column reordering. Click the{' '}
          <strong>Columns</strong> button in the toolbar to toggle column visibility.
          Columns with <code>hideable: false</code> cannot be hidden.
        </p>
        <Preview
          align="column"
          code={`<DataTable
  columns={columns}
  data={data}
  sortable
  reorderable
  toolbar
/>`}
        >
          <DataTable
            columns={richColumns}
            data={sampleData.slice(0, 5)}
            sortable
            reorderable
            toolbar
          />
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">Full-Featured Grid</h2>
        <p className="section-text">
          All features combined: sorting, per-column filters, search, pagination, checkbox selection,
          column reordering, column visibility, and localStorage persistence via <code>storageKey</code>.
          Reload the page — your column order and filter state persist.
        </p>
        <Preview
          align="column"
          code={`<DataTable
  columns={columns}
  data={data}
  rowKey="id"
  sortable
  filterable
  searchable
  selectable
  paginated
  pageSize={5}
  reorderable
  toolbar
  storageKey="jind-datatable-demo"
/>`}
        >
          <FullFeatureDemo />
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">Data Modes Guide</h2>
        <p className="section-text">
          DataTable supports three data processing modes. Choose based on your dataset size and latency requirements.
        </p>

        <h3 className="section-title" style={{ fontSize: 16, marginTop: 24 }}>Client Mode (default)</h3>
        <p className="section-text">
          All data is loaded upfront and sorting, filtering, searching, and pagination happen in the browser.
          Best for small-to-medium datasets (under ~5,000 rows) where you want instant interactions with zero latency.
        </p>
        <ul className="section-text" style={{ paddingLeft: 24 }}>
          <li>Instant filtering and sorting — no network round-trips</li>
          <li>Works offline after initial load</li>
          <li>Simple setup — just pass <code>data</code> and enable features</li>
          <li>Trade-off: initial load includes all data; large datasets can slow down rendering</li>
        </ul>
        <Preview
          align="column"
          code={`// Client mode — just pass data. Sorting, filtering, search all happen in-browser.
<DataTable
  columns={columns}
  data={allData}       // all rows loaded upfront
  sortable
  filterable
  searchable
  paginated
  pageSize={10}
  toolbar
/>`}
        >
          <DataTable
            columns={fullColumns}
            data={sampleData}
            sortable
            filterable
            searchable
            paginated
            pageSize={5}
            toolbar
          />
        </Preview>

        <h3 className="section-title" style={{ fontSize: 16, marginTop: 32 }}>Server Mode</h3>
        <p className="section-text">
          Pass <code>serverSide</code> to disable all client-side processing. DataTable becomes a
          controlled display — it fires callbacks for every interaction, and your backend returns the correct
          data slice. Best for large datasets (10k+ rows), database-backed tables, or when filtering requires
          server logic (full-text search, joins, permissions).
        </p>
        <ul className="section-text" style={{ paddingLeft: 24 }}>
          <li>Only loads the current page — fast initial render regardless of dataset size</li>
          <li>Backend controls sorting, filtering, and search — can use database indexes</li>
          <li>Required when data is too large to send to the client</li>
          <li>Trade-off: every interaction hits the server; needs loading states and error handling</li>
        </ul>
        <p className="section-text">
          Key props for server mode: <code>serverSide</code>, <code>rowCount</code> (total rows for pagination),{' '}
          <code>loading</code> (overlay), and the <code>on*Change</code> callbacks.
          The demo below simulates server calls with a 400ms delay. Watch the log to see each request.
        </p>
        <Preview
          align="column"
          code={`const [data, setData] = useState([]);
const [loading, setLoading] = useState(false);
const [rowCount, setRowCount] = useState(0);
const [page, setPage] = useState(1);
const [filterModel, setFilterModel] = useState({ items: [], logicOperator: 'and' });
const [search, setSearch] = useState('');

async function fetchData({ page, sort, dir, filters, search }) {
  setLoading(true);
  const res = await api.get('/users', {
    page, pageSize: 10, sort, dir,
    filters: JSON.stringify(filters?.items),
    search,
  });
  setData(res.data);
  setRowCount(res.total);
  setLoading(false);
}

<DataTable
  columns={columns}
  data={data}
  serverSide
  sortable
  filterable
  searchable
  paginated
  pageSize={10}
  toolbar
  rowCount={rowCount}
  loading={loading}
  filterModel={filterModel}
  searchValue={search}
  page={page}
  onSortChange={(key, dir) => fetchData({ sort: key, dir })}
  onFilterModelChange={(model) => {
    setFilterModel(model);
    setPage(1);
    fetchData({ filters: model, page: 1 });
  }}
  onSearchChange={(q) => {
    setSearch(q);
    setPage(1);
    fetchData({ search: q, page: 1 });
  }}
  onPageChange={(p) => {
    setPage(p);
    fetchData({ page: p });
  }}
/>`}
        >
          <ServerSideFilterDemo />
        </Preview>

        <h3 className="section-title" style={{ fontSize: 16, marginTop: 32 }}>Hybrid Mode</h3>
        <p className="section-text">
          There's no explicit "hybrid" prop — you build it by combining client and server patterns.
          Fetch a larger page of data from the server (e.g. 500 rows), then let DataTable handle
          client-side sorting and filtering within that cached page. Paginate to the server only when
          the user leaves the cached window.
        </p>
        <ul className="section-text" style={{ paddingLeft: 24 }}>
          <li>Best of both: instant local interactions within the cached window</li>
          <li>Server handles coarse pagination, client handles fine-grained sort/filter</li>
          <li>Good for medium datasets (1k–50k rows) where you can cache a reasonable chunk</li>
          <li>Trade-off: more complex state management; needs cache invalidation logic</li>
        </ul>
        <Preview
          align="column"
          code={`// Hybrid: fetch a chunk from the server, filter/sort client-side within it
const PAGE_CHUNK = 500;
const [chunk, setChunk] = useState([]);
const [chunkStart, setChunkStart] = useState(0);

async function fetchChunk(start) {
  const res = await api.get('/users', { offset: start, limit: PAGE_CHUNK });
  setChunk(res.data);
  setChunkStart(start);
}

// Client-mode DataTable over the cached chunk
<DataTable
  columns={columns}
  data={chunk}           // cached subset — client sorts/filters this
  sortable
  filterable
  searchable
  paginated
  pageSize={20}
  toolbar
/>

// When user pages past the cached window, fetch the next chunk
// (implement with onPageChange + bounds checking)`}
        >
          <DataTable
            columns={fullColumns}
            data={sampleData}
            sortable
            filterable
            searchable
            paginated
            pageSize={4}
            toolbar
          />
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">DataTable Props</h2>
        <PropsTable props={dataTableProps} />
      </div>

      <div className="section">
        <h2 className="section-title">DataColumn Type</h2>
        <PropsTable props={columnProps} />
      </div>
    </div>
  );
}
