import { useState } from 'react';
import { Modal, Button } from 'jind-ui-kit';
import { Preview } from '../components/Preview';
import { PropsTable } from '../components/PropsTable';
import { ViewMarkdown } from '../components/ViewMarkdown';

const props = [
  { name: 'open', type: 'boolean', description: 'Controls whether the modal is visible' },
  { name: 'onClose', type: '() => void', description: 'Called when the user clicks the close button, backdrop, or presses Escape' },
  { name: 'title', type: 'string', description: 'Header title text' },
  { name: 'width', type: 'number | string', default: '480', description: 'Width of the modal panel' },
  { name: 'children', type: 'ReactNode', description: 'Modal body content' },
  { name: 'footer', type: 'ReactNode', description: 'Content rendered in a separated footer area' },
  { name: 'style', type: 'CSSProperties', description: 'Custom inline styles for the modal panel' },
];

export function ComponentModal() {
  const [open, setOpen] = useState(false);
  const [footerOpen, setFooterOpen] = useState(false);

  return (
    <div className="page-container">
      <div className="page-header">
        <ViewMarkdown slug="modal" />
        <h1 className="page-title">Modal</h1>
        <p className="page-description">
          Dialog overlay rendered via a portal. Includes focus trapping,
          backdrop click-to-close, Escape key support, and an optional footer.
        </p>
      </div>

      <div className="section">
        <h2 className="section-title">Basic Modal</h2>
        <Preview
          code={`const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(true)}>Open Modal</Button>
<Modal open={open} onClose={() => setOpen(false)} title="Confirmation">
  <p>Are you sure you want to proceed?</p>
</Modal>`}
        >
          <Button onClick={() => setOpen(true)}>Open Modal</Button>
          <Modal open={open} onClose={() => setOpen(false)} title="Confirmation">
            <p style={{ margin: 0 }}>Are you sure you want to proceed?</p>
          </Modal>
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">With Footer</h2>
        <Preview
          code={`<Button onClick={() => setOpen(true)}>Open with Footer</Button>
<Modal
  open={open}
  onClose={() => setOpen(false)}
  title="Save Changes"
  footer={
    <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
      <Button variant="secondary" onClick={() => setOpen(false)}>Cancel</Button>
      <Button onClick={() => setOpen(false)}>Save</Button>
    </div>
  }
>
  <p>Your changes will be saved permanently.</p>
</Modal>`}
        >
          <Button onClick={() => setFooterOpen(true)}>Open with Footer</Button>
          <Modal
            open={footerOpen}
            onClose={() => setFooterOpen(false)}
            title="Save Changes"
            footer={
              <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                <Button variant="secondary" onClick={() => setFooterOpen(false)}>Cancel</Button>
                <Button onClick={() => setFooterOpen(false)}>Save</Button>
              </div>
            }
          >
            <p style={{ margin: 0 }}>Your changes will be saved permanently.</p>
          </Modal>
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">Props</h2>
        <PropsTable props={props} />
      </div>
    </div>
  );
}
