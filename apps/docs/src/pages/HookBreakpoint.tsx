import { useBreakpoint, Box, Text, Badge, VStack, HStack } from 'jind-ui-kit';
import { CodeBlock } from '../components/CodeBlock';
import { PropsTable } from '../components/PropsTable';

const returns = [
  { name: 'breakpoint', type: "'mobile' | 'tablet' | 'desktop'", description: 'Current breakpoint based on window width' },
];

function InteractiveDemo() {
  const breakpoint = useBreakpoint();
  const colors: Record<string, string> = { mobile: 'red', tablet: 'amber', desktop: 'green' };

  return (
    <VStack gap={4} style={{ width: 360, maxWidth: '100%' }}>
      <HStack gap={3} style={{ alignItems: 'center' }}>
        <Text variant="body">Current breakpoint:</Text>
        <Badge tone={colors[breakpoint] as 'red' | 'amber' | 'green'}>{breakpoint}</Badge>
      </HStack>
      <Text variant="caption" color="#7c8083">
        Resize your browser window to see it change.
      </Text>
      <Box p={4} bg="#f2f7fa" radius="md">
        <Text variant="body" style={{ fontFamily: 'var(--font-mono)', fontSize: 13 }}>
          mobile: 0px — 767px<br />
          tablet: 768px — 1023px<br />
          desktop: 1024px+
        </Text>
      </Box>
    </VStack>
  );
}

export function HookBreakpoint() {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">useBreakpoint</h1>
        <p className="page-description">
          Returns the current breakpoint name based on window width. Updates on
          resize with a debounced listener.
        </p>
      </div>

      <div className="section">
        <h2 className="section-title">Live Demo</h2>
        <div className="preview-card">
          <div className="preview-area">
            <InteractiveDemo />
          </div>
          <CodeBlock code={`import { useBreakpoint } from 'jind-ui-kit';

function ResponsiveLayout() {
  const breakpoint = useBreakpoint();

  return (
    <Stack direction={breakpoint === 'mobile' ? 'column' : 'row'}>
      <Sidebar />
      <MainContent />
    </Stack>
  );
}`} />
        </div>
      </div>

      <div className="section">
        <h2 className="section-title">Return Value</h2>
        <PropsTable props={returns} />
      </div>
    </div>
  );
}
