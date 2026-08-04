import {
  useState,
  type ComponentPropsWithoutRef,
  type CSSProperties,
  type ReactNode,
  type Ref,
} from 'react';
import { useTheme } from '../../theme/ThemeProvider';
import { transition, mergeStyles } from '../../utils/styles';
import type { PressEffect } from '../../hooks/usePressAnimation';

export interface TextButtonProps
  extends Omit<ComponentPropsWithoutRef<'button'>, 'children'> {
  variant: 'plain' | 'link' | 'dropdown' | 'sort';
  disabled?: boolean;
  pressEffect?: PressEffect;
  chevronSide?: 'left' | 'right';
  children: ReactNode;
  style?: CSSProperties;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  ref?: Ref<HTMLButtonElement>;
}

const variantIconMap: Record<string, string | null> = {
  plain: null,
  link: 'arrow-up-right',
  dropdown: 'nav-arrow-down',
  sort: 'data-transfer-both',
};

export function TextButton(
  {
    variant,
    disabled = false,
    pressEffect = 'scale',
    chevronSide = 'right',
    children,
    style,
    onClick,
    ref,
    ...rest
  }: TextButtonProps,
) {
  const theme = useTheme();
  const [hovered, setHovered] = useState(false);
  const [active, setActive] = useState(false);
  const [focused, setFocused] = useState(false);

  const transitionValue = transition('color', 'font-weight', 'transform');

  function getPressTransform(): string | undefined {
    if (disabled || !active || pressEffect === 'none') return undefined;
    switch (pressEffect) {
      case 'scale': return 'scale(0.97)';
      case 'shift': return 'translateY(1px)';
      default: return undefined;
    }
  }

  let color = theme.semantic.text.primary;
  let fontWeight = theme.fontWeight.regular;

  if (disabled) {
    color = theme.semantic.text.muted;
  } else if (active) {
    color = theme.semantic.text.secondary;
  } else if (hovered) {
    color = theme.colors.gray[700];
    fontWeight = theme.fontWeight.medium;
  }

  const buttonStyle: CSSProperties = mergeStyles(
    {
      background: 'none',
      border: 'none',
      padding: 0,
      cursor: disabled ? 'not-allowed' : 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      gap: 4,
      fontFamily: theme.fontFamily.sans,
      fontSize: 14,
      fontWeight,
      lineHeight: 1,
      color,
      outline: 'none',
      boxShadow: focused && !disabled ? theme.focusRing.primary : undefined,
      transition: transitionValue,
      transform: getPressTransform(),
    },
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
    onClick?.(e);
  }

  const iconName = variantIconMap[variant];

  const iconEl = iconName ? (
    <i
      className={`iconoir-${iconName}`}
      style={{
        fontSize: 14,
        ...(variant === 'sort'
          ? { transform: 'rotate(90deg)' }
          : undefined),
      }}
      aria-hidden="true"
    />
  ) : null;

  return (
    <button
      ref={ref}
      style={buttonStyle}
      disabled={disabled}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onClick={handleClick}
      {...rest}
    >
      {chevronSide === 'left' && iconEl}
      {children}
      {chevronSide === 'right' && iconEl}
    </button>
  );
}
