import { type CSSProperties, type ReactNode, type ElementType } from 'react';
import type { TextVariant } from '../../types';
import { useTheme } from '../../theme/ThemeProvider';

export interface TextOwnProps {
  as?: ElementType;
  ref?: React.Ref<HTMLElement>;
  variant?: TextVariant;
  color?: string;
  align?: CSSProperties['textAlign'];
  truncate?: boolean;
  tabular?: boolean;
  weight?: 400 | 500 | 700;
  size?: number;
  style?: CSSProperties;
  children?: ReactNode;
}

export type TextProps<E extends ElementType = 'span'> = TextOwnProps &
  Omit<React.ComponentPropsWithoutRef<E>, keyof TextOwnProps>;

export function Text(
  {
    as: Component = 'span',
    ref,
    variant = 'body',
    color,
    align,
    truncate = false,
    tabular = false,
    weight,
    size,
    style,
    children,
    ...rest
  }: TextProps,
) {
  const theme = useTheme();
  const variantStyle = theme.typeVariants[variant];

  const textStyle: CSSProperties = {
    fontFamily: variantStyle.fontFamily,
    fontSize: size ?? variantStyle.fontSize,
    fontWeight: weight ?? variantStyle.fontWeight,
    lineHeight: variantStyle.lineHeight,
    color: color ?? theme.semantic.text.primary,
    textAlign: align,
    margin: 0,
    ...(truncate && {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    }),
    ...(tabular && {
      fontVariantNumeric: 'tabular-nums',
    }),
    ...style,
  };

  return (
    <Component ref={ref} style={textStyle} {...rest}>
      {children}
    </Component>
  );
}
