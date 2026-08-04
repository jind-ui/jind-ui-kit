import { useState } from 'react';
import { Checkbox } from 'jind-ui-kit';
import { Preview } from '../components/Preview';
import { PropsTable } from '../components/PropsTable';
import { ViewMarkdown } from '../components/ViewMarkdown';

const props = [
  { name: 'checked', type: 'boolean', description: 'Controlled checked state' },
  { name: 'defaultChecked', type: 'boolean', default: 'false', description: 'Uncontrolled default checked state' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Disabled state' },
  { name: 'onChange', type: '(checked: boolean) => void', description: 'Called when the checked state changes' },
  { name: 'label', type: 'string', description: 'Text label rendered next to the checkbox' },
  { name: 'indeterminate', type: 'boolean', default: 'false', description: 'Show an indeterminate (dash) indicator' },
  { name: 'style', type: 'CSSProperties', description: 'Custom inline styles' },
];

function CheckboxDemo() {
  const [checked, setChecked] = useState(false);
  return (
    <Checkbox
      checked={checked}
      onChange={setChecked}
      label="Enable notifications"
    />
  );
}

export function ComponentCheckbox() {
  return (
    <div className="page-container">
      <div className="page-header">
        <ViewMarkdown slug="checkbox" />
        <h1 className="page-title">Checkbox</h1>
        <p className="page-description">
          Binary toggle with label and indeterminate support. Fully controllable
          and accessible.
        </p>
      </div>

      <div className="section">
        <h2 className="section-title">Interactive</h2>
        <Preview
          code={`const [checked, setChecked] = useState(false);

<Checkbox
  checked={checked}
  onChange={setChecked}
  label="Enable notifications"
/>`}
        >
          <CheckboxDemo />
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">Default Checked</h2>
        <Preview code={`<Checkbox defaultChecked label="Agreed to terms" />`}>
          <Checkbox defaultChecked label="Agreed to terms" />
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">Indeterminate</h2>
        <Preview code={`<Checkbox indeterminate label="Select all" />`}>
          <Checkbox indeterminate label="Select all" />
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">Disabled</h2>
        <Preview
          code={`<Checkbox disabled label="Disabled unchecked" />
<Checkbox disabled defaultChecked label="Disabled checked" />`}
        >
          <Checkbox disabled label="Disabled unchecked" />
          <Checkbox disabled defaultChecked label="Disabled checked" />
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">Props</h2>
        <PropsTable props={props} />
      </div>
    </div>
  );
}
