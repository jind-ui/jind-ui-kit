import { TextButton } from 'jind-ui-kit';
import { Preview } from '../components/Preview';
import { PropsTable } from '../components/PropsTable';
import { ViewMarkdown } from '../components/ViewMarkdown';

const props = [
  { name: 'variant', type: "'plain' | 'link' | 'dropdown' | 'sort'", description: 'Button variant with corresponding icon' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Disabled state' },
  { name: 'chevronSide', type: "'left' | 'right'", default: "'right'", description: 'Icon position' },
  { name: 'children', type: 'ReactNode', description: 'Button label' },
];

export function ComponentTextButton() {
  return (
    <div className="page-container">
      <div className="page-header">
        <ViewMarkdown slug="text-button" />
        <h1 className="page-title">TextButton</h1>
        <p className="page-description">
          Minimal text-style button with variant icons. Used for secondary actions, links, dropdowns, and sorting.
        </p>
      </div>

      <div className="section">
        <h2 className="section-title">Variants</h2>
        <Preview
          code={`<TextButton variant="plain">Plain</TextButton>
<TextButton variant="link">External Link</TextButton>
<TextButton variant="dropdown">Select Option</TextButton>
<TextButton variant="sort">Sort By</TextButton>`}
        >
          <TextButton variant="plain">Plain</TextButton>
          <TextButton variant="link">External Link</TextButton>
          <TextButton variant="dropdown">Select Option</TextButton>
          <TextButton variant="sort">Sort By</TextButton>
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">Disabled</h2>
        <Preview
          code={`<TextButton variant="link" disabled>Disabled Link</TextButton>`}
        >
          <TextButton variant="link" disabled>Disabled Link</TextButton>
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">Props</h2>
        <PropsTable props={props} />
      </div>
    </div>
  );
}
