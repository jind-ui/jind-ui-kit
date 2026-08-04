import { type CSSProperties, type Ref } from 'react';
import type { Tone } from '../../types';
import { useTheme } from '../../theme/ThemeProvider';
import type { JindTheme } from '../../theme/theme';

export interface StatusDotProps {
  tone: Tone;
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  style?: CSSProperties;
  ref?: Ref<HTMLDivElement>;
}

const sizeMap = { sm: 8, md: 10, lg: 12 } as const;

function getDotColor(tone: Tone, theme: JindTheme): string {
  const map: Record<Tone, string> = {
    info: theme.colors.teal[600],
    warning: theme.colors.amber[500],
    success: theme.colors.green[500],
    danger: theme.colors.red[500],
    accent: theme.colors.purple[500],
    brand: theme.colors.blue[500],
    primary: theme.colors.blue[500],
    neutral: theme.colors.gray[500],
  };
  return map[tone];
}

export function StatusDot(
  { tone, size = 'md', label, style, ref, ...rest }: StatusDotProps,
) {
  const theme = useTheme();
  const px = sizeMap[size];

  const wrapperStyle: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
    ...style,
  };

  const dotStyle: CSSProperties = {
    width: px,
    height: px,
    borderRadius: '50%',
    backgroundColor: getDotColor(tone, theme),
    flexShrink: 0,
  };

  return (
    <div
      ref={ref}
      style={wrapperStyle}
      data-testid="status-dot"
      aria-label={label ?? tone}
      {...rest}
    >
      <div style={dotStyle} data-testid="status-dot-indicator" aria-hidden="true" />
      {label && (
        <span
          style={{
            fontFamily: theme.typeVariants.caption.fontFamily,
            fontSize: theme.typeVariants.caption.fontSize,
            fontWeight: theme.typeVariants.caption.fontWeight,
            lineHeight: theme.typeVariants.caption.lineHeight,
            color: theme.semantic.text.primary,
          }}
        >
          {label}
        </span>
      )}
    </div>
  );
}
