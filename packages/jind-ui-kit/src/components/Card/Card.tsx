import { type ElementType, type CSSProperties, type ReactNode } from 'react';
import type { RadiusValue } from '../../types';
import { resolveRadiusStyle, type PerCornerRadiusProps } from '../../utils/styles';
import { useTheme } from '../../theme/ThemeProvider';

export interface CardOwnProps extends PerCornerRadiusProps {
  as?: ElementType;
  padding?: number;
  radius?: RadiusValue;
  title?: string;
  actions?: ReactNode;
  children?: ReactNode;
  style?: CSSProperties;
  ref?: React.Ref<HTMLElement>;
}

export type CardProps<E extends ElementType = 'div'> = CardOwnProps &
  Omit<React.ComponentPropsWithoutRef<E>, keyof CardOwnProps>;

export function Card({
  as: Component = 'div',
  padding = 20,
  radius = 'md',
  title,
  actions,
  children,
  style,
  ref,
  radiusTopLeft, radiusTopRight, radiusBottomRight, radiusBottomLeft,
  ...rest
}: CardProps) {
  const theme = useTheme();
  const radiusStyle = resolveRadiusStyle(radius, { radiusTopLeft, radiusTopRight, radiusBottomRight, radiusBottomLeft });

  const cardStyle: CSSProperties = {
    background: theme.semantic.surface.card,
    ...radiusStyle,
    boxShadow: theme.shadow.card,
    boxSizing: 'border-box',
    padding,
    ...style,
  };

  const headerStyle: CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  };

  const titleStyle: CSSProperties = {
    ...theme.typeVariants['card-title'],
    color: theme.semantic.text.primary,
    margin: 0,
  };

  return (
    <Component ref={ref} style={cardStyle} {...rest}>
      {title && (
        <div style={headerStyle}>
          <span style={titleStyle}>{title}</span>
          {actions && <div>{actions}</div>}
        </div>
      )}
      {children}
    </Component>
  );
}
