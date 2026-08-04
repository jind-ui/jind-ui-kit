import { CSSProperties } from 'react';
import { useTheme } from '../../theme/ThemeProvider';
import { useControllableState } from '../../hooks/useControllableState';
import type { SwitchChangeDetails, SwitchChangeReason } from '../../types';

export interface SwitchProps {
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean, details?: SwitchChangeDetails) => void;
  label?: string;
  borderRadius?: number;
  style?: CSSProperties;
}

export function Switch({
  checked,
  defaultChecked,
  disabled = false,
  onChange,
  label,
  borderRadius = 999,
  style,
}: SwitchProps) {
  const theme = useTheme();
  const [isOn, setIsOn] = useControllableState(
    checked,
    defaultChecked ?? false,
  );

  const toggle = (reason: SwitchChangeReason) => {
    if (!disabled) {
      const next = !isOn;
      setIsOn(next);
      onChange?.(next, { reason });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggle('keyboard');
    }
  };

  const trackStyle: CSSProperties = {
    position: 'relative',
    width: 46,
    height: 26,
    borderRadius,
    background: isOn
      ? theme.semantic.fill.primary
      : theme.colors.gray[200],
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: `background-color ${theme.duration.base}ms ${theme.easing.standard}`,
    flexShrink: 0,
  };

  const knobStyle: CSSProperties = {
    position: 'absolute',
    top: 3,
    left: isOn ? 23 : 3,
    width: 20,
    height: 20,
    borderRadius,
    background: theme.colors.gray[0],
    boxShadow: '0 1px 3px rgba(0,0,0,0.15)',
    transition: `left ${theme.duration.base}ms ${theme.easing.standard}`,
  };

  const track = (
    <div
      data-testid="switch-track"
      role="switch"
      aria-checked={isOn}
      aria-disabled={disabled || undefined}
      aria-label={label || undefined}
      tabIndex={disabled ? -1 : 0}
      onClick={() => toggle('click')}
      onKeyDown={handleKeyDown}
      style={label ? trackStyle : { ...trackStyle, ...style }}
    >
      <span style={knobStyle} />
    </div>
  );

  if (!label) {
    return track;
  }

  const labelWrapperStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.6 : 1,
    userSelect: 'none',
    ...style,
  };

  const labelTextStyle: CSSProperties = {
    fontFamily: theme.typeVariants.label.fontFamily,
    fontSize: theme.typeVariants.label.fontSize,
    fontWeight: theme.typeVariants.label.fontWeight,
    lineHeight: theme.typeVariants.label.lineHeight,
    color: theme.semantic.text.primary,
  };

  return (
    <label style={labelWrapperStyle}>
      {track}
      <span style={labelTextStyle}>{label}</span>
    </label>
  );
}
