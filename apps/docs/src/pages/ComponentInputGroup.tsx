import { Input, InputGroup, useTheme } from 'jind-ui-kit';
import { Preview } from '../components/Preview';
import { PropsTable } from '../components/PropsTable';
import { ViewMarkdown } from '../components/ViewMarkdown';

const props = [
  { name: 'children', type: 'ReactNode', description: 'The input element to wrap' },
  { name: 'leftAddon', type: 'ReactNode', description: 'Static content rendered to the left of the input (e.g. "https://" or "$")' },
  { name: 'rightAddon', type: 'ReactNode', description: 'Static content rendered to the right of the input (e.g. ".com" or units)' },
  { name: 'leftElement', type: 'ReactNode', description: 'Overlay element positioned inside the input on the left (e.g. an icon)' },
  { name: 'rightElement', type: 'ReactNode', description: 'Overlay element positioned inside the input on the right (e.g. an icon)' },
  { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Control height applied to addons' },
  { name: 'style', type: 'CSSProperties', description: 'Custom inline styles on the container' },
];

export function ComponentInputGroup() {
  const theme = useTheme();
  return (
    <div className="page-container">
      <div className="page-header">
        <ViewMarkdown slug="input-group" />
        <h1 className="page-title">InputGroup</h1>
        <p className="page-description">
          Wraps an input with addons and overlay elements for prefixes, suffixes,
          and inline icons.
        </p>
      </div>

      <div className="section">
        <h2 className="section-title">Left Addon</h2>
        <Preview
          code={`<InputGroup leftAddon="https://">
  <Input placeholder="example.com" />
</InputGroup>`}
        >
          <InputGroup leftAddon="https://">
            <Input placeholder="example.com" />
          </InputGroup>
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">Right Addon</h2>
        <Preview
          code={`<InputGroup rightAddon=".com">
  <Input placeholder="yoursite" />
</InputGroup>`}
        >
          <InputGroup rightAddon=".com">
            <Input placeholder="yoursite" />
          </InputGroup>
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">Both Addons</h2>
        <Preview
          code={`<InputGroup leftAddon="$" rightAddon="USD">
  <Input placeholder="0.00" />
</InputGroup>`}
        >
          <InputGroup leftAddon="$" rightAddon="USD">
            <Input placeholder="0.00" />
          </InputGroup>
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">With Left Element</h2>
        <Preview
          code={`<InputGroup
  leftElement={<span style={{ fontSize: 14 }}>&#x1F50D;</span>}
>
  <Input placeholder="Search..." />
</InputGroup>`}
        >
          <InputGroup
            leftElement={<span style={{ fontSize: 14 }}>&#x1F50D;</span>}
          >
            <Input placeholder="Search..." />
          </InputGroup>
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">With Right Element</h2>
        <Preview
          code={`<InputGroup
  rightElement={<span style={{ fontSize: 13, color: 'var(--text-muted, #999)' }}>@</span>}
>
  <Input placeholder="Email address" />
</InputGroup>`}
        >
          <InputGroup
            rightElement={<span style={{ fontSize: 13, color: theme.semantic.text.muted }}>@</span>}
          >
            <Input placeholder="Email address" />
          </InputGroup>
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">Combined</h2>
        <Preview
          code={`<InputGroup
  leftAddon="$"
  rightAddon="per month"
  leftElement={<span style={{ fontSize: 14 }}>&#x1F4B0;</span>}
>
  <Input placeholder="0.00" />
</InputGroup>`}
        >
          <InputGroup
            leftAddon="$"
            rightAddon="per month"
            leftElement={<span style={{ fontSize: 14 }}>&#x1F4B0;</span>}
          >
            <Input placeholder="0.00" />
          </InputGroup>
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">Props</h2>
        <PropsTable props={props} />
      </div>
    </div>
  );
}
