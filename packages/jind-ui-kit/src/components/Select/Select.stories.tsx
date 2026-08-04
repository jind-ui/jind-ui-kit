import type { Meta, StoryObj } from '@storybook/react';
import { Select } from './Select';

const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  component: Select,
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Default: Story = {
  args: {
    options: ['Apple', 'Banana', 'Cherry'],
  },
};

export const WithValue: Story = {
  args: {
    options: ['Apple', 'Banana', 'Cherry'],
    value: 'Banana',
  },
};

export const WithObjectOptions: Story = {
  args: {
    options: [
      { label: 'Red', value: 'red', swatch: '#e8503a' },
      { label: 'Blue', value: 'blue', swatch: '#1a72f6' },
    ],
  },
};

export const Disabled: Story = {
  args: {
    options: ['Apple', 'Banana', 'Cherry'],
    disabled: true,
  },
};
