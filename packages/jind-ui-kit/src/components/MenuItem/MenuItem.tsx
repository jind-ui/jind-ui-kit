import { useState, type CSSProperties, type ReactNode, type Ref } from 'react';
import { useTheme } from '../../theme/ThemeProvider';
import { transition, mergeStyles } from '../../utils/styles';

export interface MenuItemProps {
  icon?: string;
  swatch?: string;
  selected?: boolean;
  hovered?: boolean;
  disabled?: boolean;
  trailing?: ReactNode;
  onClick?: () => void;
  children: ReactNode;
  style?: CSSProperties;
  ref?: Ref<HTMLDivElement>;
}

export function MenuItem({
  icon,
  swatch,
  selected = false,
  hovered: hoveredProp,
  disabled = false,
  trailing,
  onClick,
  children,
  style,
  ref,
}: MenuItemProps) {
  const theme = useTheme();
  const [hoveredState, setHoveredState] = useState(false);

  const isHovered = hoveredProp ?? hoveredState;

  const containerStyle: CSSProperties = mergeStyles(
    {
      display: 'flex',
      alignItems: 'center',
      height: 48,
      paddingLeft: 14,
      paddingRight: 14,
      gap: 12,
      fontFamily: theme.fontFamily.sans,
      fontSize: 16,
      fontWeight: theme.fontWeight.medium,
      color: theme.semantic.text.primary,
      background: isHovered && !disabled ? theme.semantic.surface.hover : 'transparent',
      cursor: disabled ? 'default' : 'pointer',
      opacity: disabled ? 0.5 : 1,
      pointerEvents: disabled ? 'none' : undefined,
      boxSizing: 'border-box',
      transition: transition('background-color'),
    },
    style,
  );

  const swatchStyle: CSSProperties = {
    width: 26,
    height: 26,
    borderRadius: theme.radius.full,
    backgroundColor: swatch,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  };

  const dotStyle: CSSProperties = {
    width: 10,
    height: 10,
    borderRadius: theme.radius.full,
    backgroundColor: '#ffffff',
  };

  const labelStyle: CSSProperties = {
    flex: 1,
    minWidth: 0,
  };

  const trailingStyle: CSSProperties = {
    flexShrink: 0,
    display: 'flex',
    alignItems: 'center',
  };

  function handleMouseEnter() {
    if (!disabled) setHoveredState(true);
  }

  function handleMouseLeave() {
    setHoveredState(false);
  }

  function handleClick() {
    if (!disabled) onClick?.();
  }

  return (
    <div
      ref={ref}
      style={containerStyle}
      role="menuitem"
      aria-disabled={disabled || undefined}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      {icon && (
        <i
          className={`iconoir-${icon}`}
          style={{ fontSize: 20, color: theme.semantic.icon.default, flexShrink: 0 }}
          aria-hidden="true"
        />
      )}
      {swatch && (
        <div style={swatchStyle}>
          <div style={dotStyle} />
        </div>
      )}
      <span style={labelStyle}>{children}</span>
      {trailing && <span style={trailingStyle}>{trailing}</span>}
      {selected && (
        <span style={trailingStyle} aria-label="Selected">
          &#10003;
        </span>
      )}
    </div>
  );
}
