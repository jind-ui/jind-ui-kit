import { Badge } from 'jind-ui-kit';
import { Preview } from '../components/Preview';
import { PropsTable } from '../components/PropsTable';
import { ViewMarkdown } from '../components/ViewMarkdown';

const props = [
  { name: 'tone', type: "'neutral' | 'primary' | 'danger' | 'success' | 'warning' | 'info' | 'accent' | 'brand'", default: "'info'", description: 'Color tone of the badge' },
  { name: 'dot', type: 'boolean', default: 'false', description: 'Show a colored dot indicator' },
  { name: 'onDismiss', type: '() => void', description: 'Callback when dismiss button is clicked; renders a dismiss button when provided' },
  { name: 'children', type: 'ReactNode', description: 'Badge label content' },
  { name: 'style', type: 'CSSProperties', description: 'Custom inline styles' },
];

export function ComponentBadge() {
  return (
    <div className="page-container">
      <div className="page-header">
        <ViewMarkdown slug="badge" />
        <h1 className="page-title">Badge</h1>
        <p className="page-description">
          Compact label for status, categories, or counts. Supports multiple
          color tones, an optional dot indicator, and a dismiss action.
        </p>
      </div>

      <div className="section">
        <h2 className="section-title">Tones</h2>
        <Preview
          code={`<Badge tone="info">Info</Badge>
<Badge tone="success">Success</Badge>
<Badge tone="warning">Warning</Badge>
<Badge tone="danger">Danger</Badge>
<Badge tone="neutral">Neutral</Badge>
<Badge tone="accent">Accent</Badge>
<Badge tone="brand">Brand</Badge>`}
        >
          <Badge tone="info">Info</Badge>
          <Badge tone="success">Success</Badge>
          <Badge tone="warning">Warning</Badge>
          <Badge tone="danger">Danger</Badge>
          <Badge tone="neutral">Neutral</Badge>
          <Badge tone="accent">Accent</Badge>
          <Badge tone="brand">Brand</Badge>
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">With Dot</h2>
        <Preview
          code={`<Badge tone="success" dot>Active</Badge>
<Badge tone="danger" dot>Offline</Badge>
<Badge tone="warning" dot>Pending</Badge>`}
        >
          <Badge tone="success" dot>Active</Badge>
          <Badge tone="danger" dot>Offline</Badge>
          <Badge tone="warning" dot>Pending</Badge>
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">Dismissible</h2>
        <Preview
          code={`<Badge tone="info" onDismiss={() => {}}>Removable</Badge>
<Badge tone="accent" dot onDismiss={() => {}}>Dot + Dismiss</Badge>`}
        >
          <Badge tone="info" onDismiss={() => {}}>Removable</Badge>
          <Badge tone="accent" dot onDismiss={() => {}}>Dot + Dismiss</Badge>
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">Props</h2>
        <PropsTable props={props} />
      </div>
    </div>
  );
}
