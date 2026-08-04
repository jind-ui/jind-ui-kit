# DataTable

Enhanced table with sorting, filtering, and pagination

**Category:** data-display

## Import

```tsx
import { DataTable } from 'jind-ui-kit';
import type { DataTableProps, DataColumn, FilterModel, FilterItem, FilterOperator } from 'jind-ui-kit';
```

## Props

| Prop | Type |
|------|------|
| `columns` | `DataColumn<T>[]` |
| `data` | `T[]` |
| `rowKey` | `string \| ((row: T) => string)` |
| `sortable` | `boolean` |
| `filterable` | `boolean` |
| `filterModel` | `FilterModel` |
| `onFilterModelChange` | `(model: FilterModel) => void` |
| `searchable` | `boolean` |
| `searchValue` | `string` |
| `onSearchChange` | `(value: string) => void` |
| `paginated` | `boolean` |
| `pageSize` | `number` |
| `page` | `number` |
| `onPageChange` | `(page: number) => void` |
| `rowCount` | `number` |
| `selectable` | `boolean` |
| `selectedRows` | `T[]` |
| `onSelectionChange` | `(rows: T[]) => void` |
| `columnVisibility` | `Record<string, boolean>` |
| `onColumnVisibilityChange` | `(model: Record<string, boolean>) => void` |
| `reorderable` | `boolean` |
| `columnOrder` | `string[]` |
| `onColumnOrderChange` | `(order: string[]) => void` |
| `serverSide` | `boolean` |
| `onSortChange` | `(key: string \| null, direction: 'asc' \| 'desc' \| null) => void` |
| `loading` | `boolean` |
| `storageKey` | `string` |
| `emptyMessage` | `string` |
| `onRowClick` | `(row: T) => void` |
| `toolbar` | `boolean` |

