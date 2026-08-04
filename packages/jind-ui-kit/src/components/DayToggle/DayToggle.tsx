import { type CSSProperties, type ReactNode } from 'react';
import { useTheme } from '../../theme/ThemeProvider';

export interface DayToggleProps {
  selected?: boolean;
  disabled?: boolean;
  children: ReactNode;
  onClick?: () => void;
  style?: CSSProperties;
}

export function DayToggle({
  selected = false,
  disabled = false,
  children,
  onClick,
  style,
}: DayToggleProps) {
  const theme = useTheme();

  const buttonStyle: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 56,
    height: theme.controlHeight.md,
    padding: '0 14px',
    borderRadius: theme.radius.sm,
    border: selected ? 'none' : `1px solid ${theme.semantic.border.subtle}`,
    background: selected
      ? theme.semantic.fill.primary
      : theme.semantic.surface.subtle,
    color: selected
      ? theme.semantic.text.inverse
      : theme.semantic.text.primary,
    fontFamily: theme.typeVariants.control.fontFamily,
    fontSize: theme.typeVariants.control.fontSize,
    fontWeight: theme.typeVariants.control.fontWeight,
    lineHeight: theme.typeVariants.control.lineHeight,
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
    transition: `background-color ${theme.duration.fast}ms ${theme.easing.standard}, color ${theme.duration.fast}ms ${theme.easing.standard}, border-color ${theme.duration.fast}ms ${theme.easing.standard}`,
    userSelect: 'none',
    outline: 'none',
    boxSizing: 'border-box',
    ...style,
  };

  return (
    <button
      data-testid="day-toggle"
      type="button"
      aria-pressed={selected}
      disabled={disabled}
      onClick={disabled ? undefined : onClick}
      style={buttonStyle}
    >
      {children}
    </button>
  );
}
