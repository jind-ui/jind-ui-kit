import type { Meta, StoryObj } from '@storybook/react';
import { Toast } from './Toast';

const meta: Meta<typeof Toast> = {
  title: 'Components/Toast',
  component: Toast,
  argTypes: {
    tone: {
      control: 'select',
      options: ['neutral', 'primary', 'danger', 'success', 'warning', 'info', 'accent', 'brand'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Toast>;

export const Default: Story = {
  args: {
    tone: 'neutral',
    children: 'This is a toast notification.',
  },
};

export const Success: Story = {
  args: {
    tone: 'success',
    icon: '✓',
    children: 'Changes saved successfully.',
  },
};

export const Danger: Story = {
  args: {
    tone: 'danger',
    icon: '!',
    children: 'Something went wrong. Please try again.',
  },
};

export const Warning: Story = {
  args: {
    tone: 'warning',
    icon: '⚠',
    children: 'Your session will expire in 5 minutes.',
  },
};

export const WithDismiss: Story = {
  args: {
    tone: 'info',
    icon: 'i',
    children: 'New updates are available.',
    onDismiss: () => {},
  },
};

export const AllTones: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 400 }}>
      <Toast tone="neutral">Neutral toast</Toast>
      <Toast tone="primary">Primary toast</Toast>
      <Toast tone="danger" icon="!">Danger toast</Toast>
      <Toast tone="success" icon={'✓'}>Success toast</Toast>
      <Toast tone="warning" icon={'⚠'}>Warning toast</Toast>
      <Toast tone="info" icon="i">Info toast</Toast>
      <Toast tone="accent">Accent toast</Toast>
      <Toast tone="brand">Brand toast</Toast>
    </div>
  ),
};
