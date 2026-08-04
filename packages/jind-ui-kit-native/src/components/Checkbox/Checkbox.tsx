import { type Ref } from 'react';
import {
  Pressable,
  Text,
  View,
  type TextStyle,
  type ViewStyle,
} from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';
import { useControllableState } from '../../hooks/useControllableState';

export interface CheckboxProps {
  ref?: Ref<View>;
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  indeterminate?: boolean;
  style?: ViewStyle;
}

const BOX_SIZE = 16;

export function Checkbox({
  ref,
  checked,
  defaultChecked = false,
  disabled = false,
  onChange,
  label,
  indeterminate = false,
  style,
}: CheckboxProps) {
  const theme = useTheme();
  const [isChecked, setIsChecked] = useControllableState(
    checked,
    defaultChecked,
    onChange,
  );

  const handlePress = () => {
    if (disabled) return;
    setIsChecked(!isChecked);
  };

  const isFilled = isChecked || indeterminate;

  const boxStyle: ViewStyle = {
    width: BOX_SIZE,
    height: BOX_SIZE,
    borderRadius: theme.radius.xs,
    borderWidth: 1.5,
    borderColor: isFilled
      ? theme.semantic.fill.primary
      : theme.semantic.border.default,
    backgroundColor: isFilled
      ? theme.semantic.fill.primary
      : theme.semantic.surface.card,
    alignItems: 'center',
    justifyContent: 'center',
  };

  const iconStyle: TextStyle = {
    color: theme.semantic.text.inverse,
    fontSize: 10,
    fontWeight: theme.fontWeight.bold,
  };

  const labelStyle: TextStyle = {
    fontFamily: theme.fontFamily.sans,
    fontSize: theme.fontSize[14],
    fontWeight: theme.fontWeight.regular,
    lineHeight: theme.fontSize[14] * theme.lineHeight.normal,
    color: theme.semantic.text.primary,
  };

  const containerStyle: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    opacity: disabled ? 0.5 : 1,
    ...style,
  };

  return (
    <Pressable
      ref={ref}
      onPress={handlePress}
      accessibilityRole="checkbox"
      accessibilityState={{ checked: isChecked, disabled }}
      disabled={disabled}
      style={containerStyle}
    >
      <View style={boxStyle}>
        {isFilled && (
          <Text style={iconStyle}>{indeterminate ? '—' : '✓'}</Text>
        )}
      </View>
      {label != null && <Text style={labelStyle}>{label}</Text>}
    </Pressable>
  );
}
