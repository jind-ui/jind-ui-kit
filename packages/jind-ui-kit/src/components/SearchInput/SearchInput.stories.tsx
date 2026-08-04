import type { Meta, StoryObj } from '@storybook/react';
import { SearchInput } from './SearchInput';

const meta: Meta<typeof SearchInput> = {
  title: 'Components/SearchInput',
  component: SearchInput,
};

export default meta;
type Story = StoryObj<typeof SearchInput>;

export const Default: Story = {
  args: {},
};

export const WithPlaceholder: Story = {
  args: {
    placeholder: 'Search users...',
  },
};

export const WithValue: Story = {
  args: {
    defaultValue: 'Some search term',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: 'Search disabled...',
  },
};

export const CustomWidth: Story = {
  args: {
    style: { maxWidth: 300 },
    placeholder: 'Narrow search...',
  },
};
