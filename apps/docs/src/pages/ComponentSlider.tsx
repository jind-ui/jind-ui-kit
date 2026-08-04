import { useState } from 'react';
import { Slider, Grid } from 'jind-ui-kit';
import { Preview } from '../components/Preview';
import { PropsTable } from '../components/PropsTable';
import { ViewMarkdown } from '../components/ViewMarkdown';

const props = [
  { name: 'value', type: 'number', description: 'Controlled value' },
  { name: 'defaultValue', type: 'number', default: '0', description: 'Uncontrolled default value' },
  { name: 'onChange', type: '(value: number) => void', description: 'Called when the value changes' },
  { name: 'min', type: 'number', default: '0', description: 'Minimum value' },
  { name: 'max', type: 'number', default: '100', description: 'Maximum value' },
  { name: 'step', type: 'number', default: '1', description: 'Step increment' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Disabled state' },
  { name: 'label', type: 'string', description: 'Label text shown above the slider' },
  { name: 'showValue', type: 'boolean', default: 'false', description: 'Display the current value above the slider' },
  { name: 'labelAlign', type: "'left' | 'center' | 'right'", default: "'left'", description: 'Alignment of the label row' },
  { name: 'style', type: 'CSSProperties', description: 'Custom inline styles' },
];

function SliderDemo() {
  const [value, setValue] = useState(40);
  return <Slider value={value} onChange={setValue} label="Volume" showValue />;
}

export function ComponentSlider() {
  return (
    <div className="page-container">
      <div className="page-header">
        <ViewMarkdown slug="slider" />
        <h1 className="page-title">Slider</h1>
        <p className="page-description">
          Draggable range control for numeric values. Takes full parent width by default.
          Supports label display with alignment, value readout, and custom step increments.
        </p>
      </div>

      <div className="section">
        <h2 className="section-title">Interactive</h2>
        <Preview
          code={`const [value, setValue] = useState(40);

<Slider value={value} onChange={setValue} label="Volume" showValue />`}
        >
          <SliderDemo />
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">Custom Range</h2>
        <Preview
          code={`<Slider defaultValue={25} min={0} max={50} step={5} label="Quantity" showValue />`}
        >
          <Slider defaultValue={25} min={0} max={50} step={5} label="Quantity" showValue />
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">Label Alignment</h2>
        <p className="section-text">
          Use <code>labelAlign</code> to position the label row.
          When set to <code>center</code> or <code>right</code>, both the label and value
          shift together.
        </p>
        <Preview
          code={`<Slider defaultValue={50} label="Left (default)" showValue labelAlign="left" />
<Slider defaultValue={50} label="Centered" showValue labelAlign="center" />
<Slider defaultValue={50} label="Right" showValue labelAlign="right" />`}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24, width: '100%' }}>
            <Slider defaultValue={50} label="Left (default)" showValue labelAlign="left" />
            <Slider defaultValue={50} label="Centered" showValue labelAlign="center" />
            <Slider defaultValue={50} label="Right" showValue labelAlign="right" />
          </div>
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">Width Control with Grid</h2>
        <p className="section-text">
          The slider fills its parent width. Nest it inside a Grid to control sizing.
        </p>
        <Preview
          code={`<Grid columns={2} gap={24}>
  <Slider defaultValue={30} label="Left" showValue />
  <Slider defaultValue={70} label="Right" showValue />
</Grid>`}
        >
          <Grid columns={2} gap={24}>
            <Slider defaultValue={30} label="Left" showValue />
            <Slider defaultValue={70} label="Right" showValue />
          </Grid>
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">Without Label</h2>
        <Preview code={`<Slider defaultValue={60} />`}>
          <Slider defaultValue={60} />
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">Disabled</h2>
        <Preview code={`<Slider defaultValue={30} disabled label="Brightness" showValue />`}>
          <Slider defaultValue={30} disabled label="Brightness" showValue />
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">Props</h2>
        <PropsTable props={props} />
      </div>
    </div>
  );
}
