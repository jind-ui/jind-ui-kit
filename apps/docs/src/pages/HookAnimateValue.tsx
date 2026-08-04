import { useState } from 'react';
import { useAnimateValue, Text, Button, Badge, HStack, VStack, useTheme } from 'jind-ui-kit';
import { Preview } from '../components/Preview';
import { PropsTable } from '../components/PropsTable';

const params = [
  { name: 'target', type: 'number', description: 'The value to animate toward' },
  { name: 'options.duration', type: 'number', default: '300', description: 'Animation duration in ms' },
  { name: 'options.easing', type: '(t: number) => number', default: 'easeOutCubic', description: 'Easing function (0→1 input, 0→1 output)' },
];

const returns = [
  { name: 'current', type: 'number', description: 'The current interpolated value (updates every frame)' },
];

function AnimateValueDemo() {
  const theme = useTheme();
  const [target, setTarget] = useState(0);
  const animated = useAnimateValue(target, { duration: 600 });

  return (
    <VStack gap={4} style={{ alignItems: 'center', width: 280 }}>
      <Text variant="heading" weight="bold" size={48} style={{ minWidth: 80, textAlign: 'center', fontVariantNumeric: 'tabular-nums' }}>
        {Math.round(animated)}
      </Text>
      <div style={{
        width: '100%',
        height: 8,
        borderRadius: 4,
        background: theme.semantic.surface.quiet,
        overflow: 'hidden',
      }}>
        <div style={{
          width: `${animated}%`,
          height: '100%',
          borderRadius: 4,
          background: theme.semantic.fill.primary,
          transition: 'none',
        }} />
      </div>
      <HStack gap={2} style={{ flexWrap: 'wrap', justifyContent: 'center' }}>
        <Button size="sm" variant="secondary" onClick={() => setTarget(0)}>0</Button>
        <Button size="sm" variant="secondary" onClick={() => setTarget(25)}>25</Button>
        <Button size="sm" variant="secondary" onClick={() => setTarget(50)}>50</Button>
        <Button size="sm" variant="secondary" onClick={() => setTarget(75)}>75</Button>
        <Button size="sm" variant="primary" onClick={() => setTarget(100)}>100</Button>
      </HStack>
      <HStack gap={2} style={{ alignItems: 'center' }}>
        <Text variant="caption" color={theme.semantic.text.secondary}>Target:</Text>
        <Badge tone="blue" style={{ minWidth: 36, textAlign: 'center' }}>{target}</Badge>
      </HStack>
    </VStack>
  );
}

export function HookAnimateValue() {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">useAnimateValue</h1>
        <p className="page-description">
          Smoothly interpolates a number toward a target using requestAnimationFrame.
          Perfect for progress bars, counters, and gauge-style animations.
        </p>
      </div>

      <div className="section">
        <h2 className="section-title">Demo</h2>
        <p className="section-text">
          Click a button to animate the value. The number and progress bar
          smoothly transition using an easeOutCubic curve.
        </p>
        <Preview
          code={`const [target, setTarget] = useState(0);
const animated = useAnimateValue(target, { duration: 600 });

return (
  <>
    <Text size={48}>{Math.round(animated)}</Text>
    <div style={{ width: \`\${animated}%\`, background: 'blue' }} />
    <Button onClick={() => setTarget(100)}>100</Button>
  </>
);`}
        >
          <AnimateValueDemo />
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
