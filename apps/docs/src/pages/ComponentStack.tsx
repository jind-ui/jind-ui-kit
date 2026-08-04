import { Stack, HStack, VStack, Box } from 'jind-ui-kit';
import { Preview } from '../components/Preview';
import { PropsTable } from '../components/PropsTable';

const stackProps = [
  { name: 'direction', type: "'row' | 'column'", default: "'column'", description: 'Flex direction' },
  { name: 'gap', type: 'Space (1-12)', default: '3', description: 'Space between children' },
  { name: 'align', type: 'CSSProperties["alignItems"]', description: 'Cross-axis alignment' },
  { name: 'justify', type: 'CSSProperties["justifyContent"]', description: 'Main-axis alignment' },
  { name: 'wrap', type: 'boolean', default: 'false', description: 'Enable flex wrap' },
  { name: 'as', type: 'ElementType', default: "'div'", description: 'Render as different element' },
];

function Placeholder({ children }: { children: string }) {
  return (
    <Box p={4} bg="#eff5ff" radius="sm" style={{ fontSize: 13, fontWeight: 500, color: '#1a72f6', textAlign: 'center', minWidth: 60 }}>
      {children}
    </Box>
  );
}

export function ComponentStack() {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Stack / HStack / VStack</h1>
        <p className="page-description">
          Flex layout primitives for arranging children with consistent spacing.
        </p>
      </div>

      <div className="section">
        <h2 className="section-title">VStack (vertical)</h2>
        <Preview
          align="left"
          code={`<VStack gap={3}>
  <Box p={4} bg="#eff5ff" radius="sm">One</Box>
  <Box p={4} bg="#eff5ff" radius="sm">Two</Box>
  <Box p={4} bg="#eff5ff" radius="sm">Three</Box>
</VStack>`}
        >
          <VStack gap={3} style={{ width: '100%' }}>
            <Placeholder>One</Placeholder>
            <Placeholder>Two</Placeholder>
            <Placeholder>Three</Placeholder>
          </VStack>
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">HStack (horizontal)</h2>
        <Preview
          code={`<HStack gap={3}>
  <Box p={4} bg="#eff5ff" radius="sm">One</Box>
  <Box p={4} bg="#eff5ff" radius="sm">Two</Box>
  <Box p={4} bg="#eff5ff" radius="sm">Three</Box>
</HStack>`}
        >
          <HStack gap={3}>
            <Placeholder>One</Placeholder>
            <Placeholder>Two</Placeholder>
            <Placeholder>Three</Placeholder>
          </HStack>
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">Stack with direction</h2>
        <Preview
          code={`<Stack direction="row" gap={4} align="center" justify="space-between">
  <Box>Left</Box>
  <Box>Center</Box>
  <Box>Right</Box>
</Stack>`}
        >
          <Stack direction="row" gap={4} align="center" justify="space-between" style={{ width: '100%' }}>
            <Placeholder>Left</Placeholder>
            <Placeholder>Center</Placeholder>
            <Placeholder>Right</Placeholder>
          </Stack>
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">Props</h2>
        <PropsTable props={stackProps} />
      </div>
    </div>
  );
}
