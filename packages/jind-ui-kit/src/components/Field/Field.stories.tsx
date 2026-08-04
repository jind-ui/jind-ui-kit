import type { Meta, StoryObj } from '@storybook/react';
import { Field } from './Field';

const meta: Meta<typeof Field> = {
  title: 'Components/Field',
  component: Field,
};

export default meta;
type Story = StoryObj<typeof Field>;

const Placeholder = () => (
  <div
    style={{
      height: 40,
      borderRadius: 8,
      border: '1px dashed #ccc',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#999',
      fontSize: 13,
    }}
  >
    Control placeholder
  </div>
);

export const Default: Story = {
  args: {
    label: 'Email address',
    hint: 'We will never share your email.',
    htmlFor: 'email',
    children: <Placeholder />,
  },
};

export const WithoutHint: Story = {
  args: {
    label: 'Username',
    htmlFor: 'username',
    children: <Placeholder />,
  },
};

export const WithoutLabel: Story = {
  args: {
    hint: 'Optional helper text',
    children: <Placeholder />,
  },
};
