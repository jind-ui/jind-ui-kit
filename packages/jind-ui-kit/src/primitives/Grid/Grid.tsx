import { type CSSProperties, type ReactNode, type ElementType } from 'react';
import type { Space, SpacingProps } from '../../types';
import { resolveSpace, spacingToStyle } from '../../utils/styles';

export interface GridOwnProps extends SpacingProps {
  as?: ElementType;
  ref?: React.Ref<HTMLElement>;
  columns?: number | string;
  rows?: string;
  rowGap?: Space;
  columnGap?: Space;
  align?: CSSProperties['alignItems'];
  justify?: CSSProperties['justifyContent'];
  width?: number | string;
  height?: number | string;
  style?: CSSProperties;
  children?: ReactNode;
}

export type GridProps<E extends ElementType = 'div'> = GridOwnProps &
  Omit<React.ComponentPropsWithoutRef<E>, keyof GridOwnProps>;

export function Grid(
  {
    as: Component = 'div',
    ref,
    columns,
    rows,
    rowGap,
    columnGap,
    align,
    justify,
    width,
    height,
    style,
    children,
    p, px, py, pt, pr, pb, pl,
    m, mx, my, mt, mr, mb, ml,
    gap,
    ...rest
  }: GridProps,
) {
  const spacingStyle = spacingToStyle({ p, px, py, pt, pr, pb, pl, m, mx, my, mt, mr, mb, ml, gap });

  const gridStyle: CSSProperties = {
    display: 'grid',
    gridTemplateColumns:
      typeof columns === 'number' ? `repeat(${columns}, 1fr)` : columns,
    gridTemplateRows: rows,
    rowGap: resolveSpace(rowGap),
    columnGap: resolveSpace(columnGap),
    alignItems: align,
    justifyContent: justify,
    width,
    height,
    ...spacingStyle,
    ...style,
  };

  return (
    <Component ref={ref} style={gridStyle} {...rest}>
      {children}
    </Component>
  );
}
