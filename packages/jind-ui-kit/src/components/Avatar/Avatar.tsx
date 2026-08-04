import { type CSSProperties } from 'react';
import { useTheme } from '../../theme/ThemeProvider';

export interface AvatarProps {
  src?: string;
  name?: string;
  size?: 'sm' | 'md' | 'lg';
  style?: CSSProperties;
  ref?: React.Ref<HTMLDivElement>;
}

const sizeMap = { sm: 24, md: 32, lg: 40 } as const;
const fontSizeMap = { sm: 10, md: 12, lg: 14 } as const;

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 0) return '';
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export function Avatar(
  { src, name, size = 'md', style, ref, ...rest }: AvatarProps,
) {
  const theme = useTheme();
  const px = sizeMap[size];

  const containerStyle: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: px,
    height: px,
    borderRadius: '50%',
    overflow: 'hidden',
    flexShrink: 0,
    backgroundColor: src ? undefined : theme.colors.gray[150],
    ...style,
  };

  if (src) {
    return (
      <div ref={ref} style={containerStyle} {...rest}>
        <img
          src={src}
          alt={name ?? ''}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
          }}
        />
      </div>
    );
  }

  const initials = name ? getInitials(name) : '';

  return (
    <div ref={ref} role="img" {...(name ? { 'aria-label': name } : {})} style={containerStyle} data-testid="avatar" {...rest}>
      {initials && (
        <span
          style={{
            fontFamily: theme.typeVariants.caption.fontFamily,
            fontSize: fontSizeMap[size],
            fontWeight: 500,
            lineHeight: 1,
            color: theme.colors.gray[600],
            userSelect: 'none',
          }}
        >
          {initials}
        </span>
      )}
    </div>
  );
}
