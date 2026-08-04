import { type ElementType, type CSSProperties, type ReactNode } from 'react';
import type { Space, RadiusValue, Radius, Shadow, SpacingProps } from '../../types';
import { spacingToStyle, resolveRadiusStyle, resolveShadow, type PerCornerRadiusProps } from '../../utils/styles';
import { useTheme } from '../../theme/ThemeProvider';

export interface BoxOwnProps extends SpacingProps, PerCornerRadiusProps {
  as?: ElementType;
  ref?: React.Ref<HTMLElement>;
  bg?: string;
  radius?: RadiusValue;
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
  flex?: number | string;
  display?: CSSProperties['display'];
  position?: CSSProperties['position'];
  overflow?: CSSProperties['overflow'];
  opacity?: number;
  cursor?: CSSProperties['cursor'];
  style?: CSSProperties;
  children?: ReactNode;
}

export type BoxProps<E extends ElementType = 'div'> = BoxOwnProps &
  Omit<React.ComponentPropsWithoutRef<E>, keyof BoxOwnProps>;

export function Box(
  {
    as: Component = 'div',
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
    display,
    position,
    overflow,
    opacity,
    cursor,
    style,
    children,
    p, px, py, pt, pr, pb, pl,
    m, mx, my, mt, mr, mb, ml,
    gap,
    radiusTopLeft, radiusTopRight, radiusBottomRight, radiusBottomLeft,
    ...rest
  }: BoxProps,
) {
  const theme = useTheme();

  const spacingStyle = spacingToStyle({ p, px, py, pt, pr, pb, pl, m, mx, my, mt, mr, mb, ml, gap });
  const radiusStyle = resolveRadiusStyle(radiusProp, { radiusTopLeft, radiusTopRight, radiusBottomRight, radiusBottomLeft });

  const boxStyle: CSSProperties = {
    ...spacingStyle,
    background: bg,
    ...radiusStyle,
    boxShadow: resolveShadow(shadowProp),
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
    display,
    position,
    overflow,
    opacity,
    cursor,
    boxSizing: 'border-box',
    ...style,
  };

  return (
    <Component ref={ref} style={boxStyle} {...rest}>
      {children}
    </Component>
  );
}
