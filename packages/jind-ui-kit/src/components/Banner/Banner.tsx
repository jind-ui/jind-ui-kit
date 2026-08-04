import { type CSSProperties, type ReactNode, type Ref } from 'react';
import type { Tone, RadiusValue } from '../../types';
import { useTheme } from '../../theme/ThemeProvider';
import { resolveRadiusStyle, type PerCornerRadiusProps } from '../../utils/styles';

export interface BannerProps extends PerCornerRadiusProps {
  ref?: Ref<HTMLDivElement>;
  tone?: Tone;
  radius?: RadiusValue;
  children: ReactNode;
  icon?: string;
  action?: ReactNode;
  onDismiss?: () => void;
  position?: 'top' | 'bottom' | 'inline';
  style?: CSSProperties;
}

function getToneColors(tone: Tone, theme: ReturnType<typeof useTheme>) {
  const { colors } = theme;
  const map: Record<Tone, { bg: string; text: string; border: string }> = {
    neutral: { bg: colors.gray[50], text: colors.gray[700], border: colors.gray[200] },
    primary: { bg: colors.blue[50], text: colors.blue[700], border: colors.blue[200] },
    danger: { bg: colors.red[50], text: colors.red[500], border: colors.red[50] },
    success: { bg: colors.green[50], text: colors.green[500], border: colors.green[50] },
    warning: { bg: colors.amber[50], text: colors.amber[600], border: colors.amber[50] },
    info: { bg: colors.teal[50], text: colors.teal[600], border: colors.teal[50] },
    accent: { bg: colors.purple[50], text: colors.purple[500], border: colors.purple[50] },
    brand: { bg: colors.blue[50], text: colors.blue[500], border: colors.blue[200] },
  };
  return map[tone];
}

export function Banner({
  ref,
  tone = 'neutral',
  radius = 'md',
  children,
  icon,
  action,
  onDismiss,
  position = 'inline',
  style,
  radiusTopLeft, radiusTopRight, radiusBottomRight, radiusBottomLeft,
}: BannerProps) {
  const theme = useTheme();
  const toneColors = getToneColors(tone, theme);
  const radiusStyle = resolveRadiusStyle(radius, { radiusTopLeft, radiusTopRight, radiusBottomRight, radiusBottomLeft });

  const isFixed = position !== 'inline';

  const containerStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    padding: '12px 16px',
    backgroundColor: toneColors.bg,
    borderBottom: isFixed && position === 'top' ? `1px solid ${toneColors.border}` : undefined,
    borderTop: isFixed && position === 'bottom' ? `1px solid ${toneColors.border}` : undefined,
    border: !isFixed ? `1px solid ${toneColors.border}` : undefined,
    ...(!isFixed ? radiusStyle : {}),
    fontFamily: theme.fontFamily.sans,
    boxSizing: 'border-box' as const,
    ...(isFixed && {
      position: 'fixed' as const,
      left: 0,
      right: 0,
      zIndex: 1000,
      ...(position === 'top' ? { top: 0 } : { bottom: 0 }),
    }),
    ...style,
  };

  const iconStyle: CSSProperties = {
    fontSize: 16,
    lineHeight: 1,
    flexShrink: 0,
  };

  const bodyStyle: CSSProperties = {
    flex: 1,
    fontSize: theme.fontSize[14],
    fontWeight: theme.fontWeight.regular,
    lineHeight: theme.lineHeight.normal,
    color: toneColors.text,
  };

  const dismissStyle: CSSProperties = {
    background: 'none',
    border: 'none',
    padding: 4,
    cursor: 'pointer',
    fontSize: 14,
    lineHeight: 1,
    color: toneColors.text,
    flexShrink: 0,
    opacity: 0.7,
  };

  return (
    <div ref={ref} role="status" style={containerStyle}>
      {icon != null && <span style={iconStyle}>{icon}</span>}
      <div style={bodyStyle}>{children}</div>
      {action != null && <div style={{ flexShrink: 0 }}>{action}</div>}
      {onDismiss != null && (
        <button
          type="button"
          onClick={onDismiss}
          style={dismissStyle}
          aria-label="Dismiss banner"
        >
          &#x2715;
        </button>
      )}
    </div>
  );
}
