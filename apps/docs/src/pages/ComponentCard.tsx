import { Card, Button, Badge, useTheme } from 'jind-ui-kit';
import { Preview } from '../components/Preview';
import { PropsTable } from '../components/PropsTable';
import { ViewMarkdown } from '../components/ViewMarkdown';

const cardProps = [
  { name: 'as', type: 'ElementType', default: "'div'", description: 'Render as a different HTML element' },
  { name: 'variant', type: "'elevated' | 'outline' | 'filled' | 'ghost'", default: "'elevated'", description: 'Visual style variant' },
  { name: 'interactive', type: 'boolean', default: 'false', description: 'Adds hover/press transition for clickable cards' },
  { name: 'padding', type: 'number', default: '20 or 0', description: 'Inner padding (0 when using sub-components)' },
  { name: 'radius', type: 'RadiusValue', default: "'md'", description: 'Border radius' },
  { name: 'title', type: 'string', description: 'Shorthand: renders a header with this title' },
  { name: 'actions', type: 'ReactNode', description: 'Shorthand: content opposite the title in the header' },
  { name: 'children', type: 'ReactNode', description: 'Card body content' },
  { name: 'style', type: 'CSSProperties', description: 'Custom inline styles' },
];

const subComponents = [
  { name: 'Card.Header', type: 'Component', description: 'Top section — flex row for title & actions' },
  { name: 'Card.Title', type: 'Component', description: 'Styled title with optional subtitle prop' },
  { name: 'Card.Body', type: 'Component', description: 'Main content area with padding' },
  { name: 'Card.Footer', type: 'Component', description: 'Bottom section with top border; justify prop controls alignment' },
  { name: 'Card.Media', type: 'Component', description: 'Full-bleed image slot — src, alt, height props' },
];

export function ComponentCard() {
  const theme = useTheme();

  return (
    <div className="page-container">
      <div className="page-header">
        <ViewMarkdown slug="card" />
        <h1 className="page-title">Card</h1>
        <p className="page-description">
          Composable surface container with variants, sub-components, and polymorphic rendering.
          Use the simple title/actions shorthand or build custom layouts with Card.Header, Card.Body, Card.Footer, and Card.Media.
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
        <h2 className="section-title">With Title (Shorthand)</h2>
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
        <h2 className="section-title">Variants</h2>
        <Preview
          code={`<Card variant="elevated"><p>Elevated (default)</p></Card>
<Card variant="outline"><p>Outline</p></Card>
<Card variant="filled"><p>Filled</p></Card>
<Card variant="ghost"><p>Ghost</p></Card>`}
        >
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <Card variant="elevated">
              <p style={{ margin: 0 }}>Elevated (default)</p>
            </Card>
            <Card variant="outline">
              <p style={{ margin: 0 }}>Outline</p>
            </Card>
            <Card variant="filled">
              <p style={{ margin: 0 }}>Filled</p>
            </Card>
            <Card variant="ghost">
              <p style={{ margin: 0 }}>Ghost</p>
            </Card>
          </div>
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">Compound Layout</h2>
        <Preview
          code={`<Card>
  <Card.Header>
    <Card.Title subtitle="3 members online">Team</Card.Title>
    <Badge>Active</Badge>
  </Card.Header>
  <Card.Body>
    <p>Manage roles and permissions for your team.</p>
  </Card.Body>
  <Card.Footer>
    <Button variant="ghost" size="sm">Cancel</Button>
    <Button size="sm">Save</Button>
  </Card.Footer>
</Card>`}
        >
          <Card>
            <Card.Header>
              <Card.Title subtitle="3 members online">Team</Card.Title>
              <Badge>Active</Badge>
            </Card.Header>
            <Card.Body>
              <p style={{ margin: 0, color: theme.semantic.text.secondary }}>
                Manage roles and permissions for your team.
              </p>
            </Card.Body>
            <Card.Footer>
              <Button variant="ghost" size="sm">Cancel</Button>
              <Button size="sm">Save</Button>
            </Card.Footer>
          </Card>
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">With Media</h2>
        <Preview
          code={`<Card>
  <Card.Media
    src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=300&fit=crop"
    alt="Mountain landscape"
    height={180}
  />
  <Card.Body style={{ paddingTop: 16 }}>
    <Card.Title subtitle="Swiss Alps">Mountain Vista</Card.Title>
    <p style={{ marginTop: 8 }}>A breathtaking view from the summit.</p>
  </Card.Body>
</Card>`}
        >
          <Card style={{ maxWidth: 360 }}>
            <Card.Media
              src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=300&fit=crop"
              alt="Mountain landscape"
              height={180}
            />
            <Card.Body style={{ paddingTop: 16 }}>
              <Card.Title subtitle="Swiss Alps">Mountain Vista</Card.Title>
              <p style={{ margin: '8px 0 0', color: theme.semantic.text.secondary }}>
                A breathtaking view from the summit.
              </p>
            </Card.Body>
          </Card>
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">Title with Actions (Shorthand)</h2>
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
        <h2 className="section-title">Card Props</h2>
        <PropsTable props={cardProps} />
      </div>

      <div className="section">
        <h2 className="section-title">Sub-Components</h2>
        <PropsTable props={subComponents} />
      </div>
    </div>
  );
}
