import {
  useEffect,
  useRef,
  useId,
  type CSSProperties,
  type ReactNode,
  type Ref,
} from 'react';
import { useTheme } from '../../theme/ThemeProvider';
import { useFocusTrap } from '../../hooks/useFocusTrap';
import { Portal } from '../../primitives/Portal/Portal';
import type { DismissDetails } from '../../types';

export interface DrawerProps {
  open: boolean;
  onClose?: (details?: DismissDetails) => void;
  placement?: 'left' | 'right' | 'top' | 'bottom';
  width?: number | string;
  height?: number | string;
  title?: string;
  children: ReactNode;
  footer?: ReactNode;
  style?: CSSProperties;
  ref?: Ref<HTMLDivElement>;
}

export function Drawer({
  open,
  onClose,
  placement = 'right',
  width = 380,
  height = '100%',
  title,
  children,
  footer,
  style,
  ref,
  ...rest
}: DrawerProps) {
  const theme = useTheme();
  const contentRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  useFocusTrap(contentRef, open);

  useEffect(() => {
    if (!open) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose?.({ reason: 'escape' });
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [open, onClose]);

  if (!open) return null;

  const isHorizontal = placement === 'left' || placement === 'right';

  const backdropStyle: CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.3)',
    zIndex: 1000,
  };

  const panelPosition: CSSProperties = {
    position: 'fixed',
    zIndex: 1001,
    ...(placement === 'right' && { top: 0, right: 0, bottom: 0 }),
    ...(placement === 'left' && { top: 0, left: 0, bottom: 0 }),
    ...(placement === 'top' && { top: 0, left: 0, right: 0 }),
    ...(placement === 'bottom' && { bottom: 0, left: 0, right: 0 }),
    width: isHorizontal ? width : '100%',
    height: isHorizontal ? '100%' : height,
  };

  const panelStyle: CSSProperties = {
    ...panelPosition,
    display: 'flex',
    flexDirection: 'column',
    background: theme.semantic.surface.card,
    boxShadow: theme.shadow.menu,
    ...style,
  };

  return (
    <Portal>
      <div style={backdropStyle} onClick={() => onClose?.({ reason: 'backdrop' })} aria-hidden="true" />
      <div ref={contentRef} role="dialog" aria-modal="true" aria-labelledby={title ? titleId : undefined} style={panelStyle} {...rest}>
        {title && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: `${theme.space[7]}px ${theme.space[8]}px`,
              borderBottom: `1px solid ${theme.semantic.border.subtle}`,
            }}
          >
            <span
              id={titleId}
              style={{
                fontFamily: theme.fontFamily.sans,
                fontSize: theme.fontSize[16],
                fontWeight: theme.fontWeight.bold,
                color: theme.semantic.text.primary,
              }}
            >
              {title}
            </span>
            <button
              type="button"
              onClick={() => onClose?.({ reason: 'close-button' })}
              aria-label="Close"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 32,
                height: 32,
                border: 'none',
                background: 'none',
                cursor: 'pointer',
                color: theme.semantic.icon.default,
              }}
            >
              <i className="iconoir-xmark" style={{ fontSize: 20 }} aria-hidden="true" />
            </button>
          </div>
        )}
        <div style={{ flex: 1, overflow: 'auto', padding: theme.space[8] }}>{children}</div>
        {footer && (
          <div
            style={{
              padding: `${theme.space[7]}px ${theme.space[8]}px`,
              borderTop: `1px solid ${theme.semantic.border.subtle}`,
            }}
          >
            {footer}
          </div>
        )}
      </div>
    </Portal>
  );
}
