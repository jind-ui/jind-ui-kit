import { type CSSProperties, type ReactNode, type ElementType } from 'react';

export interface CenterOwnProps {
  as?: ElementType;
  ref?: React.Ref<HTMLElement>;
  inline?: boolean;
  width?: number | string;
  height?: number | string;
  style?: CSSProperties;
  children?: ReactNode;
}

export type CenterProps<E extends ElementType = 'div'> = CenterOwnProps &
  Omit<React.ComponentPropsWithoutRef<E>, keyof CenterOwnProps>;

export function Center(
  { as: Component = 'div', ref, inline = false, width, height, style, children, ...rest }: CenterProps,
) {
  const centerStyle: CSSProperties = {
    display: inline ? 'inline-flex' : 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width,
    height,
    ...style,
  };

  return (
    <Component ref={ref} style={centerStyle} {...rest}>
      {children}
    </Component>
  );
}
