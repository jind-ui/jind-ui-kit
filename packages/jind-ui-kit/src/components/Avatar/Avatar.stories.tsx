import type { Meta, StoryObj } from '@storybook/react';
import { Avatar } from './Avatar';

const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
  args: {
    name: 'John Doe',
  },
};

export const WithImage: Story = {
  args: {
    src: 'https://i.pravatar.cc/40',
    name: 'Jane Smith',
  },
};

export const Initials: Story = {
  args: {
    name: 'Alice Johnson',
  },
};

export const SingleName: Story = {
  args: {
    name: 'Alice',
  },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <Avatar name="John Doe" size="sm" />
      <Avatar name="John Doe" size="md" />
      <Avatar name="John Doe" size="lg" />
    </div>
  ),
};

export const Empty: Story = {
  args: {},
};
