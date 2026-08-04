import {
  useRef,
  useState,
  type CSSProperties,
  type Ref,
} from 'react';
import type { RadiusValue } from '../../types';
import { resolveRadiusStyle, type PerCornerRadiusProps } from '../../utils/styles';
import { useControllableState } from '../../hooks/useControllableState';
import { useTheme } from '../../theme/ThemeProvider';

export interface SearchInputProps extends PerCornerRadiusProps {
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  onClear?: () => void;
  disabled?: boolean;
  radius?: RadiusValue;
  style?: CSSProperties;
  ref?: Ref<HTMLDivElement>;
}

export function SearchInput(
  {
    value: valueProp,
    defaultValue = '',
    placeholder = 'Search...',
    onChange,
    onClear,
    disabled = false,
    radius = 'md',
    radiusTopLeft, radiusTopRight, radiusBottomRight, radiusBottomLeft,
    style,
    ref,
    ...rest
  }: SearchInputProps,
) {
  const theme = useTheme();
  const [value, setValue] = useControllableState(valueProp, defaultValue, onChange);
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const radiusStyle = resolveRadiusStyle(radius, { radiusTopLeft, radiusTopRight, radiusBottomRight, radiusBottomLeft });

  const shellStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    height: theme.controlHeight.md,
    border: `1px solid ${focused ? theme.semantic.border.focus : theme.semantic.border.default}`,
    ...radiusStyle,
    background: theme.semantic.surface.card,
    padding: `0 ${theme.controlPadding.field}px`,
    gap: 8,
    boxSizing: 'border-box' as const,
    transition: `border-color ${theme.duration.fast}ms ${theme.easing.standard}, box-shadow ${theme.duration.fast}ms ${theme.easing.standard}`,
    opacity: disabled ? 0.5 : 1,
    pointerEvents: disabled ? 'none' : undefined,
    ...(focused && {
      boxShadow: theme.focusRing.primary,
    }),
    ...style,
  };

  const searchIconStyle: CSSProperties = {
    fontSize: 16,
    lineHeight: 1,
    color: theme.semantic.icon.muted,
    flexShrink: 0,
    userSelect: 'none',
  };

  const inputStyle: CSSProperties = {
    flex: 1,
    border: 'none',
    outline: 'none',
    background: 'none',
    fontFamily: theme.fontFamily.sans,
    fontSize: theme.fontSize[14],
    fontWeight: theme.fontWeight.regular,
    color: theme.semantic.text.primary,
    padding: 0,
    margin: 0,
    width: '100%',
    minWidth: 0,
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

  const handleClear = () => {
    if (onClear) {
      onClear();
    } else {
      setValue('');
    }
    inputRef.current?.focus();
  };

  return (
    <div
      ref={ref}
      role="search"
      style={shellStyle}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      {...rest}
    >
      <span style={searchIconStyle} aria-hidden="true">&#x1F50D;</span>
      <input
        ref={inputRef}
        type="search"
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        onChange={(e) => setValue(e.target.value)}
        style={inputStyle}
        aria-label={placeholder}
      />
      <button
        type="button"
        onClick={handleClear}
        style={{
          ...clearButtonStyle,
          visibility: value ? 'visible' : 'hidden',
        }}
        aria-label="Clear search"
        tabIndex={value ? 0 : -1}
      >
        &#x2715;
      </button>
    </div>
  );
}
