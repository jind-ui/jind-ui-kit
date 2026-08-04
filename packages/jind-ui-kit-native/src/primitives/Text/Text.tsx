import type { Ref, ReactNode } from 'react';
import { Text as RNText, type TextProps as RNTextProps, type TextStyle } from 'react-native';
import type { TextVariant } from '../../types';
import { useTheme } from '../../theme/ThemeProvider';

export interface TextProps extends Omit<RNTextProps, 'style'> {
  ref?: Ref<RNText>;
  variant?: TextVariant;
  color?: string;
  align?: TextStyle['textAlign'];
  truncate?: boolean | number;
  weight?: '400' | '500' | '700';
  size?: number;
  style?: TextStyle;
  children?: ReactNode;
}

export function Text({
  ref,
  variant = 'body',
  color,
  align,
  truncate = false,
  weight,
  size,
  style,
  children,
  ...rest
}: TextProps) {
  const theme = useTheme();
  const variantStyle = theme.typeVariants[variant];
  const resolvedSize = size ?? variantStyle.fontSize;

  const textStyle: TextStyle = {
    fontFamily: variantStyle.fontFamily,
    fontSize: resolvedSize,
    fontWeight: (weight ?? variantStyle.fontWeight) as TextStyle['fontWeight'],
    lineHeight: resolvedSize * variantStyle.lineHeight,
    color: color ?? theme.semantic.text.primary,
    textAlign: align,
    ...style,
  };

  const numberOfLines = typeof truncate === 'number' ? truncate : truncate ? 1 : undefined;

  return (
    <RNText
      ref={ref}
      style={textStyle}
      numberOfLines={numberOfLines}
      {...rest}
    >
      {children}
    </RNText>
  );
}
