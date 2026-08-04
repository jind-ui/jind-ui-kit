import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Drawer } from './Drawer';

const meta: Meta<typeof Drawer> = {
  title: 'Components/Drawer',
  component: Drawer,
};
export default meta;

type Story = StoryObj<typeof Drawer>;

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <button onClick={() => setOpen(true)}>Open Drawer</button>
        <Drawer open={open} onClose={() => setOpen(false)} title="Settings">
          <p>Drawer content goes here.</p>
        </Drawer>
      </>
    );
  },
};

export const LeftPlacement: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <button onClick={() => setOpen(true)}>Open Left Drawer</button>
        <Drawer open={open} onClose={() => setOpen(false)} title="Navigation" placement="left">
          <p>Left side drawer</p>
        </Drawer>
      </>
    );
  },
};

export const WithFooter: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <button onClick={() => setOpen(true)}>Open Drawer with Footer</button>
        <Drawer
          open={open}
          onClose={() => setOpen(false)}
          title="Edit Profile"
          footer={<button>Save Changes</button>}
        >
          <p>Form content here</p>
        </Drawer>
      </>
    );
  },
};
