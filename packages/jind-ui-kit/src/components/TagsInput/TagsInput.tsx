import React, { useState, useId, CSSProperties } from 'react';
import type { RadiusValue } from '../../types';
import { transition, resolveRadiusStyle, type PerCornerRadiusProps } from '../../utils/styles';
import { useTheme } from '../../theme/ThemeProvider';

export interface TagsInputProps extends PerCornerRadiusProps {
  tags: string[];
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  helperText?: string;
  onRemove?: (index: number) => void;
  radius?: RadiusValue;
  style?: CSSProperties;
}

export const TagsInput: React.FC<TagsInputProps> = ({
  tags,
  placeholder = 'Add tag...',
  disabled = false,
  error = false,
  helperText,
  onRemove,
  radius = 'sm',
  radiusTopLeft, radiusTopRight, radiusBottomRight, radiusBottomLeft,
  style,
}) => {
  const theme = useTheme();
  const [focused, setFocused] = useState(false);
  const autoId = useId();
  const helperId = helperText ? `${autoId}-helper` : undefined;
  const radiusStyle = resolveRadiusStyle(radius, { radiusTopLeft, radiusTopRight, radiusBottomRight, radiusBottomLeft });

  const wrapperStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.space[4],
    ...style,
  };

  const containerStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap' as const,
    gap: 6,
    width: '100%',
    minHeight: theme.controlHeight.md,
    padding: `6px ${theme.controlPadding.field}px`,
    ...radiusStyle,
    background: disabled
      ? theme.semantic.surface.subtle
      : focused
        ? theme.semantic.surface.card
        : theme.semantic.surface.subtle,
    border: error
      ? `2px solid ${theme.colors.red[600]}`
      : focused
        ? `2px solid ${theme.semantic.border.focus}`
        : `1px solid ${theme.semantic.border.subtle}`,
    boxShadow: error
      ? theme.focusRing.danger
      : focused
        ? theme.focusRing.primary
        : theme.shadow.xs,
    color: disabled ? theme.semantic.text.muted : theme.semantic.text.primary,
    fontFamily: theme.typeVariants.label.fontFamily,
    fontSize: theme.typeVariants.label.fontSize,
    transition: transition('background-color', 'border-color', 'box-shadow'),
    opacity: disabled ? 0.6 : 1,
    boxSizing: 'border-box' as const,
  };

  const tagStyle: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 4,
    height: 26,
    padding: '0 8px',
    borderRadius: theme.radius.xs,
    background: theme.colors.gray[150],
    fontSize: 13,
    fontWeight: 500,
    color: theme.semantic.text.primary,
  };

  const removeButtonStyle: CSSProperties = {
    fontSize: 14,
    color: theme.semantic.icon.muted,
    cursor: disabled ? 'default' : 'pointer',
    lineHeight: 1,
    display: 'flex',
    alignItems: 'center',
  };

  const placeholderStyle: CSSProperties = {
    color: theme.semantic.text.muted,
  };

  const helperStyle: CSSProperties = {
    fontFamily: theme.fontFamily.sans,
    fontSize: theme.fontSize[12],
    color: error ? theme.colors.red[600] : theme.semantic.text.muted,
  };

  return (
    <div style={wrapperStyle}>
      <div
        role="group"
        aria-label="Tags"
        aria-invalid={error || undefined}
        aria-describedby={helperId}
        style={containerStyle}
        tabIndex={0}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        data-testid="tags-input"
      >
        {tags.map((tag, index) => (
          <span key={index} style={tagStyle} data-testid="tag">
            {tag}
            <button
              type="button"
              data-testid="tag-remove"
              style={{ ...removeButtonStyle, background: 'none', border: 'none', padding: 0 }}
              tabIndex={disabled ? -1 : 0}
              aria-label={`Remove ${tag}`}
              onClick={() => {
                if (!disabled && onRemove) {
                  onRemove(index);
                }
              }}
            >
              {'×'}
            </button>
          </span>
        ))}
        {tags.length === 0 && <span style={placeholderStyle}>{placeholder}</span>}
      </div>
      {helperText && <span id={helperId} style={helperStyle}>{helperText}</span>}
    </div>
  );
};
