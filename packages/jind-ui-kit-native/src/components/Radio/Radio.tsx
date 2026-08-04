import {
  createContext,
  useContext,
  type ReactNode,
} from 'react';
import type { Ref } from 'react';
import {
  Pressable,
  Text,
  View,
  type TextStyle,
  type ViewStyle,
} from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';
import { useControllableState } from '../../hooks/useControllableState';

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

interface RadioGroupContextValue {
  value: string;
  onChange: (value: string) => void;
}

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

// ---------------------------------------------------------------------------
// RadioGroup
// ---------------------------------------------------------------------------

export interface RadioGroupProps {
  ref?: Ref<View>;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  children: ReactNode;
  style?: ViewStyle;
}

const CIRCLE_SIZE = 16;
const DOT_SIZE = 6;

export function RadioGroup(
  { ref, value, defaultValue = '', onChange, children, style }: RadioGroupProps,
) {
  const [selected, setSelected] = useControllableState(
    value,
    defaultValue,
    onChange,
  );

  const containerStyle: ViewStyle = {
    flexDirection: 'column',
    gap: 12,
    ...style,
  };

  return (
    <RadioGroupContext.Provider
      value={{ value: selected, onChange: setSelected }}
    >
      <View ref={ref} style={containerStyle}>
        {children}
      </View>
    </RadioGroupContext.Provider>
  );
}

// ---------------------------------------------------------------------------
// Radio
// ---------------------------------------------------------------------------

export interface RadioProps {
  ref?: Ref<View>;
  value: string;
  disabled?: boolean;
  label?: string;
  style?: ViewStyle;
}

export function Radio(
  { ref, value, disabled = false, label, style }: RadioProps,
) {
  const theme = useTheme();
  const ctx = useContext(RadioGroupContext);

  if (ctx === null) {
    throw new Error('Radio must be used within a RadioGroup');
  }

  const isSelected = ctx.value === value;

  const handlePress = () => {
    if (disabled) return;
    ctx.onChange(value);
  };

  const circleStyle: ViewStyle = {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: theme.radius.full,
    borderWidth: 1.5,
    borderColor: isSelected
      ? theme.semantic.fill.primary
      : theme.semantic.border.default,
    backgroundColor: theme.semantic.surface.card,
    alignItems: 'center',
    justifyContent: 'center',
  };

  const dotStyle: ViewStyle = {
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: theme.radius.full,
    backgroundColor: theme.semantic.fill.primary,
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
      accessibilityRole="radio"
      accessibilityState={{ selected: isSelected, disabled }}
      disabled={disabled}
      style={containerStyle}
    >
      <View style={circleStyle}>
        {isSelected && <View style={dotStyle} />}
      </View>
      {label != null && <Text style={labelStyle}>{label}</Text>}
    </Pressable>
  );
}
