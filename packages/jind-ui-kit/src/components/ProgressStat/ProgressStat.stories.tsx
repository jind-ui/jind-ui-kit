import type { Meta, StoryObj } from '@storybook/react';
import { ProgressStat } from './ProgressStat';

const meta: Meta<typeof ProgressStat> = {
  title: 'Components/ProgressStat',
  component: ProgressStat,
};

export default meta;
type Story = StoryObj<typeof ProgressStat>;

export const Default: Story = {
  args: {
    value: 25,
    total: 100,
  },
};

export const HalfFilled: Story = {
  args: {
    value: 50,
    total: 100,
  },
};

export const Complete: Story = {
  args: {
    value: 100,
    total: 100,
  },
};

export const OverFilled: Story = {
  args: {
    value: 150,
    total: 100,
  },
};

export const AllTones: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 400 }}>
      {(['brand', 'primary', 'info', 'warning', 'success', 'danger', 'accent', 'neutral'] as const).map(
        (tone) => (
          <div key={tone}>
            <div style={{ marginBottom: 4, fontSize: 12, color: '#888' }}>{tone}</div>
            <ProgressStat value={65} total={100} tone={tone} />
          </div>
        ),
      )}
    </div>
  ),
};

export const CustomCaption: Story = {
  args: {
    value: 42,
    total: 60,
    caption: 'tasks completed',
  },
};

export const Empty: Story = {
  args: {
    value: 0,
    total: 100,
  },
};
