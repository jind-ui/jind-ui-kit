import type { Ref, ReactNode } from 'react';
import { memo, useState } from 'react';
import { TextInput, View, type ViewStyle, type TextStyle } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';
import { useControllableState } from '../../hooks/useControllableState';

export interface InputProps {
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  disabled?: boolean;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  onChange?: (value: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  style?: ViewStyle;
  ref?: Ref<TextInput>;
}

function InputInner({
  ref,
  value: controlledValue,
  defaultValue = '',
  placeholder,
  disabled = false,
  iconLeft,
  iconRight,
  onChange,
  onFocus,
  onBlur,
  style,
}: InputProps) {
  const theme = useTheme();
  const [value, setValue] = useControllableState(controlledValue, defaultValue, onChange);
  const [focused, setFocused] = useState(false);

  const labelVariant = theme.typeVariants.label;

  const shellStyle: ViewStyle = {
    height: theme.controlHeight.md,
    paddingHorizontal: theme.controlPadding.field,
    borderRadius: theme.radius.sm,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
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

  const inputStyle: TextStyle = {
    flex: 1,
    backgroundColor: 'transparent',
    color: theme.semantic.text.primary,
    fontFamily: labelVariant.fontFamily,
    fontSize: labelVariant.fontSize,
    fontWeight: labelVariant.fontWeight,
    lineHeight: labelVariant.fontSize * labelVariant.lineHeight,
    padding: 0,
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
    <View style={shellStyle}>
      {iconLeft}
      <TextInput
        ref={ref}
        style={inputStyle}
        value={value}
        onChangeText={setValue}
        placeholder={placeholder}
        placeholderTextColor={theme.semantic.text.muted}
        editable={!disabled}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      {iconRight}
    </View>
  );
}

export const Input = memo(InputInner);
