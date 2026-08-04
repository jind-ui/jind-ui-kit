import { useEffect, useRef } from 'react';
import type { Ref } from 'react';
import {
  Animated,
  Pressable,
  Text,
  View,
  type TextStyle,
  type ViewStyle,
} from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';
import { useControllableState } from '../../hooks/useControllableState';

export interface SwitchProps {
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  borderRadius?: number;
  style?: ViewStyle;
  ref?: Ref<View>;
}

const TRACK_WIDTH = 46;
const TRACK_HEIGHT = 26;
const KNOB_SIZE = 20;
const KNOB_OFF = 3;
const KNOB_ON = 23;

export function Switch({
  ref,
  checked,
  defaultChecked = false,
  disabled = false,
  onChange,
  label,
  borderRadius = 999,
  style,
}: SwitchProps) {
  const theme = useTheme();
  const [isOn, setIsOn] = useControllableState(checked, defaultChecked, onChange);

  const knobPosition = useRef(new Animated.Value(isOn ? KNOB_ON : KNOB_OFF)).current;

  useEffect(() => {
    Animated.timing(knobPosition, {
      toValue: isOn ? KNOB_ON : KNOB_OFF,
      duration: theme.duration.base,
      useNativeDriver: false,
    }).start();
  }, [isOn, knobPosition, theme.duration.base]);

  const handlePress = () => {
    if (disabled) return;
    setIsOn(!isOn);
  };

  const trackColor = isOn ? theme.semantic.fill.primary : theme.colors.gray[200];

  const trackStyle: ViewStyle = {
    width: TRACK_WIDTH,
    height: TRACK_HEIGHT,
    borderRadius,
    backgroundColor: trackColor,
    justifyContent: 'center',
  };

  const knobStyle: ViewStyle = {
    position: 'absolute',
    width: KNOB_SIZE,
    height: KNOB_SIZE,
    borderRadius,
    backgroundColor: theme.colors.gray[0],
    ...theme.shadow.sm,
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
    opacity: disabled ? 0.6 : 1,
    ...style,
  };

  const content = (
    <Pressable
      onPress={handlePress}
      accessibilityRole="switch"
      accessibilityState={{ checked: isOn }}
      disabled={disabled}
    >
      <View style={trackStyle}>
        <Animated.View style={[knobStyle, { left: knobPosition }]} />
      </View>
    </Pressable>
  );

  if (label) {
    return (
      <View ref={ref} style={containerStyle}>
        {content}
        <Text style={labelStyle}>{label}</Text>
      </View>
    );
  }

  return (
    <View ref={ref} style={[{ opacity: disabled ? 0.6 : 1 }, style]}>
      {content}
    </View>
  );
}
