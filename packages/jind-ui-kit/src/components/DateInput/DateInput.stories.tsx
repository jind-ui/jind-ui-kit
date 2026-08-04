import type { Meta, StoryObj } from '@storybook/react';
import { DateInput } from './DateInput';

const meta: Meta<typeof DateInput> = {
  title: 'Components/DateInput',
  component: DateInput,
};

export default meta;
type Story = StoryObj<typeof DateInput>;

export const Default: Story = {
  args: {},
};

export const WithValue: Story = {
  args: {
    value: 'Aug 15, 2025',
  },
};

export const WithTime: Story = {
  args: {
    value: 'Aug 15, 2025',
    time: '2:30 PM',
  },
};

export const Disabled: Story = {
  args: {
    value: 'Aug 15, 2025',
    disabled: true,
  },
};
