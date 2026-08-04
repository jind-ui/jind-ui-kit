import { Container, Box } from 'jind-ui-kit';
import { Preview } from '../components/Preview';
import { PropsTable } from '../components/PropsTable';

const props = [
  { name: 'maxWidth', type: 'number | string', default: '1200', description: 'Maximum width of the container' },
  { name: 'as', type: 'ElementType', default: "'div'", description: 'Render as different element' },
];

export function ComponentContainer() {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Container</h1>
        <p className="page-description">
          Max-width centered container for page-level content wrapping.
        </p>
      </div>

      <div className="section">
        <h2 className="section-title">Basic</h2>
        <Preview
          align="column"
          code={`<Container maxWidth={600}>
  <Box p={6} bg="#f2f7fa" radius="md">
    Content constrained to 600px
  </Box>
</Container>`}
        >
          <Container maxWidth={600} style={{ width: '100%' }}>
            <Box p={6} bg="#f2f7fa" radius="md">
              Content constrained to max 600px, centered in parent
            </Box>
          </Container>
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">Props</h2>
        <PropsTable props={props} />
      </div>
    </div>
  );
}
