import type { Meta, StoryObj } from '@storybook/react';
import { Skeleton } from './Skeleton';

const meta: Meta<typeof Skeleton> = {
  title: 'Components/Skeleton',
  component: Skeleton,
  argTypes: {
    radius: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'full', 'none'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Default: Story = {
  args: {
    width: 200,
    height: 20,
  },
};

export const TextLine: Story = {
  args: {
    width: '100%',
    height: 16,
  },
};

export const Circle: Story = {
  args: {
    width: 40,
    height: 40,
    radius: 'full',
  },
};

export const CardPlaceholder: Story = {
  args: {
    width: 300,
    height: 200,
    radius: 'md',
  },
};

export const Multiple: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: 300 }}>
      <Skeleton width="100%" height={16} />
      <Skeleton width="100%" height={16} />
      <Skeleton width="60%" height={16} />
    </div>
  ),
};
