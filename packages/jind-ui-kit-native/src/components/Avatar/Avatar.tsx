import { type Ref } from 'react';
import { Image, Text, View, type ViewStyle, type TextStyle } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';

export interface AvatarProps {
  ref?: Ref<View>;
  src?: string;
  name?: string;
  size?: 'sm' | 'md' | 'lg';
  style?: ViewStyle;
}

const sizeMap: Record<NonNullable<AvatarProps['size']>, number> = {
  sm: 24,
  md: 32,
  lg: 40,
};

const fontSizeMap: Record<NonNullable<AvatarProps['size']>, number> = {
  sm: 10,
  md: 12,
  lg: 14,
};

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 0) return '';
  const first = parts[0]?.[0] ?? '';
  const last = parts.length > 1 ? parts[parts.length - 1]?.[0] ?? '' : '';
  return (first + last).toUpperCase();
}

export function Avatar({ ref, src, name, size = 'md', style }: AvatarProps) {
  const theme = useTheme();
  const px = sizeMap[size];
  const fs = fontSizeMap[size];

  const containerStyle: ViewStyle = {
    width: px,
    height: px,
    borderRadius: px / 2,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.gray[150],
    ...style,
  };

  if (src) {
    return (
      <View ref={ref} style={containerStyle}>
        <Image
          source={{ uri: src }}
          style={{ width: px, height: px }}
          resizeMode="cover"
          accessibilityLabel={name ?? 'Avatar'}
        />
      </View>
    );
  }

  const initialsTextStyle: TextStyle = {
    fontSize: fs,
    fontWeight: theme.fontWeight.medium,
    color: theme.colors.gray[600],
    lineHeight: fs * 1.2,
  };

  return (
    <View ref={ref} style={containerStyle} accessibilityLabel={name ?? 'Avatar'}>
      <Text style={initialsTextStyle}>{name ? getInitials(name) : ''}</Text>
    </View>
  );
}
