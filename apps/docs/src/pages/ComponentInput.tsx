import { Input } from 'jind-ui-kit';
import { Preview } from '../components/Preview';
import { PropsTable } from '../components/PropsTable';
import { ViewMarkdown } from '../components/ViewMarkdown';

const props = [
  { name: 'value', type: 'string', description: 'Controlled input value' },
  { name: 'defaultValue', type: 'string', description: 'Uncontrolled default value' },
  { name: 'placeholder', type: 'string', default: "'Enter a value'", description: 'Placeholder text shown when empty' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Disabled state' },
  { name: 'iconLeft', type: 'string', description: 'Icon element rendered in the left slot' },
  { name: 'onChange', type: '(value: string) => void', description: 'Called when the value changes' },
  { name: 'style', type: 'CSSProperties', description: 'Custom inline styles' },
];

export function ComponentInput() {
  return (
    <div className="page-container">
      <div className="page-header">
        <ViewMarkdown slug="input" />
        <h1 className="page-title">Input</h1>
        <p className="page-description">
          Single-line text field with optional icon and placeholder support.
        </p>
      </div>

      <div className="section">
        <h2 className="section-title">Basic</h2>
        <Preview code={`<Input />`}>
          <Input />
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">With Placeholder</h2>
        <Preview code={`<Input placeholder="Enter your name" />`}>
          <Input placeholder="Enter your name" />
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">With Icon</h2>
        <Preview code={`<Input iconLeft="@" placeholder="Username" />`}>
          <Input iconLeft="@" placeholder="Username" />
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">Disabled</h2>
        <Preview code={`<Input placeholder="Cannot edit" disabled />`}>
          <Input placeholder="Cannot edit" disabled />
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">With Default Value</h2>
        <Preview code={`<Input defaultValue="Hello world" />`}>
          <Input defaultValue="Hello world" />
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">Props</h2>
        <PropsTable props={props} />
      </div>
    </div>
  );
}
