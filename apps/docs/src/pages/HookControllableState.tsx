import { useState } from 'react';
import { useControllableState, Box, Text, Button, VStack, HStack, Badge } from 'jind-ui-kit';
import { CodeBlock } from '../components/CodeBlock';
import { PropsTable } from '../components/PropsTable';

const params = [
  { name: 'value', type: 'T | undefined', description: 'Controlled value (from parent)' },
  { name: 'defaultValue', type: 'T', description: 'Initial value for uncontrolled mode' },
  { name: 'onChange', type: '(value: T) => void', description: 'Callback when value changes' },
];

function UncontrolledDemo() {
  const [value, setValue] = useControllableState<number>(undefined, 0);

  return (
    <VStack gap={3} style={{ width: 300 }}>
      <Text variant="caption" color="#7c8083">Uncontrolled (internal state)</Text>
      <HStack gap={3} style={{ alignItems: 'center' }}>
        <Button size="sm" variant="secondary" onClick={() => setValue(value - 1)}>-</Button>
        <Badge tone="blue" style={{ minWidth: 40, textAlign: 'center' }}>{value}</Badge>
        <Button size="sm" variant="secondary" onClick={() => setValue(value + 1)}>+</Button>
      </HStack>
    </VStack>
  );
}

function ControlledDemo() {
  const [count, setCount] = useState(5);
  const [value, setValue] = useControllableState<number>(count, 0, setCount);

  return (
    <VStack gap={3} style={{ width: 300 }}>
      <Text variant="caption" color="#7c8083">Controlled (parent owns state)</Text>
      <HStack gap={3} style={{ alignItems: 'center' }}>
        <Button size="sm" variant="secondary" onClick={() => setValue(value - 1)}>-</Button>
        <Badge tone="green" style={{ minWidth: 40, textAlign: 'center' }}>{value}</Badge>
        <Button size="sm" variant="secondary" onClick={() => setValue(value + 1)}>+</Button>
      </HStack>
      <HStack gap={1} style={{ alignItems: 'center' }}>
        <Text variant="caption" color="#a9b0b6">Parent state:</Text>
        <Text variant="caption" color="#a9b0b6" style={{ minWidth: 20, textAlign: 'center' }}>{count}</Text>
      </HStack>
    </VStack>
  );
}

export function HookControllableState() {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">useControllableState</h1>
        <p className="page-description">
          Seamlessly supports both controlled and uncontrolled component
          patterns. Used internally by every form component.
        </p>
      </div>

      <div className="section">
        <h2 className="section-title">Interactive Demos</h2>
        <div className="preview-card">
          <div className="preview-area" style={{ gap: 32 }}>
            <UncontrolledDemo />
            <ControlledDemo />
          </div>
          <CodeBlock code={`// Uncontrolled — component manages its own state
const [value, setValue] = useControllableState(undefined, 0);

// Controlled — parent owns the state
const [count, setCount] = useState(5);
const [value, setValue] = useControllableState(count, 0, setCount);`} />
        </div>
      </div>

      <div className="section">
        <h2 className="section-title">Parameters</h2>
        <PropsTable props={params} />
      </div>

      <div className="section">
        <h2 className="section-title">Building a Component</h2>
        <p className="section-text">
          This is the pattern used by Input, Checkbox, Slider, and every other
          form component in the kit:
        </p>
        <CodeBlock code={`import { useControllableState } from 'jind-ui-kit';

interface RatingProps {
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  max?: number;
}

function Rating({ value: valueProp, defaultValue = 0, onChange, max = 5 }: RatingProps) {
  const [value, setValue] = useControllableState(valueProp, defaultValue, onChange);

  return (
    <HStack gap={1}>
      {Array.from({ length: max }, (_, i) => (
        <button key={i} onClick={() => setValue(i + 1)}>
          {i < value ? 'filled-star' : 'empty-star'}
        </button>
      ))}
    </HStack>
  );
}

// Both patterns work:
<Rating defaultValue={3} />                    // uncontrolled
<Rating value={rating} onChange={setRating} />  // controlled`} />
      </div>
    </div>
  );
}
