import React, { useState, CSSProperties } from 'react';
import type { RadiusValue } from '../../types';
import { resolveRadiusStyle, type PerCornerRadiusProps } from '../../utils/styles';
import { useTheme } from '../../theme/ThemeProvider';

export interface TagsInputProps extends PerCornerRadiusProps {
  tags: string[];
  placeholder?: string;
  disabled?: boolean;
  onRemove?: (index: number) => void;
  radius?: RadiusValue;
  style?: CSSProperties;
}

export const TagsInput: React.FC<TagsInputProps> = ({
  tags,
  placeholder = 'Add tag...',
  disabled = false,
  onRemove,
  radius = 'sm',
  radiusTopLeft, radiusTopRight, radiusBottomRight, radiusBottomLeft,
  style,
}) => {
  const theme = useTheme();
  const [focused, setFocused] = useState(false);
  const radiusStyle = resolveRadiusStyle(radius, { radiusTopLeft, radiusTopRight, radiusBottomRight, radiusBottomLeft });

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
    border: focused
      ? `2px solid ${theme.semantic.border.focus}`
      : `1px solid ${theme.semantic.border.subtle}`,
    boxShadow: focused ? theme.focusRing.primary : theme.shadow.xs,
    color: disabled ? theme.semantic.text.muted : theme.semantic.text.primary,
    fontFamily: theme.typeVariants.label.fontFamily,
    fontSize: theme.typeVariants.label.fontSize,
    transition: `background-color ${theme.duration.fast}ms ${theme.easing.standard}, border-color ${theme.duration.fast}ms ${theme.easing.standard}, box-shadow ${theme.duration.fast}ms ${theme.easing.standard}`,
    opacity: disabled ? 0.6 : 1,
    boxSizing: 'border-box' as const,
    ...style,
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

  return (
    <div
      role="group"
      aria-label="Tags"
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
  );
};
