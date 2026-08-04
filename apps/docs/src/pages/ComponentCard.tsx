import { Card, Button } from 'jind-ui-kit';
import { Preview } from '../components/Preview';
import { PropsTable } from '../components/PropsTable';
import { ViewMarkdown } from '../components/ViewMarkdown';

const props = [
  { name: 'as', type: 'ElementType', default: "'div'", description: 'Render as a different HTML element' },
  { name: 'padding', type: 'number', default: '20', description: 'Inner padding in pixels' },
  { name: 'title', type: 'string', description: 'Optional card header title' },
  { name: 'actions', type: 'ReactNode', description: 'Content rendered in the header opposite the title' },
  { name: 'children', type: 'ReactNode', description: 'Card body content' },
  { name: 'style', type: 'CSSProperties', description: 'Custom inline styles' },
];

export function ComponentCard() {
  return (
    <div className="page-container">
      <div className="page-header">
        <ViewMarkdown slug="card" />
        <h1 className="page-title">Card</h1>
        <p className="page-description">
          Surface container with elevation and rounded corners. Supports an
          optional title header, action slot, and polymorphic rendering.
        </p>
      </div>

      <div className="section">
        <h2 className="section-title">Basic</h2>
        <Preview
          code={`<Card>
  <p>This is a basic card with default padding.</p>
</Card>`}
        >
          <Card>
            <p style={{ margin: 0 }}>This is a basic card with default padding.</p>
          </Card>
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">With Title</h2>
        <Preview
          code={`<Card title="Overview">
  <p>Card content goes here.</p>
</Card>`}
        >
          <Card title="Overview">
            <p style={{ margin: 0 }}>Card content goes here.</p>
          </Card>
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">Title with Actions</h2>
        <Preview
          code={`<Card title="Team Members" actions={<Button size="sm">Add</Button>}>
  <p>Manage your team from here.</p>
</Card>`}
        >
          <Card title="Team Members" actions={<Button size="sm">Add</Button>}>
            <p style={{ margin: 0 }}>Manage your team from here.</p>
          </Card>
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">Custom Padding</h2>
        <Preview
          code={`<Card padding={40}>
  <p>This card has extra padding.</p>
</Card>`}
        >
          <Card padding={40}>
            <p style={{ margin: 0 }}>This card has extra padding.</p>
          </Card>
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">Props</h2>
        <PropsTable props={props} />
      </div>
    </div>
  );
}
