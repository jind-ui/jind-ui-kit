import {
  useState,
  type ComponentPropsWithoutRef,
  type CSSProperties,
  type Ref,
} from 'react';
import { useTheme } from '../../theme/ThemeProvider';
import { transition, mergeStyles } from '../../utils/styles';

export interface ToolbarButtonProps
  extends Omit<
    ComponentPropsWithoutRef<'button'>,
    'name' | 'style' | 'onClick'
  > {
  name: string;
  active?: boolean;
  disabled?: boolean;
  label?: string;
  accent?: string;
  style?: CSSProperties;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  ref?: Ref<HTMLButtonElement>;
}

export function ToolbarButton(
  {
    name,
    active = false,
    disabled = false,
    label,
    accent,
    style,
    onClick,
    ref,
    ...rest
  }: ToolbarButtonProps,
) {
  const theme = useTheme();
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [focused, setFocused] = useState(false);

  const transitionValue = transition('background-color', 'color', 'box-shadow');

  const activeColor = accent ?? theme.semantic.fill.primary;

  let iconColor = theme.semantic.icon.default;
  if (disabled) {
    iconColor = theme.semantic.icon.muted;
  } else if (active) {
    iconColor = activeColor;
  }

  let background = 'transparent';
  if (!disabled) {
    if (pressed) {
      background = theme.semantic.surface.pressed;
    } else if (hovered) {
      background = theme.colors.gray[100];
    }
  }

  let boxShadow: string | undefined;
  if (focused && !disabled) {
    boxShadow = theme.focusRing.primary;
  }

  const buttonStyle: CSSProperties = mergeStyles(
    {
      width: 32,
      height: 32,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      background,
      border: 'none',
      borderRadius: theme.radius.sm,
      padding: 0,
      cursor: disabled ? 'not-allowed' : 'pointer',
      outline: 'none',
      boxSizing: 'border-box',
      transition: transitionValue,
      boxShadow,
    },
    style,
  );

  const barStyle: CSSProperties = {
    position: 'absolute',
    bottom: 2,
    left: '50%',
    transform: 'translateX(-50%)',
    width: 16,
    height: 2,
    borderRadius: 1,
    backgroundColor: activeColor,
  };

  function handleMouseEnter() {
    if (!disabled) setHovered(true);
  }
  function handleMouseLeave() {
    setHovered(false);
    setPressed(false);
  }
  function handleMouseDown() {
    if (!disabled) setPressed(true);
  }
  function handleMouseUp() {
    setPressed(false);
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

  return (
    <button
      ref={ref}
      style={buttonStyle}
      disabled={disabled}
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
        style={{ fontSize: 18, color: iconColor }}
        aria-hidden="true"
      />
      {active && <span data-testid="toolbar-active-bar" style={barStyle} />}
    </button>
  );
}
