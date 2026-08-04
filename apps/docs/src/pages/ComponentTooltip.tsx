import { Tooltip, Button } from 'jind-ui-kit';
import { Preview } from '../components/Preview';
import { PropsTable } from '../components/PropsTable';
import { ViewMarkdown } from '../components/ViewMarkdown';

const props = [
  { name: 'content', type: 'ReactNode', description: 'Tooltip text or content displayed on hover' },
  { name: 'placement', type: "'top' | 'bottom' | 'left' | 'right'", default: "'top'", description: 'Position of the tooltip relative to the trigger' },
  { name: 'delay', type: 'number', default: '200', description: 'Delay in milliseconds before the tooltip appears' },
  { name: 'children', type: 'ReactElement', description: 'Trigger element that activates the tooltip on hover' },
];

export function ComponentTooltip() {
  return (
    <div className="page-container">
      <div className="page-header">
        <ViewMarkdown slug="tooltip" />
        <h1 className="page-title">Tooltip</h1>
        <p className="page-description">
          Informational overlay that appears on hover after a configurable delay.
          Supports four placement directions.
        </p>
      </div>

      <div className="section">
        <h2 className="section-title">Basic</h2>
        <Preview
          code={`<Tooltip content="This is a tooltip">
  <Button>Hover me</Button>
</Tooltip>`}
        >
          <Tooltip content="This is a tooltip">
            <Button>Hover me</Button>
          </Tooltip>
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">Placements</h2>
        <Preview
          code={`<Tooltip content="Top" placement="top">
  <Button variant="secondary">Top</Button>
</Tooltip>
<Tooltip content="Bottom" placement="bottom">
  <Button variant="secondary">Bottom</Button>
</Tooltip>
<Tooltip content="Left" placement="left">
  <Button variant="secondary">Left</Button>
</Tooltip>
<Tooltip content="Right" placement="right">
  <Button variant="secondary">Right</Button>
</Tooltip>`}
        >
          <Tooltip content="Top" placement="top">
            <Button variant="secondary">Top</Button>
          </Tooltip>
          <Tooltip content="Bottom" placement="bottom">
            <Button variant="secondary">Bottom</Button>
          </Tooltip>
          <Tooltip content="Left" placement="left">
            <Button variant="secondary">Left</Button>
          </Tooltip>
          <Tooltip content="Right" placement="right">
            <Button variant="secondary">Right</Button>
          </Tooltip>
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">Props</h2>
        <PropsTable props={props} />
      </div>
    </div>
  );
}
