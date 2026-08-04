import { memo, type Ref } from 'react';
import { Pressable, Text, View, type ViewStyle, type TextStyle } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';

export interface FileItem {
  file: { name: string; size: number; type: string };
  id: string;
  progress?: number;
  error?: string;
}

export interface FileUploaderProps {
  ref?: Ref<View>;
  onFilesSelected?: (files: FileItem[]) => void;
  files?: FileItem[];
  onFileRemove?: (id: string) => void;
  label?: string;
  hint?: string;
  accept?: string;
  maxFiles?: number;
  disabled?: boolean;
  style?: ViewStyle;
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function FileUploaderInner({
  ref,
  onFilesSelected,
  files = [],
  onFileRemove,
  label,
  hint,
  accept,
  maxFiles,
  disabled = false,
  style,
}: FileUploaderProps) {
  const theme = useTheme();

  const handleZonePress = () => {
    if (disabled) return;
    onFilesSelected?.([]);
  };

  const labelStyle: TextStyle = {
    fontFamily: theme.fontFamily.sans,
    fontSize: theme.fontSize[14],
    fontWeight: theme.fontWeight.medium,
    color: theme.semantic.text.primary,
    marginBottom: theme.space[2],
  };

  const hintStyle: TextStyle = {
    fontFamily: theme.fontFamily.sans,
    fontSize: theme.fontSize[13],
    color: theme.semantic.text.muted,
    marginTop: theme.space[1],
  };

  const dropZoneStyle: ViewStyle = {
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: disabled ? theme.semantic.border.subtle : theme.semantic.border.default,
    borderRadius: theme.radius.md,
    paddingVertical: theme.space[10],
    paddingHorizontal: theme.space[7],
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.semantic.surface.subtle,
    opacity: disabled ? 0.5 : 1,
  };

  const iconTextStyle: TextStyle = {
    fontSize: theme.fontSize[22],
    color: theme.semantic.text.muted,
    marginBottom: theme.space[3],
  };

  const promptTextStyle: TextStyle = {
    fontFamily: theme.fontFamily.sans,
    fontSize: theme.fontSize[14],
    color: theme.semantic.text.secondary,
  };

  const fileListStyle: ViewStyle = {
    marginTop: theme.space[4],
    gap: theme.space[2],
  };

  const fileRowStyle: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: theme.space[3],
    paddingHorizontal: theme.space[4],
    backgroundColor: theme.semantic.surface.card,
    borderRadius: theme.radius.sm,
    borderWidth: theme.borderWidth.default,
    borderColor: theme.semantic.border.subtle,
  };

  const fileNameStyle: TextStyle = {
    fontFamily: theme.fontFamily.sans,
    fontSize: theme.fontSize[14],
    color: theme.semantic.text.primary,
    flex: 1,
  };

  const fileSizeStyle: TextStyle = {
    fontFamily: theme.fontFamily.sans,
    fontSize: theme.fontSize[12],
    color: theme.semantic.text.muted,
    marginLeft: theme.space[4],
  };

  const removeButtonStyle: TextStyle = {
    fontFamily: theme.fontFamily.sans,
    fontSize: theme.fontSize[14],
    color: theme.semantic.text.danger,
    marginLeft: theme.space[4],
    fontWeight: theme.fontWeight.medium,
  };

  const errorStyle: TextStyle = {
    fontFamily: theme.fontFamily.sans,
    fontSize: theme.fontSize[12],
    color: theme.semantic.text.danger,
    marginTop: theme.space[1],
  };

  const progressBarOuter: ViewStyle = {
    height: 4,
    backgroundColor: theme.semantic.surface.quiet,
    borderRadius: theme.radius.full,
    marginTop: theme.space[2],
    overflow: 'hidden',
  };

  const containerStyle: ViewStyle = {
    ...style,
  };

  return (
    <View ref={ref} style={containerStyle}>
      {label != null && <Text style={labelStyle}>{label}</Text>}

      <Pressable
        onPress={handleZonePress}
        disabled={disabled}
        accessibilityRole="button"
        accessibilityLabel={label ?? 'Upload files'}
        accessibilityState={{ disabled }}
      >
        <View style={dropZoneStyle}>
          <Text style={iconTextStyle}>{'↑'}</Text>
          <Text style={promptTextStyle}>Tap to select files</Text>
          {accept != null && (
            <Text style={{ ...hintStyle, marginTop: theme.space[2] }}>
              Accepted: {accept}
            </Text>
          )}
          {maxFiles != null && (
            <Text style={{ ...hintStyle, marginTop: theme.space[1] }}>
              Max {maxFiles} file{maxFiles !== 1 ? 's' : ''}
            </Text>
          )}
        </View>
      </Pressable>

      {hint != null && <Text style={hintStyle}>{hint}</Text>}

      {files.length > 0 && (
        <View style={fileListStyle}>
          {files.map((item) => (
            <View key={item.id}>
              <View style={fileRowStyle}>
                <Text style={fileNameStyle} numberOfLines={1}>
                  {item.file.name}
                </Text>
                <Text style={fileSizeStyle}>{formatFileSize(item.file.size)}</Text>
                {onFileRemove != null && (
                  <Pressable
                    onPress={() => onFileRemove(item.id)}
                    accessibilityRole="button"
                    accessibilityLabel={`Remove ${item.file.name}`}
                  >
                    <Text style={removeButtonStyle}>{'×'}</Text>
                  </Pressable>
                )}
              </View>
              {item.progress != null && item.progress < 100 && (
                <View style={progressBarOuter}>
                  <View
                    style={{
                      height: 4,
                      width: `${item.progress}%`,
                      backgroundColor: theme.semantic.fill.primary,
                      borderRadius: theme.radius.full,
                    }}
                  />
                </View>
              )}
              {item.error != null && (
                <Text style={errorStyle}>{item.error}</Text>
              )}
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

FileUploaderInner.displayName = 'FileUploader';
export const FileUploader = memo(FileUploaderInner);
