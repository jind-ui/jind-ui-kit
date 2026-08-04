import { Kbd, Text, HStack } from 'jind-ui-kit';
import { Preview } from '../components/Preview';
import { PropsTable } from '../components/PropsTable';
import { ViewMarkdown } from '../components/ViewMarkdown';

const props = [
  { name: 'children', type: 'ReactNode', description: 'Key label content' },
  { name: 'size', type: "'sm' | 'md'", description: 'Size of the key indicator (default: md)' },
  { name: 'style', type: 'CSSProperties', description: 'Custom inline styles' },
];

export function ComponentKbd() {
  return (
    <div className="page-container">
      <div className="page-header">
        <ViewMarkdown slug="kbd" />
        <h1 className="page-title">Kbd</h1>
        <p className="page-description">
          Inline keyboard key indicator for displaying keyboard shortcuts,
          hotkeys, and key combinations in documentation or UI.
        </p>
      </div>

      <div className="section">
        <h2 className="section-title">Basic Keys</h2>
        <Preview
          code={`<HStack gap={8}>
  <Kbd>Esc</Kbd>
  <Kbd>Tab</Kbd>
  <Kbd>Enter</Kbd>
  <Kbd>Space</Kbd>
  <Kbd>Shift</Kbd>
</HStack>`}
        >
          <HStack gap={8}>
            <Kbd>Esc</Kbd>
            <Kbd>Tab</Kbd>
            <Kbd>Enter</Kbd>
            <Kbd>Space</Kbd>
            <Kbd>Shift</Kbd>
          </HStack>
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">Modifier Combos</h2>
        <p style={{ marginBottom: 12 }}>
          Compose multiple <code>Kbd</code> elements with separator text to show keyboard shortcuts.
        </p>
        <Preview
          align="column"
          code={`<HStack gap={4} style={{ alignItems: 'center' }}>
  <Text>Copy:</Text>
  <Kbd>Ctrl</Kbd><Text>+</Text><Kbd>C</Kbd>
</HStack>
<HStack gap={4} style={{ alignItems: 'center' }}>
  <Text>Save:</Text>
  <Kbd>Cmd</Kbd><Text>+</Text><Kbd>S</Kbd>
</HStack>
<HStack gap={4} style={{ alignItems: 'center' }}>
  <Text>Find:</Text>
  <Kbd>Cmd</Kbd><Text>+</Text><Kbd>Shift</Kbd><Text>+</Text><Kbd>F</Kbd>
</HStack>
<HStack gap={4} style={{ alignItems: 'center' }}>
  <Text>Undo:</Text>
  <Kbd>Ctrl</Kbd><Text>+</Text><Kbd>Z</Kbd>
</HStack>`}
        >
          <HStack gap={4} style={{ alignItems: 'center' }}>
            <Text>Copy:</Text>
            <Kbd>Ctrl</Kbd><Text>+</Text><Kbd>C</Kbd>
          </HStack>
          <HStack gap={4} style={{ alignItems: 'center' }}>
            <Text>Save:</Text>
            <Kbd>Cmd</Kbd><Text>+</Text><Kbd>S</Kbd>
          </HStack>
          <HStack gap={4} style={{ alignItems: 'center' }}>
            <Text>Find:</Text>
            <Kbd>Cmd</Kbd><Text>+</Text><Kbd>Shift</Kbd><Text>+</Text><Kbd>F</Kbd>
          </HStack>
          <HStack gap={4} style={{ alignItems: 'center' }}>
            <Text>Undo:</Text>
            <Kbd>Ctrl</Kbd><Text>+</Text><Kbd>Z</Kbd>
          </HStack>
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">Sizes</h2>
        <p style={{ marginBottom: 12 }}>
          Use <code>size="sm"</code> for inline usage within body text,
          and the default <code>"md"</code> for standalone display.
        </p>
        <Preview
          align="column"
          code={`<HStack gap={8} style={{ alignItems: 'center' }}>
  <Text>Small:</Text>
  <Kbd size="sm">Cmd</Kbd>
  <Kbd size="sm">K</Kbd>
</HStack>
<HStack gap={8} style={{ alignItems: 'center' }}>
  <Text>Medium (default):</Text>
  <Kbd size="md">Cmd</Kbd>
  <Kbd size="md">K</Kbd>
</HStack>`}
        >
          <HStack gap={8} style={{ alignItems: 'center' }}>
            <Text>Small:</Text>
            <Kbd size="sm">Cmd</Kbd>
            <Kbd size="sm">K</Kbd>
          </HStack>
          <HStack gap={8} style={{ alignItems: 'center' }}>
            <Text>Medium (default):</Text>
            <Kbd size="md">Cmd</Kbd>
            <Kbd size="md">K</Kbd>
          </HStack>
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">Props</h2>
        <PropsTable props={props} />
      </div>
    </div>
  );
}
