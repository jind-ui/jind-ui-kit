import { useMediaQuery, Badge, Text, HStack, VStack } from 'jind-ui-kit';
import { Preview } from '../components/Preview';
import { PropsTable } from '../components/PropsTable';

const params = [
  { name: 'query', type: 'string', description: 'A CSS media query string, e.g. "(min-width: 768px)"' },
];

const returns = [
  { name: 'matches', type: 'boolean', description: 'Whether the media query currently matches' },
];

function MediaQueryDemo() {
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const isTablet = useMediaQuery('(min-width: 768px)');
  const prefersDark = useMediaQuery('(prefers-color-scheme: dark)');

  return (
    <VStack gap={3}>
      <HStack gap={3} style={{ alignItems: 'center' }}>
        <Text variant="body" style={{ minWidth: 180 }}>min-width: 1024px</Text>
        <Badge tone={isDesktop ? 'green' : 'gray'}>{isDesktop ? 'true' : 'false'}</Badge>
      </HStack>
      <HStack gap={3} style={{ alignItems: 'center' }}>
        <Text variant="body" style={{ minWidth: 180 }}>min-width: 768px</Text>
        <Badge tone={isTablet ? 'green' : 'gray'}>{isTablet ? 'true' : 'false'}</Badge>
      </HStack>
      <HStack gap={3} style={{ alignItems: 'center' }}>
        <Text variant="body" style={{ minWidth: 180 }}>prefers-color-scheme: dark</Text>
        <Badge tone={prefersDark ? 'green' : 'gray'}>{prefersDark ? 'true' : 'false'}</Badge>
      </HStack>
    </VStack>
  );
}

export function HookMediaQuery() {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">useMediaQuery</h1>
        <p className="page-description">
          Subscribe to a CSS media query and re-render when it changes.
          Returns a boolean indicating whether the query currently matches.
        </p>
      </div>

      <div className="section">
        <h2 className="section-title">Live Queries</h2>
        <p className="section-text">
          Resize your browser to see values update in real time.
        </p>
        <Preview
          code={`const isDesktop = useMediaQuery('(min-width: 1024px)');
const isTablet = useMediaQuery('(min-width: 768px)');
const prefersDark = useMediaQuery('(prefers-color-scheme: dark)');

return (
  <VStack gap={3}>
    <HStack gap={3}>
      <Text>min-width: 1024px</Text>
      <Badge tone={isDesktop ? 'green' : 'gray'}>
        {isDesktop ? 'true' : 'false'}
      </Badge>
    </HStack>
  </VStack>
);`}
        >
          <MediaQueryDemo />
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
