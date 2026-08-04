import { type CSSProperties, type ReactNode, type Ref } from 'react';
import type { Tone, ToastDismissDetails, RadiusValue } from '../../types';
import { useTheme } from '../../theme/ThemeProvider';
import { resolveRadiusStyle, type PerCornerRadiusProps } from '../../utils/styles';

export interface ToastProps extends PerCornerRadiusProps {
  tone: Tone;
  radius?: RadiusValue;
  icon?: string;
  onDismiss?: (details?: ToastDismissDetails) => void;
  children: ReactNode;
  style?: CSSProperties;
  ref?: Ref<HTMLDivElement>;
}

function getToneColors(tone: Tone, theme: ReturnType<typeof useTheme>) {
  const { colors } = theme;
  const map: Record<Tone, { bg: string; text: string; border?: string }> = {
    neutral: { bg: colors.gray[50], text: colors.gray[700], border: colors.gray[200] },
    primary: { bg: colors.blue[50], text: colors.blue[700], border: colors.blue[200] },
    danger: { bg: colors.red[50], text: colors.red[500] },
    success: { bg: colors.green[50], text: colors.green[500] },
    warning: { bg: colors.amber[50], text: colors.amber[600] },
    info: { bg: colors.teal[50], text: colors.teal[600] },
    accent: { bg: colors.purple[50], text: colors.purple[500] },
    brand: { bg: colors.blue[50], text: colors.blue[500] },
  };
  return map[tone];
}

export function Toast(
  { tone, radius = 'md', icon, onDismiss, children, style, ref, radiusTopLeft, radiusTopRight, radiusBottomRight, radiusBottomLeft, ...rest }: ToastProps,
) {
  const theme = useTheme();
  const toneColors = getToneColors(tone, theme);
  const radiusStyle = resolveRadiusStyle(radius, { radiusTopLeft, radiusTopRight, radiusBottomRight, radiusBottomLeft });

  const containerStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    minHeight: 40,
    ...radiusStyle,
    boxShadow: theme.shadow.card,
    padding: '14px 16px',
    background: toneColors.bg,
    color: toneColors.text,
    ...(toneColors.border && {
      border: `1px solid ${toneColors.border}`,
    }),
    boxSizing: 'border-box' as const,
    ...style,
  };

  const iconStyle: CSSProperties = {
    fontSize: 16,
    lineHeight: 1,
    flexShrink: 0,
  };

  const bodyStyle: CSSProperties = {
    flex: 1,
    fontFamily: theme.fontFamily.sans,
    fontSize: theme.fontSize[14],
    fontWeight: theme.fontWeight.regular,
    lineHeight: theme.lineHeight.normal,
    color: theme.semantic.text.primary,
  };

  const dismissStyle: CSSProperties = {
    background: 'none',
    border: 'none',
    padding: 0,
    cursor: 'pointer',
    fontSize: 16,
    lineHeight: 1,
    color: toneColors.text,
    flexShrink: 0,
  };

  return (
    <div ref={ref} role="status" aria-live="polite" style={containerStyle} {...rest}>
      {icon && <span style={iconStyle}>{icon}</span>}
      <div style={bodyStyle}>{children}</div>
      {onDismiss && (
        <button
          type="button"
          onClick={() => onDismiss?.({ reason: 'close-button' })}
          style={dismissStyle}
          aria-label="Dismiss"
        >
          &#x2715;
        </button>
      )}
    </div>
  );
}
