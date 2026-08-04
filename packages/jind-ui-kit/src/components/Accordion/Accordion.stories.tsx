import type { Meta, StoryObj } from '@storybook/react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from './Accordion';

const meta: Meta<typeof Accordion> = {
  title: 'Components/Accordion',
  component: Accordion,
};
export default meta;

type Story = StoryObj<typeof Accordion>;

export const Default: Story = {
  render: () => (
    <Accordion defaultValue={['item-1']} style={{ width: 400 }}>
      <AccordionItem value="item-1">
        <AccordionTrigger>What is Jind UI Kit?</AccordionTrigger>
        <AccordionContent>
          Jind UI Kit is an ultra-futuristic, cross-platform component library for React.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Is it responsive?</AccordionTrigger>
        <AccordionContent>
          Yes, it works across web, tablet, and mobile with responsive design patterns.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Can I theme it?</AccordionTrigger>
        <AccordionContent>
          Absolutely. Wrap your app with JindProvider and pass a custom theme.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const Multiple: Story = {
  render: () => (
    <Accordion multiple defaultValue={['a', 'b']} style={{ width: 400 }}>
      <AccordionItem value="a">
        <AccordionTrigger>First section</AccordionTrigger>
        <AccordionContent>Content of section A</AccordionContent>
      </AccordionItem>
      <AccordionItem value="b">
        <AccordionTrigger>Second section</AccordionTrigger>
        <AccordionContent>Content of section B</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};
