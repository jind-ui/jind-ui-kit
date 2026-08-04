import {
  createContext,
  useContext,
  useRef,
  useState,
  useCallback,
  type CSSProperties,
  type ReactNode,
  type Ref,
} from 'react';
import { useControllableState } from '../../hooks/useControllableState';
import { useTheme } from '../../theme/ThemeProvider';
import type { RadioChangeDetails, RadioChangeReason } from '../../types';

/* ─── Context ─── */

interface RadioGroupContextValue {
  value: string;
  select: (value: string, reason: RadioChangeReason) => void;
  name?: string;
  groupRef: React.RefObject<HTMLDivElement | null>;
}

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

/* ─── RadioGroup ─── */

export interface RadioGroupProps {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string, details?: RadioChangeDetails) => void;
  name?: string;
  'aria-label'?: string;
  children: ReactNode;
  style?: CSSProperties;
  ref?: Ref<HTMLDivElement>;
}

export function RadioGroup(
  { value: valueProp, defaultValue = '', onChange, name, 'aria-label': ariaLabel, children, style, ref, ...rest }: RadioGroupProps,
) {
  const [value, setValue] = useControllableState(valueProp, defaultValue);
  const internalRef = useRef<HTMLDivElement>(null);

  const select = useCallback((v: string, reason: RadioChangeReason) => {
    setValue(v);
    onChange?.(v, { reason });
  }, [setValue, onChange]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    const group = internalRef.current;
    if (!group) return;

    const radios = Array.from(
      group.querySelectorAll<HTMLInputElement>('input[type="radio"]:not(:disabled)'),
    );
    if (radios.length === 0) return;

    const currentIndex = radios.findIndex((r) => r === document.activeElement);
    let nextIndex = -1;

    switch (e.key) {
      case 'ArrowDown':
      case 'ArrowRight':
        e.preventDefault();
        nextIndex = currentIndex + 1 >= radios.length ? 0 : currentIndex + 1;
        break;
      case 'ArrowUp':
      case 'ArrowLeft':
        e.preventDefault();
        nextIndex = currentIndex - 1 < 0 ? radios.length - 1 : currentIndex - 1;
        break;
      default:
        return;
    }

    radios[nextIndex].focus();
    select(radios[nextIndex].value, 'keyboard');
  }, [select]);

  const groupStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
    ...style,
  };

  const assignRef = (node: HTMLDivElement | null) => {
    (internalRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
    if (typeof ref === 'function') ref(node);
    else if (ref && typeof ref === 'object') (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
  };

  return (
    <RadioGroupContext.Provider value={{ value, select, name, groupRef: internalRef }}>
      <div ref={assignRef} role="radiogroup" aria-label={ariaLabel} style={groupStyle} onKeyDown={handleKeyDown} {...rest}>
        {children}
      </div>
    </RadioGroupContext.Provider>
  );
}

/* ─── Radio ─── */

export interface RadioProps {
  value: string;
  disabled?: boolean;
  label?: string;
  style?: CSSProperties;
  ref?: Ref<HTMLDivElement>;
}

export function Radio(
  { value, disabled = false, label, style, ref, ...rest }: RadioProps,
) {
  const theme = useTheme();
  const ctx = useContext(RadioGroupContext);
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const isSelected = ctx ? ctx.value === value : false;

  const containerStyle: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    cursor: disabled ? 'default' : 'pointer',
    opacity: disabled ? 0.5 : 1,
    pointerEvents: disabled ? 'none' : undefined,
    ...style,
  };

  const circleStyle: CSSProperties = {
    width: 16,
    height: 16,
    borderRadius: theme.radius.full,
    border: `1.5px solid ${isSelected ? theme.semantic.fill.primary : theme.semantic.border.default}`,
    background: theme.semantic.surface.card,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    boxSizing: 'border-box' as const,
    transition: `border-color ${theme.duration.fast}ms ${theme.easing.standard}`,
    ...(focused && {
      boxShadow: theme.focusRing.primary,
    }),
  };

  const dotStyle: CSSProperties = {
    width: 6,
    height: 6,
    borderRadius: theme.radius.full,
    background: theme.semantic.fill.primary,
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
    if (!disabled && ctx) {
      ctx.select(value, 'click');
      inputRef.current?.focus();
    }
  };

  return (
    <div ref={ref} style={containerStyle} onClick={handleClick} role="presentation" {...rest}>
      <div style={circleStyle}>
        {isSelected && <div style={dotStyle} />}
      </div>
      <input
        ref={inputRef}
        type="radio"
        name={ctx?.name}
        value={value}
        checked={isSelected}
        disabled={disabled}
        onChange={() => ctx?.select(value, 'click')}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={hiddenInputStyle}
        tabIndex={isSelected || (!ctx?.value && !disabled) ? 0 : -1}
      />
      {label && <span style={labelStyle}>{label}</span>}
    </div>
  );
}
