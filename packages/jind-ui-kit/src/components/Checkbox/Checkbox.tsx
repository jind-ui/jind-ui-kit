import {
  useId,
  useRef,
  useState,
  type CSSProperties,
} from 'react';
import { useControllableState } from '../../hooks/useControllableState';
import { useTheme } from '../../theme/ThemeProvider';
import type { CheckboxChangeDetails } from '../../types';

export interface CheckboxProps {
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean, details?: CheckboxChangeDetails) => void;
  label?: string;
  indeterminate?: boolean;
  'aria-describedby'?: string;
  style?: CSSProperties;
  ref?: React.Ref<HTMLDivElement>;
}

export function Checkbox({
  checked: checkedProp,
  defaultChecked = false,
  disabled = false,
  onChange,
  label,
  indeterminate = false,
  'aria-describedby': ariaDescribedBy,
  style,
  ref,
  ...rest
}: CheckboxProps) {
  const theme = useTheme();
  const generatedId = useId();
  const inputId = `checkbox-${generatedId}`;
  const [checked, setChecked] = useControllableState(checkedProp, defaultChecked);
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const isCheckedOrIndeterminate = checked || indeterminate;

  const containerStyle: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    cursor: disabled ? 'default' : 'pointer',
    opacity: disabled ? 0.5 : 1,
    pointerEvents: disabled ? 'none' : undefined,
    ...style,
  };

  const boxStyle: CSSProperties = {
    width: 16,
    height: 16,
    borderRadius: theme.radius.xs,
    border: `1.5px solid ${isCheckedOrIndeterminate ? theme.semantic.fill.primary : theme.semantic.border.default}`,
    background: isCheckedOrIndeterminate ? theme.semantic.fill.primary : theme.semantic.surface.card,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    boxSizing: 'border-box' as const,
    transition: `background ${theme.duration.fast}ms ${theme.easing.standard}, border-color ${theme.duration.fast}ms ${theme.easing.standard}`,
    ...(focused && {
      boxShadow: theme.focusRing.primary,
    }),
  };

  const iconStyle: CSSProperties = {
    color: theme.semantic.text.inverse,
    fontSize: 10,
    lineHeight: 1,
    fontWeight: theme.fontWeight.bold,
  };

  const labelStyle: CSSProperties = {
    fontFamily: theme.fontFamily.sans,
    fontSize: theme.fontSize[14],
    fontWeight: theme.fontWeight.regular,
    lineHeight: theme.lineHeight.normal,
    color: theme.semantic.text.primary,
    userSelect: 'none',
  };

  const hiddenInputStyle: CSSProperties = {
    position: 'absolute',
    opacity: 0,
    width: 0,
    height: 0,
    margin: 0,
    padding: 0,
    overflow: 'hidden',
  };

  const handleClick = () => {
    if (!disabled) {
      const next = !checked;
      setChecked(next);
      onChange?.(next, { reason: 'click' });
      inputRef.current?.focus();
    }
  };

  return (
    <div
      ref={ref}
      style={containerStyle}
      onClick={handleClick}
      role="presentation"
      {...rest}
    >
      <div style={boxStyle}>
        <span style={{
          ...iconStyle,
          visibility: isCheckedOrIndeterminate ? 'visible' : 'hidden',
        }}>
          {indeterminate ? '—' : '✓'}
        </span>
      </div>
      <input
        ref={inputRef}
        id={inputId}
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(e) => {
          setChecked(e.target.checked);
          onChange?.(e.target.checked, { reason: 'click' });
        }}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={hiddenInputStyle}
        aria-checked={indeterminate ? 'mixed' : checked}
        aria-describedby={ariaDescribedBy}
        tabIndex={0}
      />
      {label && <label htmlFor={inputId} style={labelStyle}>{label}</label>}
    </div>
  );
}
