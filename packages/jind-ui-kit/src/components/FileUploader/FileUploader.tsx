import {
  useState,
  useRef,
  useCallback,
  type CSSProperties,
  type DragEvent,
  type ChangeEvent,
} from 'react';
import type { RadiusValue } from '../../types';
import { useTheme } from '../../theme/ThemeProvider';
import { transition, mergeStyles, resolveRadiusStyle, type PerCornerRadiusProps } from '../../utils/styles';

export interface FileItem {
  file: File;
  id: string;
  progress?: number;
  error?: string;
}

export interface FileUploaderProps extends PerCornerRadiusProps {
  accept?: string;
  multiple?: boolean;
  maxSize?: number;
  maxFiles?: number;
  radius?: RadiusValue;
  disabled?: boolean;
  onFilesSelected?: (files: File[]) => void;
  onFileRemove?: (id: string) => void;
  files?: FileItem[];
  label?: string;
  hint?: string;
  style?: CSSProperties;
  ref?: React.Ref<HTMLDivElement>;
}

let fileIdCounter = 0;

export function FileUploader({
  accept,
  multiple = true,
  maxSize,
  maxFiles,
  radius = 'md',
  disabled = false,
  onFilesSelected,
  onFileRemove,
  files: controlledFiles,
  label = 'Drop files here or click to browse',
  hint,
  style,
  ref,
  radiusTopLeft, radiusTopRight, radiusBottomRight, radiusBottomLeft,
}: FileUploaderProps) {
  const theme = useTheme();
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);
  const [internalFiles, setInternalFiles] = useState<FileItem[]>([]);

  const files = controlledFiles ?? internalFiles;

  const validate = useCallback(
    (fileList: File[]): File[] => {
      let valid = fileList;
      if (maxSize) {
        valid = valid.filter((f) => f.size <= maxSize);
      }
      if (maxFiles) {
        const remaining = maxFiles - files.length;
        valid = valid.slice(0, Math.max(0, remaining));
      }
      return valid;
    },
    [maxSize, maxFiles, files.length],
  );

  const handleFiles = useCallback(
    (incoming: File[]) => {
      const valid = validate(incoming);
      if (valid.length === 0) return;

      if (!controlledFiles) {
        const newItems = valid.map((file) => ({
          file,
          id: `file-${++fileIdCounter}`,
        }));
        setInternalFiles((prev) => [...prev, ...newItems]);
      }

      onFilesSelected?.(valid);
    },
    [validate, controlledFiles, onFilesSelected],
  );

  function handleDragOver(e: DragEvent) {
    e.preventDefault();
    if (!disabled) setDragOver(true);
  }

  function handleDragLeave(e: DragEvent) {
    e.preventDefault();
    setDragOver(false);
  }

  function handleDrop(e: DragEvent) {
    e.preventDefault();
    setDragOver(false);
    if (disabled) return;
    const dropped = Array.from(e.dataTransfer.files);
    handleFiles(dropped);
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;
    handleFiles(Array.from(e.target.files));
    e.target.value = '';
  }

  function handleClick() {
    if (!disabled) inputRef.current?.click();
  }

  function handleRemove(id: string) {
    if (!controlledFiles) {
      setInternalFiles((prev) => prev.filter((f) => f.id !== id));
    }
    onFileRemove?.(id);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  }

  const transitionValue = transition('border-color', 'background-color');

  const radiusStyle = resolveRadiusStyle(radius, { radiusTopLeft, radiusTopRight, radiusBottomRight, radiusBottomLeft });

  const zoneStyle: CSSProperties = mergeStyles(
    {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      padding: 32,
      ...radiusStyle,
      border: `2px dashed ${
        dragOver
          ? theme.semantic.border.focus
          : theme.semantic.border.default
      }`,
      backgroundColor: dragOver
        ? theme.semantic.surface.selected
        : theme.semantic.surface.subtle,
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
      transition: transitionValue,
      outline: 'none',
    },
    style,
  );

  const labelStyle: CSSProperties = {
    fontFamily: theme.fontFamily.sans,
    fontSize: theme.fontSize[14],
    fontWeight: theme.fontWeight.medium,
    color: theme.semantic.text.primary,
  };

  const hintStyle: CSSProperties = {
    fontFamily: theme.fontFamily.sans,
    fontSize: theme.fontSize[12],
    color: theme.semantic.text.muted,
  };

  const fileListStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
    marginTop: files.length > 0 ? 12 : 0,
  };

  const fileItemStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '8px 12px',
    borderRadius: theme.radius.sm,
    border: `1px solid ${theme.semantic.border.subtle}`,
    backgroundColor: theme.semantic.surface.card,
    fontFamily: theme.fontFamily.sans,
    fontSize: theme.fontSize[13],
    color: theme.semantic.text.primary,
  };

  const removeButtonStyle: CSSProperties = {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '2px 6px',
    borderRadius: theme.radius.xs,
    color: theme.semantic.text.muted,
    fontSize: theme.fontSize[16],
    lineHeight: 1,
  };

  function formatSize(bytes: number): string {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  return (
    <div ref={ref}>
      <div
        role="button"
        tabIndex={disabled ? -1 : 0}
        style={zoneStyle}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        aria-label={label}
        aria-disabled={disabled || undefined}
      >
        <span style={{ fontSize: 28, color: theme.semantic.icon.muted }}>
          {'↑'}
        </span>
        <span style={labelStyle}>{label}</span>
        {hint && <span style={hintStyle}>{hint}</span>}
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleChange}
          style={{ display: 'none' }}
          tabIndex={-1}
          aria-hidden="true"
        />
      </div>

      {files.length > 0 && (
        <div style={fileListStyle}>
          {files.map((item) => (
            <div key={item.id} style={fileItemStyle}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 0, flex: 1 }}>
                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {item.file.name}
                </span>
                <span style={{ fontSize: theme.fontSize[11], color: theme.semantic.text.muted }}>
                  {formatSize(item.file.size)}
                  {item.error && (
                    <span style={{ color: theme.semantic.text.danger, marginLeft: 8 }}>
                      {item.error}
                    </span>
                  )}
                </span>
              </div>
              {item.progress !== undefined && item.progress < 100 && (
                <div
                  role="progressbar"
                  aria-valuenow={item.progress}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label={`Uploading ${item.file.name}`}
                  style={{
                    width: 60,
                    height: 4,
                    borderRadius: 2,
                    backgroundColor: theme.semantic.surface.quiet,
                    marginRight: 8,
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      width: `${item.progress}%`,
                      height: '100%',
                      backgroundColor: theme.semantic.fill.primary,
                      borderRadius: 2,
                      transition: 'width 200ms ease',
                    }}
                  />
                </div>
              )}
              <button
                type="button"
                style={removeButtonStyle}
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemove(item.id);
                }}
                aria-label={`Remove ${item.file.name}`}
              >
                {'×'}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
