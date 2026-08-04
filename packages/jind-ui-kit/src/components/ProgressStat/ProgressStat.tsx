import { type CSSProperties } from 'react';
import { useTheme } from '../../theme/ThemeProvider';
import type { Tone } from '../../types';
import type { JindTheme } from '../../theme/theme';

export interface ProgressStatProps {
  value?: number;
  total?: number;
  caption?: string;
  tone?: Tone;
  style?: CSSProperties;
}

function getToneFillColor(tone: Tone, theme: JindTheme): string {
  switch (tone) {
    case 'brand':
    case 'primary':
      return theme.colors.blue[500];
    case 'info':
      return theme.colors.teal[600];
    case 'warning':
      return theme.colors.amber[500];
    case 'success':
      return theme.colors.green[500];
    case 'danger':
      return theme.colors.red[500];
    case 'accent':
      return theme.colors.purple[500];
    case 'neutral':
      return theme.colors.gray[500];
  }
}

export function ProgressStat({
  value = 0,
  total = 100,
  caption = 'in total',
  tone = 'brand',
  style,
}: ProgressStatProps) {
  const theme = useTheme();

  const fillPercent = Math.min((value / total) * 100, 100);

  const containerStyle: CSSProperties = {
    ...style,
  };

  const trackStyle: CSSProperties = {
    height: 8,
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.gray[200],
    overflow: 'hidden',
    width: '100%',
  };

  const fillStyle: CSSProperties = {
    height: 8,
    borderRadius: theme.radius.full,
    backgroundColor: getToneFillColor(tone, theme),
    width: `${fillPercent}%`,
    transition: 'width 300ms ease',
  };

  const labelRowStyle: CSSProperties = {
    marginTop: 8,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  const valueTextStyle: CSSProperties = {
    fontFamily: theme.typeVariants.body.fontFamily,
    fontSize: theme.typeVariants.body.fontSize,
    fontWeight: 500,
    lineHeight: theme.typeVariants.body.lineHeight,
    color: theme.semantic.text.primary,
  };

  const captionTextStyle: CSSProperties = {
    fontFamily: theme.typeVariants.caption.fontFamily,
    fontSize: theme.typeVariants.caption.fontSize,
    fontWeight: theme.typeVariants.caption.fontWeight,
    lineHeight: theme.typeVariants.caption.lineHeight,
    color: theme.semantic.text.secondary,
  };

  return (
    <div
      style={containerStyle}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={total}
      aria-label={caption}
    >
      <div style={trackStyle}>
        <div style={fillStyle} data-testid="progress-fill" />
      </div>
      <div style={labelRowStyle}>
        <span style={valueTextStyle}>
          {value}/{total}
        </span>
        <span style={captionTextStyle}>{caption}</span>
      </div>
    </div>
  );
}
