import { useState, useRef, useCallback, useId, type CSSProperties } from 'react';
import type { RadiusValue, ComboboxInputDetails, ComboboxInputReason } from '../../types';
import { useTheme } from '../../theme/ThemeProvider';
import { useControllableState } from '../../hooks/useControllableState';
import { useClickOutside } from '../../hooks/useClickOutside';
import { transition, resolveRadiusStyle, type PerCornerRadiusProps } from '../../utils/styles';

export interface ComboboxOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface ComboboxProps extends PerCornerRadiusProps {
  options: ComboboxOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string, details?: ComboboxInputDetails) => void;
  placeholder?: string;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  emptyMessage?: string;
  label?: string;
  error?: string;
  radius?: RadiusValue;
  style?: CSSProperties;
  ref?: React.Ref<HTMLDivElement>;
}

export function Combobox({
  options,
  value,
  defaultValue,
  onChange,
  placeholder = 'Search...',
  disabled = false,
  size = 'md',
  emptyMessage = 'No results',
  label,
  error,
  radius = 'md',
  radiusTopLeft, radiusTopRight, radiusBottomRight, radiusBottomLeft,
  style,
  ref,
}: ComboboxProps) {
  const theme = useTheme();
  const [val, setVal] = useControllableState(value, defaultValue ?? '');
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const baseId = useId();
  const inputId = `${baseId}-input`;
  const listboxId = `${baseId}-listbox`;

  useClickOutside(containerRef, () => {
    setOpen(false);
    // Reset query to selected label when closing
    const selected = options.find((o) => o.value === val);
    setQuery(selected ? selected.label : '');
  }, open);

  const filtered = options.filter(
    (opt) => opt.label.toLowerCase().includes(query.toLowerCase()),
  );

  const selectedOption = options.find((o) => o.value === val);

  const handleSelect = useCallback(
    (opt: ComboboxOption, reason: ComboboxInputReason) => {
      if (opt.disabled) return;
      setVal(opt.value);
      onChange?.(opt.value, { reason });
      setQuery(opt.label);
      setOpen(false);
      setHighlightIndex(-1);
    },
    [setVal, onChange],
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!open) {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        setOpen(true);
        e.preventDefault();
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightIndex((prev) => {
          const next = prev + 1;
          return next >= filtered.length ? 0 : next;
        });
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightIndex((prev) => {
          const next = prev - 1;
          return next < 0 ? filtered.length - 1 : next;
        });
        break;
      case 'Enter':
        e.preventDefault();
        if (highlightIndex >= 0 && highlightIndex < filtered.length) {
          handleSelect(filtered[highlightIndex], 'select');
        }
        break;
      case 'Escape':
        e.preventDefault();
        setOpen(false);
        setQuery(selectedOption ? selectedOption.label : '');
        setHighlightIndex(-1);
        break;
      case 'Tab':
        if (highlightIndex >= 0 && highlightIndex < filtered.length) {
          handleSelect(filtered[highlightIndex], 'select');
        } else {
          setOpen(false);
          setQuery(selectedOption ? selectedOption.label : '');
        }
        break;
    }
  };

  const height = theme.controlHeight[size];
  const radiusStyle = resolveRadiusStyle(radius, { radiusTopLeft, radiusTopRight, radiusBottomRight, radiusBottomLeft });

  const wrapperStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.space[4],
    ...style,
  };

  const labelStyle: CSSProperties = {
    fontFamily: theme.fontFamily.sans,
    fontSize: theme.fontSize[14],
    fontWeight: theme.fontWeight.medium,
    color: theme.semantic.text.primary,
  };

  const fieldShell: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    height,
    padding: `0 ${theme.controlPadding.field}px`,
    ...radiusStyle,
    background: disabled
      ? theme.semantic.surface.subtle
      : open
        ? theme.semantic.surface.card
        : theme.semantic.surface.subtle,
    border: error
      ? `2px solid ${theme.colors.red[500]}`
      : open
        ? `2px solid ${theme.semantic.border.focus}`
        : `1px solid ${theme.semantic.border.default}`,
    boxShadow: error
      ? theme.focusRing.danger
      : open
        ? theme.focusRing.primary
        : theme.shadow.xs,
    color: disabled ? theme.semantic.text.muted : theme.semantic.text.primary,
    fontFamily: theme.fontFamily.sans,
    fontSize: theme.fontSize[14],
    fontWeight: theme.fontWeight.regular,
    lineHeight: theme.lineHeight.normal,
    transition: transition('background-color', 'border-color', 'box-shadow'),
    opacity: disabled ? 0.5 : 1,
    cursor: disabled ? 'not-allowed' : 'text',
    boxSizing: 'border-box',
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

  const chevronStyle: CSSProperties = {
    fontSize: 10,
    color: theme.semantic.text.muted,
    transform: `rotate(${open ? 180 : 0}deg)`,
    transition: transition('transform'),
    flexShrink: 0,
    marginLeft: theme.space[4],
    pointerEvents: 'none',
  };

  const dropdownStyle: CSSProperties = {
    position: 'absolute',
    top: 'calc(100% + 6px)',
    left: 0,
    right: 0,
    borderRadius: theme.radius.md,
    background: theme.semantic.surface.card,
    boxShadow: theme.shadow.menu,
    border: `1px solid ${theme.semantic.border.default}`,
    zIndex: 1000,
    overflowY: 'auto',
    maxHeight: 240,
    padding: `${theme.space[2]}px 0`,
  };

  const emptyStyle: CSSProperties = {
    padding: `${theme.space[4]}px ${theme.space[6]}px`,
    color: theme.semantic.text.muted,
    fontSize: theme.fontSize[14],
    fontFamily: theme.fontFamily.sans,
  };

  const errorStyle: CSSProperties = {
    fontFamily: theme.fontFamily.sans,
    fontSize: theme.fontSize[12],
    color: theme.semantic.text.danger,
    marginTop: theme.space[2],
  };

  return (
    <div ref={ref} style={wrapperStyle}>
      {label && <label htmlFor={inputId} style={labelStyle}>{label}</label>}
      <div
        ref={containerRef}
        style={{ position: 'relative', width: '100%' }}
      >
        <div style={fieldShell}>
          <input
            ref={inputRef}
            id={inputId}
            role="combobox"
            aria-haspopup="listbox"
            aria-expanded={open}
            aria-controls={open ? listboxId : undefined}
            aria-autocomplete="list"
            aria-activedescendant={open && highlightIndex >= 0 && highlightIndex < filtered.length ? `${baseId}-opt-${filtered[highlightIndex].value}` : undefined}
            aria-invalid={error ? true : undefined}
            style={inputStyle}
            value={open ? query : (selectedOption ? selectedOption.label : query)}
            placeholder={placeholder}
            disabled={disabled}
            data-testid="combobox-input"
            onChange={(e) => {
              setQuery(e.target.value);
              setHighlightIndex(-1);
              if (!open) setOpen(true);
            }}
            onFocus={() => {
              if (!disabled) {
                setOpen(true);
                setQuery(selectedOption ? selectedOption.label : '');
              }
            }}
            onKeyDown={handleKeyDown}
          />
          <span style={chevronStyle}>&#x25BC;</span>
        </div>

        {open && (
          <div id={listboxId} role="listbox" style={dropdownStyle} data-testid="combobox-dropdown">
            {filtered.length === 0 ? (
              <div style={emptyStyle}>{emptyMessage}</div>
            ) : (
              filtered.map((opt, idx) => {
                const isSelected = opt.value === val;
                const isHighlighted = idx === highlightIndex;

                const optionStyle: CSSProperties = {
                  display: 'flex',
                  alignItems: 'center',
                  padding: `${theme.space[4]}px ${theme.space[6]}px`,
                  cursor: opt.disabled ? 'not-allowed' : 'pointer',
                  background: isHighlighted
                    ? theme.semantic.surface.hover
                    : isSelected
                      ? theme.semantic.surface.selected
                      : 'transparent',
                  fontSize: theme.fontSize[14],
                  fontFamily: theme.fontFamily.sans,
                  color: opt.disabled
                    ? theme.semantic.text.muted
                    : theme.semantic.text.primary,
                  opacity: opt.disabled ? 0.5 : 1,
                };

                return (
                  <div
                    key={opt.value}
                    id={`${baseId}-opt-${opt.value}`}
                    role="option"
                    aria-selected={isSelected}
                    aria-disabled={opt.disabled || undefined}
                    data-testid="combobox-option"
                    style={optionStyle}
                    onMouseEnter={(e) => {
                      if (!opt.disabled) {
                        setHighlightIndex(idx);
                        (e.currentTarget as HTMLElement).style.background =
                          theme.semantic.surface.hover;
                      }
                    }}
                    onMouseLeave={(e) => {
                      setHighlightIndex(-1);
                      (e.currentTarget as HTMLElement).style.background =
                        isSelected ? theme.semantic.surface.selected : 'transparent';
                    }}
                    onClick={() => handleSelect(opt, 'select')}
                  >
                    <span style={{ flex: 1 }}>{opt.label}</span>
                    {isSelected && (
                      <span style={{ color: theme.semantic.fill.primary, flexShrink: 0 }}>
                        &#x2713;
                      </span>
                    )}
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>
      {error && <span style={errorStyle}>{error}</span>}
    </div>
  );
}
