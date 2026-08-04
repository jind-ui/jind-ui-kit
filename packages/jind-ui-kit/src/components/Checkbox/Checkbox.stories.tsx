import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from './Checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: {
    label: 'Accept terms and conditions',
  },
};

export const Checked: Story = {
  args: {
    checked: true,
    label: 'Checked by default',
  },
};

export const Indeterminate: Story = {
  args: {
    indeterminate: true,
    label: 'Some items selected',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    label: 'Disabled checkbox',
  },
};

export const DisabledChecked: Story = {
  args: {
    disabled: true,
    checked: true,
    label: 'Disabled and checked',
  },
};

export const WithoutLabel: Story = {
  args: {},
};

export const Group: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Checkbox label="Option A" defaultChecked />
      <Checkbox label="Option B" />
      <Checkbox label="Option C" />
      <Checkbox label="Option D" disabled />
    </div>
  ),
};
