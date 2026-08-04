import { ThemeOverride, useTheme, Button, Card, Text, Stack } from 'jind-ui-kit';
import { Preview } from '../components/Preview';
import { PropsTable } from '../components/PropsTable';
import { CodeBlock } from '../components/CodeBlock';

const props = [
  { name: 'value', type: 'DeepPartial<JindTheme>', description: 'Partial theme overrides to deep-merge with the parent theme' },
  { name: 'children', type: 'ReactNode', description: 'Content that receives the overridden theme via useTheme()' },
];

function ThemedCard({ label }: { label: string }) {
  const theme = useTheme();
  return (
    <div
      style={{
        padding: 16,
        borderRadius: theme.radius.md,
        backgroundColor: theme.semantic.surface.card,
        border: `1px solid ${theme.semantic.border.subtle}`,
      }}
    >
      <Text style={{ color: theme.semantic.text.primary, fontWeight: 600 }}>
        {label}
      </Text>
      <Text
        style={{
          color: theme.semantic.text.muted,
          fontSize: 13,
          marginTop: 4,
        }}
      >
        primary: {theme.colors.blue[500]}
      </Text>
    </div>
  );
}

export function FeatureThemeOverride() {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">ThemeOverride</h1>
        <p className="page-description">
          Create sub-themes by wrapping any subtree with partial theme overrides.
          Nested overrides cascade — each level deep-merges with its parent,
          inspired by NativeWind v5's CSS variable scoping pattern.
        </p>
        <p className="page-description" style={{ marginTop: 8, fontSize: 13, opacity: 0.75 }}>
          Available in both <code>jind-ui-kit</code> and <code>jind-ui-kit-native</code>.
        </p>
      </div>

      <div className="section">
        <h2 className="section-title">Basic Override</h2>
        <p style={{ marginBottom: 12 }}>
          Wrap any section to override specific theme tokens. All children
          automatically receive the merged theme via <code>useTheme()</code>.
        </p>
        <Preview
          align="column"
          code={`<ThemedCard label="Default Theme" />

<ThemeOverride value={{
  colors: { blue: { 500: '#e11d48' } },
  semantic: { surface: { card: '#fff1f2' } },
}}>
  <ThemedCard label="Rose Override" />
</ThemeOverride>`}
        >
          <ThemedCard label="Default Theme" />
          <ThemeOverride
            value={{
              colors: { blue: { 500: '#e11d48' } },
              semantic: { surface: { card: '#fff1f2' } },
            }}
          >
            <ThemedCard label="Rose Override" />
          </ThemeOverride>
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">Nested Overrides</h2>
        <p style={{ marginBottom: 12 }}>
          Overrides nest naturally — each level merges with its parent, not the root.
        </p>
        <Preview
          align="column"
          code={`<ThemedCard label="Root Theme" />

<ThemeOverride value={{
  semantic: { surface: { card: '#f0fdf4' } },
  colors: { blue: { 500: '#16a34a' } },
}}>
  <ThemedCard label="Green Override" />

  <ThemeOverride value={{
    colors: { blue: { 500: '#9333ea' } },
  }}>
    <ThemedCard label="Purple (inherits green surface)" />
  </ThemeOverride>
</ThemeOverride>`}
        >
          <ThemedCard label="Root Theme" />
          <ThemeOverride
            value={{
              semantic: { surface: { card: '#f0fdf4' } },
              colors: { blue: { 500: '#16a34a' } },
            }}
          >
            <ThemedCard label="Green Override" />
            <ThemeOverride value={{ colors: { blue: { 500: '#9333ea' } } }}>
              <ThemedCard label="Purple (inherits green surface)" />
            </ThemeOverride>
          </ThemeOverride>
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">React Native Usage</h2>
        <CodeBlock
          code={`import { ThemeOverride } from 'jind-ui-kit-native';

function DarkSection() {
  return (
    <ThemeOverride value={{
      semantic: {
        surface: { page: '#1a1a2e', card: '#16213e' },
        text: { primary: '#e2e8f0' },
      },
    }}>
      <Card>
        <Text>This section uses dark surface tokens</Text>
      </Card>
    </ThemeOverride>
  );
}`}
        />
      </div>

      <div className="section">
        <h2 className="section-title">Props</h2>
        <PropsTable props={props} />
      </div>
    </div>
  );
}
