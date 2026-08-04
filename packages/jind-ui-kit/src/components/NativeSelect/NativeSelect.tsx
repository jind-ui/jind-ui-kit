import { useState, useId, type CSSProperties } from 'react';
import type { RadiusValue } from '../../types';
import { useTheme } from '../../theme/ThemeProvider';
import { useControllableState } from '../../hooks/useControllableState';
import { transition, resolveRadiusStyle, type PerCornerRadiusProps } from '../../utils/styles';

export interface NativeSelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface NativeSelectProps extends PerCornerRadiusProps {
  options: NativeSelectOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  error?: string;
  fullWidth?: boolean;
  radius?: RadiusValue;
  style?: CSSProperties;
  ref?: React.Ref<HTMLDivElement>;
}

export function NativeSelect({
  options,
  value,
  defaultValue,
  onChange,
  placeholder,
  disabled = false,
  size = 'md',
  label,
  error,
  fullWidth = false,
  radius = 'md',
  radiusTopLeft, radiusTopRight, radiusBottomRight, radiusBottomLeft,
  style,
  ref,
}: NativeSelectProps) {
  const theme = useTheme();
  const [val, setVal] = useControllableState(value, defaultValue ?? '', onChange);
  const [focused, setFocused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const autoId = useId();
  const selectId = `${autoId}-select`;

  const height = theme.controlHeight[size];
  const radiusStyle = resolveRadiusStyle(radius, { radiusTopLeft, radiusTopRight, radiusBottomRight, radiusBottomLeft });

  // Build chevron SVG data URI using the icon.default color
  const chevronColor = encodeURIComponent(theme.semantic.icon.default);
  const chevronSvg = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath d='M2.5 4.5L6 8L9.5 4.5' stroke='${chevronColor}' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round' fill='none'/%3E%3C/svg%3E")`;

  const isPlaceholder = val === '' && placeholder;

  const wrapperStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.space[4],
    width: fullWidth ? '100%' : undefined,
    ...style,
  };

  const labelStyle: CSSProperties = {
    fontFamily: theme.fontFamily.sans,
    fontSize: theme.fontSize[14],
    fontWeight: theme.fontWeight.medium,
    color: theme.semantic.text.primary,
  };

  const selectStyle: CSSProperties = {
    display: 'block',
    width: fullWidth ? '100%' : undefined,
    height,
    padding: `0 ${theme.controlPadding.field + 20}px 0 ${theme.controlPadding.field}px`,
    ...radiusStyle,
    background: disabled
      ? theme.semantic.surface.subtle
      : theme.semantic.surface.card,
    border: error
      ? `2px solid ${theme.colors.red[500]}`
      : focused
        ? `2px solid ${theme.semantic.border.focus}`
        : `1px solid ${hovered ? theme.semantic.border.strong : theme.semantic.border.default}`,
    boxShadow: error
      ? theme.focusRing.danger
      : focused
        ? theme.focusRing.primary
        : theme.shadow.xs,
    color: isPlaceholder
      ? theme.semantic.text.muted
      : disabled
        ? theme.semantic.text.muted
        : theme.semantic.text.primary,
    fontFamily: theme.fontFamily.sans,
    fontSize: theme.fontSize[14],
    fontWeight: theme.fontWeight.regular,
    lineHeight: theme.lineHeight.normal,
    appearance: 'none' as const,
    WebkitAppearance: 'none' as const,
    backgroundImage: chevronSvg,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: `right ${theme.controlPadding.field}px center`,
    backgroundSize: '12px 12px',
    transition: transition('background-color', 'border-color', 'box-shadow'),
    opacity: disabled ? 0.5 : 1,
    cursor: disabled ? 'not-allowed' : 'pointer',
    boxSizing: 'border-box',
    outline: 'none',
  };

  const errorStyle: CSSProperties = {
    fontFamily: theme.fontFamily.sans,
    fontSize: theme.fontSize[12],
    color: theme.semantic.text.danger,
    marginTop: theme.space[2],
  };

  return (
    <div ref={ref} style={wrapperStyle}>
      {label && <label htmlFor={selectId} style={labelStyle}>{label}</label>}
      <select
        id={selectId}
        style={selectStyle}
        value={val}
        disabled={disabled}
        aria-invalid={error ? true : undefined}
        data-testid="native-select"
        onChange={(e) => setVal(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} disabled={opt.disabled}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <span style={errorStyle}>{error}</span>}
    </div>
  );
}
