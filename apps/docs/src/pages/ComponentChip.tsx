import { Chip } from 'jind-ui-kit';
import { Preview } from '../components/Preview';
import { PropsTable } from '../components/PropsTable';
import { ViewMarkdown } from '../components/ViewMarkdown';

const props = [
  { name: 'icon', type: 'string', description: 'Iconoir icon name displayed before the label' },
  { name: 'selected', type: 'boolean', default: 'false', description: 'Whether the chip is in a selected state' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables interaction' },
  { name: 'onClick', type: '() => void', description: 'Click handler' },
  { name: 'children', type: 'ReactNode', description: 'Chip label content' },
  { name: 'style', type: 'CSSProperties', description: 'Custom inline styles' },
];

export function ComponentChip() {
  return (
    <div className="page-container">
      <div className="page-header">
        <ViewMarkdown slug="chip" />
        <h1 className="page-title">Chip</h1>
        <p className="page-description">
          Toggleable pill for filters and selections. Supports an optional icon,
          selected state, and disabled state.
        </p>
      </div>

      <div className="section">
        <h2 className="section-title">Basic</h2>
        <Preview
          code={`<Chip>Design</Chip>
<Chip>Engineering</Chip>
<Chip>Marketing</Chip>`}
        >
          <Chip>Design</Chip>
          <Chip>Engineering</Chip>
          <Chip>Marketing</Chip>
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">Selected</h2>
        <Preview
          code={`<Chip selected>Active Filter</Chip>
<Chip>Inactive Filter</Chip>`}
        >
          <Chip selected>Active Filter</Chip>
          <Chip>Inactive Filter</Chip>
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">With Icon</h2>
        <Preview
          code={`<Chip icon="star">Favorites</Chip>
<Chip icon="clock" selected>Recent</Chip>`}
        >
          <Chip icon="star">Favorites</Chip>
          <Chip icon="clock" selected>Recent</Chip>
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">Disabled</h2>
        <Preview
          code={`<Chip disabled>Disabled</Chip>
<Chip disabled selected>Disabled Selected</Chip>`}
        >
          <Chip disabled>Disabled</Chip>
          <Chip disabled selected>Disabled Selected</Chip>
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">Props</h2>
        <PropsTable props={props} />
      </div>
    </div>
  );
}
