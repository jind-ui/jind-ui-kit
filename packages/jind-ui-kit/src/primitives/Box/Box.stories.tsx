import type { Meta, StoryObj } from '@storybook/react';
import { Box } from './Box';

const meta: Meta<typeof Box> = {
  title: 'Primitives/Box',
  component: Box,
};
export default meta;

type Story = StoryObj<typeof Box>;

export const Default: Story = {
  args: { children: 'A box', p: 7, bg: '#ffffff', radius: 'md', shadow: 'card' },
};

export const AsSection: Story = {
  args: { as: 'section', children: 'Section element', p: 8, bg: '#f2f7fa', radius: 'lg' },
};

export const WithSpacing: Story = {
  args: { children: 'Padded box', p: 10, px: 12, bg: '#eff5ff', radius: 'sm' },
};

export const FixedSize: Story = {
  args: { children: 'Fixed', width: 200, height: 100, bg: '#dbe8fe', radius: 'md', display: 'flex' },
};
