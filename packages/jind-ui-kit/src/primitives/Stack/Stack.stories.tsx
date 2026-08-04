import type { Meta, StoryObj } from '@storybook/react';
import { Stack } from './Stack';
import { Box } from '../Box/Box';

const meta: Meta<typeof Stack> = {
  title: 'Primitives/Stack',
  component: Stack,
};
export default meta;

type Story = StoryObj<typeof Stack>;

const Item = ({ label }: { label: string }) => (
  <Box p={4} px={6} bg="#dbe8fe" radius="sm">{label}</Box>
);

export const Vertical: Story = {
  render: () => (
    <Stack gap={4}>
      <Item label="Item 1" />
      <Item label="Item 2" />
      <Item label="Item 3" />
    </Stack>
  ),
};

export const Horizontal: Story = {
  render: () => (
    <Stack direction="row" gap={4}>
      <Item label="Item 1" />
      <Item label="Item 2" />
      <Item label="Item 3" />
    </Stack>
  ),
};

export const Centered: Story = {
  render: () => (
    <Stack direction="row" gap={4} align="center" justify="center" height={200} style={{ background: '#f2f7fa' }}>
      <Item label="Centered" />
    </Stack>
  ),
};
