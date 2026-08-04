import type { Ref, ReactNode } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  type ViewStyle,
} from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';

export interface MenuItemProps {
  /** Emoji or text icon rendered before the label. */
  icon?: string;
  /** Color for a circular swatch rendered before the label. */
  swatch?: string;
  /** Whether this item is in a selected state. */
  selected?: boolean;
  /** Whether the item is disabled (reduces opacity, disables press). */
  disabled?: boolean;
  /** Content rendered at the trailing edge of the row. */
  trailing?: ReactNode;
  /** Called when the item is pressed. */
  onPress?: () => void;
  /** Label content for the menu item. */
  children: ReactNode;
  /** Additional styles applied to the root container. */
  style?: ViewStyle;
  ref?: Ref<View>;
}

/**
 * An individual item within a Menu.
 *
 * Supports leading icon or color swatch, trailing content, selected
 * state with a checkmark, and disabled state.
 */
export function MenuItem({
  ref,
  icon,
  swatch,
  selected,
  disabled,
  trailing,
  onPress,
  children,
  style,
}: MenuItemProps) {
  const theme = useTheme();

  return (
    <Pressable
      ref={ref}
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="menuitem"
      accessibilityState={{ disabled, selected }}
      style={({ pressed }) => [
        styles.row,
        {
          backgroundColor: pressed
            ? theme.semantic.surface.hover
            : 'transparent',
          opacity: disabled ? 0.5 : 1,
        } as ViewStyle,
        style,
      ]}
    >
      {/* Icon */}
      {icon != null && (
        <Text
          style={{
            fontSize: 20,
            color: theme.semantic.icon.default,
          }}
        >
          {icon}
        </Text>
      )}

      {/* Color swatch */}
      {swatch != null && (
        <View
          style={[
            styles.swatch,
            { backgroundColor: swatch },
          ]}
        >
          <View style={styles.swatchDot} />
        </View>
      )}

      {/* Label */}
      <Text
        style={[
          styles.label,
          {
            fontFamily: theme.fontFamily.sans,
            fontSize: theme.fontSize[16],
            fontWeight: theme.fontWeight.medium,
            lineHeight: theme.fontSize[16] * 1.3,
            color: theme.semantic.text.primary,
          },
        ]}
        numberOfLines={1}
      >
        {children}
      </Text>

      {/* Trailing */}
      {trailing != null && (
        <View style={styles.trailing}>{trailing}</View>
      )}

      {/* Selected checkmark */}
      {selected && (
        <Text
          style={{
            fontSize: 16,
            color: theme.semantic.text.primary,
          }}
        >
          {'✓'}
        </Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    height: 48,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  swatch: {
    width: 26,
    height: 26,
    borderRadius: 999,
    justifyContent: 'center',
    alignItems: 'center',
  },
  swatchDot: {
    width: 10,
    height: 10,
    borderRadius: 999,
    backgroundColor: '#ffffff',
  },
  label: {
    flex: 1,
  },
  trailing: {
    flexShrink: 0,
    alignItems: 'center',
  },
});
