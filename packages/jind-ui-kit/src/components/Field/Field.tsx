import { useId, type CSSProperties, type ReactNode } from 'react';
import { useTheme } from '../../theme/ThemeProvider';

export interface FieldProps {
  label?: string;
  hint?: string;
  htmlFor?: string;
  error?: string;
  children: ReactNode;
  style?: CSSProperties;
}

export function Field({ label, hint, htmlFor, error, children, style }: FieldProps) {
  const theme = useTheme();
  const autoId = useId();
  const fieldId = htmlFor ?? `${autoId}-field`;
  const hintId = hint ? `${autoId}-hint` : undefined;
  const errorId = error ? `${autoId}-error` : undefined;

  const wrapperStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.fieldLabelGap,
    ...style,
  };

  const labelStyle: CSSProperties = {
    fontFamily: theme.typeVariants.label.fontFamily,
    fontSize: theme.typeVariants.label.fontSize,
    fontWeight: theme.typeVariants.label.fontWeight,
    lineHeight: theme.typeVariants.label.lineHeight,
    color: theme.semantic.text.secondary,
  };

  const hintStyle: CSSProperties = {
    fontFamily: theme.typeVariants.caption.fontFamily,
    fontSize: theme.typeVariants.caption.fontSize,
    fontWeight: theme.fontWeight.regular,
    lineHeight: theme.typeVariants.caption.lineHeight,
    color: theme.semantic.text.muted,
  };

  const errorStyle: CSSProperties = {
    fontFamily: theme.typeVariants.caption.fontFamily,
    fontSize: theme.typeVariants.caption.fontSize,
    fontWeight: theme.fontWeight.regular,
    lineHeight: theme.typeVariants.caption.lineHeight,
    color: theme.semantic.text.danger,
  };

  return (
    <div style={wrapperStyle}>
      {label && (
        <label htmlFor={fieldId} style={labelStyle}>
          {label}
        </label>
      )}
      {hint && <span id={hintId} style={hintStyle}>{hint}</span>}
      {children}
      {error && <span id={errorId} role="alert" style={errorStyle}>{error}</span>}
    </div>
  );
}
