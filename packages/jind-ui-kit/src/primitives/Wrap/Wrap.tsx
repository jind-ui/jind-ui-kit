import { type CSSProperties, type ReactNode, type ElementType } from 'react';
import type { Space } from '../../types';
import { resolveSpace } from '../../utils/styles';

export interface WrapOwnProps {
  as?: ElementType;
  ref?: React.Ref<HTMLElement>;
  gap?: Space;
  align?: CSSProperties['alignItems'];
  justify?: CSSProperties['justifyContent'];
  direction?: 'row' | 'row-reverse';
  style?: CSSProperties;
  children?: ReactNode;
}

export type WrapProps<E extends ElementType = 'div'> = WrapOwnProps &
  Omit<React.ComponentPropsWithoutRef<E>, keyof WrapOwnProps>;

export function Wrap(
  { as: Component = 'div', ref, gap = 4, align, justify, direction = 'row', style, children, ...rest }: WrapProps,
) {
  const wrapStyle: CSSProperties = {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: direction,
    gap: resolveSpace(gap),
    alignItems: align,
    justifyContent: justify,
    ...style,
  };

  return (
    <Component ref={ref} style={wrapStyle} {...rest}>
      {children}
    </Component>
  );
}
