import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Toolbar } from './Toolbar';
import { ToolbarButton } from '../ToolbarButton/ToolbarButton';

const meta: Meta<typeof Toolbar> = {
  title: 'Components/Toolbar',
  component: Toolbar,
};

export default meta;
type Story = StoryObj<typeof Toolbar>;

export const Default: Story = {
  render: () => {
    const [active, setActive] = useState('bold');
    return (
      <Toolbar value={active} onChange={setActive}>
        <ToolbarButton name="bold" label="Bold" />
        <ToolbarButton name="italic" label="Italic" />
        <ToolbarButton name="underline" label="Underline" />
        <ToolbarButton name="strikethrough" label="Strikethrough" />
      </Toolbar>
    );
  },
};

export const WithDisabledButton: Story = {
  render: () => {
    const [active, setActive] = useState('bold');
    return (
      <Toolbar value={active} onChange={setActive}>
        <ToolbarButton name="bold" label="Bold" />
        <ToolbarButton name="italic" label="Italic" />
        <ToolbarButton name="underline" label="Underline" disabled />
      </Toolbar>
    );
  },
};

export const NoSelection: Story = {
  render: () => {
    const [active, setActive] = useState('');
    return (
      <Toolbar value={active} onChange={setActive}>
        <ToolbarButton name="bold" label="Bold" />
        <ToolbarButton name="italic" label="Italic" />
        <ToolbarButton name="underline" label="Underline" />
      </Toolbar>
    );
  },
};
