import {
  useRef,
  useState,
  useCallback,
  useEffect,
  type CSSProperties,
  type Ref,
} from 'react';
import { useTheme } from '../../theme/ThemeProvider';
import { useControllableState } from '../../hooks/useControllableState';
import type { SliderChangeDetails, SliderChangeReason } from '../../types';

export interface SliderProps {
  value?: number;
  defaultValue?: number;
  onChange?: (value: number, details?: SliderChangeDetails) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  label?: string;
  showValue?: boolean;
  labelAlign?: 'left' | 'center' | 'right';
  style?: CSSProperties;
  ref?: Ref<HTMLDivElement>;
}

export function Slider(
  {
    value: valueProp,
    defaultValue = 0,
    onChange,
    min = 0,
    max = 100,
    step = 1,
    disabled = false,
    label,
    showValue = false,
    labelAlign = 'left',
    style,
    ref,
    ...rest
  }: SliderProps,
) {
  const theme = useTheme();
  const [value, setValue] = useControllableState(valueProp, defaultValue);
  const [dragging, setDragging] = useState(false);
  const [hover, setHover] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const reasonRef = useRef<SliderChangeReason>('click');

  const pct = ((value - min) / (max - min)) * 100;

  const setValueWithReason = useCallback(
    (v: number, reason: SliderChangeReason) => {
      setValue(v);
      onChange?.(v, { reason });
    },
    [setValue, onChange],
  );

  const updateFromEvent = useCallback(
    (clientX: number) => {
      if (!trackRef.current || disabled) return;
      const rect = trackRef.current.getBoundingClientRect();
      const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
      const raw = min + ratio * (max - min);
      const stepped = Math.round(raw / step) * step;
      setValueWithReason(Math.max(min, Math.min(max, stepped)), reasonRef.current);
    },
    [min, max, step, disabled, setValueWithReason],
  );

  useEffect(() => {
    if (!dragging) return;

    reasonRef.current = 'drag';
    const handleMove = (e: MouseEvent) => updateFromEvent(e.clientX);
    const handleUp = () => setDragging(false);

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseup', handleUp);
    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleUp);
    };
  }, [dragging, updateFromEvent]);

  const trackStyle: CSSProperties = {
    position: 'relative',
    width: '100%',
    height: 8,
    borderRadius: theme.radius.full,
    background: theme.colors.gray[200],
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
  };

  const fillStyle: CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: `${pct}%`,
    borderRadius: theme.radius.full,
    background: theme.semantic.fill.primary,
    transition: dragging ? 'none' : `width ${theme.duration.fast}ms ${theme.easing.standard}`,
  };

  const thumbStyle: CSSProperties = {
    position: 'absolute',
    top: '50%',
    left: `${pct}%`,
    transform: 'translate(-50%, -50%)',
    width: 18,
    height: 18,
    borderRadius: theme.radius.full,
    background: theme.semantic.surface.card,
    border: `2px solid ${theme.semantic.fill.primary}`,
    boxShadow: hover || dragging ? theme.focusRing.primary : theme.shadow.sm,
    cursor: disabled ? 'not-allowed' : 'grab',
    transition: dragging ? 'none' : `left ${theme.duration.fast}ms ${theme.easing.standard}`,
  };

  const labelJustify = labelAlign === 'center' ? 'center' : labelAlign === 'right' ? 'flex-end' : 'space-between';

  return (
    <div ref={ref} style={{ display: 'flex', flexDirection: 'column', gap: 8, width: '100%', ...style }} {...rest}>
      {(label || showValue) && (
        <div
          style={{
            display: 'flex',
            justifyContent: labelJustify,
            fontFamily: theme.fontFamily.sans,
            fontSize: theme.fontSize[14],
          }}
        >
          {label && <span style={{ color: theme.semantic.text.secondary }}>{label}</span>}
          {showValue && (
            <span style={{ color: theme.semantic.text.primary, fontWeight: theme.fontWeight.medium, minWidth: 28, textAlign: 'right' }}>
              {value}
            </span>
          )}
        </div>
      )}
      <div
        ref={trackRef}
        role="slider"
        aria-valuenow={value}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-label={label}
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : 0}
        style={trackStyle}
        onMouseDown={(e) => {
          if (disabled) return;
          reasonRef.current = 'click';
          setDragging(true);
          updateFromEvent(e.clientX);
        }}
        onKeyDown={(e) => {
          if (disabled) return;
          const bigStep = Math.max(step, (max - min) / 10);
          switch (e.key) {
            case 'ArrowRight':
            case 'ArrowUp':
              e.preventDefault();
              setValueWithReason(Math.min(max, value + step), 'keyboard');
              break;
            case 'ArrowLeft':
            case 'ArrowDown':
              e.preventDefault();
              setValueWithReason(Math.max(min, value - step), 'keyboard');
              break;
            case 'PageUp':
              e.preventDefault();
              setValueWithReason(Math.min(max, value + bigStep), 'keyboard');
              break;
            case 'PageDown':
              e.preventDefault();
              setValueWithReason(Math.max(min, value - bigStep), 'keyboard');
              break;
            case 'Home':
              e.preventDefault();
              setValueWithReason(min, 'keyboard');
              break;
            case 'End':
              e.preventDefault();
              setValueWithReason(max, 'keyboard');
              break;
          }
        }}
      >
        <div style={fillStyle} />
        <div
          style={thumbStyle}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        />
      </div>
    </div>
  );
}
