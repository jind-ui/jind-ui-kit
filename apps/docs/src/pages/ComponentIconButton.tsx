import { IconButton } from 'jind-ui-kit';
import { Preview } from '../components/Preview';
import { PropsTable } from '../components/PropsTable';
import { ViewMarkdown } from '../components/ViewMarkdown';

const props = [
  { name: 'icon', type: 'string', description: 'Iconoir icon name' },
  { name: 'label', type: 'string', description: 'Accessible aria-label (required)' },
  { name: 'variant', type: "'ghost' | 'outline'", default: "'ghost'", description: 'Visual style' },
  { name: 'size', type: "'md' | 'sm'", default: "'md'", description: 'Size variant' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Disabled state' },
  { name: 'as', type: 'ElementType', default: "'button'", description: 'Render as different element' },
];

export function ComponentIconButton() {
  return (
    <div className="page-container">
      <div className="page-header">
        <ViewMarkdown slug="icon-button" />
        <h1 className="page-title">IconButton</h1>
        <p className="page-description">
          Icon-only button with accessible label. Perfect for toolbars and compact actions.
        </p>
      </div>

      <div className="section">
        <h2 className="section-title">Variants</h2>
        <Preview
          code={`<IconButton icon="settings" label="Settings" variant="ghost" />
<IconButton icon="edit" label="Edit" variant="outline" />`}
        >
          <IconButton icon="settings" label="Settings" variant="ghost" />
          <IconButton icon="edit" label="Edit" variant="outline" />
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">Sizes</h2>
        <Preview
          code={`<IconButton icon="plus" label="Add" size="md" />
<IconButton icon="plus" label="Add" size="sm" />`}
        >
          <IconButton icon="plus" label="Add" size="md" />
          <IconButton icon="plus" label="Add" size="sm" />
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">Disabled</h2>
        <Preview
          code={`<IconButton icon="trash" label="Delete" disabled />`}
        >
          <IconButton icon="trash" label="Delete" disabled />
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">Props</h2>
        <PropsTable props={props} />
      </div>
    </div>
  );
}
