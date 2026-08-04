import { useRef, useState } from 'react';
import { useClickOutside, Box, Text, Button, useTheme } from 'jind-ui-kit';
import { Preview } from '../components/Preview';
import { PropsTable } from '../components/PropsTable';

const params = [
  { name: 'ref', type: 'RefObject<HTMLElement | null>', description: 'Ref to the element that defines the "inside" boundary' },
  { name: 'handler', type: '(event: MouseEvent | TouchEvent) => void', description: 'Called when a click or touch lands outside the referenced element' },
  { name: 'enabled', type: 'boolean', default: 'true', description: 'Toggle the listener on or off' },
];

function ClickOutsideDemo() {
  const theme = useTheme();
  const ref = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);

  useClickOutside(ref, () => setCount((c) => c + 1));

  return (
    <div style={{ textAlign: 'center' }}>
      <Box
        ref={ref}
        p={6}
        bg={theme.semantic.surface.card}
        radius="md"
        shadow="card"
        style={{ display: 'inline-block' }}
      >
        <Text variant="body" weight="medium">Click outside this box</Text>
      </Box>
      <div style={{ marginTop: 12, display: 'flex', justifyContent: 'center', gap: 4 }}>
        <Text variant="caption" color={theme.semantic.text.secondary}>Outside clicks:</Text>
        <Text variant="caption" color={theme.semantic.text.secondary} style={{ minWidth: 20, textAlign: 'center' }}>{count}</Text>
      </div>
    </div>
  );
}

export function HookClickOutside() {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">useClickOutside</h1>
        <p className="page-description">
          Fires a callback when a click or touch event lands outside a referenced element.
          Commonly used to close dropdowns, modals, and popovers.
        </p>
      </div>

      <div className="section">
        <h2 className="section-title">Demo</h2>
        <p className="section-text">
          Click anywhere outside the card to increment the counter.
        </p>
        <Preview
          code={`const ref = useRef<HTMLDivElement>(null);
const [count, setCount] = useState(0);

useClickOutside(ref, () => setCount(c => c + 1));

return (
  <Box ref={ref} p={6} radius="md" shadow="card">
    <Text>Click outside this box</Text>
  </Box>
);`}
        >
          <ClickOutsideDemo />
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">Parameters</h2>
        <PropsTable props={params} />
      </div>
    </div>
  );
}
