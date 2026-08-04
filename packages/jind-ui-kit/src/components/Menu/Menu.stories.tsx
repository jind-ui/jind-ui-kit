import type { Meta, StoryObj } from '@storybook/react';
import { Menu } from './Menu';
import { MenuItem } from '../MenuItem/MenuItem';

const meta: Meta<typeof Menu> = {
  title: 'Components/Menu',
  component: Menu,
};

export default meta;
type Story = StoryObj<typeof Menu>;

export const Default: Story = {
  args: {
    width: 240,
    children: (
      <>
        <MenuItem>Edit</MenuItem>
        <MenuItem>Duplicate</MenuItem>
        <MenuItem>Archive</MenuItem>
      </>
    ),
  },
};

export const WithHeader: Story = {
  args: {
    header: 'Actions',
    width: 240,
    children: (
      <>
        <MenuItem icon="edit">Edit</MenuItem>
        <MenuItem icon="copy">Duplicate</MenuItem>
        <MenuItem icon="archive" disabled>Archive</MenuItem>
      </>
    ),
  },
};

export const WithSelectedItems: Story = {
  args: {
    header: 'Status',
    width: 220,
    children: (
      <>
        <MenuItem selected>Active</MenuItem>
        <MenuItem>Paused</MenuItem>
        <MenuItem>Draft</MenuItem>
      </>
    ),
  },
};

export const WithSwatches: Story = {
  args: {
    header: 'Colors',
    width: 200,
    children: (
      <>
        <MenuItem swatch="#e8503a" selected>Red</MenuItem>
        <MenuItem swatch="#1a72f6">Blue</MenuItem>
        <MenuItem swatch="#38a847">Green</MenuItem>
        <MenuItem swatch="#d09208">Amber</MenuItem>
      </>
    ),
  },
};

export const WithTrailing: Story = {
  args: {
    width: 260,
    children: (
      <>
        <MenuItem icon="edit" trailing={<span style={{ fontSize: 12, color: '#a9b0b6' }}>Ctrl+E</span>}>Edit</MenuItem>
        <MenuItem icon="copy" trailing={<span style={{ fontSize: 12, color: '#a9b0b6' }}>Ctrl+D</span>}>Duplicate</MenuItem>
        <MenuItem icon="trash" disabled trailing={<span style={{ fontSize: 12, color: '#a9b0b6' }}>Del</span>}>Delete</MenuItem>
      </>
    ),
  },
};
