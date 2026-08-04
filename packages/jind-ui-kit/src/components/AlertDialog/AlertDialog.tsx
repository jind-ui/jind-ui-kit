import {
  useEffect,
  useRef,
  useCallback,
  useId,
  type CSSProperties,
  type Ref,
} from 'react';
import type { Tone, RadiusValue } from '../../types';
import { useTheme } from '../../theme/ThemeProvider';
import { Portal } from '../../primitives/Portal/Portal';
import { useFocusTrap } from '../../hooks/useFocusTrap';
import { transition, resolveRadiusStyle, type PerCornerRadiusProps } from '../../utils/styles';

export interface AlertDialogProps extends PerCornerRadiusProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  cancelLabel?: string;
  confirmLabel?: string;
  onConfirm: () => void;
  onCancel?: () => void;
  tone?: Tone;
  radius?: RadiusValue;
  style?: CSSProperties;
  ref?: Ref<HTMLDivElement>;
}

function getToneButtonColors(tone: Tone, theme: ReturnType<typeof useTheme>) {
  const { colors } = theme;
  const map: Record<Tone, { bg: string; text: string }> = {
    neutral: { bg: colors.gray[700], text: colors.gray[0] },
    primary: { bg: colors.blue[600], text: colors.gray[0] },
    danger: { bg: colors.red[500], text: colors.gray[0] },
    success: { bg: colors.green[500], text: colors.gray[0] },
    warning: { bg: colors.amber[500], text: colors.gray[0] },
    info: { bg: colors.teal[600], text: colors.gray[0] },
    accent: { bg: colors.purple[500], text: colors.gray[0] },
    brand: { bg: colors.blue[600], text: colors.gray[0] },
  };
  return map[tone];
}

export function AlertDialog({
  open,
  onOpenChange,
  title,
  description,
  cancelLabel = 'Cancel',
  confirmLabel = 'Confirm',
  onConfirm,
  onCancel,
  tone = 'danger',
  radius = 'lg',
  radiusTopLeft, radiusTopRight, radiusBottomRight, radiusBottomLeft,
  style,
  ref,
}: AlertDialogProps) {
  const theme = useTheme();
  const radiusStyle = resolveRadiusStyle(radius, { radiusTopLeft, radiusTopRight, radiusBottomRight, radiusBottomLeft });
  const contentRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const descId = useId();
  const toneColors = getToneButtonColors(tone, theme);

  useFocusTrap(contentRef, open);

  const handleClose = useCallback(() => {
    onOpenChange(false);
  }, [onOpenChange]);

  const handleCancel = useCallback(() => {
    onCancel?.();
    handleClose();
  }, [onCancel, handleClose]);

  const handleConfirm = useCallback(() => {
    onConfirm();
    handleClose();
  }, [onConfirm, handleClose]);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleCancel();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, handleCancel]);

  if (!open) return null;

  const backdropStyle: CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1000,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const dialogStyle: CSSProperties = {
    backgroundColor: theme.semantic.surface.card,
    ...radiusStyle,
    boxShadow: theme.shadow.menu,
    width: 420,
    maxWidth: '90vw',
    boxSizing: 'border-box' as const,
    ...style,
  };

  const bodyStyle: CSSProperties = {
    padding: theme.space[9],
  };

  const titleStyle: CSSProperties = {
    fontSize: theme.fontSize[16],
    fontWeight: theme.fontWeight.bold,
    lineHeight: theme.lineHeight.normal,
    color: theme.semantic.text.primary,
    fontFamily: theme.fontFamily.sans,
    margin: 0,
  };

  const descriptionStyle: CSSProperties = {
    fontSize: theme.fontSize[14],
    fontWeight: theme.fontWeight.regular,
    lineHeight: theme.lineHeight.normal,
    color: theme.semantic.text.secondary,
    fontFamily: theme.fontFamily.sans,
    margin: 0,
    marginTop: theme.space[4],
  };

  const footerStyle: CSSProperties = {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: theme.space[6],
    padding: `${theme.space[7]}px ${theme.space[9]}px`,
    borderTop: `1px solid ${theme.semantic.border.subtle}`,
  };

  const baseButtonStyle: CSSProperties = {
    padding: `${theme.space[4]}px ${theme.controlPadding.button}px`,
    borderRadius: theme.radius.md,
    fontSize: theme.fontSize[14],
    fontWeight: theme.fontWeight.medium,
    fontFamily: theme.fontFamily.sans,
    cursor: 'pointer',
    border: 'none',
    transition: transition('background-color', 'opacity'),
    lineHeight: theme.lineHeight.normal,
  };

  const cancelButtonStyle: CSSProperties = {
    ...baseButtonStyle,
    backgroundColor: theme.semantic.surface.subtle,
    color: theme.semantic.text.primary,
    border: `1px solid ${theme.semantic.border.default}`,
  };

  const confirmButtonStyle: CSSProperties = {
    ...baseButtonStyle,
    backgroundColor: toneColors.bg,
    color: toneColors.text,
  };

  return (
    <Portal>
      <div style={backdropStyle} ref={ref}>
        <div
          ref={contentRef}
          role="alertdialog"
          aria-modal="true"
          aria-labelledby={titleId}
          aria-describedby={description ? descId : undefined}
          style={dialogStyle}
        >
          <div style={bodyStyle}>
            <h2 id={titleId} style={titleStyle}>
              {title}
            </h2>
            {description != null && (
              <p id={descId} style={descriptionStyle}>
                {description}
              </p>
            )}
          </div>
          <div style={footerStyle}>
            <button type="button" style={cancelButtonStyle} onClick={handleCancel}>
              {cancelLabel}
            </button>
            <button type="button" style={confirmButtonStyle} onClick={handleConfirm}>
              {confirmLabel}
            </button>
          </div>
        </div>
      </div>
    </Portal>
  );
}
