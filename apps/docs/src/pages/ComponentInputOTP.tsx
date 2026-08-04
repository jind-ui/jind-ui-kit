import { useState } from 'react';
import { InputOTP } from 'jind-ui-kit';
import { Preview } from '../components/Preview';
import { PropsTable } from '../components/PropsTable';
import { ViewMarkdown } from '../components/ViewMarkdown';

const props = [
  { name: 'length', type: 'number', default: '6', description: 'Number of input cells' },
  { name: 'value', type: 'string', description: 'Controlled value' },
  { name: 'defaultValue', type: 'string', description: 'Uncontrolled default value' },
  { name: 'onChange', type: '(value: string) => void', description: 'Called when the value changes' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Disabled state' },
  { name: 'error', type: 'boolean', default: 'false', description: 'Show error styling on all cells' },
  { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Cell height and width' },
  { name: 'separator', type: 'number', description: 'Index at which to insert a visual separator dash' },
  { name: 'type', type: "'numeric' | 'alphanumeric'", default: "'numeric'", description: 'Accepted character type' },
  { name: 'autoFocus', type: 'boolean', default: 'false', description: 'Auto-focus the first cell on mount' },
  { name: 'style', type: 'CSSProperties', description: 'Custom inline styles' },
];

function ControlledDemo() {
  const [code, setCode] = useState('');
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <InputOTP length={6} value={code} onChange={setCode} />
      <span style={{ fontSize: 13, opacity: 0.6 }}>
        Value: {code || '(empty)'}
      </span>
    </div>
  );
}

export function ComponentInputOTP() {
  return (
    <div className="page-container">
      <div className="page-header">
        <ViewMarkdown slug="input-otp" />
        <h1 className="page-title">InputOTP</h1>
        <p className="page-description">
          One-time-password input with individual character cells. Supports paste,
          keyboard navigation, numeric and alphanumeric modes.
        </p>
      </div>

      <div className="section">
        <h2 className="section-title">Basic (6-digit)</h2>
        <Preview code={`<InputOTP length={6} />`}>
          <InputOTP length={6} />
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">4-digit</h2>
        <Preview code={`<InputOTP length={4} />`}>
          <InputOTP length={4} />
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">With Separator</h2>
        <Preview
          code={`<InputOTP length={6} separator={3} />`}
        >
          <InputOTP length={6} separator={3} />
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">Alphanumeric</h2>
        <Preview
          code={`<InputOTP length={6} type="alphanumeric" />`}
        >
          <InputOTP length={6} type="alphanumeric" />
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">Controlled</h2>
        <Preview
          code={`const [code, setCode] = useState('');

<InputOTP length={6} value={code} onChange={setCode} />`}
        >
          <ControlledDemo />
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">Error State</h2>
        <Preview
          code={`<InputOTP length={6} defaultValue="123" error />`}
        >
          <InputOTP length={6} defaultValue="123" error />
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">Disabled</h2>
        <Preview
          code={`<InputOTP length={6} defaultValue="847293" disabled />`}
        >
          <InputOTP length={6} defaultValue="847293" disabled />
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">Props</h2>
        <PropsTable props={props} />
      </div>
    </div>
  );
}
