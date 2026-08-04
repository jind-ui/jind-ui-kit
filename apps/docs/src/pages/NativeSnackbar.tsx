import { PropsTable } from '../components/PropsTable';
import { CodeBlock } from '../components/CodeBlock';

const props = [
  { name: 'visible', type: 'boolean', description: 'Controls visibility with spring animation' },
  { name: 'message', type: 'string', description: 'Message text content' },
  { name: 'action', type: '{ label: string; onPress: () => void }', description: 'Optional action button configuration' },
  { name: 'onDismiss', type: '() => void', description: 'Callback when snackbar should be dismissed' },
  { name: 'duration', type: 'number', description: 'Auto-dismiss delay in ms (default: 4000, 0 to disable)' },
  { name: 'position', type: "'bottom' | 'top'", description: 'Anchor position (default: bottom)' },
  { name: 'style', type: 'ViewStyle', description: 'Custom styles for the container' },
];

export function NativeSnackbar() {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Snackbar</h1>
        <p className="page-description">
          Brief message bar that slides in from the bottom or top with spring
          animation. Supports an action button, auto-dismiss timer, and
          accessibility alert role. Uses a dark background for contrast.
        </p>
        <p className="page-description" style={{ marginTop: 8, fontSize: 13, opacity: 0.75 }}>
          React Native only — <code>jind-ui-kit-native</code>
        </p>
      </div>

      <div className="section">
        <h2 className="section-title">Basic Usage</h2>
        <CodeBlock
          code={`import { Snackbar } from 'jind-ui-kit-native';

function App() {
  const [visible, setVisible] = useState(false);

  return (
    <View style={{ flex: 1 }}>
      <Button onPress={() => setVisible(true)}>
        Show Snackbar
      </Button>

      <Snackbar
        visible={visible}
        message="Item saved successfully"
        onDismiss={() => setVisible(false)}
      />
    </View>
  );
}`}
        />
      </div>

      <div className="section">
        <h2 className="section-title">With Action</h2>
        <CodeBlock
          code={`const [visible, setVisible] = useState(false);
const [deleted, setDeleted] = useState(false);

function handleDelete() {
  setDeleted(true);
  setVisible(true);
}

function handleUndo() {
  setDeleted(false);
}

<Snackbar
  visible={visible}
  message="Item deleted"
  action={{ label: 'UNDO', onPress: handleUndo }}
  onDismiss={() => setVisible(false)}
/>`}
        />
      </div>

      <div className="section">
        <h2 className="section-title">Top Position</h2>
        <CodeBlock
          code={`<Snackbar
  visible={visible}
  message="New message received"
  position="top"
  onDismiss={() => setVisible(false)}
/>`}
        />
      </div>

      <div className="section">
        <h2 className="section-title">Persistent (No Auto-Dismiss)</h2>
        <CodeBlock
          code={`<Snackbar
  visible={networkError}
  message="No internet connection"
  duration={0}
  action={{ label: 'RETRY', onPress: retryConnection }}
  onDismiss={() => {}}
/>`}
        />
      </div>

      <div className="section">
        <h2 className="section-title">Animation Details</h2>
        <div style={{ fontSize: 14, lineHeight: 1.7 }}>
          <ul style={{ paddingLeft: 20 }}>
            <li><strong>Entry:</strong> spring animation (tension: 80, friction: 10) with opacity fade</li>
            <li><strong>Exit:</strong> 200ms timing animation for both translateY and opacity</li>
            <li><strong>Action button:</strong> calls both <code>action.onPress</code> and <code>onDismiss</code></li>
            <li><strong>Accessibility:</strong> <code>accessibilityRole="alert"</code> with <code>accessibilityLiveRegion="polite"</code></li>
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
