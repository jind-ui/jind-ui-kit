import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {};

export const WithValue: Story = {
  args: {
    value: 'Hello',
  },
};

export const WithIcon: Story = {
  args: {
    iconLeft: '@',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const WithPlaceholder: Story = {
  args: {
    placeholder: 'Search...',
  },
};
