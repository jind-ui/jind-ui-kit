import { type CSSProperties, type ReactNode, type ElementType } from 'react';
import type { HeadingLevel } from '../../types';
import { useTheme } from '../../theme/ThemeProvider';

const LEVEL_TAG: Record<HeadingLevel, ElementType> = { 1: 'h1', 2: 'h2', 3: 'h3', 4: 'h4' };
const LEVEL_SIZE: Record<HeadingLevel, number> = { 1: 28, 2: 22, 3: 18, 4: 16 };

export interface HeadingOwnProps {
  as?: ElementType;
  ref?: React.Ref<HTMLElement>;
  level?: HeadingLevel;
  color?: string;
  align?: CSSProperties['textAlign'];
  style?: CSSProperties;
  children?: ReactNode;
}

export type HeadingProps<E extends ElementType = 'h2'> = HeadingOwnProps &
  Omit<React.ComponentPropsWithoutRef<E>, keyof HeadingOwnProps>;

export function Heading(
  { as, ref, level = 2, color, align, style, children, ...rest }: HeadingProps,
) {
  const theme = useTheme();
  const Component = as ?? LEVEL_TAG[level];

  const headingStyle: CSSProperties = {
    fontFamily: theme.fontFamily.sans,
    fontSize: LEVEL_SIZE[level],
    fontWeight: level === 4 ? theme.fontWeight.bold : theme.fontWeight.medium,
    lineHeight: 1.3,
    letterSpacing: '-0.01em',
    color: color ?? theme.semantic.text.primary,
    textAlign: align,
    margin: 0,
    ...style,
  };

  return (
    <Component ref={ref} style={headingStyle} {...rest}>
      {children}
    </Component>
  );
}
