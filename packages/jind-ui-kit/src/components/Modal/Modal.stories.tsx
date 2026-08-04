import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Modal } from './Modal';

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <button onClick={() => setOpen(true)}>Open Modal</button>
        <Modal open={open} onClose={() => setOpen(false)} title="Example Modal">
          <p style={{ margin: 0 }}>This is the modal body content.</p>
        </Modal>
      </>
    );
  },
};

export const WithFooter: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <button onClick={() => setOpen(true)}>Open Modal with Footer</button>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          title="Confirm Action"
          footer={
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
              <button onClick={() => setOpen(false)}>Cancel</button>
              <button onClick={() => setOpen(false)}>Confirm</button>
            </div>
          }
        >
          <p style={{ margin: 0 }}>Are you sure you want to proceed?</p>
        </Modal>
      </>
    );
  },
};

export const CustomWidth: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <button onClick={() => setOpen(true)}>Open Wide Modal</button>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          title="Wide Modal"
          width={720}
        >
          <p style={{ margin: 0 }}>This modal has a custom width of 720px.</p>
        </Modal>
      </>
    );
  },
};

export const NoTitle: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <button onClick={() => setOpen(true)}>Open Modal without Title</button>
        <Modal open={open} onClose={() => setOpen(false)}>
          <p style={{ margin: 0 }}>This modal has no title bar, just content.</p>
        </Modal>
      </>
    );
  },
};
