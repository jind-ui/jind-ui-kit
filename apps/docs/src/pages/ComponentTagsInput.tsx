import { useState } from 'react';
import { TagsInput } from 'jind-ui-kit';
import { Preview } from '../components/Preview';
import { PropsTable } from '../components/PropsTable';
import { ViewMarkdown } from '../components/ViewMarkdown';

const props = [
  { name: 'tags', type: 'string[]', description: 'Array of tag strings to display' },
  { name: 'placeholder', type: 'string', default: "'Add tag...'", description: 'Placeholder shown when no tags are present' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Disabled state' },
  { name: 'onRemove', type: '(index: number) => void', description: 'Called with the index of the tag to remove' },
  { name: 'style', type: 'CSSProperties', description: 'Custom inline styles' },
];

function TagsDemo() {
  const [tags, setTags] = useState(['React', 'TypeScript', 'Vite']);
  return (
    <TagsInput
      tags={tags}
      onRemove={(index) => setTags((prev) => prev.filter((_, i) => i !== index))}
    />
  );
}

export function ComponentTagsInput() {
  return (
    <div className="page-container">
      <div className="page-header">
        <ViewMarkdown slug="tags-input" />
        <h1 className="page-title">TagsInput</h1>
        <p className="page-description">
          Displays a list of removable tags inside a field-like container.
        </p>
      </div>

      <div className="section">
        <h2 className="section-title">Interactive</h2>
        <Preview
          code={`const [tags, setTags] = useState(['React', 'TypeScript', 'Vite']);

<TagsInput
  tags={tags}
  onRemove={(index) =>
    setTags((prev) => prev.filter((_, i) => i !== index))
  }
/>`}
        >
          <TagsDemo />
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">Empty State</h2>
        <Preview code={`<TagsInput tags={[]} placeholder="No tags yet" />`}>
          <TagsInput tags={[]} placeholder="No tags yet" />
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">Disabled</h2>
        <Preview
          code={`<TagsInput tags={['Locked', 'Tags']} disabled />`}
        >
          <TagsInput tags={['Locked', 'Tags']} disabled />
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">Props</h2>
        <PropsTable props={props} />
      </div>
    </div>
  );
}
