import { type ElementType, type CSSProperties, type ReactNode, createContext, useContext } from 'react';
import type { RadiusValue } from '../../types';
import { resolveRadiusStyle, type PerCornerRadiusProps } from '../../utils/styles';
import { useTheme } from '../../theme/ThemeProvider';

export type CardVariant = 'elevated' | 'outline' | 'filled' | 'ghost';

interface CardContextValue {
  variant: CardVariant;
}

const CardContext = createContext<CardContextValue>({ variant: 'elevated' });

export interface CardOwnProps extends PerCornerRadiusProps {
  as?: ElementType;
  variant?: CardVariant;
  interactive?: boolean;
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

function CardRoot({
  as: Component = 'div',
  variant = 'elevated',
  interactive = false,
  padding,
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

  const hasSubComponents = !title && padding === undefined;
  const effectivePadding = padding ?? (hasSubComponents ? 0 : 20);

  const variantStyles: CSSProperties = (() => {
    switch (variant) {
      case 'elevated':
        return {
          background: theme.semantic.surface.card,
          border: `1px solid ${theme.semantic.border.default}`,
          boxShadow: theme.shadow.card,
        };
      case 'outline':
        return {
          background: theme.semantic.surface.card,
          border: `1px solid ${theme.semantic.border.default}`,
          boxShadow: 'none',
        };
      case 'filled':
        return {
          background: theme.semantic.surface.subtle,
          border: `1px solid transparent`,
          boxShadow: 'none',
        };
      case 'ghost':
        return {
          background: 'transparent',
          border: `1px solid transparent`,
          boxShadow: 'none',
        };
    }
  })();

  const cardStyle: CSSProperties = {
    ...variantStyles,
    ...radiusStyle,
    boxSizing: 'border-box',
    padding: effectivePadding,
    overflow: 'hidden',
    transition: interactive ? 'box-shadow 150ms ease, transform 150ms ease' : undefined,
    cursor: interactive ? 'pointer' : undefined,
    ...style,
  };

  const content = title ? (
    <>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {actions && <div>{actions}</div>}
      </CardHeader>
      <CardBody>{children}</CardBody>
    </>
  ) : children;

  return (
    <CardContext.Provider value={{ variant }}>
      <Component ref={ref} style={cardStyle} {...rest}>
        {content}
      </Component>
    </CardContext.Provider>
  );
}

// --- Sub-components ---

export interface CardHeaderProps {
  children?: ReactNode;
  style?: CSSProperties;
}

function CardHeader({ children, style }: CardHeaderProps) {
  const theme = useTheme();

  const headerStyle: CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 20px',
    ...style,
  };

  return <div style={headerStyle}>{children}</div>;
}

export interface CardTitleProps {
  children?: ReactNode;
  subtitle?: ReactNode;
  style?: CSSProperties;
}

function CardTitle({ children, subtitle, style }: CardTitleProps) {
  const theme = useTheme();

  return (
    <div style={{ flex: 1, ...style }}>
      <span style={{
        ...theme.typeVariants['card-title'],
        color: theme.semantic.text.primary,
        margin: 0,
        display: 'block',
      }}>
        {children}
      </span>
      {subtitle && (
        <span style={{
          fontSize: theme.fontSize[13],
          color: theme.semantic.text.muted,
          marginTop: 2,
          display: 'block',
        }}>
          {subtitle}
        </span>
      )}
    </div>
  );
}

export interface CardBodyProps {
  children?: ReactNode;
  style?: CSSProperties;
}

function CardBody({ children, style }: CardBodyProps) {
  const bodyStyle: CSSProperties = {
    padding: '0 20px 16px',
    ...style,
  };

  return <div style={bodyStyle}>{children}</div>;
}

export interface CardFooterProps {
  children?: ReactNode;
  justify?: 'start' | 'end' | 'center' | 'between';
  style?: CSSProperties;
}

function CardFooter({ children, justify = 'end', style }: CardFooterProps) {
  const theme = useTheme();

  const justifyMap = {
    start: 'flex-start',
    end: 'flex-end',
    center: 'center',
    between: 'space-between',
  } as const;

  const footerStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: justifyMap[justify],
    gap: 8,
    padding: '12px 20px',
    borderTop: `1px solid ${theme.semantic.border.subtle}`,
    ...style,
  };

  return <div style={footerStyle}>{children}</div>;
}

export interface CardMediaProps {
  src: string;
  alt?: string;
  height?: number | string;
  position?: 'top' | 'bottom';
  style?: CSSProperties;
}

function CardMedia({ src, alt = '', height = 200, position = 'top', style }: CardMediaProps) {
  const mediaStyle: CSSProperties = {
    width: '100%',
    height,
    objectFit: 'cover',
    display: 'block',
    ...style,
  };

  return <img src={src} alt={alt} style={mediaStyle} />;
}

// --- Compound export ---

export const Card = Object.assign(CardRoot, {
  Header: CardHeader,
  Title: CardTitle,
  Body: CardBody,
  Footer: CardFooter,
  Media: CardMedia,
});
