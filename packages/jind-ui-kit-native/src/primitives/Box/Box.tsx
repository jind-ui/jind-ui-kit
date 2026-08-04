import type { Ref, ReactNode } from 'react';
import { View, type ViewProps, type ViewStyle } from 'react-native';
import type { Radius, Shadow, SpacingProps } from '../../types';
import { spacingToStyle, resolveRadius, resolveShadow } from '../../utils/styles';

export interface BoxProps extends SpacingProps, Omit<ViewProps, 'style'> {
  ref?: Ref<View>;
  bg?: string;
  radius?: Radius;
  shadow?: Shadow;
  border?: string;
  borderColor?: string;
  borderWidth?: number;
  width?: number | string;
  height?: number | string;
  minWidth?: number | string;
  minHeight?: number | string;
  maxWidth?: number | string;
  maxHeight?: number | string;
  flex?: number;
  position?: ViewStyle['position'];
  overflow?: ViewStyle['overflow'];
  opacity?: number;
  style?: ViewStyle;
  children?: ReactNode;
}

export function Box({
  ref,
  bg,
  radius: radiusProp,
  shadow: shadowProp,
  border,
  borderColor,
  borderWidth: bw,
  width,
  height,
  minWidth,
  minHeight,
  maxWidth,
  maxHeight,
  flex,
  position,
  overflow,
  opacity,
  style,
  children,
  p, px, py, pt, pr, pb, pl,
  m, mx, my, mt, mr, mb, ml,
  gap,
  ...rest
}: BoxProps) {
  const spacingStyle = spacingToStyle({ p, px, py, pt, pr, pb, pl, m, mx, my, mt, mr, mb, ml, gap });
  const shadowStyle = resolveShadow(shadowProp);

  const boxStyle: ViewStyle = {
    ...spacingStyle,
    backgroundColor: bg,
    borderRadius: resolveRadius(radiusProp),
    ...(shadowStyle ?? {}),
    borderColor,
    borderWidth: bw,
    width: width as ViewStyle['width'],
    height: height as ViewStyle['height'],
    minWidth: minWidth as ViewStyle['minWidth'],
    minHeight: minHeight as ViewStyle['minHeight'],
    maxWidth: maxWidth as ViewStyle['maxWidth'],
    maxHeight: maxHeight as ViewStyle['maxHeight'],
    flex,
    position,
    overflow,
    opacity,
    ...style,
  };

  return (
    <View ref={ref} style={boxStyle} {...rest}>
      {children}
    </View>
  );
}
