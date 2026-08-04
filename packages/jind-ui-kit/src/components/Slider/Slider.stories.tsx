import type { Meta, StoryObj } from '@storybook/react';
import { Slider } from './Slider';

const meta: Meta<typeof Slider> = {
  title: 'Components/Slider',
  component: Slider,
};
export default meta;

type Story = StoryObj<typeof Slider>;

export const Default: Story = {
  args: { defaultValue: 50 },
  decorators: [(Story) => <div style={{ width: 300 }}><Story /></div>],
};

export const WithLabel: Story = {
  args: { label: 'Volume', defaultValue: 75, showValue: true },
  decorators: [(Story) => <div style={{ width: 300 }}><Story /></div>],
};

export const CustomRange: Story = {
  args: { min: 0, max: 10, step: 1, defaultValue: 5, label: 'Rating', showValue: true },
  decorators: [(Story) => <div style={{ width: 300 }}><Story /></div>],
};

export const Disabled: Story = {
  args: { defaultValue: 30, disabled: true, label: 'Disabled' },
  decorators: [(Story) => <div style={{ width: 300 }}><Story /></div>],
};
