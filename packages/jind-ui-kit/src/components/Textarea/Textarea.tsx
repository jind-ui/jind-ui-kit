import { useState, useId, type CSSProperties } from 'react';
import type { RadiusValue } from '../../types';
import { useTheme } from '../../theme/ThemeProvider';
import { transition, resolveRadiusStyle, type PerCornerRadiusProps } from '../../utils/styles';

export interface TextareaProps extends PerCornerRadiusProps {
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  rows?: number;
  radius?: RadiusValue;
  disabled?: boolean;
  error?: boolean;
  helperText?: string;
  onChange?: (value: string) => void;
  id?: string;
  name?: string;
  'aria-label'?: string;
  'aria-required'?: boolean;
  'aria-invalid'?: boolean;
  'aria-describedby'?: string;
  style?: CSSProperties;
}

export function Textarea({
  value,
  defaultValue,
  placeholder = 'Enter a message',
  rows = 6,
  radius = 'md',
  disabled = false,
  error = false,
  helperText,
  onChange,
  id,
  name,
  'aria-label': ariaLabel,
  'aria-required': ariaRequired,
  'aria-invalid': ariaInvalid,
  'aria-describedby': ariaDescribedby,
  style,
  radiusTopLeft, radiusTopRight, radiusBottomRight, radiusBottomLeft,
}: TextareaProps) {
  const theme = useTheme();
  const [focused, setFocused] = useState(false);
  const autoId = useId();
  const helperId = helperText ? `${autoId}-helper` : undefined;
  const radiusStyle = resolveRadiusStyle(radius, { radiusTopLeft, radiusTopRight, radiusBottomRight, radiusBottomLeft });

  const wrapperStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.space[4],
    ...style,
  };

  const textareaStyle: CSSProperties = {
    width: '100%',
    padding: 14,
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
    fontSize: 16,
    fontWeight: 400,
    lineHeight: 1.5,
    outline: 'none',
    resize: 'vertical' as const,
    transition: transition('background-color', 'border-color', 'box-shadow'),
    opacity: disabled ? 0.6 : 1,
    cursor: disabled ? 'not-allowed' : 'text',
    boxSizing: 'border-box' as const,
  };

  const helperStyle: CSSProperties = {
    fontFamily: theme.fontFamily.sans,
    fontSize: theme.fontSize[12],
    color: error ? theme.colors.red[600] : theme.semantic.text.muted,
  };

  const describedBy = [ariaDescribedby, helperId].filter(Boolean).join(' ') || undefined;

  return (
    <div style={wrapperStyle}>
      <textarea
        id={id}
        name={name}
        data-testid="textarea-element"
        value={value}
        defaultValue={defaultValue}
        placeholder={placeholder}
        rows={rows}
        disabled={disabled}
        style={textareaStyle}
        onChange={(e) => onChange?.(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        aria-label={ariaLabel}
        aria-required={ariaRequired}
        aria-invalid={error || ariaInvalid || undefined}
        aria-describedby={describedBy}
      />
      {helperText && <span id={helperId} style={helperStyle}>{helperText}</span>}
    </div>
  );
}
