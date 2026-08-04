import { useState } from 'react';
import { SearchInput } from 'jind-ui-kit';
import { Preview } from '../components/Preview';
import { PropsTable } from '../components/PropsTable';
import { ViewMarkdown } from '../components/ViewMarkdown';

const props = [
  { name: 'value', type: 'string', description: 'Controlled search value' },
  { name: 'defaultValue', type: 'string', default: "''", description: 'Uncontrolled default value' },
  { name: 'placeholder', type: 'string', default: "'Search...'", description: 'Placeholder text shown when empty' },
  { name: 'onChange', type: '(value: string) => void', description: 'Called when the search value changes' },
  { name: 'onClear', type: '() => void', description: 'Called when the clear button is clicked. Falls back to clearing the value internally.' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Disabled state' },
  { name: 'error', type: 'boolean', default: 'false', description: 'Shows red border and danger focus ring' },
  { name: 'helperText', type: 'string', description: 'Helper or error text shown below the input' },
  { name: 'style', type: 'CSSProperties', description: 'Custom inline styles' },
];

function SearchDemo() {
  const [query, setQuery] = useState('');
  return (
    <SearchInput
      value={query}
      onChange={setQuery}
      placeholder="Search items..."
    />
  );
}

export function ComponentSearchInput() {
  return (
    <div className="page-container">
      <div className="page-header">
        <ViewMarkdown slug="search-input" />
        <h1 className="page-title">SearchInput</h1>
        <p className="page-description">
          Search field with a built-in magnifying glass icon and clearable value.
        </p>
      </div>

      <div className="section">
        <h2 className="section-title">Interactive</h2>
        <Preview
          code={`const [query, setQuery] = useState('');

<SearchInput
  value={query}
  onChange={setQuery}
  placeholder="Search items..."
/>`}
        >
          <SearchDemo />
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">With Default Value</h2>
        <Preview code={`<SearchInput defaultValue="react" />`}>
          <SearchInput defaultValue="react" />
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">Custom Placeholder</h2>
        <Preview code={`<SearchInput placeholder="Filter by name..." />`}>
          <SearchInput placeholder="Filter by name..." />
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">With Error</h2>
        <Preview
          code={`<SearchInput
  placeholder="Search..."
  error
  helperText="Please enter a search term"
/>`}
        >
          <SearchInput placeholder="Search..." error helperText="Please enter a search term" />
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">Disabled</h2>
        <Preview code={`<SearchInput disabled placeholder="Search unavailable" />`}>
          <SearchInput disabled placeholder="Search unavailable" />
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">Props</h2>
        <PropsTable props={props} />
      </div>
    </div>
  );
}
