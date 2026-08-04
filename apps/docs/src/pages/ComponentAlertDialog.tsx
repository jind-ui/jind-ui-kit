import { useState } from 'react';
import { AlertDialog, Button } from 'jind-ui-kit';
import { Preview } from '../components/Preview';
import { PropsTable } from '../components/PropsTable';
import { ViewMarkdown } from '../components/ViewMarkdown';

const props = [
  { name: 'open', type: 'boolean', description: 'Whether the dialog is visible' },
  { name: 'onOpenChange', type: '(open: boolean) => void', description: 'Called when the dialog open state changes' },
  { name: 'title', type: 'string', description: 'Dialog heading text' },
  { name: 'description', type: 'string', description: 'Explanatory text below the title' },
  { name: 'confirmLabel', type: 'string', description: 'Confirm button text (default: "Confirm")' },
  { name: 'cancelLabel', type: 'string', description: 'Cancel button text (default: "Cancel")' },
  { name: 'onConfirm', type: '() => void', description: 'Called when the confirm button is clicked' },
  { name: 'onCancel', type: '() => void', description: 'Called when the cancel button is clicked' },
  { name: 'tone', type: "'neutral' | 'primary' | 'danger' | 'success' | 'warning' | 'info' | 'accent' | 'brand'", description: 'Color tone for the confirm button (default: danger)' },
  { name: 'style', type: 'CSSProperties', description: 'Custom inline styles for the dialog' },
];

function BasicConfirmDemo() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Save Changes</Button>
      <AlertDialog
        open={open}
        onOpenChange={setOpen}
        title="Save changes?"
        description="Your unsaved changes will be applied to the current document."
        confirmLabel="Save"
        cancelLabel="Discard"
        onConfirm={() => {}}
        tone="primary"
      />
    </>
  );
}

function DestructiveDemo() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="primary" onClick={() => setOpen(true)}>Delete Account</Button>
      <AlertDialog
        open={open}
        onOpenChange={setOpen}
        title="Delete account?"
        description="This action is permanent and cannot be undone. All of your data will be erased."
        confirmLabel="Delete"
        cancelLabel="Keep Account"
        onConfirm={() => {}}
        tone="danger"
      />
    </>
  );
}

function CustomLabelsDemo() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Publish Article</Button>
      <AlertDialog
        open={open}
        onOpenChange={setOpen}
        title="Publish this article?"
        description="Once published, the article will be visible to all users."
        confirmLabel="Yes, Publish"
        cancelLabel="Not Yet"
        onConfirm={() => {}}
        tone="success"
      />
    </>
  );
}

export function ComponentAlertDialog() {
  return (
    <div className="page-container">
      <div className="page-header">
        <ViewMarkdown slug="alert-dialog" />
        <h1 className="page-title">AlertDialog</h1>
        <p className="page-description">
          A modal confirmation dialog that interrupts the user to request a
          deliberate decision. Ideal for destructive or irreversible actions
          like deleting data or discarding changes.
        </p>
      </div>

      <div className="section">
        <h2 className="section-title">Basic Confirm</h2>
        <Preview
          code={`const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(true)}>Save Changes</Button>
<AlertDialog
  open={open}
  onOpenChange={setOpen}
  title="Save changes?"
  description="Your unsaved changes will be applied to the current document."
  confirmLabel="Save"
  cancelLabel="Discard"
  onConfirm={() => {}}
  tone="primary"
/>`}
        >
          <BasicConfirmDemo />
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">Destructive Action</h2>
        <p style={{ marginBottom: 12 }}>
          Use <code>tone="danger"</code> to signal a destructive or irreversible operation.
        </p>
        <Preview
          code={`const [open, setOpen] = useState(false);

<Button tone="danger" onClick={() => setOpen(true)}>
  Delete Account
</Button>
<AlertDialog
  open={open}
  onOpenChange={setOpen}
  title="Delete account?"
  description="This action is permanent and cannot be undone. All of your data will be erased."
  confirmLabel="Delete"
  cancelLabel="Keep Account"
  onConfirm={() => {}}
  tone="danger"
/>`}
        >
          <DestructiveDemo />
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">Custom Labels</h2>
        <p style={{ marginBottom: 12 }}>
          Customize both the confirm and cancel button text to fit the context of the action.
        </p>
        <Preview
          code={`const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(true)}>Publish Article</Button>
<AlertDialog
  open={open}
  onOpenChange={setOpen}
  title="Publish this article?"
  description="Once published, the article will be visible to all users."
  confirmLabel="Yes, Publish"
  cancelLabel="Not Yet"
  onConfirm={() => {}}
  tone="success"
/>`}
        >
          <CustomLabelsDemo />
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">Props</h2>
        <PropsTable props={props} />
      </div>
    </div>
  );
}
