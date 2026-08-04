import {
  useState,
  useEffect,
  type ElementType,
  type CSSProperties,
  type ReactNode,
} from 'react';
import type { RadiusValue } from '../../types';
import { useTheme } from '../../theme/ThemeProvider';
import { transition, mergeStyles, resolveRadiusStyle, type PerCornerRadiusProps } from '../../utils/styles';
import type { PressEffect } from '../../hooks/usePressAnimation';

export type IconAnimation = 'shift-right' | 'pulse' | 'spin' | 'bounce' | 'none';

const KEYFRAMES_ID = 'jind-icon-animations';
const KEYFRAMES_CSS = `
@keyframes jind-icon-shift-right {
  0%, 100% { transform: translateX(0); }
  50% { transform: translateX(3px); }
}
@keyframes jind-icon-pulse {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.15); opacity: 0.8; }
}
@keyframes jind-icon-spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
@keyframes jind-icon-bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-2px); }
}
`;

function ensureKeyframes() {
  if (typeof document === 'undefined') return;
  if (document.getElementById(KEYFRAMES_ID)) return;
  const style = document.createElement('style');
  style.id = KEYFRAMES_ID;
  style.textContent = KEYFRAMES_CSS;
  document.head.appendChild(style);
}

export interface ButtonOwnProps extends PerCornerRadiusProps {
  variant?: 'primary' | 'secondary';
  size?: 'md' | 'sm';
  radius?: RadiusValue;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  iconActive?: boolean;
  iconAnimation?: IconAnimation;
  disabled?: boolean;
  fullWidth?: boolean;
  pressEffect?: PressEffect;
  as?: ElementType;
  children?: ReactNode;
  style?: CSSProperties;
  ref?: React.Ref<HTMLElement>;
}

export type ButtonProps<E extends ElementType = 'button'> = ButtonOwnProps &
  Omit<React.ComponentPropsWithoutRef<E>, keyof ButtonOwnProps>;

const sizeConfig = {
  md: { height: 44, paddingX: 22, iconSize: 20 },
  sm: { height: 32, paddingX: 14, iconSize: 16 },
} as const;

export function Button({
  as: Component = 'button',
  variant = 'primary',
  size = 'md',
  radius = 'sm',
  iconLeft,
  iconRight,
  iconActive,
  iconAnimation = 'none',
  disabled = false,
  fullWidth = false,
  pressEffect = 'scale',
  style,
  children,
  onClick,
  ref,
  radiusTopLeft, radiusTopRight, radiusBottomRight, radiusBottomLeft,
  ...rest
}: ButtonProps) {
  const theme = useTheme();
  const [hovered, setHovered] = useState(false);
  const [active, setActive] = useState(false);
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    if (iconAnimation !== 'none') ensureKeyframes();
  }, [iconAnimation]);

  const config = sizeConfig[size];
  const hasChildren = children != null && children !== '';
  const iconOnly = !hasChildren && (iconLeft != null || iconRight != null);

  const transitionValue = transition(
    'background-color',
    'border-color',
    'color',
    'box-shadow',
    'transform',
  );

  function getPressTransform(): string | undefined {
    if (disabled || !active || pressEffect === 'none') return undefined;
    switch (pressEffect) {
      case 'scale': return 'scale(0.97)';
      case 'shift': return 'translateY(1px)';
      default: return undefined;
    }
  }

  function getVariantStyles(): CSSProperties {
    if (variant === 'primary') {
      let background = theme.semantic.fill.primary;
      if (disabled) {
        background = theme.semantic.fill.disabled;
      } else if (active) {
        background = theme.semantic.fill.primaryActive;
      } else if (hovered) {
        background = theme.semantic.fill.primaryHover;
      }

      return {
        background,
        color: theme.semantic.text.inverse,
        border: '1px solid transparent',
      };
    }

    let background = theme.semantic.surface.card;
    if (!disabled) {
      if (active) {
        background = theme.semantic.surface.pressed;
      } else if (hovered) {
        background = theme.semantic.surface.subtle;
      }
    }

    return {
      background,
      color: theme.semantic.text.primary,
      border: `1px solid ${theme.semantic.border.subtle}`,
      boxShadow: theme.shadow.xs,
      ...(disabled ? { opacity: 0.5 } : {}),
    };
  }

  const variantStyles = getVariantStyles();

  let boxShadow = variantStyles.boxShadow as string | undefined;
  if (focused && !disabled) {
    boxShadow = boxShadow
      ? `${boxShadow}, ${theme.focusRing.primary}`
      : theme.focusRing.primary;
  }

  const pressTransform = getPressTransform();
  const glowShadow = active && !disabled && pressEffect === 'glow'
    ? `0 0 0 3px ${theme.colors.blue[200]}40`
    : undefined;

  const radiusStyle = resolveRadiusStyle(radius, { radiusTopLeft, radiusTopRight, radiusBottomRight, radiusBottomLeft });

  const buttonStyle: CSSProperties = mergeStyles(
    {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: hasChildren ? 10 : 0,
      height: config.height,
      padding: iconOnly ? 0 : `0 ${config.paddingX}px`,
      width: iconOnly ? config.height : fullWidth ? '100%' : undefined,
      ...radiusStyle,
      fontFamily: theme.typeVariants.control.fontFamily,
      fontSize: theme.typeVariants.control.fontSize,
      fontWeight: theme.typeVariants.control.fontWeight,
      lineHeight: theme.typeVariants.control.lineHeight,
      cursor: disabled ? 'not-allowed' : 'pointer',
      outline: 'none',
      textDecoration: 'none',
      boxSizing: 'border-box',
      transition: transitionValue,
      transform: pressTransform,
    },
    variantStyles,
    { boxShadow: glowShadow ? `${boxShadow ?? ''} ${glowShadow}`.trim() : boxShadow },
    style,
  );

  function handleMouseEnter() {
    if (!disabled) setHovered(true);
  }
  function handleMouseLeave() {
    setHovered(false);
    setActive(false);
  }
  function handleMouseDown() {
    if (!disabled) setActive(true);
  }
  function handleMouseUp() {
    setActive(false);
  }
  function handleFocus() {
    setFocused(true);
  }
  function handleBlur() {
    setFocused(false);
  }
  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    if (disabled) return;
    (onClick as ((e: React.MouseEvent) => void) | undefined)?.(e);
  }

  function getIconAnimationStyle(): CSSProperties {
    if (iconAnimation === 'none' || disabled) return {};
    return {
      animation: `jind-icon-${iconAnimation} 1.5s ease-in-out infinite`,
    };
  }

  function renderIcon(icon: ReactNode, position: 'left' | 'right') {
    if (icon == null) return null;

    const isActiveRight = position === 'right' && iconActive != null;
    const animStyle = getIconAnimationStyle();

    const wrapperStyle: CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: config.iconSize,
      flexShrink: 0,
      transition: `transform ${theme.duration.base}ms ${theme.easing.standard}`,
      ...(isActiveRight ? { transform: iconActive ? 'rotate(180deg)' : 'rotate(0deg)' } : {}),
      ...animStyle,
    };

    if (typeof icon === 'string') {
      return (
        <span style={wrapperStyle}>
          <i
            className={`iconoir-${icon}`}
            style={{ fontSize: config.iconSize }}
            aria-hidden="true"
          />
        </span>
      );
    }

    return <span style={wrapperStyle} aria-hidden="true">{icon}</span>;
  }

  return (
    <Component
      ref={ref}
      style={buttonStyle}
      disabled={Component === 'button' ? disabled : undefined}
      aria-disabled={disabled || undefined}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onClick={handleClick}
      {...rest}
    >
      {renderIcon(iconLeft, 'left')}
      {children}
      {renderIcon(iconRight, 'right')}
    </Component>
  );
}
