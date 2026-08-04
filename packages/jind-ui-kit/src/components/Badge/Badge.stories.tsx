import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './Badge';

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {
    children: 'Active',
  },
};

export const AllTones: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
      <Badge tone="info">Info</Badge>
      <Badge tone="success">Success</Badge>
      <Badge tone="warning">Warning</Badge>
      <Badge tone="danger">Danger</Badge>
      <Badge tone="neutral">Neutral</Badge>
      <Badge tone="primary">Primary</Badge>
      <Badge tone="accent">Accent</Badge>
      <Badge tone="brand">Brand</Badge>
    </div>
  ),
};

export const WithDot: Story = {
  args: {
    dot: true,
    children: 'Online',
    tone: 'success',
  },
};

export const WithDismiss: Story = {
  args: {
    children: 'Removable',
    onDismiss: () => {},
  },
};

export const WithDotAndDismiss: Story = {
  args: {
    dot: true,
    children: 'Active',
    tone: 'info',
    onDismiss: () => {},
  },
};
