import { useState, useCallback, useMemo, type CSSProperties } from 'react';
import { useTheme } from '../theme/ThemeProvider';

export type PressEffect = 'scale' | 'shift' | 'glow' | 'none';

export interface UsePressAnimationOptions {
  effect?: PressEffect;
  disabled?: boolean;
}

export interface UsePressAnimationReturn {
  pressed: boolean;
  pressProps: {
    onMouseDown: () => void;
    onMouseUp: () => void;
    onMouseLeave: () => void;
  };
  pressStyle: CSSProperties;
}

export function usePressAnimation({
  effect = 'scale',
  disabled = false,
}: UsePressAnimationOptions = {}): UsePressAnimationReturn {
  const theme = useTheme();
  const [pressed, setPressed] = useState(false);

  const onMouseDown = useCallback(() => {
    if (!disabled) setPressed(true);
  }, [disabled]);

  const onMouseUp = useCallback(() => {
    setPressed(false);
  }, []);

  const onMouseLeave = useCallback(() => {
    setPressed(false);
  }, []);

  const pressStyle = useMemo((): CSSProperties => {
    if (disabled || effect === 'none' || !pressed) {
      return {
        transition: `transform ${theme.duration.fast}ms ${theme.easing.standard}`,
      };
    }

    switch (effect) {
      case 'scale':
        return {
          transform: 'scale(0.97)',
          transition: `transform ${theme.duration.fast}ms ${theme.easing.standard}`,
        };
      case 'shift':
        return {
          transform: 'translateY(1px)',
          transition: `transform ${theme.duration.fast}ms ${theme.easing.standard}`,
        };
      case 'glow':
        return {
          boxShadow: `0 0 0 3px ${theme.colors.blue[200]}40`,
          transition: `box-shadow ${theme.duration.fast}ms ${theme.easing.standard}, transform ${theme.duration.fast}ms ${theme.easing.standard}`,
        };
      default:
        return {};
    }
  }, [pressed, effect, disabled, theme]);

  return {
    pressed,
    pressProps: { onMouseDown, onMouseUp, onMouseLeave },
    pressStyle,
  };
}
