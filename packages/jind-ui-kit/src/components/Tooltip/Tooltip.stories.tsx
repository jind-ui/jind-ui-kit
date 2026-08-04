import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip } from './Tooltip';

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Top: Story = {
  render: () => (
    <div style={{ padding: 80, display: 'flex', justifyContent: 'center' }}>
      <Tooltip content="This is a tooltip" placement="top">
        <button>Hover me (top)</button>
      </Tooltip>
    </div>
  ),
};

export const Bottom: Story = {
  render: () => (
    <div style={{ padding: 80, display: 'flex', justifyContent: 'center' }}>
      <Tooltip content="Below the element" placement="bottom">
        <button>Hover me (bottom)</button>
      </Tooltip>
    </div>
  ),
};

export const Left: Story = {
  render: () => (
    <div style={{ padding: 80, display: 'flex', justifyContent: 'center' }}>
      <Tooltip content="To the left" placement="left">
        <button>Hover me (left)</button>
      </Tooltip>
    </div>
  ),
};

export const Right: Story = {
  render: () => (
    <div style={{ padding: 80, display: 'flex', justifyContent: 'center' }}>
      <Tooltip content="To the right" placement="right">
        <button>Hover me (right)</button>
      </Tooltip>
    </div>
  ),
};

export const CustomDelay: Story = {
  render: () => (
    <div style={{ padding: 80, display: 'flex', justifyContent: 'center' }}>
      <Tooltip content="Slow tooltip" delay={800}>
        <button>Hover me (800ms delay)</button>
      </Tooltip>
    </div>
  ),
};

export const NoDelay: Story = {
  render: () => (
    <div style={{ padding: 80, display: 'flex', justifyContent: 'center' }}>
      <Tooltip content="Instant tooltip" delay={0}>
        <button>Hover me (instant)</button>
      </Tooltip>
    </div>
  ),
};
