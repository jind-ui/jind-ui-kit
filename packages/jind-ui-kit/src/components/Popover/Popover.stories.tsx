import type { Meta, StoryObj } from '@storybook/react';
import { Popover } from './Popover';

const meta: Meta<typeof Popover> = {
  title: 'Components/Popover',
  component: Popover,
};
export default meta;

type Story = StoryObj<typeof Popover>;

export const Default: Story = {
  render: () => (
    <div style={{ padding: 100 }}>
      <Popover content={<div style={{ padding: 12 }}>Popover content</div>}>
        <button>Click me</button>
      </Popover>
    </div>
  ),
};
