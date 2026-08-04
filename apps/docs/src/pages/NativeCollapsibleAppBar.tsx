import { PropsTable } from '../components/PropsTable';
import { CodeBlock } from '../components/CodeBlock';

const props = [
  { name: 'title', type: 'string', description: 'Header title text (required)' },
  { name: 'subtitle', type: 'string', description: 'Subtitle text that fades out on scroll' },
  { name: 'leftContent', type: 'ReactNode', description: 'Left slot content (hidden when onBack is set)' },
  { name: 'rightContent', type: 'ReactNode', description: 'Right slot content (e.g. action buttons)' },
  { name: 'onBack', type: '() => void', description: 'Enables back chevron button' },
  { name: 'searchable', type: 'boolean', description: 'Shows an animated search bar (default: false)' },
  { name: 'searchPlaceholder', type: 'string', description: 'Placeholder text for search input' },
  { name: 'onSearch', type: '(query: string) => void', description: 'Callback when search text changes' },
  { name: 'expandedHeight', type: 'number', description: 'Height when fully expanded (default: 120)' },
  { name: 'collapsedHeight', type: 'number', description: 'Height when collapsed (default: 56)' },
  { name: 'children', type: 'ReactNode', description: 'Scrollable content rendered inside Animated.ScrollView' },
  { name: 'style', type: 'ViewStyle', description: 'Custom container styles' },
];

export function NativeCollapsibleAppBar() {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">CollapsibleAppBar</h1>
        <p className="page-description">
          Animated header that collapses as the user scrolls. Title font size
          animates from 24 to 17, subtitle fades out, and an optional search
          bar collapses with animated height — all driven by scroll position
          via React Native's Animated API.
        </p>
        <p className="page-description" style={{ marginTop: 8, fontSize: 13, opacity: 0.75 }}>
          React Native only — <code>jind-ui-kit-native</code>
        </p>
      </div>

      <div className="section">
        <h2 className="section-title">Basic Usage</h2>
        <CodeBlock
          code={`import { CollapsibleAppBar } from 'jind-ui-kit-native';

function SettingsScreen() {
  return (
    <CollapsibleAppBar
      title="Settings"
      subtitle="Manage your preferences"
      onBack={() => navigation.goBack()}
    >
      <SettingsList />
    </CollapsibleAppBar>
  );
}`}
        />
      </div>

      <div className="section">
        <h2 className="section-title">With Search</h2>
        <p style={{ marginBottom: 12 }}>
          Enable the search bar — it collapses with the header and fades out
          at 70% of scroll distance.
        </p>
        <CodeBlock
          code={`function ContactsScreen() {
  const [query, setQuery] = useState('');

  return (
    <CollapsibleAppBar
      title="Contacts"
      searchable
      searchPlaceholder="Search contacts..."
      onSearch={setQuery}
      rightContent={<IconButton icon="+" onPress={addContact} />}
    >
      <ContactList filter={query} />
    </CollapsibleAppBar>
  );
}`}
        />
      </div>

      <div className="section">
        <h2 className="section-title">Custom Heights</h2>
        <CodeBlock
          code={`<CollapsibleAppBar
  title="Gallery"
  expandedHeight={180}
  collapsedHeight={64}
  leftContent={<Avatar size="sm" />}
  rightContent={
    <HStack gap={8}>
      <IconButton icon="share" />
      <IconButton icon="more" />
    </HStack>
  }
>
  <PhotoGrid />
</CollapsibleAppBar>`}
        />
      </div>

      <div className="section">
        <h2 className="section-title">Animation Details</h2>
        <div style={{ fontSize: 14, lineHeight: 1.7 }}>
          <ul style={{ paddingLeft: 20 }}>
            <li><strong>Title font size:</strong> interpolates 24px → 17px over scroll distance</li>
            <li><strong>Title translateY:</strong> shifts up 8px as header collapses</li>
            <li><strong>Subtitle opacity:</strong> fades to 0 at 50% of scroll distance</li>
            <li><strong>Search bar:</strong> opacity fades and height collapses at 70% of scroll</li>
            <li><strong>Scroll tracking:</strong> uses <code>Animated.event</code> for performant gesture-driven animation</li>
          </ul>
        </div>
      </div>

      <div className="section">
        <h2 className="section-title">Props</h2>
        <PropsTable props={props} />
      </div>
    </div>
  );
}
