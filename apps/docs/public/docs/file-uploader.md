# FileUploader

Drag-and-drop file upload zone with progress

**Category:** forms

## Import

```tsx
import { FileUploader, type FileUploaderProps, type FileItem } from 'jind-ui-kit';
```

## Props

| Prop | Type |
|------|------|
| `accept` | `string` |
| `multiple` | `boolean` |
| `maxSize` | `number` |
| `maxFiles` | `number` |
| `disabled` | `boolean` |
| `onFilesSelected` | `(files: File[]) => void` |
| `onFileRemove` | `(id: string) => void` |
| `files` | `FileItem[]` |
| `label` | `string` |
| `hint` | `string` |

