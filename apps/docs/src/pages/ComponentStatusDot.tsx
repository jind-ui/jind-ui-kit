import { StatusDot } from 'jind-ui-kit';
import { Preview } from '../components/Preview';
import { PropsTable } from '../components/PropsTable';
import { ViewMarkdown } from '../components/ViewMarkdown';

const props = [
  { name: 'tone', type: "'neutral' | 'primary' | 'danger' | 'success' | 'warning' | 'info' | 'accent' | 'brand'", description: 'Color tone of the dot (required)' },
  { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Dot diameter (sm = 8px, md = 10px, lg = 12px)' },
  { name: 'label', type: 'string', description: 'Optional text label displayed next to the dot' },
  { name: 'style', type: 'CSSProperties', description: 'Custom inline styles' },
];

export function ComponentStatusDot() {
  return (
    <div className="page-container">
      <div className="page-header">
        <ViewMarkdown slug="status-dot" />
        <h1 className="page-title">StatusDot</h1>
        <p className="page-description">
          Small colored indicator for showing status at a glance. Pairs an
          optional text label with a tone-colored dot.
        </p>
      </div>

      <div className="section">
        <h2 className="section-title">Tones</h2>
        <Preview
          code={`<StatusDot tone="success" label="Online" />
<StatusDot tone="danger" label="Offline" />
<StatusDot tone="warning" label="Away" />
<StatusDot tone="info" label="Busy" />
<StatusDot tone="neutral" label="Unknown" />`}
        >
          <StatusDot tone="success" label="Online" />
          <StatusDot tone="danger" label="Offline" />
          <StatusDot tone="warning" label="Away" />
          <StatusDot tone="info" label="Busy" />
          <StatusDot tone="neutral" label="Unknown" />
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">Sizes</h2>
        <Preview
          code={`<StatusDot tone="success" size="sm" label="Small" />
<StatusDot tone="success" size="md" label="Medium" />
<StatusDot tone="success" size="lg" label="Large" />`}
        >
          <StatusDot tone="success" size="sm" label="Small" />
          <StatusDot tone="success" size="md" label="Medium" />
          <StatusDot tone="success" size="lg" label="Large" />
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">Without Label</h2>
        <Preview
          code={`<StatusDot tone="success" />
<StatusDot tone="danger" />
<StatusDot tone="warning" />
<StatusDot tone="info" />`}
        >
          <StatusDot tone="success" />
          <StatusDot tone="danger" />
          <StatusDot tone="warning" />
          <StatusDot tone="info" />
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">Props</h2>
        <PropsTable props={props} />
      </div>
    </div>
  );
}
