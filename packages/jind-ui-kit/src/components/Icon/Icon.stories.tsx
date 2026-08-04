import type { Meta, StoryObj } from '@storybook/react';
import { Icon } from './Icon';

const meta: Meta<typeof Icon> = {
  title: 'Components/Icon',
  component: Icon,
  argTypes: {
    name: { control: 'text' },
    size: { control: 'number' },
    color: { control: 'color' },
    className: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Icon>;

export const Default: Story = {
  args: {
    name: 'home',
  },
};

export const CustomSize: Story = {
  args: {
    name: 'home',
    size: 24,
  },
};

export const CustomColor: Story = {
  args: {
    name: 'home',
    color: '#e8503a',
  },
};

export const DifferentIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <Icon name="home" />
      <Icon name="settings" />
      <Icon name="user" />
      <Icon name="search" />
      <Icon name="plus" />
    </div>
  ),
};

export const SmallIcon: Story = {
  args: {
    name: 'home',
    size: 14,
  },
};
