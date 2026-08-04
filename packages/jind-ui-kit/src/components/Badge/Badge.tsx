import type { CSSProperties, ReactNode } from 'react';
import { useTheme } from '../../theme/ThemeProvider';
import type { Tone, RadiusValue } from '../../types';
import type { JindTheme } from '../../theme/theme';
import { resolveRadiusStyle, type PerCornerRadiusProps } from '../../utils/styles';

export interface BadgeProps extends PerCornerRadiusProps {
  tone?: Tone;
  radius?: RadiusValue;
  dot?: boolean;
  onDismiss?: () => void;
  children: ReactNode;
  style?: CSSProperties;
}

function getToneColors(tone: Tone, theme: JindTheme) {
  switch (tone) {
    case 'info':
      return {
        bg: theme.colors.teal[50],
        fg: theme.colors.teal[600],
        dot: theme.colors.teal[600],
      };
    case 'warning':
      return {
        bg: theme.colors.amber[50],
        fg: theme.colors.amber[600],
        dot: theme.colors.amber[500],
      };
    case 'success':
      return {
        bg: theme.colors.green[50],
        fg: theme.colors.green[500],
        dot: theme.colors.green[500],
      };
    case 'danger':
      return {
        bg: theme.colors.red[50],
        fg: theme.colors.red[600],
        dot: theme.colors.red[500],
      };
    case 'accent':
      return {
        bg: theme.colors.purple[50],
        fg: theme.colors.purple[500],
        dot: theme.colors.purple[500],
      };
    case 'brand':
    case 'primary':
      return {
        bg: theme.colors.blue[50],
        fg: theme.colors.blue[600],
        dot: theme.colors.blue[500],
      };
    case 'neutral':
    default:
      return {
        bg: theme.semantic.surface.quiet,
        fg: theme.colors.gray[800],
        dot: theme.colors.gray[500],
      };
  }
}

export function Badge({
  tone = 'info',
  radius = 'xs',
  dot,
  onDismiss,
  children,
  style,
  radiusTopLeft, radiusTopRight, radiusBottomRight, radiusBottomLeft,
}: BadgeProps) {
  const theme = useTheme();
  const toneColors = getToneColors(tone, theme);
  const radiusStyle = resolveRadiusStyle(radius, { radiusTopLeft, radiusTopRight, radiusBottomRight, radiusBottomLeft });

  const badgeStyle: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    height: 26,
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 0,
    paddingBottom: 0,
    ...radiusStyle,
    backgroundColor: toneColors.bg,
    color: toneColors.fg,
    fontFamily: theme.typeVariants.caption.fontFamily,
    fontSize: theme.typeVariants.caption.fontSize,
    fontWeight: theme.typeVariants.caption.fontWeight,
    lineHeight: theme.typeVariants.caption.lineHeight,
    gap: 8,
    boxSizing: 'border-box',
    ...style,
  };

  const dotStyle: CSSProperties = {
    width: 10,
    height: 10,
    borderRadius: '50%',
    backgroundColor: toneColors.dot,
    flexShrink: 0,
  };

  const dismissStyle: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 13,
    opacity: 0.65,
    cursor: 'pointer',
    background: 'none',
    border: 'none',
    padding: 0,
    margin: 0,
    color: 'inherit',
    lineHeight: 1,
  };

  return (
    <span style={badgeStyle} data-testid="badge">
      {dot && <span data-testid="badge-dot" style={dotStyle} />}
      {children}
      {onDismiss && (
        <button
          type="button"
          data-testid="badge-dismiss"
          style={dismissStyle}
          onClick={onDismiss}
          aria-label="Dismiss"
        >
          {'✕'}
        </button>
      )}
    </span>
  );
}
