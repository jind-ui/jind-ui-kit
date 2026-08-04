# TreeView

Hierarchical tree with expand/collapse and selection

**Category:** content

## Import

```tsx
import { TreeView, type TreeViewProps, type TreeNode } from 'jind-ui-kit';
```

## Props

| Prop | Type |
|------|------|
| `nodes` | `TreeNode[]` |
| `defaultExpanded` | `string[]` |
| `expanded` | `string[]` |
| `onExpandChange` | `(ids: string[]) => void` |
| `selected` | `string \| null` |
| `onSelect` | `(id: string) => void` |
| `expandIcon` | `ReactNode` |
| `indentSize` | `number` |

