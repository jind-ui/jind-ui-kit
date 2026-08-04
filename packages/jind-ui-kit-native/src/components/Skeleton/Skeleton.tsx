import { useEffect, useRef } from 'react';
import type { Ref } from 'react';
import { Animated, View, type DimensionValue, type ViewStyle } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';
import type { Radius } from '../../types';

export interface SkeletonProps {
  width?: DimensionValue;
  height?: DimensionValue;
  radius?: Radius;
  style?: ViewStyle;
  ref?: Ref<View>;
}

export function Skeleton({ ref, width, height, radius = 'sm', style }: SkeletonProps) {
  const theme = useTheme();
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.4,
          duration: 750,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 750,
          useNativeDriver: true,
        }),
      ]),
    );
    animation.start();
    return () => animation.stop();
  }, [opacity]);

  const skeletonStyle: Animated.AnimatedProps<ViewStyle> = {
    backgroundColor: theme.colors.gray[150],
    borderRadius: theme.radius[radius],
    width,
    height,
    opacity,
    ...style,
  };

  return <Animated.View ref={ref} style={skeletonStyle} />;
}
