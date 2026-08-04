import { useCallback, useRef } from 'react';
import type { Ref } from 'react';
import {
  PanResponder,
  Text,
  View,
  type LayoutChangeEvent,
  type TextStyle,
  type ViewStyle,
} from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';
import { useControllableState } from '../../hooks/useControllableState';

export interface SliderProps {
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  label?: string;
  showValue?: boolean;
  labelAlign?: 'left' | 'center' | 'right';
  style?: ViewStyle;
  ref?: Ref<View>;
}

const THUMB_SIZE = 18;
const TRACK_HEIGHT = 8;

export function Slider({
  ref,
  value,
  defaultValue = 0,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  disabled = false,
  label,
  showValue = false,
  labelAlign = 'left',
  style,
}: SliderProps) {
  const theme = useTheme();
  const [val, setVal] = useControllableState(value, defaultValue, onChange);
  const trackLayout = useRef({ x: 0, width: 0 });

  const clampedVal = Math.max(min, Math.min(max, val));
  const pct = max === min ? 0 : ((clampedVal - min) / (max - min)) * 100;

  const updateFromTouch = useCallback(
    (pageX: number) => {
      const { x, width } = trackLayout.current;
      if (width === 0) return;
      const ratio = Math.max(0, Math.min(1, (pageX - x) / width));
      const raw = min + ratio * (max - min);
      const stepped = Math.round(raw / step) * step;
      setVal(Math.max(min, Math.min(max, stepped)));
    },
    [min, max, step, setVal],
  );

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => !disabled,
      onMoveShouldSetPanResponder: () => !disabled,
      onPanResponderGrant: (e) => updateFromTouch(e.nativeEvent.pageX),
      onPanResponderMove: (e) => updateFromTouch(e.nativeEvent.pageX),
    }),
  ).current;

  const handleTrackLayout = (e: LayoutChangeEvent) => {
    const layout = e.nativeEvent.layout;
    trackLayout.current = { x: 0, width: layout.width };
    e.target.measureInWindow((x: number) => {
      trackLayout.current.x = x;
    });
  };

  const alignMap: Record<string, ViewStyle['justifyContent']> = {
    left: 'flex-start',
    center: 'center',
    right: 'flex-end',
  };

  const containerStyle: ViewStyle = {
    opacity: disabled ? 0.5 : 1,
    ...style,
  };

  const labelRowStyle: ViewStyle = {
    flexDirection: 'row',
    justifyContent:
      label && showValue ? 'space-between' : alignMap[labelAlign] ?? 'flex-start',
    marginBottom: 8,
  };

  const labelTextStyle: TextStyle = {
    fontFamily: theme.fontFamily.sans,
    fontSize: theme.fontSize[14],
    fontWeight: theme.fontWeight.regular,
    lineHeight: theme.fontSize[14] * 1.4,
    color: theme.semantic.text.secondary,
  };

  const valueTextStyle: TextStyle = {
    fontFamily: theme.fontFamily.sans,
    fontSize: theme.fontSize[14],
    fontWeight: theme.fontWeight.medium,
    lineHeight: theme.fontSize[14] * 1.4,
    color: theme.semantic.text.primary,
  };

  const trackContainerStyle: ViewStyle = {
    height: THUMB_SIZE,
    justifyContent: 'center',
  };

  const trackStyle: ViewStyle = {
    height: TRACK_HEIGHT,
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.gray[200],
    width: '100%',
    position: 'relative',
  };

  const fillStyle: ViewStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: `${pct}%` as unknown as number,
    borderRadius: theme.radius.full,
    backgroundColor: theme.semantic.fill.primary,
  };

  const thumbLeft =
    trackLayout.current.width > 0
      ? (pct / 100) * trackLayout.current.width - THUMB_SIZE / 2
      : -THUMB_SIZE / 2;

  const thumbStyle: ViewStyle = {
    position: 'absolute',
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    borderRadius: theme.radius.full,
    backgroundColor: theme.semantic.surface.card,
    borderWidth: 2,
    borderColor: theme.semantic.fill.primary,
    ...theme.shadow.sm,
    top: (TRACK_HEIGHT - THUMB_SIZE) / 2,
    left: 0,
    transform: [
      { translateX: thumbLeft },
    ],
  };

  const showLabelRow = label != null || showValue;

  return (
    <View ref={ref} style={containerStyle} accessibilityRole="adjustable">
      {showLabelRow && (
        <View style={labelRowStyle}>
          {label != null && <Text style={labelTextStyle}>{label}</Text>}
          {showValue && <Text style={valueTextStyle}>{clampedVal}</Text>}
        </View>
      )}
      <View style={trackContainerStyle} {...panResponder.panHandlers}>
        <View style={trackStyle} onLayout={handleTrackLayout}>
          <View style={fillStyle} />
          <View style={thumbStyle} />
        </View>
      </View>
    </View>
  );
}
