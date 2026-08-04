import type { Meta, StoryObj } from '@storybook/react';
import { DayToggle } from './DayToggle';

const meta: Meta<typeof DayToggle> = {
  title: 'Components/DayToggle',
  component: DayToggle,
};

export default meta;
type Story = StoryObj<typeof DayToggle>;

export const Default: Story = {
  args: {
    children: 'Mon',
  },
};

export const Selected: Story = {
  args: {
    selected: true,
    children: 'Tue',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Wed',
  },
};

export const AllDays: Story = {
  render: () => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const selected = [0, 2];
    return (
      <div style={{ display: 'flex', gap: 8 }}>
        {days.map((day, i) => (
          <DayToggle key={day} selected={selected.includes(i)}>
            {day}
          </DayToggle>
        ))}
      </div>
    );
  },
};
