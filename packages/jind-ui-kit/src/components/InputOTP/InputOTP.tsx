import { useState, useRef, useCallback, type CSSProperties } from 'react';
import { useTheme } from '../../theme/ThemeProvider';
import { useControllableState } from '../../hooks/useControllableState';
import { transition } from '../../utils/styles';

export interface InputOTPProps {
  length?: number;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  error?: boolean;
  size?: 'sm' | 'md' | 'lg';
  separator?: number;
  type?: 'numeric' | 'alphanumeric';
  autoFocus?: boolean;
  style?: CSSProperties;
  ref?: React.Ref<HTMLDivElement>;
}

export function InputOTP({
  length = 6,
  value,
  defaultValue,
  onChange,
  disabled = false,
  error = false,
  size = 'md',
  separator,
  type = 'numeric',
  autoFocus = false,
  style,
  ref,
}: InputOTPProps) {
  const theme = useTheme();
  const [val, setVal] = useControllableState(
    value,
    defaultValue ?? '',
    onChange,
  );
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const chars = val.split('').slice(0, length);
  while (chars.length < length) chars.push('');

  const isValidChar = useCallback(
    (char: string) => {
      if (type === 'numeric') return /^\d$/.test(char);
      return /^[a-zA-Z0-9]$/.test(char);
    },
    [type],
  );

  const updateValue = useCallback(
    (newChars: string[]) => {
      setVal(newChars.join(''));
    },
    [setVal],
  );

  const focusCell = useCallback((index: number) => {
    if (index >= 0 && index < length) {
      inputRefs.current[index]?.focus();
    }
  }, [length]);

  const handleChange = useCallback(
    (index: number, inputValue: string) => {
      if (disabled) return;

      // Handle paste of multiple characters
      if (inputValue.length > 1) {
        const pasteChars = inputValue.split('').filter(isValidChar).slice(0, length);
        const newChars = [...chars];
        for (let i = 0; i < pasteChars.length && index + i < length; i++) {
          newChars[index + i] = pasteChars[i];
        }
        updateValue(newChars);
        const nextIndex = Math.min(index + pasteChars.length, length - 1);
        focusCell(nextIndex);
        return;
      }

      const char = inputValue;
      if (char && !isValidChar(char)) return;

      const newChars = [...chars];
      newChars[index] = char;
      updateValue(newChars);

      if (char && index < length - 1) {
        focusCell(index + 1);
      }
    },
    [chars, disabled, isValidChar, length, updateValue, focusCell],
  );

  const handleKeyDown = useCallback(
    (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
      if (disabled) return;

      if (e.key === 'Backspace') {
        e.preventDefault();
        const newChars = [...chars];
        if (chars[index]) {
          newChars[index] = '';
          updateValue(newChars);
        } else if (index > 0) {
          newChars[index - 1] = '';
          updateValue(newChars);
          focusCell(index - 1);
        }
      } else if (e.key === 'ArrowLeft' && index > 0) {
        e.preventDefault();
        focusCell(index - 1);
      } else if (e.key === 'ArrowRight' && index < length - 1) {
        e.preventDefault();
        focusCell(index + 1);
      }
    },
    [chars, disabled, length, updateValue, focusCell],
  );

  const handlePaste = useCallback(
    (e: React.ClipboardEvent<HTMLInputElement>, index: number) => {
      e.preventDefault();
      const pasteData = e.clipboardData.getData('text');
      const pasteChars = pasteData.split('').filter(isValidChar).slice(0, length - index);
      if (pasteChars.length === 0) return;

      const newChars = [...chars];
      for (let i = 0; i < pasteChars.length; i++) {
        newChars[index + i] = pasteChars[i];
      }
      updateValue(newChars);
      const nextIndex = Math.min(index + pasteChars.length, length - 1);
      focusCell(nextIndex);
    },
    [chars, isValidChar, length, updateValue, focusCell],
  );

  const cellSize = theme.controlHeight[size];

  const containerStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.space[4],
    ...style,
  };

  const separatorStyle: CSSProperties = {
    color: theme.semantic.text.muted,
    fontSize: theme.fontSize[16],
    padding: `0 ${theme.space[3]}px`,
    userSelect: 'none',
  };

  const cells: React.ReactNode[] = [];
  for (let i = 0; i < length; i++) {
    if (separator !== undefined && i === separator && i > 0) {
      cells.push(
        <span key={`sep-${i}`} style={separatorStyle} data-testid="otp-separator">
          &mdash;
        </span>,
      );
    }

    const isFocused = focusedIndex === i;
    const isFilled = chars[i] !== '';

    const cellStyle: CSSProperties = {
      width: cellSize,
      height: cellSize,
      textAlign: 'center',
      fontFamily: theme.fontFamily.mono,
      fontSize: theme.fontSize[16],
      fontWeight: theme.fontWeight.medium,
      color: theme.semantic.text.primary,
      background: isFilled
        ? theme.semantic.surface.subtle
        : theme.semantic.surface.card,
      border: error
        ? `2px solid ${theme.colors.red[500]}`
        : isFocused
          ? `2px solid ${theme.semantic.border.focus}`
          : `1px solid ${theme.semantic.border.default}`,
      borderRadius: theme.radius.md,
      boxShadow: isFocused
        ? error
          ? theme.focusRing.danger
          : theme.focusRing.primary
        : 'none',
      outline: 'none',
      transition: transition('border-color', 'box-shadow', 'background-color'),
      opacity: disabled ? 0.5 : 1,
      cursor: disabled ? 'not-allowed' : 'text',
      boxSizing: 'border-box',
    };

    cells.push(
      <input
        key={i}
        ref={(el) => {
          inputRefs.current[i] = el;
        }}
        style={cellStyle}
        type="text"
        inputMode={type === 'numeric' ? 'numeric' : 'text'}
        autoComplete={i === 0 ? 'one-time-code' : 'off'}
        maxLength={1}
        value={chars[i]}
        disabled={disabled}
        autoFocus={autoFocus && i === 0}
        aria-label={`Digit ${i + 1} of ${length}`}
        data-testid="otp-cell"
        onChange={(e) => handleChange(i, e.target.value)}
        onKeyDown={(e) => handleKeyDown(i, e)}
        onFocus={() => setFocusedIndex(i)}
        onBlur={() => setFocusedIndex(null)}
        onPaste={(e) => handlePaste(e, i)}
      />,
    );
  }

  return (
    <div ref={ref} role="group" aria-label="One-time password" style={containerStyle} data-testid="otp-container">
      {cells}
    </div>
  );
}
