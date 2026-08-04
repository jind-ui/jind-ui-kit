import type { Meta, StoryObj } from '@storybook/react';
import { Chip } from './Chip';

const meta: Meta<typeof Chip> = {
  title: 'Components/Chip',
  component: Chip,
  argTypes: {
    icon: { control: 'text' },
    selected: { control: 'boolean' },
    disabled: { control: 'boolean' },
    onClick: { action: 'clicked' },
  },
};

export default meta;
type Story = StoryObj<typeof Chip>;

export const Default: Story = {
  args: {
    children: 'Chip',
  },
};

export const Selected: Story = {
  args: {
    children: 'Selected',
    selected: true,
  },
};

export const Disabled: Story = {
  args: {
    children: 'Disabled',
    disabled: true,
  },
};

export const WithIcon: Story = {
  args: {
    children: 'Home',
    icon: 'home',
  },
};

export const SelectedWithIcon: Story = {
  args: {
    children: 'Home',
    icon: 'home',
    selected: true,
  },
};

export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <Chip>Default</Chip>
      <Chip selected>Selected</Chip>
      <Chip disabled>Disabled</Chip>
      <Chip icon="home">With Icon</Chip>
      <Chip icon="home" selected>Selected + Icon</Chip>
      <Chip icon="home" disabled>Disabled + Icon</Chip>
    </div>
  ),
};
