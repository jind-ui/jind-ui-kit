import { type ReactNode, type Ref } from 'react';
import {
  Pressable,
  Text,
  View,
  type TextStyle,
  type ViewStyle,
} from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';

export interface DayToggleProps {
  ref?: Ref<View>;
  selected?: boolean;
  disabled?: boolean;
  children: ReactNode;
  onPress?: () => void;
  style?: ViewStyle;
}

export function DayToggle({
  ref,
  selected = false,
  disabled = false,
  children,
  onPress,
  style,
}: DayToggleProps) {
  const theme = useTheme();

  const pressableStyle: ViewStyle = {
    minWidth: 56,
    height: theme.controlHeight.md,
    paddingHorizontal: 14,
    borderRadius: theme.radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: selected
      ? theme.semantic.fill.primary
      : theme.semantic.surface.subtle,
    borderWidth: selected ? 0 : 1,
    borderColor: selected ? undefined : theme.semantic.border.subtle,
    opacity: disabled ? 0.5 : 1,
    ...style,
  };

  const textStyle: TextStyle = {
    fontFamily: theme.typeVariants.control.fontFamily,
    fontSize: theme.typeVariants.control.fontSize,
    fontWeight: theme.typeVariants.control.fontWeight as TextStyle['fontWeight'],
    lineHeight: theme.typeVariants.control.fontSize * 1,
    color: selected
      ? theme.semantic.text.inverse
      : theme.semantic.text.primary,
  };

  return (
    <Pressable
      ref={ref}
      style={pressableStyle}
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityState={{ selected, disabled }}
    >
      <Text style={textStyle}>{children}</Text>
    </Pressable>
  );
}
