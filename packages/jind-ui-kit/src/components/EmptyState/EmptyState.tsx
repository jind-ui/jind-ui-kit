import type { CSSProperties, ReactNode, Ref } from 'react';
import type { RadiusValue } from '../../types';
import { useTheme } from '../../theme/ThemeProvider';
import { mergeStyles, resolveRadiusStyle, type PerCornerRadiusProps } from '../../utils/styles';

export interface EmptyStateProps extends PerCornerRadiusProps {
  title: string;
  description?: string;
  icon?: string;
  action?: ReactNode;
  variant?: 'subtle' | 'card';
  radius?: RadiusValue;
  style?: CSSProperties;
  ref?: Ref<HTMLDivElement>;
}

export function EmptyState({
  title,
  description,
  icon,
  action,
  variant = 'subtle',
  radius = 'lg',
  radiusTopLeft, radiusTopRight, radiusBottomRight, radiusBottomLeft,
  style,
  ref,
}: EmptyStateProps) {
  const theme = useTheme();
  const radiusStyle = resolveRadiusStyle(radius, { radiusTopLeft, radiusTopRight, radiusBottomRight, radiusBottomLeft });

  const containerStyle: CSSProperties = mergeStyles(
    {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      boxSizing: 'border-box',
      ...(variant === 'card' && {
        background: theme.semantic.surface.subtle,
        border: `1px dashed ${theme.semantic.border.subtle}`,
        ...radiusStyle,
        paddingTop: theme.space[12],
        paddingBottom: theme.space[12],
        paddingLeft: theme.space[9],
        paddingRight: theme.space[9],
      }),
    },
    style,
  );

  const iconStyle: CSSProperties = {
    fontSize: 40,
    color: theme.semantic.text.muted,
    marginBottom: theme.space[7],
    lineHeight: 1,
  };

  const titleStyle: CSSProperties = {
    fontFamily: theme.fontFamily.sans,
    fontSize: theme.fontSize[16],
    fontWeight: theme.fontWeight.semibold,
    color: theme.semantic.text.primary,
    marginBottom: theme.space[3],
    lineHeight: 1.3,
  };

  const descriptionStyle: CSSProperties = {
    fontFamily: theme.fontFamily.sans,
    fontSize: theme.fontSize[14],
    fontWeight: theme.fontWeight.regular,
    color: theme.semantic.text.secondary,
    maxWidth: 320,
    lineHeight: theme.lineHeight.normal,
  };

  const actionStyle: CSSProperties = {
    marginTop: theme.space[7],
  };

  return (
    <div ref={ref} style={containerStyle}>
      {icon && <div style={iconStyle} aria-hidden="true">{icon}</div>}
      <div style={titleStyle}>{title}</div>
      {description && <div style={descriptionStyle}>{description}</div>}
      {action && <div style={actionStyle}>{action}</div>}
    </div>
  );
}
