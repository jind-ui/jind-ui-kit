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
  { name: 'clearable', type: 'boolean', default: 'false', description: 'Shows a clear button when the input has a value' },
  { name: 'error', type: 'boolean', default: 'false', description: 'Shows red border and danger focus ring' },
  { name: 'helperText', type: 'string', description: 'Helper or error text shown below the input' },
  { name: 'onChange', type: '(value: string) => void', description: 'Called when the value changes' },
  { name: 'onClear', type: '() => void', description: 'Called when the clear button is clicked (defaults to clearing the value)' },
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
        <h2 className="section-title">Clearable</h2>
        <Preview
          code={`<Input
  defaultValue="Click the X to clear"
  clearable
/>`}
        >
          <Input defaultValue="Click the X to clear" clearable />
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">With Helper Text</h2>
        <Preview
          code={`<Input
  placeholder="Enter your email"
  helperText="We'll never share your email."
/>`}
        >
          <Input placeholder="Enter your email" helperText="We'll never share your email." />
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">With Error</h2>
        <Preview
          code={`<Input
  placeholder="Enter your email"
  error
  helperText="Email is required"
/>`}
        >
          <Input placeholder="Enter your email" error helperText="Email is required" />
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
