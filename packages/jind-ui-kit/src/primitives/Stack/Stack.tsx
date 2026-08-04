import { type ElementType, type CSSProperties, type ReactNode } from 'react';
import type { Space, SpacingProps } from '../../types';
import { resolveSpace, spacingToStyle } from '../../utils/styles';

export interface StackOwnProps extends SpacingProps {
  as?: ElementType;
  ref?: React.Ref<HTMLElement>;
  direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  align?: CSSProperties['alignItems'];
  justify?: CSSProperties['justifyContent'];
  wrap?: CSSProperties['flexWrap'];
  flex?: number | string;
  width?: number | string;
  height?: number | string;
  style?: CSSProperties;
  children?: ReactNode;
}

export type StackProps<E extends ElementType = 'div'> = StackOwnProps &
  Omit<React.ComponentPropsWithoutRef<E>, keyof StackOwnProps>;

export function Stack(
  {
    as: Component = 'div',
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
  }: StackProps,
) {
  const spacingStyle = spacingToStyle({ p, px, py, pt, pr, pb, pl, m, mx, my, mt, mr, mb, ml, gap });

  const stackStyle: CSSProperties = {
    display: 'flex',
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
    <Component ref={ref} style={stackStyle} {...rest}>
      {children}
    </Component>
  );
}
