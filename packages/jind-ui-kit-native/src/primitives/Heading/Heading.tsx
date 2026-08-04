import type { Ref, ReactNode } from 'react';
import { Text as RNText, type TextProps as RNTextProps, type TextStyle } from 'react-native';
import type { HeadingLevel } from '../../types';
import { useTheme } from '../../theme/ThemeProvider';

const LEVEL_SIZE: Record<HeadingLevel, number> = { 1: 28, 2: 22, 3: 18, 4: 16 };

export interface HeadingProps extends Omit<RNTextProps, 'style'> {
  ref?: Ref<RNText>;
  level?: HeadingLevel;
  color?: string;
  align?: TextStyle['textAlign'];
  style?: TextStyle;
  children?: ReactNode;
}

export function Heading({
  ref,
  level = 2,
  color,
  align,
  style,
  children,
  ...rest
}: HeadingProps) {
  const theme = useTheme();
  const fontSize = LEVEL_SIZE[level];

  const headingStyle: TextStyle = {
    fontFamily: theme.fontFamily.sans,
    fontSize,
    fontWeight: (level === 4 ? theme.fontWeight.bold : theme.fontWeight.medium) as TextStyle['fontWeight'],
    lineHeight: fontSize * 1.3,
    letterSpacing: -0.2,
    color: color ?? theme.semantic.text.primary,
    textAlign: align,
    ...style,
  };

  return (
    <RNText
      ref={ref}
      style={headingStyle}
      accessibilityRole="header"
      {...rest}
    >
      {children}
    </RNText>
  );
}
