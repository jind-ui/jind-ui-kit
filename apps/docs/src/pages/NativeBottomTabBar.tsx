import { PropsTable } from '../components/PropsTable';
import { CodeBlock } from '../components/CodeBlock';

const props = [
  { name: 'tabs', type: 'TabItem[]', description: 'Array of tab configurations (key, label, icon, activeIcon?, badge?)' },
  { name: 'activeTab', type: 'string', description: 'Key of the currently active tab' },
  { name: 'onTabPress', type: '(key: string) => void', description: 'Callback when a tab is pressed' },
  { name: 'showLabels', type: 'boolean', description: 'Show text labels below icons (default: true)' },
  { name: 'style', type: 'ViewStyle', description: 'Custom styles for the container' },
];

const tabItemProps = [
  { name: 'key', type: 'string', description: 'Unique identifier for the tab' },
  { name: 'label', type: 'string', description: 'Text label displayed below the icon' },
  { name: 'icon', type: 'ReactNode', description: 'Default icon element' },
  { name: 'activeIcon', type: 'ReactNode', description: 'Icon shown when tab is active (falls back to icon)' },
  { name: 'badge', type: 'number | string', description: 'Badge indicator (numbers > 99 show as 99+)' },
];

export function NativeBottomTabBar() {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">BottomTabBar</h1>
        <p className="page-description">
          Bottom navigation bar for tab-based navigation in React Native apps.
          Supports icons, active states, badges with overflow, and
          accessibility roles.
        </p>
        <p className="page-description" style={{ marginTop: 8, fontSize: 13, opacity: 0.75 }}>
          React Native only — <code>jind-ui-kit-native</code>
        </p>
      </div>

      <div className="section">
        <h2 className="section-title">Basic Usage</h2>
        <CodeBlock
          code={`import { BottomTabBar } from 'jind-ui-kit-native';
import { Text } from 'react-native';

const tabs = [
  { key: 'home', label: 'Home', icon: <Text>🏠</Text> },
  { key: 'search', label: 'Search', icon: <Text>🔍</Text> },
  { key: 'profile', label: 'Profile', icon: <Text>👤</Text> },
];

function App() {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <View style={{ flex: 1 }}>
      <ScreenContent tab={activeTab} />
      <BottomTabBar
        tabs={tabs}
        activeTab={activeTab}
        onTabPress={setActiveTab}
      />
    </View>
  );
}`}
        />
      </div>

      <div className="section">
        <h2 className="section-title">With Badges</h2>
        <CodeBlock
          code={`const tabs = [
  { key: 'home', label: 'Home', icon: <HomeIcon /> },
  {
    key: 'inbox',
    label: 'Inbox',
    icon: <InboxIcon />,
    badge: 3,
  },
  {
    key: 'notifications',
    label: 'Alerts',
    icon: <BellIcon />,
    badge: 150, // renders as "99+"
  },
];

<BottomTabBar
  tabs={tabs}
  activeTab={activeTab}
  onTabPress={setActiveTab}
/>`}
        />
      </div>

      <div className="section">
        <h2 className="section-title">Icon-Only (No Labels)</h2>
        <CodeBlock
          code={`<BottomTabBar
  tabs={tabs}
  activeTab={activeTab}
  onTabPress={setActiveTab}
  showLabels={false}
/>`}
        />
      </div>

      <div className="section">
        <h2 className="section-title">BottomTabBar Props</h2>
        <PropsTable props={props} />
      </div>

      <div className="section">
        <h2 className="section-title">TabItem</h2>
        <PropsTable props={tabItemProps} />
      </div>
    </div>
  );
}
