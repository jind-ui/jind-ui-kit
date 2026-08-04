import { useState } from 'react';
import { Switch } from 'jind-ui-kit';
import { Preview } from '../components/Preview';
import { PropsTable } from '../components/PropsTable';
import { ViewMarkdown } from '../components/ViewMarkdown';

const props = [
  { name: 'checked', type: 'boolean', description: 'Controlled on/off state' },
  { name: 'defaultChecked', type: 'boolean', description: 'Uncontrolled default state' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Disabled state' },
  { name: 'onChange', type: '(checked: boolean) => void', description: 'Called when toggled' },
  { name: 'label', type: 'string', description: 'Text label rendered beside the switch' },
  { name: 'style', type: 'CSSProperties', description: 'Custom inline styles' },
];

function SwitchDemo() {
  const [on, setOn] = useState(false);
  return <Switch checked={on} onChange={setOn} label={on ? 'On' : 'Off'} />;
}

export function ComponentSwitch() {
  return (
    <div className="page-container">
      <div className="page-header">
        <ViewMarkdown slug="switch" />
        <h1 className="page-title">Switch</h1>
        <p className="page-description">
          Toggle control for binary on/off states. Renders an accessible switch
          role with optional label.
        </p>
      </div>

      <div className="section">
        <h2 className="section-title">Interactive</h2>
        <Preview
          code={`const [on, setOn] = useState(false);

<Switch checked={on} onChange={setOn} label={on ? 'On' : 'Off'} />`}
        >
          <SwitchDemo />
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">Default On</h2>
        <Preview code={`<Switch defaultChecked label="Notifications" />`}>
          <Switch defaultChecked label="Notifications" />
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">Without Label</h2>
        <Preview code={`<Switch defaultChecked />`}>
          <Switch defaultChecked />
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">Disabled</h2>
        <Preview
          code={`<Switch disabled label="Disabled off" />
<Switch disabled defaultChecked label="Disabled on" />`}
        >
          <Switch disabled label="Disabled off" />
          <Switch disabled defaultChecked label="Disabled on" />
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">Props</h2>
        <PropsTable props={props} />
      </div>
    </div>
  );
}
