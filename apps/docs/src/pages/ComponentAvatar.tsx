import { Avatar } from 'jind-ui-kit';
import { Preview } from '../components/Preview';
import { PropsTable } from '../components/PropsTable';
import { ViewMarkdown } from '../components/ViewMarkdown';

const props = [
  { name: 'src', type: 'string', description: 'Image URL; when provided, renders an image instead of initials' },
  { name: 'name', type: 'string', description: 'Full name used to derive initials and as alt text' },
  { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Avatar diameter (sm = 24px, md = 32px, lg = 40px)' },
  { name: 'style', type: 'CSSProperties', description: 'Custom inline styles' },
];

export function ComponentAvatar() {
  return (
    <div className="page-container">
      <div className="page-header">
        <ViewMarkdown slug="avatar" />
        <h1 className="page-title">Avatar</h1>
        <p className="page-description">
          Circular user representation showing an image or auto-generated
          initials. Available in three sizes.
        </p>
      </div>

      <div className="section">
        <h2 className="section-title">With Initials</h2>
        <Preview
          code={`<Avatar name="Alice Johnson" />
<Avatar name="Bob Smith" />
<Avatar name="Clara" />`}
        >
          <Avatar name="Alice Johnson" />
          <Avatar name="Bob Smith" />
          <Avatar name="Clara" />
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">Sizes</h2>
        <Preview
          code={`<Avatar name="Alice Johnson" size="sm" />
<Avatar name="Alice Johnson" size="md" />
<Avatar name="Alice Johnson" size="lg" />`}
        >
          <Avatar name="Alice Johnson" size="sm" />
          <Avatar name="Alice Johnson" size="md" />
          <Avatar name="Alice Johnson" size="lg" />
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">With Image</h2>
        <Preview
          code={`<Avatar src="https://i.pravatar.cc/80?img=1" name="Jane Doe" size="lg" />
<Avatar src="https://i.pravatar.cc/80?img=2" name="John Doe" size="lg" />`}
        >
          <Avatar src="https://i.pravatar.cc/80?img=1" name="Jane Doe" size="lg" />
          <Avatar src="https://i.pravatar.cc/80?img=2" name="John Doe" size="lg" />
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">Props</h2>
        <PropsTable props={props} />
      </div>
    </div>
  );
}
