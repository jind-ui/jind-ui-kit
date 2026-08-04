import { type ReactNode, type Ref } from 'react';
import { Pressable, Text, View, type TextStyle, type ViewStyle } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';

export interface TabItem {
  key: string;
  label: string;
  icon: ReactNode;
  activeIcon?: ReactNode;
  badge?: number | string;
}

export interface BottomTabBarProps {
  ref?: Ref<View>;
  tabs: TabItem[];
  activeTab: string;
  onTabPress: (key: string) => void;
  showLabels?: boolean;
  style?: ViewStyle;
}

const BAR_HEIGHT = 56;
const BADGE_SIZE = 18;

export function BottomTabBar({
  ref,
  tabs,
  activeTab,
  onTabPress,
  showLabels = true,
  style,
}: BottomTabBarProps) {
  const theme = useTheme();

  const containerStyle: ViewStyle = {
    flexDirection: 'row',
    height: BAR_HEIGHT,
    backgroundColor: theme.semantic.surface.card,
    borderTopWidth: theme.borderWidth.default,
    borderTopColor: theme.semantic.border.subtle,
    ...style,
  };

  return (
    <View ref={ref} style={containerStyle} accessibilityRole="tablist">
      {tabs.map((tab) => {
        const isActive = tab.key === activeTab;
        return (
          <TabButton
            key={tab.key}
            tab={tab}
            active={isActive}
            showLabel={showLabels}
            onPress={() => onTabPress(tab.key)}
          />
        );
      })}
    </View>
  );
}

interface TabButtonProps {
  tab: TabItem;
  active: boolean;
  showLabel: boolean;
  onPress: () => void;
}

function TabButton({ tab, active, showLabel, onPress }: TabButtonProps) {
  const theme = useTheme();

  const buttonStyle: ViewStyle = {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    gap: 2,
  };

  const iconContainerStyle: ViewStyle = {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 24,
    minHeight: 24,
  };

  const labelStyle: TextStyle = {
    fontSize: theme.fontSize[11],
    fontWeight: active ? theme.fontWeight.medium : theme.fontWeight.regular,
    fontFamily: theme.fontFamily.sans,
    color: active ? theme.semantic.fill.primary : theme.semantic.text.muted,
    marginTop: 2,
  };

  const badgeStyle: ViewStyle = {
    position: 'absolute',
    top: -4,
    right: -10,
    minWidth: BADGE_SIZE,
    height: BADGE_SIZE,
    borderRadius: BADGE_SIZE / 2,
    backgroundColor: theme.colors.red[500],
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  };

  const badgeTextStyle: TextStyle = {
    fontSize: 10,
    fontWeight: theme.fontWeight.bold,
    fontFamily: theme.fontFamily.sans,
    color: '#ffffff',
    lineHeight: 12,
  };

  return (
    <Pressable
      style={buttonStyle}
      onPress={onPress}
      accessibilityRole="tab"
      accessibilityState={{ selected: active }}
      accessibilityLabel={tab.label}
    >
      <View style={iconContainerStyle}>
        <View style={{ opacity: active ? 1 : 0.6 }}>
          {active && tab.activeIcon ? tab.activeIcon : tab.icon}
        </View>
        {tab.badge != null && (
          <View style={badgeStyle}>
            <Text style={badgeTextStyle}>
              {typeof tab.badge === 'number' && tab.badge > 99 ? '99+' : tab.badge}
            </Text>
          </View>
        )}
      </View>
      {showLabel && <Text style={labelStyle}>{tab.label}</Text>}
    </Pressable>
  );
}
