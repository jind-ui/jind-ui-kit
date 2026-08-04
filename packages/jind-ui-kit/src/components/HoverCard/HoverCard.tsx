import {
  useState,
  useRef,
  useCallback,
  type CSSProperties,
  type ReactNode,
  type Ref,
} from 'react';
import type { RadiusValue } from '../../types';
import { useTheme } from '../../theme/ThemeProvider';
import { mergeStyles, resolveRadiusStyle, type PerCornerRadiusProps } from '../../utils/styles';

export interface HoverCardProps extends PerCornerRadiusProps {
  trigger: ReactNode;
  children: ReactNode;
  side?: 'top' | 'bottom';
  align?: 'start' | 'center' | 'end';
  openDelay?: number;
  closeDelay?: number;
  radius?: RadiusValue;
  style?: CSSProperties;
  ref?: Ref<HTMLDivElement>;
}

function getAlignmentStyles(align: 'start' | 'center' | 'end'): CSSProperties {
  switch (align) {
    case 'start':
      return { left: 0 };
    case 'center':
      return { left: '50%', transform: 'translateX(-50%)' };
    case 'end':
      return { right: 0 };
  }
}

function getSideStyles(side: 'top' | 'bottom', offset: number): CSSProperties {
  if (side === 'top') {
    return { bottom: `calc(100% + ${offset}px)` };
  }
  return { top: `calc(100% + ${offset}px)` };
}

export function HoverCard({
  trigger,
  children,
  side = 'bottom',
  align = 'center',
  openDelay = 300,
  closeDelay = 150,
  radius = 'lg',
  radiusTopLeft, radiusTopRight, radiusBottomRight, radiusBottomLeft,
  style,
  ref,
}: HoverCardProps) {
  const theme = useTheme();
  const radiusStyle = resolveRadiusStyle(radius, { radiusTopLeft, radiusTopRight, radiusBottomRight, radiusBottomLeft });
  const [visible, setVisible] = useState(false);
  const openTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimers = useCallback(() => {
    if (openTimerRef.current !== null) {
      clearTimeout(openTimerRef.current);
      openTimerRef.current = null;
    }
    if (closeTimerRef.current !== null) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }, []);

  const handleMouseEnter = useCallback(() => {
    clearTimers();
    openTimerRef.current = setTimeout(() => {
      setVisible(true);
    }, openDelay);
  }, [openDelay, clearTimers]);

  const handleMouseLeave = useCallback(() => {
    clearTimers();
    closeTimerRef.current = setTimeout(() => {
      setVisible(false);
    }, closeDelay);
  }, [closeDelay, clearTimers]);

  const wrapperStyle: CSSProperties = mergeStyles(
    {
      display: 'inline-block',
      position: 'relative',
    },
    style,
  );

  const offset = 8;

  const cardBaseStyle: CSSProperties = {
    position: 'absolute',
    ...getSideStyles(side, offset),
    ...getAlignmentStyles(align),
    background: theme.semantic.surface.card,
    border: `1px solid ${theme.semantic.border.default}`,
    boxShadow: theme.shadow.menu,
    ...radiusStyle,
    padding: theme.space[7],
    maxWidth: 320,
    zIndex: 1000,
    boxSizing: 'border-box',
    opacity: visible ? 1 : 0,
    pointerEvents: visible ? 'auto' : 'none',
    transition: 'opacity 150ms ease, transform 150ms ease',
  };

  // Apply transform for animation, merging with alignment transform
  const translateY = side === 'bottom' ? (visible ? 0 : -4) : (visible ? 0 : 4);
  if (align === 'center') {
    cardBaseStyle.transform = `translateX(-50%) translateY(${translateY}px)`;
  } else {
    cardBaseStyle.transform = `translateY(${translateY}px)`;
  }

  return (
    <div
      ref={ref}
      style={wrapperStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {trigger}
      <div role="tooltip" style={cardBaseStyle}>
        {children}
      </div>
    </div>
  );
}
