import { Box } from 'jind-ui-kit';
import { Preview } from '../components/Preview';
import { PropsTable } from '../components/PropsTable';

const props = [
  { name: 'as', type: 'ElementType', default: "'div'", description: 'Render as a different HTML element' },
  { name: 'p / px / py', type: 'Space (1-12)', description: 'Padding using the space scale' },
  { name: 'm / mx / my', type: 'Space (1-12)', description: 'Margin using the space scale' },
  { name: 'gap', type: 'Space (1-12)', description: 'Gap for flex/grid children' },
  { name: 'bg', type: 'string', description: 'Background color' },
  { name: 'radius', type: "'xs'|'sm'|'md'|'lg'|'full'|'none'", description: 'Border radius token' },
  { name: 'shadow', type: "'xs'|'sm'|'card'|'menu'|'none'", description: 'Box shadow token' },
  { name: 'border', type: 'string', description: 'Border shorthand' },
  { name: 'width / height', type: 'number | string', description: 'Dimensions' },
  { name: 'minH / maxW', type: 'number | string', description: 'Min/max constraints' },
];

export function ComponentBox() {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Box</h1>
        <p className="page-description">
          The foundational layout primitive. A polymorphic div with spacing,
          color, radius, shadow, and dimension props.
        </p>
      </div>

      <div className="section">
        <h2 className="section-title">Basic Usage</h2>
        <Preview
          code={`<Box p={6} bg="#f2f7fa" radius="md">
  Content inside a Box
</Box>`}
        >
          <Box p={6} bg="#f2f7fa" radius="md" style={{ width: '100%' }}>
            Content inside a Box
          </Box>
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">With Shadow</h2>
        <Preview
          code={`<Box p={6} bg="white" radius="lg" shadow="card">
  Elevated card-style Box
</Box>`}
        >
          <Box p={6} bg="white" radius="lg" shadow="card">
            Elevated card-style Box
          </Box>
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">As Different Element</h2>
        <Preview
          code={`<Box as="section" p={8} bg="#eff5ff" radius="md">
  Rendered as a section element
</Box>`}
        >
          <Box as="section" p={8} bg="#eff5ff" radius="md" style={{ width: '100%' }}>
            Rendered as a &lt;section&gt; element
          </Box>
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">Props</h2>
        <PropsTable props={props} />
      </div>
    </div>
  );
}
