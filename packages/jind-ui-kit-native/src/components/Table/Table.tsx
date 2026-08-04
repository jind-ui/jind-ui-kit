import { memo, type ReactNode } from 'react';
import type { Ref } from 'react';
import {
  Pressable,
  Text,
  View,
  type TextStyle,
  type ViewStyle,
} from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';

/* ---------------------------------------------------------------------------
 * TableCell
 * --------------------------------------------------------------------------- */

export interface TableCellProps {
  children?: ReactNode;
  align?: 'left' | 'center' | 'right';
  width?: number;
  header?: boolean;
  style?: ViewStyle;
  ref?: Ref<View>;
}

function TableCellInner({ ref, children, align = 'left', width, header = false, style }: TableCellProps) {
  const theme = useTheme();

  const variant = header ? theme.typeVariants.label : theme.typeVariants.body;
  const absoluteLineHeight = variant.fontSize * variant.lineHeight;

  const cellStyle: ViewStyle = {
    flex: width != null ? undefined : 1,
    width,
    paddingHorizontal: 14,
    justifyContent: 'center',
    ...style,
  };

  const textStyle: TextStyle = {
    fontFamily: variant.fontFamily,
    fontSize: variant.fontSize,
    fontWeight: header ? theme.fontWeight.medium : variant.fontWeight,
    lineHeight: absoluteLineHeight,
    color: header ? theme.semantic.text.muted : theme.semantic.text.primary,
    textAlign: align,
  };

  return (
    <View ref={ref} style={cellStyle}>
      {typeof children === 'string' || typeof children === 'number' ? (
        <Text style={textStyle} numberOfLines={1}>
          {children}
        </Text>
      ) : (
        children
      )}
    </View>
  );
}

export const TableCell = memo(TableCellInner);

/* ---------------------------------------------------------------------------
 * TableHeader
 * --------------------------------------------------------------------------- */

export interface TableHeaderProps {
  children: ReactNode;
  style?: ViewStyle;
  ref?: Ref<View>;
}

function TableHeaderInner({ ref, children, style }: TableHeaderProps) {
  const theme = useTheme();

  const headerStyle: ViewStyle = {
    flexDirection: 'row',
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: theme.semantic.border.default,
    alignItems: 'center',
    ...style,
  };

  return (
    <View ref={ref} style={headerStyle}>
      {children}
    </View>
  );
}

export const TableHeader = memo(TableHeaderInner);

/* ---------------------------------------------------------------------------
 * TableRow
 * --------------------------------------------------------------------------- */

export interface TableRowProps {
  children: ReactNode;
  onPress?: () => void;
  style?: ViewStyle;
  ref?: Ref<View>;
}

function TableRowInner({ ref, children, onPress, style }: TableRowProps) {
  const theme = useTheme();

  const baseStyle: ViewStyle = {
    height: 56,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: theme.semantic.border.subtle,
    alignItems: 'center',
  };

  if (onPress != null) {
    return (
      <Pressable
        ref={ref}
        onPress={onPress}
        style={({ pressed }: { pressed: boolean }) => ({
          ...baseStyle,
          backgroundColor: pressed ? theme.semantic.surface.hover : undefined,
          ...style,
        })}
        accessibilityRole="button"
      >
        {children}
      </Pressable>
    );
  }

  return (
    <View ref={ref} style={{ ...baseStyle, ...style }}>
      {children}
    </View>
  );
}

export const TableRow = memo(TableRowInner);

/* ---------------------------------------------------------------------------
 * Table (container)
 * --------------------------------------------------------------------------- */

export interface TableProps {
  children: ReactNode;
  outlined?: boolean;
  style?: ViewStyle;
  ref?: Ref<View>;
}

function TableInner({ ref, children, outlined = false, style }: TableProps) {
  const theme = useTheme();

  const containerStyle: ViewStyle = {
    backgroundColor: theme.semantic.surface.card,
    borderRadius: theme.radius.md,
    ...theme.shadow.card,
    overflow: 'hidden',
    ...(outlined
      ? {
          borderWidth: 1,
          borderColor: theme.semantic.border.default,
        }
      : undefined),
    ...style,
  };

  return (
    <View ref={ref} style={containerStyle}>
      {children}
    </View>
  );
}

export const Table = memo(TableInner);
