import {
  useState,
  useRef,
  useId,
  useCallback,
  useEffect,
  cloneElement,
  type CSSProperties,
  type ReactElement,
  type ReactNode,
} from 'react';
import type { RadiusValue } from '../../types';
import { useTheme } from '../../theme/ThemeProvider';
import { useAutoFlip } from '../../hooks/useAutoFlip';
import { resolveRadiusStyle, type PerCornerRadiusProps } from '../../utils/styles';

export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';

export interface TooltipProps extends PerCornerRadiusProps {
  content: ReactNode;
  radius?: RadiusValue;
  placement?: TooltipPlacement;
  delay?: number;
  children: ReactElement;
}

function getPlacementStyles(placement: TooltipPlacement): CSSProperties {
  switch (placement) {
    case 'top':
      return {
        bottom: 'calc(100% + 8px)',
        left: '50%',
        transform: 'translateX(-50%)',
      };
    case 'bottom':
      return {
        top: 'calc(100% + 8px)',
        left: '50%',
        transform: 'translateX(-50%)',
      };
    case 'left':
      return {
        right: 'calc(100% + 8px)',
        top: '50%',
        transform: 'translateY(-50%)',
      };
    case 'right':
      return {
        left: 'calc(100% + 8px)',
        top: '50%',
        transform: 'translateY(-50%)',
      };
  }
}

export function Tooltip({
  content,
  radius = 'xs',
  placement = 'top',
  delay = 200,
  children,
  radiusTopLeft, radiusTopRight, radiusBottomRight, radiusBottomLeft,
}: TooltipProps) {
  const theme = useTheme();
  const radiusStyle = resolveRadiusStyle(radius, { radiusTopLeft, radiusTopRight, radiusBottomRight, radiusBottomLeft });
  const [visible, setVisible] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const tooltipId = useId();
  const resolvedPlacement = useAutoFlip(tooltipRef, placement, visible);

  const show = useCallback(() => {
    timeoutRef.current = setTimeout(() => {
      setVisible(true);
    }, delay);
  }, [delay]);

  const hide = useCallback(() => {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setVisible(false);
  }, []);

  useEffect(() => {
    if (!visible) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') hide();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [visible, hide]);

  const wrapperStyle: CSSProperties = {
    display: 'inline-block',
    position: 'relative',
  };

  const tooltipStyle: CSSProperties = {
    position: 'absolute',
    backgroundColor: theme.colors.gray[900],
    color: '#ffffff',
    ...theme.typeVariants.caption,
    ...radiusStyle,
    padding: '8px 12px',
    boxShadow: theme.shadow.sm,
    whiteSpace: 'nowrap',
    zIndex: 1000,
    pointerEvents: 'none',
    ...getPlacementStyles(resolvedPlacement),
  };

  return (
    <div
      style={wrapperStyle}
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      {cloneElement(children, {
        'aria-describedby': visible ? tooltipId : undefined,
      } as Record<string, unknown>)}
      {visible && (
        <div ref={tooltipRef} id={tooltipId} role="tooltip" style={tooltipStyle}>
          {content}
        </div>
      )}
    </div>
  );
}
