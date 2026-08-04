import { useState } from 'react';
import { usePrevious, Text, Button, Badge, HStack, useTheme } from 'jind-ui-kit';
import { Preview } from '../components/Preview';
import { PropsTable } from '../components/PropsTable';

const params = [
  { name: 'value', type: 'T', description: 'The value to track across renders' },
];

const returns = [
  { name: 'previous', type: 'T | undefined', description: 'The value from the previous render, or undefined on the first render' },
];

function PreviousDemo() {
  const theme = useTheme();
  const [count, setCount] = useState(0);
  const previous = usePrevious(count);

  return (
    <div style={{ width: 240, maxWidth: '100%' }}>
      <HStack justify="space-between" align="center">
        <Button variant="secondary" size="sm" onClick={() => setCount((c) => c - 1)}>-</Button>
        <Text variant="heading" weight="bold" size={24} style={{ minWidth: 48, textAlign: 'center' }}>{count}</Text>
        <Button variant="primary" size="sm" onClick={() => setCount((c) => c + 1)}>+</Button>
      </HStack>
      <HStack justify="center" align="center" gap={2} style={{ marginTop: 12 }}>
        <Text variant="caption" color={theme.semantic.text.secondary}>Previous value:</Text>
        <Badge tone="blue" style={{ minWidth: 32, textAlign: 'center' }}>{previous !== undefined ? String(previous) : '—'}</Badge>
      </HStack>
    </div>
  );
}

export function HookPrevious() {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">usePrevious</h1>
        <p className="page-description">
          Returns the value of a variable from the previous render.
          Useful for comparing current vs. previous state to trigger side effects.
        </p>
      </div>

      <div className="section">
        <h2 className="section-title">Demo</h2>
        <p className="section-text">
          Increment or decrement the counter to see the previous value trail behind.
        </p>
        <Preview
          code={`const [count, setCount] = useState(0);
const previous = usePrevious(count);

return (
  <HStack justify="space-between" align="center" gap={4}>
    <Button size="sm" onClick={() => setCount(c => c - 1)}>-</Button>
    <Text variant="heading" weight="bold">{count}</Text>
    <Button size="sm" onClick={() => setCount(c => c + 1)}>+</Button>
    <Text variant="caption">Prev:</Text>
    <Badge tone="blue">{previous ?? '—'}</Badge>
  </HStack>
);`}
        >
          <PreviousDemo />
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">Parameters</h2>
        <PropsTable props={params} />
      </div>

      <div className="section">
        <h2 className="section-title">Returns</h2>
        <PropsTable props={returns} />
      </div>
    </div>
  );
}
