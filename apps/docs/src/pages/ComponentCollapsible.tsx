import { useState } from 'react';
import { Collapsible, Text, Button } from 'jind-ui-kit';
import { Preview } from '../components/Preview';
import { PropsTable } from '../components/PropsTable';
import { ViewMarkdown } from '../components/ViewMarkdown';

const props = [
  { name: 'open', type: 'boolean', description: 'Controlled open state' },
  { name: 'defaultOpen', type: 'boolean', description: 'Initial open state for uncontrolled usage (default: false)' },
  { name: 'onOpenChange', type: '(open: boolean) => void', description: 'Called when the open state changes' },
  { name: 'trigger', type: 'ReactNode', description: 'Label content shown in the trigger row' },
  { name: 'icon', type: 'ReactNode | false', description: 'Custom icon element, or false to hide the icon entirely. Defaults to an animated chevron.' },
  { name: 'children', type: 'ReactNode', description: 'Collapsible content' },
  { name: 'disabled', type: 'boolean', description: 'Prevents toggling when true (default: false)' },
  { name: 'style', type: 'CSSProperties', description: 'Custom inline styles' },
];

function ControlledDemo() {
  const [open, setOpen] = useState(true);

  return (
    <div>
      <div style={{ marginBottom: 8, display: 'flex', gap: 8 }}>
        <Button size="sm" onClick={() => setOpen(true)}>Open</Button>
        <Button size="sm" variant="secondary" onClick={() => setOpen(false)}>Close</Button>
      </div>
      <Collapsible
        open={open}
        onOpenChange={setOpen}
        trigger={<Text style={{ fontWeight: 600 }}>Controlled Section</Text>}
      >
        <div style={{ padding: '8px 0' }}>
          <Text>
            This section is externally controlled. Use the buttons above or click
            the trigger to toggle it.
          </Text>
        </div>
      </Collapsible>
    </div>
  );
}

function PlusMinusIcon({ open }: { open: boolean }) {
  return (
    <svg width={16} height={16} viewBox="0 0 16 16" fill="none">
      <path d="M3 8h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path
        d="M8 3v10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        style={{
          transform: open ? 'scaleY(0)' : 'scaleY(1)',
          transformOrigin: 'center',
          transition: 'transform 200ms ease',
        }}
      />
    </svg>
  );
}

function CustomIconDemo() {
  const [open, setOpen] = useState(false);

  return (
    <Collapsible
      open={open}
      onOpenChange={setOpen}
      icon={<PlusMinusIcon open={open} />}
      trigger={<Text style={{ fontWeight: 600 }}>Plus/Minus Icon</Text>}
    >
      <div style={{ padding: '8px 0' }}>
        <Text>This uses a custom plus/minus icon that animates between states.</Text>
      </div>
    </Collapsible>
  );
}

export function ComponentCollapsible() {
  return (
    <div className="page-container">
      <div className="page-header">
        <ViewMarkdown slug="collapsible" />
        <h1 className="page-title">Collapsible</h1>
        <p className="page-description">
          A disclosure widget that shows or hides its content with a smooth
          animation. Includes a built-in animated chevron that rotates on toggle.
        </p>
      </div>

      <div className="section">
        <h2 className="section-title">Basic Usage</h2>
        <p style={{ marginBottom: 12 }}>
          The default chevron rotates smoothly between collapsed and expanded states.
        </p>
        <Preview
          code={`<Collapsible
  trigger={<Text style={{ fontWeight: 600 }}>Show more</Text>}
>
  <Text>Here is the hidden content revealed on click.</Text>
</Collapsible>`}
        >
          <Collapsible
            trigger={<Text style={{ fontWeight: 600 }}>Show more</Text>}
          >
            <div style={{ padding: '8px 0' }}>
              <Text>Here is the hidden content revealed on click.</Text>
            </div>
          </Collapsible>
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">FAQ</h2>
        <p style={{ marginBottom: 12 }}>
          Use <code>defaultOpen</code> to render the content expanded on mount.
        </p>
        <Preview
          code={`<Collapsible
  defaultOpen
  trigger={<Text style={{ fontWeight: 600 }}>What is Jind UI Kit?</Text>}
>
  <Text>
    Jind UI Kit is a cross-platform component library for building
    beautiful, accessible interfaces on web and React Native.
  </Text>
</Collapsible>`}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, width: '100%' }}>
            <Collapsible
              defaultOpen
              trigger={<Text style={{ fontWeight: 600 }}>What is Jind UI Kit?</Text>}
            >
              <div style={{ padding: '8px 0 8px 28px' }}>
                <Text>
                  Jind UI Kit is a cross-platform component library for building
                  beautiful, accessible interfaces on web and React Native.
                </Text>
              </div>
            </Collapsible>
            <Collapsible
              trigger={<Text style={{ fontWeight: 600 }}>How do I install it?</Text>}
            >
              <div style={{ padding: '8px 0 8px 28px' }}>
                <Text>
                  Run <code>npx jind init</code> to set up the core package, then
                  use <code>npx jind add button</code> to install individual components.
                </Text>
              </div>
            </Collapsible>
            <Collapsible
              trigger={<Text style={{ fontWeight: 600 }}>Does it support React Native?</Text>}
            >
              <div style={{ padding: '8px 0 8px 28px' }}>
                <Text>
                  Yes! The jind-ui-kit-native package provides React Native versions
                  of all components with the same API and design tokens.
                </Text>
              </div>
            </Collapsible>
          </div>
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">Custom Icon</h2>
        <p style={{ marginBottom: 12 }}>
          Pass any <code>ReactNode</code> as the <code>icon</code> prop to replace
          the default chevron. Set <code>icon={'{false}'}</code> to hide it entirely.
        </p>
        <Preview
          code={`// Plus/minus icon that animates
<Collapsible
  icon={<PlusMinusIcon open={open} />}
  trigger={<Text style={{ fontWeight: 600 }}>Plus/Minus Icon</Text>}
>
  <Text>Custom icon content.</Text>
</Collapsible>

// No icon
<Collapsible
  icon={false}
  trigger={<Text style={{ fontWeight: 600 }}>No icon</Text>}
>
  <Text>Hidden content with no indicator.</Text>
</Collapsible>`}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: '100%' }}>
            <CustomIconDemo />
            <Collapsible
              icon={false}
              trigger={<Text style={{ fontWeight: 600 }}>No icon at all</Text>}
            >
              <div style={{ padding: '8px 0' }}>
                <Text>This collapsible has no icon indicator.</Text>
              </div>
            </Collapsible>
          </div>
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">Controlled</h2>
        <p style={{ marginBottom: 12 }}>
          Pass <code>open</code> and <code>onOpenChange</code> for full external control.
        </p>
        <Preview
          code={`const [open, setOpen] = useState(true);

<Button size="sm" onClick={() => setOpen(true)}>Open</Button>
<Button size="sm" variant="secondary" onClick={() => setOpen(false)}>Close</Button>

<Collapsible
  open={open}
  onOpenChange={setOpen}
  trigger={<Text style={{ fontWeight: 600 }}>Controlled Section</Text>}
>
  <Text>This section is externally controlled.</Text>
</Collapsible>`}
        >
          <ControlledDemo />
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">Props</h2>
        <PropsTable props={props} />
      </div>
    </div>
  );
}
