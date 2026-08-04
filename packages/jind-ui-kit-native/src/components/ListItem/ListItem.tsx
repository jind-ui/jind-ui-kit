import type { Ref, ReactNode } from 'react';
import { memo } from 'react';
import {
  Pressable,
  Text,
  View,
  type TextStyle,
  type ViewStyle,
} from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';

export interface ListItemProps {
  title: string;
  subtitle?: string;
  left?: ReactNode;
  right?: ReactNode;
  onPress?: () => void;
  showSeparator?: boolean;
  showChevron?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  testID?: string;
  ref?: Ref<View>;
}

function ListItemInner({
  ref,
  title,
  subtitle,
  left,
  right,
  onPress,
  showSeparator = false,
  showChevron = false,
  disabled = false,
  style,
  testID,
}: ListItemProps) {
  const theme = useTheme();

  const padding = theme.space[7]; // 16px

  const pressableStyle = (pressed: boolean): ViewStyle => ({
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: padding,
    paddingHorizontal: padding,
    backgroundColor: pressed ? theme.semantic.surface.hover : undefined,
    opacity: disabled ? 0.5 : 1,
    ...style,
  });

  const leftAreaStyle: ViewStyle = {
    marginRight: theme.space[7],
  };

  const centerStyle: ViewStyle = {
    flex: 1,
    justifyContent: 'center',
  };

  const titleStyle: TextStyle = {
    fontSize: theme.fontSize[14],
    fontWeight: theme.fontWeight.medium,
    fontFamily: theme.fontFamily.sans,
    color: theme.semantic.text.primary,
  };

  const subtitleStyle: TextStyle = {
    fontSize: theme.fontSize[13],
    fontWeight: theme.fontWeight.regular,
    fontFamily: theme.fontFamily.sans,
    color: theme.semantic.text.secondary,
    marginTop: theme.space[1],
  };

  const chevronStyle: TextStyle = {
    fontSize: theme.fontSize[16],
    color: theme.semantic.text.muted,
    fontFamily: theme.fontFamily.sans,
  };

  // Indent separator to align with title text
  const leftMargin = theme.space[7] ?? 16;
  const separatorIndent = left != null ? (padding ?? 0) * 2 + leftMargin : padding;
  const separatorStyle: ViewStyle = {
    height: theme.borderWidth.default,
    backgroundColor: theme.semantic.border.subtle,
    marginLeft: separatorIndent,
  };

  return (
    <View ref={ref}>
      <Pressable
        style={({ pressed }: { pressed: boolean }) => pressableStyle(pressed)}
        onPress={onPress}
        disabled={disabled || !onPress}
        testID={testID}
        accessibilityRole="button"
        accessibilityState={{ disabled }}
      >
        {left != null && <View style={leftAreaStyle}>{left}</View>}
        <View style={centerStyle}>
          <Text style={titleStyle} numberOfLines={1}>
            {title}
          </Text>
          {subtitle != null && (
            <Text style={subtitleStyle} numberOfLines={2}>
              {subtitle}
            </Text>
          )}
        </View>
        {right != null ? (
          <View>{right}</View>
        ) : showChevron ? (
          <Text style={chevronStyle} accessibilityElementsHidden>
            {'›'}
          </Text>
        ) : null}
      </Pressable>
      {showSeparator && <View style={separatorStyle} />}
    </View>
  );
}

export const ListItem = memo(ListItemInner);
