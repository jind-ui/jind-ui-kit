import { useState } from 'react';
import { Button, HStack, VStack, Text, useTheme } from 'jind-ui-kit';
import { Preview } from '../components/Preview';
import { PropsTable } from '../components/PropsTable';
import { ViewMarkdown } from '../components/ViewMarkdown';

const props = [
  { name: 'variant', type: "'primary' | 'secondary'", default: "'primary'", description: 'Visual style of the button' },
  { name: 'size', type: "'md' | 'sm'", default: "'md'", description: 'Size variant' },
  { name: 'iconLeft', type: 'ReactNode', description: 'Icon element for left slot (string for Iconoir name, or any ReactNode)' },
  { name: 'iconRight', type: 'ReactNode', description: 'Icon element for right slot (string for Iconoir name, or any ReactNode)' },
  { name: 'iconActive', type: 'boolean', description: 'When provided, rotates iconRight 180° (for dropdown chevrons)' },
  { name: 'iconAnimation', type: "'shift-right' | 'pulse' | 'spin' | 'bounce' | 'none'", default: "'none'", description: 'Looping animation applied to icons' },
  { name: 'pressEffect', type: "'scale' | 'shift' | 'glow' | 'none'", default: "'scale'", description: 'Press feedback animation' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Disabled state' },
  { name: 'fullWidth', type: 'boolean', default: 'false', description: 'Stretch to fill container width' },
  { name: 'as', type: 'ElementType', default: "'button'", description: 'Render as a different element' },
];

function ChevronDown({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ArrowRight({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PlusIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 3V13M3 8H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function DropdownDemo() {
  const [open, setOpen] = useState(false);
  const theme = useTheme();

  return (
    <VStack gap={3} style={{ position: 'relative', minWidth: 180 }}>
      <Button
        variant="secondary"
        iconRight={<ChevronDown />}
        iconActive={open}
        onClick={() => setOpen(!open)}
      >
        Products
      </Button>
      {open && (
        <div style={{
          position: 'absolute',
          top: 50,
          left: 0,
          right: 0,
          padding: 8,
          background: theme.semantic.surface.card,
          border: `1px solid ${theme.semantic.border.subtle}`,
          borderRadius: theme.radius.md,
          boxShadow: theme.shadow.md,
          zIndex: 10,
        }}>
          <Text variant="caption" color={theme.semantic.text.secondary} style={{ padding: '4px 8px' }}>
            Dropdown opens — chevron rotates!
          </Text>
        </div>
      )}
    </VStack>
  );
}

function IconAnimationDemo() {
  return (
    <HStack gap={3} style={{ flexWrap: 'wrap' }}>
      <Button variant="primary" iconRight={<ArrowRight />} iconAnimation="shift-right">
        Continue
      </Button>
      <Button variant="secondary" iconLeft={<PlusIcon />} iconAnimation="pulse">
        Add Item
      </Button>
      <Button variant="secondary" iconAnimation="bounce" iconRight={<ChevronDown />}>
        Scroll Down
      </Button>
    </HStack>
  );
}

export function ComponentButton() {
  return (
    <div className="page-container">
      <div className="page-header">
        <ViewMarkdown slug="button" />
        <h1 className="page-title">Button</h1>
        <p className="page-description">
          Primary action trigger. Supports two variants, two sizes, ReactNode icon slots
          with animations, state-reactive icons, and polymorphic rendering.
        </p>
      </div>

      <div className="section">
        <h2 className="section-title">Variants</h2>
        <Preview
          code={`<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>`}
        >
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">Sizes</h2>
        <Preview
          code={`<Button size="md">Medium</Button>
<Button size="sm">Small</Button>`}
        >
          <Button size="md">Medium</Button>
          <Button size="sm">Small</Button>
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">With Icons</h2>
        <p className="section-text">
          Pass any <code>ReactNode</code> as <code>iconLeft</code> or <code>iconRight</code>.
          String values still work as Iconoir class names for backwards compatibility.
        </p>
        <Preview
          code={`<Button iconLeft={<PlusIcon />}>Add Item</Button>
<Button iconRight={<ArrowRight />}>Continue</Button>
<Button iconLeft="plus">Iconoir Name</Button>`}
        >
          <Button variant="primary" iconLeft={<PlusIcon />}>Add Item</Button>
          <Button variant="secondary" iconRight={<ArrowRight />}>Continue</Button>
          <Button variant="secondary" iconLeft="plus">Iconoir Name</Button>
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">State-Reactive Icon</h2>
        <p className="section-text">
          Use <code>iconActive</code> to toggle the right icon's rotation — perfect for
          dropdown chevrons. No manual CSS needed.
        </p>
        <Preview
          code={`const [open, setOpen] = useState(false);

<Button
  variant="secondary"
  iconRight={<ChevronDown />}
  iconActive={open}
  onClick={() => setOpen(!open)}
>
  Products
</Button>`}
        >
          <DropdownDemo />
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">Icon Animation</h2>
        <p className="section-text">
          Use <code>iconAnimation</code> to add looping attention effects to icons:
          <code>shift-right</code>, <code>pulse</code>, <code>spin</code>, or <code>bounce</code>.
        </p>
        <Preview
          code={`<Button iconRight={<ArrowRight />} iconAnimation="shift-right">
  Continue
</Button>
<Button iconLeft={<PlusIcon />} iconAnimation="pulse">
  Add Item
</Button>`}
        >
          <IconAnimationDemo />
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">Press Effects</h2>
        <Preview
          code={`<Button pressEffect="scale">Scale</Button>
<Button pressEffect="shift">Shift</Button>
<Button pressEffect="glow" variant="secondary">Glow</Button>`}
        >
          <Button pressEffect="scale">Scale</Button>
          <Button pressEffect="shift" variant="secondary">Shift</Button>
          <Button pressEffect="glow" variant="secondary">Glow</Button>
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">Disabled</h2>
        <Preview
          code={`<Button disabled>Disabled</Button>
<Button variant="secondary" disabled>Disabled</Button>`}
        >
          <Button disabled>Disabled</Button>
          <Button variant="secondary" disabled>Disabled</Button>
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">Full Width</h2>
        <Preview
          align="column"
          code={`<Button fullWidth>Full Width Button</Button>`}
        >
          <Button fullWidth>Full Width Button</Button>
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">Props</h2>
        <PropsTable props={props} />
      </div>
    </div>
  );
}
