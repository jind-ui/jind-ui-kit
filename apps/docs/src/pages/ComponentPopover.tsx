import { Popover, Button } from 'jind-ui-kit';
import { Preview } from '../components/Preview';
import { PropsTable } from '../components/PropsTable';
import { ViewMarkdown } from '../components/ViewMarkdown';

const props = [
  { name: 'open', type: 'boolean', description: 'Controlled open state' },
  { name: 'defaultOpen', type: 'boolean', default: 'false', description: 'Initial open state for uncontrolled usage' },
  { name: 'onOpenChange', type: '(open: boolean) => void', description: 'Callback when open state changes' },
  { name: 'placement', type: "'top' | 'bottom' | 'left' | 'right'", default: "'bottom'", description: 'Position of the popover relative to the trigger' },
  { name: 'offset', type: 'number', default: '6', description: 'Gap in pixels between the trigger and the popover' },
  { name: 'matchTriggerWidth', type: 'boolean', default: 'false', description: 'Match the popover width to the trigger element width' },
  { name: 'content', type: 'ReactNode', description: 'Content rendered inside the popover panel' },
  { name: 'children', type: 'ReactNode', description: 'Trigger element that toggles the popover on click' },
  { name: 'style', type: 'CSSProperties', description: 'Custom inline styles' },
];

export function ComponentPopover() {
  return (
    <div className="page-container">
      <div className="page-header">
        <ViewMarkdown slug="popover" />
        <h1 className="page-title">Popover</h1>
        <p className="page-description">
          Click-triggered floating panel anchored to a trigger element.
          Supports controlled and uncontrolled modes, four placements, and
          automatic outside-click dismissal.
        </p>
      </div>

      <div className="section">
        <h2 className="section-title">Basic</h2>
        <Preview
          code={`<Popover content={<p style={{ margin: 0 }}>Popover content here</p>}>
  <Button>Toggle Popover</Button>
</Popover>`}
        >
          <Popover content={<p style={{ margin: 0 }}>Popover content here</p>}>
            <Button>Toggle Popover</Button>
          </Popover>
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">Placements</h2>
        <Preview
          code={`<Popover content="Bottom (default)" placement="bottom">
  <Button variant="secondary">Bottom</Button>
</Popover>
<Popover content="Right" placement="right">
  <Button variant="secondary">Right</Button>
</Popover>`}
        >
          <Popover content="Bottom (default)" placement="bottom">
            <Button variant="secondary">Bottom</Button>
          </Popover>
          <Popover content="Right" placement="right">
            <Button variant="secondary">Right</Button>
          </Popover>
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">Props</h2>
        <PropsTable props={props} />
      </div>
    </div>
  );
}
