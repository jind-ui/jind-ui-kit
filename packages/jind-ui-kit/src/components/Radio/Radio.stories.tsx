import type { Meta, StoryObj } from '@storybook/react';
import { Radio, RadioGroup } from './Radio';

const meta: Meta<typeof RadioGroup> = {
  title: 'Components/Radio',
  component: RadioGroup,
};

export default meta;
type Story = StoryObj<typeof RadioGroup>;

export const Default: Story = {
  render: () => (
    <RadioGroup defaultValue="option1" name="example">
      <Radio value="option1" label="Option 1" />
      <Radio value="option2" label="Option 2" />
      <Radio value="option3" label="Option 3" />
    </RadioGroup>
  ),
};

export const WithDisabled: Story = {
  render: () => (
    <RadioGroup defaultValue="a" name="disabled-example">
      <Radio value="a" label="Available" />
      <Radio value="b" label="Also available" />
      <Radio value="c" label="Disabled option" disabled />
    </RadioGroup>
  ),
};

export const NoDefault: Story = {
  render: () => (
    <RadioGroup name="no-default">
      <Radio value="red" label="Red" />
      <Radio value="green" label="Green" />
      <Radio value="blue" label="Blue" />
    </RadioGroup>
  ),
};

export const Horizontal: Story = {
  render: () => (
    <RadioGroup defaultValue="sm" name="size" style={{ flexDirection: 'row', gap: 24 }}>
      <Radio value="sm" label="Small" />
      <Radio value="md" label="Medium" />
      <Radio value="lg" label="Large" />
    </RadioGroup>
  ),
};
