import type { Ref } from 'react';
import {
  Pressable,
  Text,
  View,
  type TextStyle,
  type ViewStyle,
} from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';

export interface TagsInputProps {
  tags: string[];
  placeholder?: string;
  disabled?: boolean;
  onRemove?: (index: number) => void;
  style?: ViewStyle;
  ref?: Ref<View>;
}

export function TagsInput({
  ref,
  tags,
  placeholder = 'Add tags...',
  disabled = false,
  onRemove,
  style,
}: TagsInputProps) {
  const theme = useTheme();

  const containerStyle: ViewStyle = {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 6,
    minHeight: theme.controlHeight.md,
    paddingVertical: 6,
    paddingHorizontal: theme.controlPadding.field,
    borderRadius: theme.radius.sm,
    backgroundColor: theme.semantic.surface.subtle,
    borderWidth: 1,
    borderColor: theme.semantic.border.subtle,
    ...theme.shadow.xs,
    opacity: disabled ? 0.6 : 1,
    ...style,
  };

  const tagStyle: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    height: 26,
    paddingHorizontal: 8,
    borderRadius: theme.radius.xs,
    backgroundColor: theme.colors.gray[150],
  };

  const tagTextStyle: TextStyle = {
    fontFamily: theme.fontFamily.sans,
    fontSize: theme.fontSize[13],
    fontWeight: theme.fontWeight.medium,
    lineHeight: theme.fontSize[13] * 1.3,
    color: theme.semantic.text.primary,
  };

  const removeTextStyle: TextStyle = {
    fontFamily: theme.fontFamily.sans,
    fontSize: theme.fontSize[14],
    lineHeight: theme.fontSize[14] * 1.3,
    color: theme.semantic.icon.muted,
  };

  const placeholderStyle: TextStyle = {
    fontFamily: theme.fontFamily.sans,
    fontSize: theme.fontSize[14],
    fontWeight: theme.fontWeight.regular,
    lineHeight: theme.fontSize[14] * 1.4,
    color: theme.semantic.text.muted,
  };

  return (
    <View ref={ref} style={containerStyle}>
      {tags.length === 0 && <Text style={placeholderStyle}>{placeholder}</Text>}
      {tags.map((tag, index) => (
        <View key={`${tag}-${index}`} style={tagStyle}>
          <Text style={tagTextStyle}>{tag}</Text>
          {!disabled && onRemove != null && (
            <Pressable
              onPress={() => onRemove(index)}
              accessibilityRole="button"
              accessibilityLabel={`Remove ${tag}`}
            >
              <Text style={removeTextStyle}>x</Text>
            </Pressable>
          )}
        </View>
      ))}
    </View>
  );
}
