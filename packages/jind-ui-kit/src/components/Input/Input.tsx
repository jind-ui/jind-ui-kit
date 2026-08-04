import { useState, type CSSProperties } from 'react';
import type { RadiusValue } from '../../types';
import { useTheme } from '../../theme/ThemeProvider';
import { useControllableState } from '../../hooks/useControllableState';
import { resolveRadiusStyle, type PerCornerRadiusProps } from '../../utils/styles';

export interface InputProps extends PerCornerRadiusProps {
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  disabled?: boolean;
  iconLeft?: string;
  radius?: RadiusValue;
  onChange?: (value: string) => void;
  id?: string;
  'aria-label'?: string;
  'aria-required'?: boolean;
  'aria-invalid'?: boolean;
  'aria-describedby'?: string;
  type?: string;
  name?: string;
  style?: CSSProperties;
}

export function Input({
  value,
  defaultValue,
  placeholder = 'Enter a value',
  disabled = false,
  iconLeft,
  radius = 'sm',
  onChange,
  id,
  'aria-label': ariaLabel,
  'aria-required': ariaRequired,
  'aria-invalid': ariaInvalid,
  'aria-describedby': ariaDescribedby,
  type,
  name,
  style,
  radiusTopLeft, radiusTopRight, radiusBottomRight, radiusBottomLeft,
}: InputProps) {
  const theme = useTheme();
  const [val, setVal] = useControllableState(value, defaultValue ?? '', onChange);
  const [focused, setFocused] = useState(false);
  const radiusStyle = resolveRadiusStyle(radius, { radiusTopLeft, radiusTopRight, radiusBottomRight, radiusBottomLeft });

  const fieldShell: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    width: '100%',
    height: theme.controlHeight.md,
    padding: `0 ${theme.controlPadding.field}px`,
    ...radiusStyle,
    background: disabled
      ? theme.semantic.surface.subtle
      : focused
        ? theme.semantic.surface.card
        : theme.semantic.surface.subtle,
    border: focused
      ? `2px solid ${theme.semantic.border.focus}`
      : `1px solid ${theme.semantic.border.subtle}`,
    boxShadow: focused ? theme.focusRing.primary : theme.shadow.xs,
    color: disabled ? theme.semantic.text.muted : theme.semantic.text.primary,
    fontFamily: theme.typeVariants.label.fontFamily,
    fontSize: theme.typeVariants.label.fontSize,
    fontWeight: theme.typeVariants.label.fontWeight,
    lineHeight: theme.typeVariants.label.lineHeight,
    transition: `background-color ${theme.duration.fast}ms ${theme.easing.standard}, border-color ${theme.duration.fast}ms ${theme.easing.standard}, box-shadow ${theme.duration.fast}ms ${theme.easing.standard}`,
    opacity: disabled ? 0.6 : 1,
    cursor: disabled ? 'not-allowed' : 'text',
    boxSizing: 'border-box',
    ...style,
  };

  const iconStyle: CSSProperties = {
    fontSize: 18,
    color: theme.semantic.icon.muted,
    flexShrink: 0,
    display: 'flex',
    alignItems: 'center',
  };

  const inputStyle: CSSProperties = {
    flex: 1,
    border: 'none',
    outline: 'none',
    background: 'transparent',
    color: 'inherit',
    font: 'inherit',
    padding: 0,
    width: '100%',
    cursor: 'inherit',
  };

  return (
    <div style={fieldShell}>
      {iconLeft && <span style={iconStyle}>{iconLeft}</span>}
      <input
        id={id}
        name={name}
        type={type}
        style={inputStyle}
        value={val}
        placeholder={placeholder}
        disabled={disabled}
        onChange={(e) => setVal(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        aria-label={ariaLabel}
        aria-required={ariaRequired}
        aria-invalid={ariaInvalid}
        aria-describedby={ariaDescribedby}
        data-testid="input-element"
      />
    </div>
  );
}
