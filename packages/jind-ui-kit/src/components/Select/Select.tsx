import { useState, useRef, useId, useEffect, type CSSProperties, type KeyboardEvent } from 'react';
import type { RadiusValue, SelectChangeDetails } from '../../types';
import { useTheme } from '../../theme/ThemeProvider';
import { useControllableState } from '../../hooks/useControllableState';
import { useClickOutside } from '../../hooks/useClickOutside';
import { useAutoFlip } from '../../hooks/useAutoFlip';
import { transition, resolveRadiusStyle, type PerCornerRadiusProps } from '../../utils/styles';

export type SelectOption = string | { label: string; value: string; swatch?: string };

export interface SelectProps extends PerCornerRadiusProps {
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  options: SelectOption[];
  disabled?: boolean;
  error?: boolean;
  helperText?: string;
  onChange?: (value: string, details?: SelectChangeDetails) => void;
  radius?: RadiusValue;
  style?: CSSProperties;
}

function getLabel(opt: SelectOption): string {
  return typeof opt === 'string' ? opt : opt.label;
}

function getValue(opt: SelectOption): string {
  return typeof opt === 'string' ? opt : opt.value;
}

export function Select({
  value,
  defaultValue,
  placeholder = 'Select',
  options,
  disabled = false,
  error = false,
  helperText,
  onChange,
  radius = 'sm',
  radiusTopLeft, radiusTopRight, radiusBottomRight, radiusBottomLeft,
  style,
}: SelectProps) {
  const theme = useTheme();
  const [val, setVal] = useControllableState(value, defaultValue ?? '');
  const [open, setOpen] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const autoId = useId();
  const resolvedPlacement = useAutoFlip(dropdownRef, 'bottom', open);
  const listboxId = `${autoId}-listbox`;
  const helperId = helperText ? `${autoId}-helper` : undefined;

  const radiusStyle = resolveRadiusStyle(radius, { radiusTopLeft, radiusTopRight, radiusBottomRight, radiusBottomLeft });

  useClickOutside(containerRef, () => setOpen(false), open);

  useEffect(() => {
    if (open) {
      const idx = options.findIndex((opt) => getValue(opt) === val);
      setHighlightIndex(idx >= 0 ? idx : 0);
    }
  }, [open, options, val]);

  const selectedOption = options.find((opt) => getValue(opt) === val);
  const selectedLabel = selectedOption ? getLabel(selectedOption) : '';

  function handleKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    if (disabled) return;

    switch (e.key) {
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (open && highlightIndex >= 0) {
          const next = getValue(options[highlightIndex]);
          setVal(next);
          onChange?.(next, { reason: 'keyboard' });
          setOpen(false);
        } else {
          setOpen(!open);
        }
        break;
      case 'ArrowDown':
        e.preventDefault();
        if (!open) {
          setOpen(true);
        } else {
          setHighlightIndex((prev) => Math.min(prev + 1, options.length - 1));
        }
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (open) {
          setHighlightIndex((prev) => Math.max(prev - 1, 0));
        }
        break;
      case 'Home':
        if (open) {
          e.preventDefault();
          setHighlightIndex(0);
        }
        break;
      case 'End':
        if (open) {
          e.preventDefault();
          setHighlightIndex(options.length - 1);
        }
        break;
      case 'Escape':
        if (open) {
          e.preventDefault();
          setOpen(false);
        }
        break;
    }
  }

  const wrapperStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.space[4],
    ...style,
  };

  const triggerStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    width: '100%',
    height: theme.controlHeight.md,
    padding: `0 ${theme.controlPadding.field}px`,
    ...radiusStyle,
    background: disabled
      ? theme.semantic.surface.subtle
      : open
        ? theme.semantic.surface.card
        : theme.semantic.surface.subtle,
    border: error
      ? `2px solid ${theme.colors.red[600]}`
      : open
        ? `2px solid ${theme.semantic.border.focus}`
        : `1px solid ${theme.semantic.border.subtle}`,
    boxShadow: error
      ? theme.focusRing.danger
      : open
        ? theme.focusRing.primary
        : theme.shadow.xs,
    color: disabled ? theme.semantic.text.muted : theme.semantic.text.primary,
    fontFamily: theme.typeVariants.label.fontFamily,
    fontSize: theme.typeVariants.label.fontSize,
    fontWeight: theme.typeVariants.label.fontWeight,
    lineHeight: theme.typeVariants.label.lineHeight,
    transition: transition('background-color', 'border-color', 'box-shadow'),
    opacity: disabled ? 0.6 : 1,
    cursor: disabled ? 'not-allowed' : 'pointer',
    boxSizing: 'border-box',
    userSelect: 'none',
  };

  const dropdownStyle: CSSProperties = {
    position: 'absolute',
    ...(resolvedPlacement === 'bottom'
      ? { top: 'calc(100% + 6px)' }
      : { bottom: 'calc(100% + 6px)' }),
    left: 0,
    right: 0,
    borderRadius: theme.radius.md,
    background: '#ffffff',
    boxShadow: theme.shadow.menu,
    border: `1px solid ${theme.semantic.border.subtle}`,
    zIndex: 1000,
    overflow: 'auto',
    maxHeight: 240,
    padding: '4px 0',
  };

  const helperStyle: CSSProperties = {
    fontFamily: theme.fontFamily.sans,
    fontSize: theme.fontSize[12],
    color: error ? theme.colors.red[600] : theme.semantic.text.muted,
  };

  return (
    <div style={wrapperStyle}>
      <div ref={containerRef} style={{ position: 'relative', width: '100%' }}>
        <div
          role="combobox"
          tabIndex={disabled ? -1 : 0}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={open ? listboxId : undefined}
          aria-disabled={disabled || undefined}
          aria-invalid={error || undefined}
          aria-describedby={helperId}
          data-testid="select-trigger"
          style={triggerStyle}
          onClick={() => {
            if (!disabled) setOpen((prev) => !prev);
          }}
          onKeyDown={handleKeyDown}
        >
          <span style={{ flex: 1, color: selectedLabel ? 'inherit' : theme.semantic.text.muted }}>
            {selectedLabel || placeholder}
          </span>
          <span
            aria-hidden="true"
            style={{
              display: 'flex',
              alignItems: 'center',
              color: theme.semantic.text.muted,
              transform: `rotate(${open ? 180 : 0}deg)`,
              transition: transition('transform'),
            }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>

        {open && (
          <div ref={dropdownRef} id={listboxId} role="listbox" style={dropdownStyle}>
            {options.map((opt, index) => {
              const optValue = getValue(opt);
              const optLabel = getLabel(opt);
              const isSelected = optValue === val;
              const isHighlighted = index === highlightIndex;
              const swatch = typeof opt !== 'string' ? opt.swatch : undefined;

              return (
                <div
                  key={optValue}
                  role="option"
                  aria-selected={isSelected}
                  data-testid="select-option"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    height: 40,
                    padding: '0 14px',
                    cursor: 'pointer',
                    background: isHighlighted ? theme.semantic.surface.hover : 'transparent',
                    fontSize: 14,
                    fontFamily: theme.typeVariants.label.fontFamily,
                  }}
                  onMouseEnter={() => setHighlightIndex(index)}
                  onClick={() => {
                    setVal(optValue);
                    onChange?.(optValue, { reason: 'click' });
                    setOpen(false);
                  }}
                >
                  {swatch && (
                    <span
                      style={{
                        width: 14,
                        height: 14,
                        borderRadius: '50%',
                        background: swatch,
                        flexShrink: 0,
                      }}
                    />
                  )}
                  <span style={{ flex: 1 }}>{optLabel}</span>
                  {isSelected && (
                    <span style={{ color: theme.semantic.fill.primary }} aria-hidden="true">&#x2713;</span>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
      {helperText && <span id={helperId} style={helperStyle}>{helperText}</span>}
    </div>
  );
}
