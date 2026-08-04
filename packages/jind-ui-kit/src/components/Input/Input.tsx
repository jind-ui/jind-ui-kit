import { useState, useRef, useId, type CSSProperties } from 'react';
import type { RadiusValue } from '../../types';
import { useTheme } from '../../theme/ThemeProvider';
import { useControllableState } from '../../hooks/useControllableState';
import { transition, resolveRadiusStyle, type PerCornerRadiusProps } from '../../utils/styles';

export interface InputProps extends PerCornerRadiusProps {
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  disabled?: boolean;
  iconLeft?: string;
  radius?: RadiusValue;
  onChange?: (value: string) => void;
  onClear?: () => void;
  clearable?: boolean;
  error?: boolean;
  helperText?: string;
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
  onClear,
  clearable = false,
  error = false,
  helperText,
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
  const inputRef = useRef<HTMLInputElement>(null);
  const autoId = useId();
  const helperId = helperText ? `${autoId}-helper` : undefined;
  const radiusStyle = resolveRadiusStyle(radius, { radiusTopLeft, radiusTopRight, radiusBottomRight, radiusBottomLeft });

  const showClear = clearable && val.length > 0 && !disabled;

  const wrapperStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.space[4],
    ...style,
  };

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
    border: error
      ? `2px solid ${theme.colors.red[600]}`
      : focused
        ? `2px solid ${theme.semantic.border.focus}`
        : `1px solid ${theme.semantic.border.subtle}`,
    boxShadow: error
      ? theme.focusRing.danger
      : focused
        ? theme.focusRing.primary
        : theme.shadow.xs,
    color: disabled ? theme.semantic.text.muted : theme.semantic.text.primary,
    fontFamily: theme.typeVariants.label.fontFamily,
    fontSize: theme.typeVariants.label.fontSize,
    fontWeight: theme.typeVariants.label.fontWeight,
    lineHeight: theme.typeVariants.label.lineHeight,
    transition: transition('background-color', 'border-color', 'box-shadow'),
    opacity: disabled ? 0.6 : 1,
    cursor: disabled ? 'not-allowed' : 'text',
    boxSizing: 'border-box',
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

  const clearButtonStyle: CSSProperties = {
    background: 'none',
    border: 'none',
    padding: 0,
    cursor: 'pointer',
    fontSize: 16,
    lineHeight: 1,
    color: theme.semantic.icon.muted,
    flexShrink: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const helperStyle: CSSProperties = {
    fontFamily: theme.fontFamily.sans,
    fontSize: theme.fontSize[12],
    color: error ? theme.colors.red[600] : theme.semantic.text.muted,
  };

  const handleClear = () => {
    if (onClear) {
      onClear();
    } else {
      setVal('');
    }
    inputRef.current?.focus();
  };

  const describedBy = [ariaDescribedby, helperId].filter(Boolean).join(' ') || undefined;

  return (
    <div style={wrapperStyle}>
      <div style={fieldShell}>
        {iconLeft && <span style={iconStyle}>{iconLeft}</span>}
        <input
          ref={inputRef}
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
          aria-invalid={error || ariaInvalid || undefined}
          aria-describedby={describedBy}
          data-testid="input-element"
        />
        {showClear && (
          <button
            type="button"
            onClick={handleClear}
            style={clearButtonStyle}
            aria-label="Clear"
            tabIndex={0}
          >
            &#x2715;
          </button>
        )}
      </div>
      {helperText && <span id={helperId} style={helperStyle}>{helperText}</span>}
    </div>
  );
}
