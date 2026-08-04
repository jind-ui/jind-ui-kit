import type { Meta, StoryObj } from '@storybook/react';
import { Text } from './Text';
import { Stack } from '../Stack/Stack';

const meta: Meta<typeof Text> = {
  title: 'Primitives/Text',
  component: Text,
};
export default meta;

type Story = StoryObj<typeof Text>;

export const AllVariants: Story = {
  render: () => (
    <Stack gap={4}>
      <Text variant="body">Body (14px regular)</Text>
      <Text variant="control">Control (14px medium)</Text>
      <Text variant="label">Label (14px regular, 1.4 line-height)</Text>
      <Text variant="caption">Caption (13px medium)</Text>
      <Text variant="card-title">Card Title (16px bold)</Text>
      <Text variant="heading">Heading (18px medium)</Text>
    </Stack>
  ),
};

export const Truncated: Story = {
  render: () => (
    <div style={{ width: 200 }}>
      <Text truncate>This is a very long text that should be truncated with an ellipsis</Text>
    </div>
  ),
};

export const TabularNumbers: Story = {
  render: () => (
    <Stack gap={2}>
      <Text tabular>1,234.56</Text>
      <Text tabular>78,901.23</Text>
      <Text tabular>456.78</Text>
    </Stack>
  ),
};
