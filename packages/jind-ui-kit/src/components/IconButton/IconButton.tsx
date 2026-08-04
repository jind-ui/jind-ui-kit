import {
  useState,
  type ElementType,
  type CSSProperties,
  type Ref,
} from 'react';
import type { RadiusValue } from '../../types';
import { useTheme } from '../../theme/ThemeProvider';
import { transition, mergeStyles, resolveRadiusStyle, type PerCornerRadiusProps } from '../../utils/styles';
import type { PressEffect } from '../../hooks/usePressAnimation';

export interface IconButtonOwnProps extends PerCornerRadiusProps {
  name: string;
  variant?: 'tile' | 'ghost';
  tone?: 'default' | 'danger';
  size?: 'lg' | 'md' | 'sm';
  disabled?: boolean;
  label?: string;
  pressEffect?: PressEffect;
  radius?: RadiusValue;
  as?: ElementType;
  style?: CSSProperties;
  ref?: Ref<HTMLElement>;
}

export type IconButtonProps<E extends ElementType = 'button'> =
  IconButtonOwnProps &
    Omit<React.ComponentPropsWithoutRef<E>, keyof IconButtonOwnProps>;

const sizeConfig = {
  lg: { box: 44, icon: 24, radius: 8 },
  md: { box: 40, icon: 20, radius: 5 },
  sm: { box: 28, icon: 18, radius: 5 },
} as const;

export function IconButton({
  as: Component = 'button',
  name,
  variant = 'tile',
  tone = 'default',
  size = 'md',
  disabled = false,
  pressEffect = 'scale',
  radius,
  radiusTopLeft, radiusTopRight, radiusBottomRight, radiusBottomLeft,
  label,
  style,
  ref,
  onClick,
  ...rest
}: IconButtonProps) {
  const theme = useTheme();
  const [hovered, setHovered] = useState(false);
  const [active, setActive] = useState(false);
  const [focused, setFocused] = useState(false);

  const config = sizeConfig[size];
  const radiusStyle = resolveRadiusStyle(radius, { radiusTopLeft, radiusTopRight, radiusBottomRight, radiusBottomLeft });
  const hasCustomRadius = radius !== undefined || radiusTopLeft !== undefined || radiusTopRight !== undefined || radiusBottomRight !== undefined || radiusBottomLeft !== undefined;

  const transitionValue = transition(
    'background-color',
    'border-color',
    'box-shadow',
    'color',
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

  function getIconColor(): string {
    if (disabled) {
      return tone === 'danger'
        ? theme.semantic.icon.danger
        : theme.semantic.icon.default;
    }
    if (tone === 'danger') {
      return hovered || active
        ? theme.colors.red[600]
        : theme.semantic.icon.danger;
    }
    return theme.semantic.icon.default;
  }

  function getVariantStyles(): CSSProperties {
    if (variant === 'tile') {
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
        border: `1px solid ${theme.semantic.border.subtle}`,
        boxShadow: theme.shadow.sm,
      };
    }

    // ghost
    let background = 'transparent';
    if (!disabled) {
      if (active) {
        background = theme.semantic.surface.pressed;
      } else if (hovered) {
        background = theme.colors.gray[100];
      }
    }

    return {
      background,
      border: '1px solid transparent',
    };
  }

  const variantStyles = getVariantStyles();
  const iconColor = getIconColor();

  let boxShadow = variantStyles.boxShadow as string | undefined;
  if (focused && !disabled) {
    boxShadow = boxShadow
      ? `${boxShadow}, ${theme.focusRing.primary}`
      : theme.focusRing.primary;
  }

  const buttonStyle: CSSProperties = mergeStyles(
    {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 0,
      width: config.box,
      height: config.box,
      ...(hasCustomRadius ? radiusStyle : { borderRadius: config.radius }),
      cursor: disabled ? 'not-allowed' : 'pointer',
      outline: 'none',
      boxSizing: 'border-box',
      transition: transitionValue,
      opacity: disabled ? 0.5 : 1,
      transform: getPressTransform(),
    },
    variantStyles,
    { boxShadow },
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

  return (
    <Component
      ref={ref}
      style={buttonStyle}
      disabled={Component === 'button' ? disabled : undefined}
      aria-disabled={disabled || undefined}
      aria-label={label}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onClick={handleClick}
      {...rest}
    >
      <i
        className={`iconoir-${name}`}
        style={{ fontSize: config.icon, color: iconColor }}
        aria-hidden="true"
      />
    </Component>
  );
}
