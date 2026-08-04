import { useCallback, useEffect, useRef } from 'react';
import type { Ref } from 'react';
import {
  Animated,
  Pressable,
  Text,
  View,
  type LayoutChangeEvent,
  type TextStyle,
  type ViewStyle,
} from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';

export interface SegmentedControlProps {
  ref?: Ref<View>;
  options: string[];
  selectedIndex: number;
  onChange: (index: number) => void;
  size?: 'sm' | 'md' | 'lg';
  style?: ViewStyle;
}

export function SegmentedControl(
  { ref, options, selectedIndex, onChange, size = 'md', style }: SegmentedControlProps,
) {
  const theme = useTheme();
  const translateX = useRef(new Animated.Value(0)).current;
  const containerWidth = useRef(0);

  const segmentWidth = containerWidth.current / (options.length || 1);

  useEffect(() => {
    Animated.spring(translateX, {
      toValue: selectedIndex * segmentWidth,
      useNativeDriver: true,
      overshootClamping: true,
      damping: 20,
      stiffness: 200,
    }).start();
  }, [selectedIndex, segmentWidth, translateX]);

  const handleLayout = useCallback(
    (event: LayoutChangeEvent) => {
      const { width } = event.nativeEvent.layout;
      containerWidth.current = width;
      const newSegmentWidth = width / (options.length || 1);
      translateX.setValue(selectedIndex * newSegmentWidth);
    },
    [options.length, selectedIndex, translateX],
  );

  const height = theme.controlHeight[size] ?? theme.controlHeight.md;
  const indicatorPadding = theme.space[1]; // 2px inset

  const containerStyle: ViewStyle = {
    flexDirection: 'row',
    backgroundColor: theme.semantic.surface.quiet,
    borderRadius: theme.radius.full,
    height,
    alignItems: 'center',
    position: 'relative',
    ...style,
  };

  const indicatorStyle: Animated.AnimatedProps<ViewStyle> = {
    position: 'absolute',
    top: indicatorPadding,
    bottom: indicatorPadding,
    left: indicatorPadding,
    width: segmentWidth > 0 ? segmentWidth - indicatorPadding * 2 : 0,
    backgroundColor: theme.semantic.surface.card,
    borderRadius: theme.radius.full,
    ...theme.shadow.sm,
    transform: [{ translateX }],
  };

  const segmentStyle: ViewStyle = {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    zIndex: 1,
  };

  const selectedTextStyle: TextStyle = {
    fontSize: theme.fontSize[14],
    fontWeight: theme.fontWeight.medium,
    fontFamily: theme.fontFamily.sans,
    color: theme.semantic.text.primary,
  };

  const unselectedTextStyle: TextStyle = {
    fontSize: theme.fontSize[14],
    fontWeight: theme.fontWeight.regular,
    fontFamily: theme.fontFamily.sans,
    color: theme.semantic.text.secondary,
  };

  return (
    <View ref={ref} style={containerStyle} onLayout={handleLayout}>
      {segmentWidth > 0 && <Animated.View style={indicatorStyle} />}
      {options.map((option, index) => (
        <Pressable
          key={option}
          style={segmentStyle}
          onPress={() => onChange(index)}
          accessibilityRole="tab"
          accessibilityState={{ selected: index === selectedIndex }}
          accessibilityLabel={option}
        >
          <Text
            style={index === selectedIndex ? selectedTextStyle : unselectedTextStyle}
            numberOfLines={1}
          >
            {option}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}
