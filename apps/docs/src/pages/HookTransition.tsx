import { useTransition, useDisclosure, Box, Button, Text, VStack, useTheme } from 'jind-ui-kit';
import { Preview } from '../components/Preview';
import { PropsTable } from '../components/PropsTable';

const params = [
  { name: 'isOpen', type: 'boolean', description: 'Whether the element should be visible' },
  { name: 'options.duration', type: 'number', default: '200', description: 'Enter transition duration in ms' },
  { name: 'options.exitDuration', type: 'number', description: 'Exit duration (defaults to duration)' },
];

const returns = [
  { name: 'mounted', type: 'boolean', description: 'Whether the element should be in the DOM' },
  { name: 'status', type: 'TransitionStatus', description: '"unmounted" | "entering" | "entered" | "exiting"' },
  { name: 'style', type: 'CSSProperties', description: 'Pre-built opacity + transform transition styles' },
];

function TransitionDemo() {
  const theme = useTheme();
  const { isOpen, onToggle } = useDisclosure();
  const { mounted, status, style } = useTransition(isOpen, { duration: 300 });

  return (
    <VStack gap={4} style={{ alignItems: 'center' }}>
      <Button variant="primary" size="sm" onClick={onToggle} style={{ minWidth: 100 }}>
        {isOpen ? 'Hide' : 'Show'}
      </Button>
      <Text variant="caption" color={theme.semantic.text.secondary}>
        Status: {status}
      </Text>
      {mounted && (
        <Box
          p={5}
          bg={theme.semantic.surface.card}
          radius="md"
          shadow="card"
          style={{ ...style, width: 260, textAlign: 'center', border: `1px solid ${theme.semantic.border.default}` }}
        >
          <Text variant="body" weight={500}>Animated panel</Text>
          <Text variant="caption" color={theme.semantic.text.secondary} style={{ marginTop: 4 }}>
            Fades in and slides up on enter, reverses on exit.
          </Text>
        </Box>
      )}
    </VStack>
  );
}

export function HookTransition() {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">useTransition</h1>
        <p className="page-description">
          Manages mount/unmount transitions with CSS opacity and transform.
          Returns a style object, a mounted flag, and a status string for full control.
        </p>
      </div>

      <div className="section">
        <h2 className="section-title">Demo</h2>
        <p className="section-text">
          Toggle visibility to see the enter/exit animation. The component is removed
          from the DOM after the exit transition completes.
        </p>
        <Preview
          code={`const { isOpen, onToggle } = useDisclosure();
const { mounted, status, style } = useTransition(isOpen, {
  duration: 300,
});

return (
  <>
    <Button onClick={onToggle}>{isOpen ? 'Hide' : 'Show'}</Button>
    <Text>Status: {status}</Text>
    {mounted && (
      <Box style={style}>Animated panel</Box>
    )}
  </>
);`}
        >
          <TransitionDemo />
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
