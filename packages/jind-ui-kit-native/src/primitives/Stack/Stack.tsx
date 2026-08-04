import type { Ref, ReactNode } from 'react';
import { View, type ViewProps, type ViewStyle, type FlexStyle } from 'react-native';
import type { SpacingProps } from '../../types';
import { spacingToStyle } from '../../utils/styles';

export interface StackProps extends SpacingProps, Omit<ViewProps, 'style'> {
  ref?: Ref<View>;
  direction?: FlexStyle['flexDirection'];
  align?: FlexStyle['alignItems'];
  justify?: FlexStyle['justifyContent'];
  wrap?: FlexStyle['flexWrap'];
  flex?: number;
  width?: ViewStyle['width'];
  height?: ViewStyle['height'];
  style?: ViewStyle;
  children?: ReactNode;
}

export function Stack({
  ref,
  direction = 'column',
  align,
  justify,
  wrap,
  flex,
  width,
  height,
  style,
  children,
  p, px, py, pt, pr, pb, pl,
  m, mx, my, mt, mr, mb, ml,
  gap,
  ...rest
}: StackProps) {
  const spacingStyle = spacingToStyle({ p, px, py, pt, pr, pb, pl, m, mx, my, mt, mr, mb, ml, gap });

  const stackStyle: ViewStyle = {
    flexDirection: direction,
    alignItems: align,
    justifyContent: justify,
    flexWrap: wrap,
    flex,
    width,
    height,
    ...spacingStyle,
    ...style,
  };

  return (
    <View ref={ref} style={stackStyle} {...rest}>
      {children}
    </View>
  );
}
