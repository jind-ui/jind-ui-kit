import { useState } from 'react';
import { Drawer, Button } from 'jind-ui-kit';
import { Preview } from '../components/Preview';
import { PropsTable } from '../components/PropsTable';
import { ViewMarkdown } from '../components/ViewMarkdown';

const props = [
  { name: 'open', type: 'boolean', description: 'Controls whether the drawer is visible' },
  { name: 'onClose', type: '() => void', description: 'Called when the user clicks the backdrop, close button, or presses Escape' },
  { name: 'placement', type: "'left' | 'right' | 'top' | 'bottom'", default: "'right'", description: 'Edge of the viewport the drawer slides in from' },
  { name: 'width', type: 'number | string', default: '380', description: 'Panel width (used for left/right placement)' },
  { name: 'height', type: "number | string", default: "'100%'", description: 'Panel height (used for top/bottom placement)' },
  { name: 'title', type: 'string', description: 'Header title with a built-in close button' },
  { name: 'children', type: 'ReactNode', description: 'Drawer body content' },
  { name: 'footer', type: 'ReactNode', description: 'Content rendered in a separated footer area' },
  { name: 'style', type: 'CSSProperties', description: 'Custom inline styles for the drawer panel' },
];

export function ComponentDrawer() {
  const [rightOpen, setRightOpen] = useState(false);
  const [leftOpen, setLeftOpen] = useState(false);

  return (
    <div className="page-container">
      <div className="page-header">
        <ViewMarkdown slug="drawer" />
        <h1 className="page-title">Drawer</h1>
        <p className="page-description">
          Slide-in panel that overlays the page from any edge. Includes focus
          trapping, backdrop, Escape key support, and an optional footer.
        </p>
      </div>

      <div className="section">
        <h2 className="section-title">Right Drawer</h2>
        <Preview
          code={`const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(true)}>Open Drawer</Button>
<Drawer
  open={open}
  onClose={() => setOpen(false)}
  title="Settings"
>
  <p>Drawer body content goes here.</p>
</Drawer>`}
        >
          <Button onClick={() => setRightOpen(true)}>Open Drawer</Button>
          <Drawer
            open={rightOpen}
            onClose={() => setRightOpen(false)}
            title="Settings"
          >
            <p style={{ margin: 0 }}>Drawer body content goes here.</p>
          </Drawer>
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">Left Placement</h2>
        <Preview
          code={`<Button onClick={() => setOpen(true)}>Open Left Drawer</Button>
<Drawer
  open={open}
  onClose={() => setOpen(false)}
  placement="left"
  title="Navigation"
>
  <p>Sidebar navigation content.</p>
</Drawer>`}
        >
          <Button variant="secondary" onClick={() => setLeftOpen(true)}>Open Left Drawer</Button>
          <Drawer
            open={leftOpen}
            onClose={() => setLeftOpen(false)}
            placement="left"
            title="Navigation"
          >
            <p style={{ margin: 0 }}>Sidebar navigation content.</p>
          </Drawer>
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">Props</h2>
        <PropsTable props={props} />
      </div>
    </div>
  );
}
