import { useState, type ReactNode, type Ref } from 'react';
import {
  Animated,
  TextInput,
  View,
  Text,
  Pressable,
  type TextStyle,
  type ViewStyle,
} from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';

export interface CollapsibleAppBarProps {
  ref?: Ref<View>;
  title: string;
  subtitle?: string;
  leftContent?: ReactNode;
  rightContent?: ReactNode;
  onBack?: () => void;
  searchable?: boolean;
  searchPlaceholder?: string;
  onSearch?: (query: string) => void;
  expandedHeight?: number;
  collapsedHeight?: number;
  children: ReactNode;
  style?: ViewStyle;
}

const DEFAULT_EXPANDED = 120;
const DEFAULT_COLLAPSED = 56;

export function CollapsibleAppBar({
  ref,
  title,
  subtitle,
  leftContent,
  rightContent,
  onBack,
  searchable = false,
  searchPlaceholder = 'Search...',
  onSearch,
  expandedHeight = DEFAULT_EXPANDED,
  collapsedHeight = DEFAULT_COLLAPSED,
  children,
  style,
}: CollapsibleAppBarProps) {
  const theme = useTheme();
  const [scrollY] = useState(() => new Animated.Value(0));
  const [searchQuery, setSearchQuery] = useState('');

  const scrollDistance = expandedHeight - collapsedHeight;

  const headerHeight = scrollY.interpolate({
    inputRange: [0, scrollDistance],
    outputRange: [expandedHeight, collapsedHeight],
    extrapolate: 'clamp',
  });

  const titleFontSize = scrollY.interpolate({
    inputRange: [0, scrollDistance],
    outputRange: [24, 17],
    extrapolate: 'clamp',
  });

  const titleTranslateY = scrollY.interpolate({
    inputRange: [0, scrollDistance],
    outputRange: [0, -8],
    extrapolate: 'clamp',
  });

  const subtitleOpacity = scrollY.interpolate({
    inputRange: [0, scrollDistance * 0.5],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const searchOpacity = scrollY.interpolate({
    inputRange: [0, scrollDistance * 0.7],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const searchHeight = scrollY.interpolate({
    inputRange: [0, scrollDistance * 0.7],
    outputRange: [40, 0],
    extrapolate: 'clamp',
  });

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    { useNativeDriver: false },
  );

  const handleSearchChange = (text: string) => {
    setSearchQuery(text);
    onSearch?.(text);
  };

  const containerStyle: ViewStyle = {
    flex: 1,
    backgroundColor: theme.semantic.surface.page,
    ...style,
  };

  const headerStyle: ViewStyle = {
    backgroundColor: theme.semantic.surface.card,
    borderBottomWidth: theme.borderWidth.default,
    borderBottomColor: theme.semantic.border.subtle,
    paddingHorizontal: theme.space[7],
    justifyContent: 'flex-end',
    paddingBottom: 12,
    overflow: 'hidden',
  };

  const topRowStyle: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 44,
  };

  const titleStyle: TextStyle = {
    fontWeight: theme.fontWeight.bold,
    fontFamily: theme.fontFamily.sans,
    color: theme.semantic.text.primary,
    flex: 1,
  };

  const subtitleStyle: TextStyle = {
    fontSize: theme.fontSize[13],
    fontWeight: theme.fontWeight.regular,
    fontFamily: theme.fontFamily.sans,
    color: theme.semantic.text.muted,
    marginTop: 2,
  };

  const searchContainerStyle: ViewStyle = {
    borderRadius: theme.radius.sm,
    backgroundColor: theme.semantic.surface.page,
    paddingHorizontal: 12,
    justifyContent: 'center',
    overflow: 'hidden',
  };

  const searchInputStyle: TextStyle = {
    fontSize: theme.fontSize[14],
    fontFamily: theme.fontFamily.sans,
    color: theme.semantic.text.primary,
    paddingVertical: 8,
  };

  const backChevronStyle: TextStyle = {
    fontSize: theme.fontSize[18],
    fontWeight: theme.fontWeight.medium,
    fontFamily: theme.fontFamily.sans,
    color: theme.semantic.fill.primary,
  };

  return (
    <View ref={ref} style={containerStyle}>
      <Animated.View style={[headerStyle, { height: headerHeight }]}>
        <View style={topRowStyle}>
          {onBack != null && (
            <Pressable
              onPress={onBack}
              accessibilityRole="button"
              accessibilityLabel="Back"
              style={{ marginRight: 8 }}
            >
              <Text style={backChevronStyle}>{'‹'}</Text>
            </Pressable>
          )}
          {leftContent != null && !onBack && (
            <View style={{ marginRight: 8 }}>{leftContent}</View>
          )}
          <Animated.Text
            style={[titleStyle, { fontSize: titleFontSize, transform: [{ translateY: titleTranslateY }] }]}
            numberOfLines={1}
          >
            {title}
          </Animated.Text>
          {rightContent != null && <View>{rightContent}</View>}
        </View>

        {subtitle != null && (
          <Animated.Text style={[subtitleStyle, { opacity: subtitleOpacity }]} numberOfLines={1}>
            {subtitle}
          </Animated.Text>
        )}

        {searchable && (
          <Animated.View style={[searchContainerStyle, { opacity: searchOpacity, height: searchHeight, marginTop: 8 }]}>
            <TextInput
              style={searchInputStyle}
              placeholder={searchPlaceholder}
              placeholderTextColor={theme.semantic.text.muted}
              value={searchQuery}
              onChangeText={handleSearchChange}
              returnKeyType="search"
            />
          </Animated.View>
        )}
      </Animated.View>

      <Animated.ScrollView
        onScroll={handleScroll}
        scrollEventThrottle={16}
        contentContainerStyle={{ paddingTop: 0 }}
      >
        {children}
      </Animated.ScrollView>
    </View>
  );
}
