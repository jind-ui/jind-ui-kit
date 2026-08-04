import { Skeleton } from 'jind-ui-kit';
import { Preview } from '../components/Preview';
import { PropsTable } from '../components/PropsTable';
import { ViewMarkdown } from '../components/ViewMarkdown';

const props = [
  { name: 'width', type: 'number | string', description: 'Width of the skeleton placeholder' },
  { name: 'height', type: 'number | string', description: 'Height of the skeleton placeholder' },
  { name: 'radius', type: "'xs' | 'sm' | 'md' | 'lg' | 'full' | 'none'", default: "'sm'", description: 'Border radius preset' },
  { name: 'style', type: 'CSSProperties', description: 'Custom inline styles' },
];

export function ComponentSkeleton() {
  return (
    <div className="page-container">
      <div className="page-header">
        <ViewMarkdown slug="skeleton" />
        <h1 className="page-title">Skeleton</h1>
        <p className="page-description">
          Animated placeholder that indicates loading content. Configure
          dimensions and border radius to match the shape being loaded.
        </p>
      </div>

      <div className="section">
        <h2 className="section-title">Basic Shapes</h2>
        <Preview
          code={`<Skeleton width={200} height={16} />
<Skeleton width={160} height={16} />
<Skeleton width={120} height={16} />`}
        >
          <Skeleton width={200} height={16} />
          <Skeleton width={160} height={16} />
          <Skeleton width={120} height={16} />
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">Circle (Avatar Placeholder)</h2>
        <Preview
          code={`<Skeleton width={40} height={40} radius="full" />
<Skeleton width={32} height={32} radius="full" />
<Skeleton width={24} height={24} radius="full" />`}
        >
          <Skeleton width={40} height={40} radius="full" />
          <Skeleton width={32} height={32} radius="full" />
          <Skeleton width={24} height={24} radius="full" />
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">Card Placeholder</h2>
        <Preview
          align="column"
          code={`<Skeleton width="100%" height={120} radius="md" />`}
        >
          <Skeleton width="100%" height={120} radius="md" />
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">Content Block</h2>
        <Preview
          align="column"
          code={`<div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
  <Skeleton width={40} height={40} radius="full" />
  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
    <Skeleton width={140} height={14} />
    <Skeleton width={200} height={12} />
  </div>
</div>`}
        >
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <Skeleton width={40} height={40} radius="full" />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <Skeleton width={140} height={14} />
              <Skeleton width={200} height={12} />
            </div>
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
