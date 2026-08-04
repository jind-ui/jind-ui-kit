import type { Meta, StoryObj } from '@storybook/react';
import { Textarea } from './Textarea';

const meta: Meta<typeof Textarea> = {
  title: 'Components/Textarea',
  component: Textarea,
};

export default meta;
type Story = StoryObj<typeof Textarea>;

export const Default: Story = {};

export const WithValue: Story = {
  args: {
    value: 'This is some pre-filled text in the textarea.',
  },
};

export const CustomRows: Story = {
  args: {
    rows: 3,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    value: 'This textarea is disabled.',
  },
};
