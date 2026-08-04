import {
  useRef,
  useState,
  useEffect,
  type CSSProperties,
  type ReactNode,
  type Ref,
  type KeyboardEvent,
} from 'react';
import type { RadiusValue } from '../../types';
import { useTheme } from '../../theme/ThemeProvider';
import { useClickOutside } from '../../hooks/useClickOutside';
import { useControllableState } from '../../hooks/useControllableState';
import { useAutoFlip } from '../../hooks/useAutoFlip';
import { Portal } from '../../primitives/Portal/Portal';
import { resolveRadiusStyle, type PerCornerRadiusProps } from '../../utils/styles';

export interface PopoverProps extends PerCornerRadiusProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  placement?: 'top' | 'bottom' | 'left' | 'right';
  offset?: number;
  matchTriggerWidth?: boolean;
  content: ReactNode;
  children: ReactNode;
  radius?: RadiusValue;
  style?: CSSProperties;
  ref?: Ref<HTMLDivElement>;
}

export function Popover({
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  placement = 'bottom',
  offset = 6,
  matchTriggerWidth = false,
  content,
  children,
  radius = 'md',
  radiusTopLeft, radiusTopRight, radiusBottomRight, radiusBottomLeft,
  style,
  ref,
  ...rest
}: PopoverProps) {
  const theme = useTheme();
  const radiusStyle = resolveRadiusStyle(radius, { radiusTopLeft, radiusTopRight, radiusBottomRight, radiusBottomLeft });
  const [isOpen, setIsOpen] = useControllableState(openProp, defaultOpen, onOpenChange);
  const triggerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [triggerRect, setTriggerRect] = useState<DOMRect | null>(null);
  const resolvedPlacement = useAutoFlip(contentRef, placement, isOpen);

  useClickOutside(contentRef, () => setIsOpen(false), isOpen);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, setIsOpen]);

  const handleToggle = () => {
    if (!isOpen && triggerRef.current) {
      setTriggerRect(triggerRef.current.getBoundingClientRect());
    }
    setIsOpen(!isOpen);
  };

  const handleTriggerKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleToggle();
    }
  };

  const getPosition = (): CSSProperties => {
    if (!triggerRect) return {};
    const positions: Record<string, CSSProperties> = {
      bottom: {
        position: 'fixed',
        top: triggerRect.bottom + offset,
        left: triggerRect.left,
      },
      top: {
        position: 'fixed',
        bottom: window.innerHeight - triggerRect.top + offset,
        left: triggerRect.left,
      },
      left: {
        position: 'fixed',
        top: triggerRect.top,
        right: window.innerWidth - triggerRect.left + offset,
      },
      right: {
        position: 'fixed',
        top: triggerRect.top,
        left: triggerRect.right + offset,
      },
    };
    return {
      ...positions[resolvedPlacement],
      ...(matchTriggerWidth && { width: triggerRect.width }),
    };
  };

  return (
    <div ref={ref} style={{ display: 'inline-block', ...style }} {...rest}>
      <div
        ref={triggerRef}
        onClick={handleToggle}
        onKeyDown={handleTriggerKeyDown}
        tabIndex={0}
        role="button"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        style={{ display: 'inline-block' }}
      >
        {children}
      </div>
      {isOpen && (
        <Portal>
          <div
            ref={contentRef}
            role="dialog"
            aria-label="Popover"
            style={{
              ...getPosition(),
              zIndex: 1000,
              background: theme.semantic.surface.card,
              ...radiusStyle,
              boxShadow: theme.shadow.menu,
              padding: theme.space[6],
            }}
          >
            {content}
          </div>
        </Portal>
      )}
    </div>
  );
}
