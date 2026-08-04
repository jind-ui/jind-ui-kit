import { Select } from 'jind-ui-kit';
import { Preview } from '../components/Preview';
import { PropsTable } from '../components/PropsTable';
import { ViewMarkdown } from '../components/ViewMarkdown';

const props = [
  { name: 'value', type: 'string', description: 'Controlled selected value' },
  { name: 'defaultValue', type: 'string', description: 'Uncontrolled default value' },
  { name: 'placeholder', type: 'string', default: "'Select'", description: 'Placeholder text when no option is selected' },
  { name: 'options', type: 'SelectOption[]', description: 'Array of string or { label, value, swatch? } options' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Disabled state' },
  { name: 'error', type: 'boolean', default: 'false', description: 'Shows red border and danger focus ring' },
  { name: 'helperText', type: 'string', description: 'Helper or error text shown below the select' },
  { name: 'onChange', type: '(value: string) => void', description: 'Called when the selection changes' },
  { name: 'style', type: 'CSSProperties', description: 'Custom inline styles' },
];

export function ComponentSelect() {
  return (
    <div className="page-container">
      <div className="page-header">
        <ViewMarkdown slug="select" />
        <h1 className="page-title">Select</h1>
        <p className="page-description">
          Dropdown selector supporting string options and rich options with labels
          and color swatches.
        </p>
      </div>

      <div className="section">
        <h2 className="section-title">Basic</h2>
        <Preview
          code={`<Select
  options={['Apple', 'Banana', 'Cherry']}
  placeholder="Pick a fruit"
/>`}
        >
          <Select options={['Apple', 'Banana', 'Cherry']} placeholder="Pick a fruit" />
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">Rich Options</h2>
        <Preview
          code={`<Select
  options={[
    { label: 'Red', value: 'red', swatch: '#ef4444' },
    { label: 'Green', value: 'green', swatch: '#22c55e' },
    { label: 'Blue', value: 'blue', swatch: '#3b82f6' },
  ]}
  placeholder="Choose a color"
/>`}
        >
          <Select
            options={[
              { label: 'Red', value: 'red', swatch: '#ef4444' },
              { label: 'Green', value: 'green', swatch: '#22c55e' },
              { label: 'Blue', value: 'blue', swatch: '#3b82f6' },
            ]}
            placeholder="Choose a color"
          />
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">With Default Value</h2>
        <Preview
          code={`<Select
  options={['Small', 'Medium', 'Large']}
  defaultValue="Medium"
/>`}
        >
          <Select options={['Small', 'Medium', 'Large']} defaultValue="Medium" />
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">With Error</h2>
        <Preview
          code={`<Select
  options={['Apple', 'Banana', 'Cherry']}
  placeholder="Pick a fruit"
  error
  helperText="Selection is required"
/>`}
        >
          <Select
            options={['Apple', 'Banana', 'Cherry']}
            placeholder="Pick a fruit"
            error
            helperText="Selection is required"
          />
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">Disabled</h2>
        <Preview
          code={`<Select
  options={['Apple', 'Banana', 'Cherry']}
  defaultValue="Banana"
  disabled
/>`}
        >
          <Select options={['Apple', 'Banana', 'Cherry']} defaultValue="Banana" disabled />
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">Props</h2>
        <PropsTable props={props} />
      </div>
    </div>
  );
}
