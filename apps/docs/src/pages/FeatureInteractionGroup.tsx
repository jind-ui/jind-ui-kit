import { InteractionGroup, useGroupState, Text } from 'jind-ui-kit';
import { Preview } from '../components/Preview';
import { PropsTable } from '../components/PropsTable';
import { CodeBlock } from '../components/CodeBlock';

const componentProps = [
  { name: 'as', type: "'div' | 'button' | 'a'", description: 'HTML element to render (default: div)' },
  { name: 'children', type: 'ReactNode | (state) => ReactNode', description: 'Content or render function receiving interaction state' },
  { name: 'disabled', type: 'boolean', description: 'Disables all interaction tracking' },
  { name: 'onClick', type: '() => void', description: 'Click handler (suppressed when disabled)' },
  { name: 'style', type: 'CSSProperties', description: 'Custom inline styles' },
  { name: 'className', type: 'string', description: 'CSS class name' },
];

const hookProps = [
  { name: 'state', type: 'InteractionState', description: '{ pressed, hovered, focused }' },
  { name: 'handlers', type: 'object', description: 'Event handlers to spread on the container element' },
  { name: 'Provider', type: 'React.Provider', description: 'Context provider to wrap children' },
];

function ChildLabel() {
  const state = useGroupState();
  return (
    <span
      style={{
        padding: '4px 12px',
        borderRadius: 6,
        fontSize: 13,
        transition: 'all 0.15s',
        backgroundColor: state.hovered ? '#dbeafe' : '#f1f5f9',
        color: state.pressed ? '#1d4ed8' : state.hovered ? '#2563eb' : '#64748b',
        fontWeight: state.hovered ? 600 : 400,
      }}
    >
      Child reacts to parent: {state.hovered ? 'hovered' : state.pressed ? 'pressed' : 'idle'}
    </span>
  );
}

export function FeatureInteractionGroup() {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">InteractionGroup</h1>
        <p className="page-description">
          Propagate parent interaction state (hover, press, focus) to children
          via context. Inspired by NativeWind v5's <code>group/name</code> parent
          state pattern. Children use <code>useGroupState()</code> to react
          without prop drilling.
        </p>
        <p className="page-description" style={{ marginTop: 8, fontSize: 13, opacity: 0.75 }}>
          Available in both <code>jind-ui-kit</code> (hover + press + focus) and{' '}
          <code>jind-ui-kit-native</code> (press + focus via Pressable).
        </p>
      </div>

      <div className="section">
        <h2 className="section-title">Render Prop</h2>
        <p style={{ marginBottom: 12 }}>
          The simplest approach — use a render function to access state directly.
        </p>
        <Preview
          code={`<InteractionGroup>
  {(state) => (
    <div style={{
      padding: 16,
      borderRadius: 8,
      border: '2px solid',
      borderColor: state.hovered ? '#3b82f6' : '#e2e8f0',
      transition: 'all 0.15s',
    }}>
      {state.hovered ? 'Hovering!' : 'Hover me'}
    </div>
  )}
</InteractionGroup>`}
        >
          <InteractionGroup>
            {(state) => (
              <div
                style={{
                  padding: 16,
                  borderRadius: 8,
                  border: '2px solid',
                  borderColor: state.hovered ? '#3b82f6' : '#e2e8f0',
                  transition: 'all 0.15s',
                  cursor: 'pointer',
                }}
              >
                {state.hovered ? 'Hovering!' : 'Hover me'}
              </div>
            )}
          </InteractionGroup>
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">Child Context (useGroupState)</h2>
        <p style={{ marginBottom: 12 }}>
          Deeply nested children read parent state without prop drilling.
          Hover the card — the child label reacts automatically.
        </p>
        <Preview
          code={`function ChildLabel() {
  const state = useGroupState();
  return (
    <span style={{
      backgroundColor: state.hovered ? '#dbeafe' : '#f1f5f9',
      color: state.pressed ? '#1d4ed8' : '#64748b',
    }}>
      {state.hovered ? 'hovered' : 'idle'}
    </span>
  );
}

<InteractionGroup>
  <div style={{ padding: 16, border: '1px solid #e2e8f0' }}>
    <p>Parent container</p>
    <ChildLabel />
  </div>
</InteractionGroup>`}
        >
          <InteractionGroup>
            <div
              style={{
                padding: 16,
                borderRadius: 8,
                border: '1px solid #e2e8f0',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
              }}
            >
              <span style={{ fontSize: 14 }}>Parent container — hover me</span>
              <ChildLabel />
            </div>
          </InteractionGroup>
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">React Native Usage</h2>
        <CodeBlock
          code={`import { InteractionGroup, useGroupState } from 'jind-ui-kit-native';

function ChildBadge() {
  const { pressed } = useGroupState();
  return (
    <View style={{
      backgroundColor: pressed ? '#dbeafe' : '#f1f5f9',
      padding: 8,
      borderRadius: 8,
    }}>
      <Text>{pressed ? 'Pressed!' : 'Idle'}</Text>
    </View>
  );
}

<InteractionGroup onPress={() => navigate('/details')}>
  <Card>
    <Text>Tap anywhere on this card</Text>
    <ChildBadge />
  </Card>
</InteractionGroup>`}
        />
      </div>

      <div className="section">
        <h2 className="section-title">Component Props</h2>
        <PropsTable props={componentProps} />
      </div>

      <div className="section">
        <h2 className="section-title">useInteractionGroup() Return</h2>
        <PropsTable props={hookProps} />
      </div>
    </div>
  );
}
