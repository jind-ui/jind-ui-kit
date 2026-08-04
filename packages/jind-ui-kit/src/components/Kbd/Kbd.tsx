import { type CSSProperties, type ReactNode, type Ref } from 'react';
import type { RadiusValue } from '../../types';
import { useTheme } from '../../theme/ThemeProvider';
import { resolveRadiusStyle, type PerCornerRadiusProps } from '../../utils/styles';

export interface KbdProps extends PerCornerRadiusProps {
  children: ReactNode;
  radius?: RadiusValue;
  size?: 'sm' | 'md';
  style?: CSSProperties;
  ref?: Ref<HTMLElement>;
}

export function Kbd({
  children,
  radius = 'xs',
  size = 'md',
  style,
  ref,
  radiusTopLeft, radiusTopRight, radiusBottomRight, radiusBottomLeft,
}: KbdProps) {
  const theme = useTheme();
  const radiusStyle = resolveRadiusStyle(radius, { radiusTopLeft, radiusTopRight, radiusBottomRight, radiusBottomLeft });

  const isSm = size === 'sm';

  const kbdStyle: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.semantic.surface.subtle,
    border: `1px solid ${theme.semantic.border.default}`,
    ...radiusStyle,
    fontFamily: theme.fontFamily.mono,
    fontSize: isSm ? 11 : 13,
    padding: isSm ? '2px 5px' : '3px 7px',
    color: theme.semantic.text.secondary,
    lineHeight: 1,
    boxShadow: `0 1px 0 1px ${theme.semantic.border.subtle}`,
    boxSizing: 'border-box' as const,
    whiteSpace: 'nowrap',
    ...style,
  };

  return (
    <kbd ref={ref} style={kbdStyle}>
      {children}
    </kbd>
  );
}
