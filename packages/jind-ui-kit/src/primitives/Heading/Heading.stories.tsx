import type { Meta, StoryObj } from '@storybook/react';
import { Heading } from './Heading';
import { Stack } from '../Stack/Stack';

const meta: Meta<typeof Heading> = {
  title: 'Primitives/Heading',
  component: Heading,
};
export default meta;

type Story = StoryObj<typeof Heading>;

export const AllLevels: Story = {
  render: () => (
    <Stack gap={4}>
      <Heading level={1}>Heading Level 1 (28px)</Heading>
      <Heading level={2}>Heading Level 2 (22px)</Heading>
      <Heading level={3}>Heading Level 3 (18px)</Heading>
      <Heading level={4}>Heading Level 4 (16px)</Heading>
    </Stack>
  ),
};
