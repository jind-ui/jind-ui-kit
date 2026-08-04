import { NativeSelect } from 'jind-ui-kit';
import { Preview } from '../components/Preview';
import { PropsTable } from '../components/PropsTable';
import { ViewMarkdown } from '../components/ViewMarkdown';

const props = [
  { name: 'options', type: 'NativeSelectOption[]', description: 'Array of { value, label, disabled? } options' },
  { name: 'value', type: 'string', description: 'Controlled selected value' },
  { name: 'defaultValue', type: 'string', description: 'Uncontrolled default value' },
  { name: 'onChange', type: '(value: string) => void', description: 'Called when the selection changes' },
  { name: 'placeholder', type: 'string', description: 'Placeholder text shown when no value is selected' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Disabled state' },
  { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Control height' },
  { name: 'label', type: 'string', description: 'Label text rendered above the select' },
  { name: 'error', type: 'boolean', description: 'Shows red border and danger focus ring' },
  { name: 'helperText', type: 'string', description: 'Helper or error text shown below the select' },
  { name: 'fullWidth', type: 'boolean', default: 'false', description: 'Stretch to fill the container width' },
  { name: 'style', type: 'CSSProperties', description: 'Custom inline styles' },
];

const countries = [
  { value: 'us', label: 'United States' },
  { value: 'ca', label: 'Canada' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'de', label: 'Germany' },
  { value: 'fr', label: 'France' },
];

export function ComponentNativeSelect() {
  return (
    <div className="page-container">
      <div className="page-header">
        <ViewMarkdown slug="native-select" />
        <h1 className="page-title">NativeSelect</h1>
        <p className="page-description">
          Styled wrapper around the native HTML select element. Lightweight,
          accessible, and mobile-friendly.
        </p>
      </div>

      <div className="section">
        <h2 className="section-title">Basic</h2>
        <Preview
          code={`<NativeSelect
  options={[
    { value: 'us', label: 'United States' },
    { value: 'ca', label: 'Canada' },
    { value: 'uk', label: 'United Kingdom' },
  ]}
  placeholder="Select a country"
/>`}
        >
          <NativeSelect options={countries} placeholder="Select a country" />
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">With Label</h2>
        <Preview
          code={`<NativeSelect
  options={countries}
  label="Country"
  placeholder="Choose your country"
/>`}
        >
          <NativeSelect
            options={countries}
            label="Country"
            placeholder="Choose your country"
          />
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">With Error</h2>
        <Preview
          code={`<NativeSelect
  options={countries}
  label="Country"
  placeholder="Choose your country"
  error
  helperText="This field is required"
/>`}
        >
          <NativeSelect
            options={countries}
            label="Country"
            placeholder="Choose your country"
            error
            helperText="This field is required"
          />
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">Disabled</h2>
        <Preview
          code={`<NativeSelect
  options={countries}
  defaultValue="ca"
  disabled
/>`}
        >
          <NativeSelect options={countries} defaultValue="ca" disabled />
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">Full Width</h2>
        <Preview
          code={`<NativeSelect
  options={countries}
  label="Country"
  placeholder="Select..."
  fullWidth
/>`}
        >
          <NativeSelect
            options={countries}
            label="Country"
            placeholder="Select..."
            fullWidth
          />
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">Props</h2>
        <PropsTable props={props} />
      </div>
    </div>
  );
}
