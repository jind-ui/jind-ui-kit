import { type CSSProperties, type ReactNode, type ElementType } from 'react';
import type { Space } from '../../types';
import { resolveSpace } from '../../utils/styles';

export interface ContainerOwnProps {
  as?: ElementType;
  ref?: React.Ref<HTMLElement>;
  maxWidth?: number | string;
  centerContent?: boolean;
  px?: Space;
  style?: CSSProperties;
  children?: ReactNode;
}

export type ContainerProps<E extends ElementType = 'div'> = ContainerOwnProps &
  Omit<React.ComponentPropsWithoutRef<E>, keyof ContainerOwnProps>;

export function Container(
  { as: Component = 'div', ref, maxWidth = 1200, centerContent = false, px = 7, style, children, ...rest }: ContainerProps,
) {
  const containerStyle: CSSProperties = {
    width: '100%',
    maxWidth,
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingLeft: resolveSpace(px),
    paddingRight: resolveSpace(px),
    ...(centerContent && {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }),
    ...style,
  };

  return (
    <Component ref={ref} style={containerStyle} {...rest}>
      {children}
    </Component>
  );
}
