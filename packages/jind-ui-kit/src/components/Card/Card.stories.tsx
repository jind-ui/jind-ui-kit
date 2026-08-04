import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './Card';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    children: 'This is a basic card with default padding.',
  },
};

export const WithTitle: Story = {
  args: {
    title: 'Card Title',
    children: 'Card body content goes here.',
  },
};

export const WithTitleAndActions: Story = {
  args: {
    title: 'Team Members',
    actions: (
      <button
        style={{
          background: 'none',
          border: 'none',
          color: '#1a72f6',
          cursor: 'pointer',
          fontWeight: 500,
          fontSize: 14,
        }}
      >
        View all
      </button>
    ),
    children: 'Card body with a title and an action button in the header.',
  },
};

export const CustomPadding: Story = {
  args: {
    padding: 40,
    title: 'Spacious Card',
    children: 'This card uses 40px padding instead of the default 20px.',
  },
};

export const AsSection: Story = {
  args: {
    as: 'section',
    title: 'Section Card',
    children: 'This card renders as a <section> element.',
  },
};
