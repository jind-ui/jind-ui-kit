import { type CSSProperties, type ReactNode, type Ref } from 'react';
import type { Tone, RadiusValue } from '../../types';
import { useTheme } from '../../theme/ThemeProvider';
import { resolveRadiusStyle, type PerCornerRadiusProps } from '../../utils/styles';

export interface AlertProps extends PerCornerRadiusProps {
  ref?: Ref<HTMLDivElement>;
  tone?: Tone;
  radius?: RadiusValue;
  title?: string;
  children: ReactNode;
  icon?: string;
  onDismiss?: () => void;
  variant?: 'subtle' | 'solid';
  style?: CSSProperties;
}

function getToneColors(tone: Tone, theme: ReturnType<typeof useTheme>) {
  const { colors } = theme;
  const map: Record<Tone, { bg: string; text: string; border: string; solidBg: string; solidText: string }> = {
    neutral: { bg: colors.gray[50], text: colors.gray[700], border: colors.gray[300], solidBg: colors.gray[700], solidText: colors.gray[0] },
    primary: { bg: colors.blue[50], text: colors.blue[700], border: colors.blue[500], solidBg: colors.blue[600], solidText: colors.gray[0] },
    danger: { bg: colors.red[50], text: colors.red[600], border: colors.red[500], solidBg: colors.red[600], solidText: colors.gray[0] },
    success: { bg: colors.green[50], text: colors.green[500], border: colors.green[500], solidBg: colors.green[500], solidText: colors.gray[0] },
    warning: { bg: colors.amber[50], text: colors.amber[600], border: colors.amber[500], solidBg: colors.amber[500], solidText: colors.gray[0] },
    info: { bg: colors.teal[50], text: colors.teal[600], border: colors.teal[600], solidBg: colors.teal[600], solidText: colors.gray[0] },
    accent: { bg: colors.purple[50], text: colors.purple[500], border: colors.purple[500], solidBg: colors.purple[500], solidText: colors.gray[0] },
    brand: { bg: colors.blue[50], text: colors.blue[700], border: colors.blue[500], solidBg: colors.blue[600], solidText: colors.gray[0] },
  };
  return map[tone];
}

export function Alert({
  ref,
  tone = 'neutral',
  radius = 'md',
  title,
  children,
  icon,
  onDismiss,
  variant = 'subtle',
  style,
  radiusTopLeft, radiusTopRight, radiusBottomRight, radiusBottomLeft,
}: AlertProps) {
  const theme = useTheme();
  const toneColors = getToneColors(tone, theme);
  const isSubtle = variant === 'subtle';
  const radiusStyle = resolveRadiusStyle(radius, { radiusTopLeft, radiusTopRight, radiusBottomRight, radiusBottomLeft });

  const role = tone === 'danger' || tone === 'warning' ? 'alert' : 'status';

  const containerStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'flex-start',
    gap: theme.space[6],
    padding: `${theme.space[6]}px ${theme.space[7]}px`,
    backgroundColor: isSubtle ? toneColors.bg : toneColors.solidBg,
    borderLeft: isSubtle ? `4px solid ${toneColors.border}` : undefined,
    ...radiusStyle,
    fontFamily: theme.fontFamily.sans,
    boxSizing: 'border-box' as const,
    ...style,
  };

  const iconStyle: CSSProperties = {
    fontSize: 16,
    lineHeight: 1,
    flexShrink: 0,
    color: isSubtle ? toneColors.text : toneColors.solidText,
    paddingTop: 2,
  };

  const bodyStyle: CSSProperties = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: theme.space[4],
  };

  const titleStyle: CSSProperties = {
    fontSize: theme.fontSize[14],
    fontWeight: theme.fontWeight.bold,
    lineHeight: theme.lineHeight.normal,
    color: isSubtle ? toneColors.text : toneColors.solidText,
    margin: 0,
  };

  const descriptionStyle: CSSProperties = {
    fontSize: theme.fontSize[14],
    fontWeight: theme.fontWeight.regular,
    lineHeight: theme.lineHeight.normal,
    color: isSubtle ? toneColors.text : toneColors.solidText,
    opacity: isSubtle ? 1 : 0.9,
  };

  const dismissStyle: CSSProperties = {
    background: 'none',
    border: 'none',
    padding: theme.space[2],
    cursor: 'pointer',
    fontSize: 14,
    lineHeight: 1,
    color: isSubtle ? toneColors.text : toneColors.solidText,
    flexShrink: 0,
    opacity: 0.7,
  };

  return (
    <div ref={ref} role={role} aria-live={role === 'alert' ? 'assertive' : 'polite'} style={containerStyle}>
      {icon != null && <span style={iconStyle}>{icon}</span>}
      <div style={bodyStyle}>
        {title != null && <p style={titleStyle}>{title}</p>}
        <div style={descriptionStyle}>{children}</div>
      </div>
      {onDismiss != null && (
        <button
          type="button"
          onClick={onDismiss}
          style={dismissStyle}
          aria-label="Dismiss alert"
        >
          &#x2715;
        </button>
      )}
    </div>
  );
}
