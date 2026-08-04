import { Spinner } from 'jind-ui-kit';
import { Preview } from '../components/Preview';
import { PropsTable } from '../components/PropsTable';
import { ViewMarkdown } from '../components/ViewMarkdown';

const props = [
  { name: 'size', type: "'sm' | 'md' | 'lg'", description: 'Spinner size (default: md). sm=16px, md=24px, lg=40px' },
  { name: 'label', type: 'string', description: 'Accessible label, also displayed below the spinner' },
  { name: 'tone', type: "'primary' | 'neutral'", description: 'Color tone (default: primary)' },
  { name: 'style', type: 'CSSProperties', description: 'Custom inline styles' },
];

export function ComponentSpinner() {
  return (
    <div className="page-container">
      <div className="page-header">
        <ViewMarkdown slug="spinner" />
        <h1 className="page-title">Spinner</h1>
        <p className="page-description">
          Animated loading indicator with size variants and optional label.
          Uses an SVG circle with CSS rotation animation.
        </p>
      </div>

      <div className="section">
        <h2 className="section-title">Sizes</h2>
        <Preview
          code={`<Spinner size="sm" />
<Spinner size="md" />
<Spinner size="lg" />`}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
            <Spinner size="sm" />
            <Spinner size="md" />
            <Spinner size="lg" />
          </div>
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">With Label</h2>
        <Preview
          code={`<Spinner label="Loading..." />
<Spinner size="lg" label="Processing your request" />`}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 40 }}>
            <Spinner label="Loading..." />
            <Spinner size="lg" label="Processing your request" />
          </div>
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">Neutral Tone</h2>
        <Preview
          code={`<Spinner tone="neutral" />
<Spinner tone="neutral" size="lg" label="Please wait" />`}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 40 }}>
            <Spinner tone="neutral" />
            <Spinner tone="neutral" size="lg" label="Please wait" />
          </div>
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">Props</h2>
        <PropsTable props={props} />
      </div>
    </div>
  );
}
