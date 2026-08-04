import { Text } from 'jind-ui-kit';
import { Preview } from '../components/Preview';
import { PropsTable } from '../components/PropsTable';

const props = [
  { name: 'variant', type: "'body'|'control'|'label'|'caption'|'card-title'|'heading'", default: "'body'", description: 'Typography preset' },
  { name: 'color', type: 'string', description: 'Text color' },
  { name: 'weight', type: "'regular'|'medium'|'bold'", description: 'Override font weight' },
  { name: 'size', type: 'number', description: 'Override font size' },
  { name: 'truncate', type: 'boolean', default: 'false', description: 'Truncate with ellipsis' },
  { name: 'tabular', type: 'boolean', default: 'false', description: 'Tabular number spacing' },
  { name: 'as', type: 'ElementType', default: "'p'", description: 'Render as different element' },
];

export function ComponentText() {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Text</h1>
        <p className="page-description">
          Typography primitive for rendering text with design system variants.
        </p>
      </div>

      <div className="section">
        <h2 className="section-title">Variants</h2>
        <Preview
          align="column"
          code={`<Text variant="heading">Heading variant</Text>
<Text variant="card-title">Card title variant</Text>
<Text variant="body">Body variant</Text>
<Text variant="label">Label variant</Text>
<Text variant="caption">Caption variant</Text>
<Text variant="control">Control variant</Text>`}
        >
          <Text variant="heading">Heading variant</Text>
          <Text variant="card-title">Card title variant</Text>
          <Text variant="body">Body variant — the default for paragraph text</Text>
          <Text variant="label">Label variant</Text>
          <Text variant="caption">Caption variant</Text>
          <Text variant="control">Control variant</Text>
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">Colors</h2>
        <Preview
          align="column"
          code={`<Text color="#1a72f6">Brand blue text</Text>
<Text color="#7c8083">Secondary gray text</Text>
<Text color="#e8503a">Danger red text</Text>`}
        >
          <Text color="#1a72f6">Brand blue text</Text>
          <Text color="#7c8083">Secondary gray text</Text>
          <Text color="#e8503a">Danger red text</Text>
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">Truncation</h2>
        <Preview
          align="column"
          code={`<Text truncate style={{ maxWidth: 300 }}>
  This is a very long text that will be truncated with an ellipsis
</Text>`}
        >
          <Text truncate style={{ maxWidth: 300 }}>
            This is a very long text that will be truncated with an ellipsis when it overflows
          </Text>
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">Props</h2>
        <PropsTable props={props} />
      </div>
    </div>
  );
}
