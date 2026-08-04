import { useState, type CSSProperties, type ReactNode } from 'react';
import type { RadiusValue } from '../../types';
import { useTheme } from '../../theme/ThemeProvider';
import { transition, mergeStyles, resolveRadiusStyle, type PerCornerRadiusProps } from '../../utils/styles';
import type { PressEffect } from '../../hooks/usePressAnimation';

export interface ChipProps extends PerCornerRadiusProps {
  icon?: string;
  radius?: RadiusValue;
  selected?: boolean;
  disabled?: boolean;
  pressEffect?: PressEffect;
  onClick?: () => void;
  children: ReactNode;
  style?: CSSProperties;
}

export function Chip({
  icon,
  radius = 'sm',
  selected = false,
  disabled = false,
  pressEffect = 'scale',
  onClick,
  children,
  style,
  radiusTopLeft, radiusTopRight, radiusBottomRight, radiusBottomLeft,
}: ChipProps) {
  const theme = useTheme();
  const [active, setActive] = useState(false);
  const radiusStyle = resolveRadiusStyle(radius, { radiusTopLeft, radiusTopRight, radiusBottomRight, radiusBottomLeft });

  function getPressTransform(): string | undefined {
    if (disabled || !active || pressEffect === 'none') return undefined;
    switch (pressEffect) {
      case 'scale': return 'scale(0.97)';
      case 'shift': return 'translateY(1px)';
      default: return undefined;
    }
  }

  const textColor = selected
    ? theme.colors.blue[500]
    : theme.semantic.text.primary;

  const chipStyle: CSSProperties = mergeStyles(
    {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      height: 40,
      padding: '0 14px',
      ...radiusStyle,
      fontFamily: theme.typeVariants.control.fontFamily,
      fontSize: theme.typeVariants.control.fontSize,
      fontWeight: theme.typeVariants.control.fontWeight,
      lineHeight: theme.typeVariants.control.lineHeight,
      cursor: disabled ? 'default' : 'pointer',
      outline: 'revert',
      boxSizing: 'border-box',
      background: selected ? theme.colors.blue[50] : theme.semantic.surface.card,
      color: textColor,
      border: `1px solid ${selected ? theme.colors.blue[500] : theme.semantic.border.subtle}`,
      boxShadow: selected ? undefined : theme.shadow.xs,
      opacity: disabled ? 0.5 : 1,
      pointerEvents: disabled ? 'none' : undefined,
      transform: getPressTransform(),
      transition: transition('background-color', 'border-color', 'color', 'box-shadow', 'transform'),
    },
    style,
  );

  return (
    <button
      type="button"
      style={chipStyle}
      disabled={disabled}
      aria-pressed={selected}
      onMouseDown={() => { if (!disabled) setActive(true); }}
      onMouseUp={() => setActive(false)}
      onMouseLeave={() => setActive(false)}
      onClick={onClick}
    >
      {icon && (
        <i
          className={`iconoir-${icon}`}
          style={{ fontSize: 18, color: textColor }}
          aria-hidden="true"
        />
      )}
      {children}
    </button>
  );
}
