import type { Meta, StoryObj } from '@storybook/react';
import { MenuItem } from './MenuItem';

const meta: Meta<typeof MenuItem> = {
  title: 'Components/MenuItem',
  component: MenuItem,
};

export default meta;
type Story = StoryObj<typeof MenuItem>;

export const Default: Story = {
  args: {
    children: 'Menu item',
  },
};

export const WithIcon: Story = {
  args: {
    icon: 'edit',
    children: 'Edit',
  },
};

export const WithSwatch: Story = {
  args: {
    swatch: '#e8503a',
    children: 'Red',
  },
};

export const Selected: Story = {
  args: {
    selected: true,
    children: 'Active',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Cannot click',
  },
};

export const WithTrailing: Story = {
  args: {
    icon: 'edit',
    trailing: <span style={{ fontSize: 12, color: '#a9b0b6' }}>Ctrl+E</span>,
    children: 'Edit',
  },
};

export const Hovered: Story = {
  args: {
    hovered: true,
    children: 'Hovered item',
  },
};
