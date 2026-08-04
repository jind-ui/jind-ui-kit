import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Calendar } from './Calendar';

const meta: Meta<typeof Calendar> = {
  title: 'Components/Calendar',
  component: Calendar,
};

export default meta;
type Story = StoryObj<typeof Calendar>;

export const Default: Story = {
  args: {
    year: 2025,
    month: 6,
  },
};

export const WithSelected: Story = {
  args: {
    year: 2025,
    month: 6,
    selected: new Date(2025, 6, 15),
  },
};

export const WithOutlined: Story = {
  args: {
    year: 2025,
    month: 6,
    outlined: new Date(2025, 6, 22),
  },
};

export const Interactive: Story = {
  render: () => {
    const [selected, setSelected] = useState<Date | undefined>(undefined);
    return (
      <Calendar
        selected={selected}
        onSelect={setSelected}
        onClear={() => setSelected(undefined)}
      />
    );
  },
};
