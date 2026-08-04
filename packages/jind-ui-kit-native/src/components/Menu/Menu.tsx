import React, { type ReactNode, type Ref } from 'react';
import {
  StyleSheet,
  Text,
  View,
  type ViewStyle,
} from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';

export interface MenuProps {
  /** Optional header label displayed at the top of the menu. */
  header?: string;
  /** Fixed width for the menu container. */
  width?: number;
  /** When true, renders divider lines between children. */
  dividers?: boolean;
  /** Menu items to render. */
  children: ReactNode;
  /** Additional styles applied to the root container. */
  style?: ViewStyle;
  ref?: Ref<View>;
}

/**
 * A card-styled menu container for grouping MenuItems.
 *
 * Supports an optional header, configurable width, and inter-item dividers.
 */
export function Menu({ ref, header, width, dividers, children, style }: MenuProps) {
  const theme = useTheme();

  const labelVariant = theme.typeVariants.label;
  const labelLineHeight = labelVariant.fontSize * labelVariant.lineHeight;

  const items = React.Children.toArray(children);

  return (
    <View
      ref={ref}
      style={[
        styles.container,
        {
          backgroundColor: theme.semantic.surface.card,
          borderRadius: theme.radius.md,
          paddingBottom: 6,
          ...theme.shadow.menu,
        } as ViewStyle,
        width != null ? { width } : undefined,
        style,
      ]}
    >
      {/* Header */}
      {header != null && (
        <View
          style={[
            styles.header,
            {
              borderBottomWidth: 1,
              borderBottomColor: theme.semantic.border.subtle,
              marginBottom: 6,
            },
          ]}
        >
          <Text
            style={{
              fontFamily: labelVariant.fontFamily,
              fontSize: labelVariant.fontSize,
              fontWeight: labelVariant.fontWeight,
              lineHeight: labelLineHeight,
              color: theme.semantic.text.muted,
            }}
          >
            {header}
          </Text>
        </View>
      )}

      {/* Items (with optional dividers) */}
      {dividers
        ? items.map((child, index) => (
            <React.Fragment key={index}>
              {child}
              {index < items.length - 1 && (
                <View
                  style={{
                    height: StyleSheet.hairlineWidth,
                    backgroundColor: theme.semantic.border.default,
                    marginHorizontal: 14,
                  }}
                />
              )}
            </React.Fragment>
          ))
        : children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  header: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 14,
    paddingBottom: 10,
  },
});
