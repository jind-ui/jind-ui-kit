import { useState } from 'react';
import { Combobox } from 'jind-ui-kit';
import { Preview } from '../components/Preview';
import { PropsTable } from '../components/PropsTable';
import { ViewMarkdown } from '../components/ViewMarkdown';

const props = [
  { name: 'options', type: 'ComboboxOption[]', description: 'Array of { value, label, disabled? } options' },
  { name: 'value', type: 'string', description: 'Controlled selected value' },
  { name: 'defaultValue', type: 'string', description: 'Uncontrolled default value' },
  { name: 'onChange', type: '(value: string) => void', description: 'Called when the selection changes' },
  { name: 'placeholder', type: 'string', default: "'Search...'", description: 'Placeholder text in the search input' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Disabled state' },
  { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Control height' },
  { name: 'emptyMessage', type: 'string', default: "'No results'", description: 'Message shown when no options match the query' },
  { name: 'label', type: 'string', description: 'Label text rendered above the input' },
  { name: 'error', type: 'string', description: 'Error message shown below the input' },
  { name: 'style', type: 'CSSProperties', description: 'Custom inline styles' },
];

const fruits = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
  { value: 'date', label: 'Date' },
  { value: 'elderberry', label: 'Elderberry' },
];

function ControlledDemo() {
  const [value, setValue] = useState('cherry');
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <Combobox
        options={fruits}
        value={value}
        onChange={setValue}
        placeholder="Search fruits..."
      />
      <span style={{ fontSize: 13, opacity: 0.6 }}>Selected: {value}</span>
    </div>
  );
}

export function ComponentCombobox() {
  return (
    <div className="page-container">
      <div className="page-header">
        <ViewMarkdown slug="combobox" />
        <h1 className="page-title">Combobox</h1>
        <p className="page-description">
          Searchable dropdown selector with keyboard navigation, filtering, and
          disabled-option support.
        </p>
      </div>

      <div className="section">
        <h2 className="section-title">Basic</h2>
        <Preview
          code={`<Combobox
  options={[
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'cherry', label: 'Cherry' },
  ]}
  placeholder="Search fruits..."
/>`}
        >
          <Combobox options={fruits} placeholder="Search fruits..." />
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">Controlled</h2>
        <Preview
          code={`const [value, setValue] = useState('cherry');

<Combobox
  options={fruits}
  value={value}
  onChange={setValue}
  placeholder="Search fruits..."
/>`}
        >
          <ControlledDemo />
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">With Label and Placeholder</h2>
        <Preview
          code={`<Combobox
  options={fruits}
  label="Favourite fruit"
  placeholder="Type to search..."
/>`}
        >
          <Combobox
            options={fruits}
            label="Favourite fruit"
            placeholder="Type to search..."
          />
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">Empty State</h2>
        <Preview
          code={`<Combobox
  options={[]}
  emptyMessage="Nothing here yet"
  placeholder="Try searching..."
/>`}
        >
          <Combobox
            options={[]}
            emptyMessage="Nothing here yet"
            placeholder="Try searching..."
          />
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">Disabled</h2>
        <Preview
          code={`<Combobox
  options={fruits}
  defaultValue="banana"
  disabled
/>`}
        >
          <Combobox options={fruits} defaultValue="banana" disabled />
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">With Error</h2>
        <Preview
          code={`<Combobox
  options={fruits}
  label="Required field"
  error="Please select a fruit"
/>`}
        >
          <Combobox
            options={fruits}
            label="Required field"
            error="Please select a fruit"
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
