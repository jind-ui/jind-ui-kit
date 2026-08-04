import { memo, useState } from 'react';
import type { Ref } from 'react';
import { TextInput, type ViewStyle, type TextStyle } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';
import { useControllableState } from '../../hooks/useControllableState';

export interface TextareaProps {
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  numberOfLines?: number;
  disabled?: boolean;
  onChange?: (value: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  style?: ViewStyle;
  ref?: Ref<TextInput>;
}

function TextareaInner({
  ref,
  value: controlledValue,
  defaultValue = '',
  placeholder,
  numberOfLines = 6,
  disabled = false,
  onChange,
  onFocus,
  onBlur,
  style,
}: TextareaProps) {
  const theme = useTheme();
  const [value, setValue] = useControllableState(controlledValue, defaultValue, onChange);
  const [focused, setFocused] = useState(false);

  const inputStyle: TextStyle = {
    padding: 14,
    borderRadius: theme.radius.md,
    backgroundColor: 'transparent',
    color: theme.semantic.text.primary,
    fontSize: 16,
    lineHeight: 24,
    fontFamily: theme.fontFamily.sans,
    fontWeight: theme.fontWeight.regular,
    textAlignVertical: 'top',
  };

  const containerStyle: ViewStyle = {
    borderRadius: theme.radius.md,
    ...(disabled
      ? {
          backgroundColor: theme.semantic.surface.subtle,
          borderWidth: 1,
          borderColor: theme.semantic.border.subtle,
          opacity: 0.6,
        }
      : focused
        ? {
            backgroundColor: theme.semantic.surface.card,
            borderWidth: 2,
            borderColor: theme.semantic.border.focus,
            ...theme.focusRing.primary,
          }
        : {
            backgroundColor: theme.semantic.surface.subtle,
            borderWidth: 1,
            borderColor: theme.semantic.border.subtle,
            ...theme.shadow.xs,
          }),
    ...style,
  };

  const handleFocus = () => {
    setFocused(true);
    onFocus?.();
  };

  const handleBlur = () => {
    setFocused(false);
    onBlur?.();
  };

  return (
    <TextInput
      ref={ref}
      style={[containerStyle, inputStyle]}
      value={value}
      onChangeText={setValue}
      placeholder={placeholder}
      placeholderTextColor={theme.semantic.text.muted}
      editable={!disabled}
      multiline
      numberOfLines={numberOfLines}
      onFocus={handleFocus}
      onBlur={handleBlur}
    />
  );
}

export const Textarea = memo(TextareaInner);
