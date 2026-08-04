import { Center, Box } from 'jind-ui-kit';
import { Preview } from '../components/Preview';
import { PropsTable } from '../components/PropsTable';

const props = [
  { name: 'inline', type: 'boolean', default: 'false', description: 'Use inline-flex instead of flex' },
  { name: 'as', type: 'ElementType', default: "'div'", description: 'Render as different element' },
];

export function ComponentCenter() {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Center</h1>
        <p className="page-description">
          Centers its children both horizontally and vertically using flexbox.
        </p>
      </div>

      <div className="section">
        <h2 className="section-title">Basic</h2>
        <Preview
          align="column"
          code={`<Center style={{ height: 120, background: '#f2f7fa', borderRadius: 10 }}>
  Centered Content
</Center>`}
        >
          <Center style={{ height: 120, background: '#f2f7fa', borderRadius: 10, width: '100%' }}>
            <Box p={4} bg="#eff5ff" radius="sm" style={{ fontSize: 14, fontWeight: 500, color: '#1a72f6' }}>
              Centered Content
            </Box>
          </Center>
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">Props</h2>
        <PropsTable props={props} />
      </div>
    </div>
  );
}
