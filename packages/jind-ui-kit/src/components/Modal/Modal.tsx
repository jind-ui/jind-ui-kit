import {
  useEffect,
  useRef,
  useCallback,
  useId,
  type CSSProperties,
  type ReactNode,
  type Ref,
} from 'react';
import { createPortal } from 'react-dom';
import { useTheme } from '../../theme/ThemeProvider';
import { useFocusTrap } from '../../hooks/useFocusTrap';
import { useClickOutside } from '../../hooks/useClickOutside';
import type { DismissDetails, DismissReason, RadiusValue } from '../../types';
import { resolveRadiusStyle, type PerCornerRadiusProps } from '../../utils/styles';

export interface ModalProps extends PerCornerRadiusProps {
  open: boolean;
  onClose?: (details?: DismissDetails) => void;
  title?: string;
  radius?: RadiusValue;
  width?: number | string;
  children: ReactNode;
  footer?: ReactNode;
  style?: CSSProperties;
  ref?: Ref<HTMLDivElement>;
}

export function Modal({
  open,
  onClose,
  title,
  radius = 'md',
  width = 480,
  children,
  footer,
  style,
  ref,
  radiusTopLeft, radiusTopRight, radiusBottomRight, radiusBottomLeft,
}: ModalProps) {
  const theme = useTheme();
  const contentRef = useRef<HTMLDivElement>(null);
  const titleId = useId();

  useFocusTrap(contentRef, open);

  const handleClickOutside = useCallback(() => {
    onClose?.({ reason: 'backdrop' });
  }, [onClose]);

  useClickOutside(contentRef, handleClickOutside, open);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose?.({ reason: 'escape' });
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const backdropStyle: CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    zIndex: 1000,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const radiusStyle = resolveRadiusStyle(radius, { radiusTopLeft, radiusTopRight, radiusBottomRight, radiusBottomLeft });

  const contentStyle: CSSProperties = {
    backgroundColor: theme.semantic.surface.card,
    ...radiusStyle,
    boxShadow: theme.shadow.menu,
    maxHeight: '90vh',
    overflowY: 'auto',
    width,
    boxSizing: 'border-box',
    ...style,
  };

  const headerStyle: CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 24px',
    borderBottom: `1px solid ${theme.semantic.border.subtle}`,
  };

  const titleStyle: CSSProperties = {
    ...theme.typeVariants['card-title'],
    color: theme.semantic.text.primary,
    margin: 0,
  };

  const closeButtonStyle: CSSProperties = {
    width: 24,
    height: 24,
    border: 'none',
    background: 'none',
    cursor: 'pointer',
    color: theme.semantic.icon.muted,
    fontSize: 16,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    lineHeight: 1,
  };

  const bodyStyle: CSSProperties = {
    padding: 24,
  };

  const footerStyle: CSSProperties = {
    borderTop: `1px solid ${theme.semantic.border.subtle}`,
    padding: '16px 24px',
  };

  return createPortal(
    <div style={backdropStyle} role="dialog" aria-modal="true" aria-labelledby={title ? titleId : undefined} ref={ref}>
      <div ref={contentRef} style={contentStyle}>
        {(title || onClose) && (
          <div style={headerStyle}>
            {title && <h2 id={titleId} style={titleStyle}>{title}</h2>}
            {onClose && (
              <button
                type="button"
                style={closeButtonStyle}
                onClick={() => onClose?.({ reason: 'close-button' })}
                aria-label="Close"
              >
                &#x78;
              </button>
            )}
          </div>
        )}
        <div style={bodyStyle}>{children}</div>
        {footer && <div style={footerStyle}>{footer}</div>}
      </div>
    </div>,
    document.body,
  );
}
