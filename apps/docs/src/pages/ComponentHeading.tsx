import { Heading } from 'jind-ui-kit';
import { Preview } from '../components/Preview';
import { PropsTable } from '../components/PropsTable';

const props = [
  { name: 'level', type: '1 | 2 | 3 | 4', default: '1', description: 'Heading level (h1–h4) with corresponding size' },
  { name: 'as', type: 'ElementType', description: 'Override the rendered element' },
];

export function ComponentHeading() {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Heading</h1>
        <p className="page-description">
          Semantic heading component with level-based sizing from the type scale.
        </p>
      </div>

      <div className="section">
        <h2 className="section-title">Levels</h2>
        <Preview
          align="column"
          code={`<Heading level={1}>Heading Level 1</Heading>
<Heading level={2}>Heading Level 2</Heading>
<Heading level={3}>Heading Level 3</Heading>
<Heading level={4}>Heading Level 4</Heading>`}
        >
          <Heading level={1}>Heading Level 1</Heading>
          <Heading level={2}>Heading Level 2</Heading>
          <Heading level={3}>Heading Level 3</Heading>
          <Heading level={4}>Heading Level 4</Heading>
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">Props</h2>
        <PropsTable props={props} />
      </div>
    </div>
  );
}
