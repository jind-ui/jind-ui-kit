import { useState } from 'react';
import { Radio, RadioGroup } from 'jind-ui-kit';
import { Preview } from '../components/Preview';
import { PropsTable } from '../components/PropsTable';
import { ViewMarkdown } from '../components/ViewMarkdown';

const groupProps = [
  { name: 'value', type: 'string', description: 'Controlled selected value' },
  { name: 'defaultValue', type: 'string', description: 'Uncontrolled default value' },
  { name: 'onChange', type: '(value: string) => void', description: 'Called when the selection changes' },
  { name: 'name', type: 'string', description: 'HTML name attribute for the radio group' },
  { name: 'children', type: 'ReactNode', description: 'Radio items' },
  { name: 'style', type: 'CSSProperties', description: 'Custom inline styles' },
];

const radioProps = [
  { name: 'value', type: 'string', description: 'Value associated with this radio option' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Disabled state' },
  { name: 'label', type: 'string', description: 'Text label for the radio option' },
  { name: 'style', type: 'CSSProperties', description: 'Custom inline styles' },
];

function RadioDemo() {
  const [value, setValue] = useState('email');
  return (
    <RadioGroup value={value} onChange={setValue} name="contact">
      <Radio value="email" label="Email" />
      <Radio value="phone" label="Phone" />
      <Radio value="mail" label="Mail" />
    </RadioGroup>
  );
}

export function ComponentRadio() {
  return (
    <div className="page-container">
      <div className="page-header">
        <ViewMarkdown slug="radio" />
        <h1 className="page-title">Radio</h1>
        <p className="page-description">
          Mutually exclusive option selector. Use RadioGroup to manage selection
          state and Radio for individual options.
        </p>
      </div>

      <div className="section">
        <h2 className="section-title">Interactive Group</h2>
        <Preview
          code={`const [value, setValue] = useState('email');

<RadioGroup value={value} onChange={setValue} name="contact">
  <Radio value="email" label="Email" />
  <Radio value="phone" label="Phone" />
  <Radio value="mail" label="Mail" />
</RadioGroup>`}
        >
          <RadioDemo />
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">With Default Value</h2>
        <Preview
          code={`<RadioGroup defaultValue="medium" name="size">
  <Radio value="small" label="Small" />
  <Radio value="medium" label="Medium" />
  <Radio value="large" label="Large" />
</RadioGroup>`}
        >
          <RadioGroup defaultValue="medium" name="size">
            <Radio value="small" label="Small" />
            <Radio value="medium" label="Medium" />
            <Radio value="large" label="Large" />
          </RadioGroup>
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">With Disabled Option</h2>
        <Preview
          code={`<RadioGroup defaultValue="standard" name="shipping">
  <Radio value="standard" label="Standard" />
  <Radio value="express" label="Express" />
  <Radio value="overnight" label="Overnight" disabled />
</RadioGroup>`}
        >
          <RadioGroup defaultValue="standard" name="shipping">
            <Radio value="standard" label="Standard" />
            <Radio value="express" label="Express" />
            <Radio value="overnight" label="Overnight" disabled />
          </RadioGroup>
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">RadioGroup Props</h2>
        <PropsTable props={groupProps} />
      </div>

      <div className="section">
        <h2 className="section-title">Radio Props</h2>
        <PropsTable props={radioProps} />
      </div>
    </div>
  );
}
