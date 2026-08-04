import { type ReactNode, type Ref } from 'react';
import { Pressable, Text, View, type TextStyle, type ViewStyle } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';

export interface BreadcrumbItem {
  label: string;
  onPress?: () => void;
}

export interface BreadcrumbsProps {
  ref?: Ref<View>;
  items: BreadcrumbItem[];
  separator?: ReactNode;
  maxItems?: number;
  style?: ViewStyle;
  testID?: string;
}

function getVisibleItems(items: readonly BreadcrumbItem[], maxItems: number | undefined): readonly BreadcrumbItem[] {
  if (maxItems == null || items.length <= maxItems) {
    return items;
  }
  const first = items[0];
  const lastCount = maxItems - 1;
  const tail = items.slice(items.length - lastCount);
  return [first, ...tail];
}

export function Breadcrumbs({
  ref,
  items,
  separator,
  maxItems,
  style,
  testID,
}: BreadcrumbsProps) {
  const theme = useTheme();
  const showEllipsis = maxItems != null && items.length > maxItems;
  const visibleItems = getVisibleItems(items, maxItems);

  const containerStyle: ViewStyle = {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: theme.space[2],
    ...style,
  };

  const separatorTextStyle: TextStyle = {
    fontSize: theme.fontSize[14],
    fontFamily: theme.fontFamily.sans,
    color: theme.semantic.text.muted,
  };

  const linkTextStyle: TextStyle = {
    fontSize: theme.fontSize[14],
    fontFamily: theme.fontFamily.sans,
    fontWeight: theme.fontWeight.regular,
    color: theme.semantic.fill.primary,
  };

  const activeTextStyle: TextStyle = {
    fontSize: theme.fontSize[14],
    fontFamily: theme.fontFamily.sans,
    fontWeight: theme.fontWeight.bold,
    color: theme.semantic.text.primary,
  };

  const plainTextStyle: TextStyle = {
    fontSize: theme.fontSize[14],
    fontFamily: theme.fontFamily.sans,
    fontWeight: theme.fontWeight.regular,
    color: theme.semantic.text.muted,
  };

  const ellipsisStyle: TextStyle = {
    fontSize: theme.fontSize[14],
    fontFamily: theme.fontFamily.sans,
    color: theme.semantic.text.muted,
    letterSpacing: 1,
  };

  const renderSeparator = (key: string) => {
    if (separator != null) {
      return <View key={key}>{separator}</View>;
    }
    return (
      <Text key={key} style={separatorTextStyle}>
        {'/'}
      </Text>
    );
  };

  const renderItem = (item: BreadcrumbItem, isLast: boolean, key: string) => {
    if (isLast) {
      return (
        <Text
          key={key}
          style={activeTextStyle}
          accessibilityRole="text"
          accessibilityState={{ selected: true }}
        >
          {item.label}
        </Text>
      );
    }

    if (item.onPress != null) {
      return (
        <Pressable
          key={key}
          onPress={item.onPress}
          accessibilityRole="link"
          accessibilityLabel={item.label}
        >
          <Text style={linkTextStyle}>{item.label}</Text>
        </Pressable>
      );
    }

    return (
      <Text key={key} style={plainTextStyle}>
        {item.label}
      </Text>
    );
  };

  const elements: ReactNode[] = [];

  if (showEllipsis) {
    elements.push(renderItem(visibleItems[0], false, 'item-first'));
    elements.push(renderSeparator('sep-first'));

    elements.push(
      <Text key="ellipsis" style={ellipsisStyle} accessibilityLabel="More items">
        {'...'}
      </Text>,
    );
    elements.push(renderSeparator('sep-ellipsis'));

    for (let i = 1; i < visibleItems.length; i++) {
      const isLast = i === visibleItems.length - 1;
      elements.push(renderItem(visibleItems[i], isLast, `item-${String(i)}`));
      if (!isLast) {
        elements.push(renderSeparator(`sep-${String(i)}`));
      }
    }
  } else {
    for (let i = 0; i < visibleItems.length; i++) {
      const isLast = i === visibleItems.length - 1;
      elements.push(renderItem(visibleItems[i], isLast, `item-${String(i)}`));
      if (!isLast) {
        elements.push(renderSeparator(`sep-${String(i)}`));
      }
    }
  }

  return (
    <View
      ref={ref}
      style={containerStyle}
      accessible
      accessibilityLabel="Breadcrumb"
      testID={testID}
    >
      {elements}
    </View>
  );
}
