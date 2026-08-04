import type { Meta, StoryObj } from '@storybook/react';
import { StatusDot } from './StatusDot';

const meta: Meta<typeof StatusDot> = {
  title: 'Components/StatusDot',
  component: StatusDot,
  argTypes: {
    tone: {
      control: 'select',
      options: ['info', 'warning', 'success', 'danger', 'accent', 'brand', 'neutral', 'primary'],
    },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
};

export default meta;
type Story = StoryObj<typeof StatusDot>;

export const Default: Story = {
  args: {
    tone: 'success',
    label: 'Active',
  },
};

export const AllTones: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <StatusDot tone="info" label="Info" />
      <StatusDot tone="warning" label="Warning" />
      <StatusDot tone="success" label="Success" />
      <StatusDot tone="danger" label="Danger" />
      <StatusDot tone="accent" label="Accent" />
      <StatusDot tone="brand" label="Brand" />
      <StatusDot tone="neutral" label="Neutral" />
      <StatusDot tone="primary" label="Primary" />
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      <StatusDot tone="success" size="sm" label="Small" />
      <StatusDot tone="success" size="md" label="Medium" />
      <StatusDot tone="success" size="lg" label="Large" />
    </div>
  ),
};

export const WithLabel: Story = {
  args: {
    tone: 'brand',
    label: 'Online',
  },
};

export const WithoutLabel: Story = {
  args: {
    tone: 'danger',
  },
};
