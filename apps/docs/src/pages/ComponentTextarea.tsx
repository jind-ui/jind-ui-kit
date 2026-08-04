import { Textarea } from 'jind-ui-kit';
import { Preview } from '../components/Preview';
import { PropsTable } from '../components/PropsTable';
import { ViewMarkdown } from '../components/ViewMarkdown';

const props = [
  { name: 'value', type: 'string', description: 'Controlled value' },
  { name: 'defaultValue', type: 'string', description: 'Uncontrolled default value' },
  { name: 'placeholder', type: 'string', default: "'Enter a message'", description: 'Placeholder text shown when empty' },
  { name: 'rows', type: 'number', default: '6', description: 'Number of visible text rows' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Disabled state' },
  { name: 'onChange', type: '(value: string) => void', description: 'Called when the value changes' },
  { name: 'style', type: 'CSSProperties', description: 'Custom inline styles' },
];

export function ComponentTextarea() {
  return (
    <div className="page-container">
      <div className="page-header">
        <ViewMarkdown slug="textarea" />
        <h1 className="page-title">Textarea</h1>
        <p className="page-description">
          Multi-line text input with configurable row height, placeholder, and
          vertical resize support.
        </p>
      </div>

      <div className="section">
        <h2 className="section-title">Basic</h2>
        <Preview code={`<Textarea />`}>
          <Textarea />
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">With Placeholder</h2>
        <Preview code={`<Textarea placeholder="Write your feedback here..." />`}>
          <Textarea placeholder="Write your feedback here..." />
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">Custom Rows</h2>
        <Preview code={`<Textarea rows={3} placeholder="Short note" />`}>
          <Textarea rows={3} placeholder="Short note" />
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">With Default Value</h2>
        <Preview
          code={`<Textarea defaultValue="This textarea has pre-filled content." rows={4} />`}
        >
          <Textarea defaultValue="This textarea has pre-filled content." rows={4} />
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">Disabled</h2>
        <Preview code={`<Textarea disabled placeholder="Cannot edit" />`}>
          <Textarea disabled placeholder="Cannot edit" />
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">Props</h2>
        <PropsTable props={props} />
      </div>
    </div>
  );
}
