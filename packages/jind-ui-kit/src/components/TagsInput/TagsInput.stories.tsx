import type { Meta, StoryObj } from '@storybook/react';
import { TagsInput } from './TagsInput';

const meta: Meta<typeof TagsInput> = {
  title: 'Components/TagsInput',
  component: TagsInput,
};

export default meta;
type Story = StoryObj<typeof TagsInput>;

export const Default: Story = {
  args: {
    tags: ['React', 'TypeScript', 'Vite'],
  },
};

export const Empty: Story = {
  args: {
    tags: [],
  },
};

export const Disabled: Story = {
  args: {
    tags: ['Locked'],
    disabled: true,
  },
};

export const ManyTags: Story = {
  args: {
    tags: ['One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven'],
  },
};
