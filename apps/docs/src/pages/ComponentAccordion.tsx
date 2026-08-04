import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from 'jind-ui-kit';
import { Preview } from '../components/Preview';
import { PropsTable } from '../components/PropsTable';
import { ViewMarkdown } from '../components/ViewMarkdown';

const accordionProps = [
  { name: 'value', type: 'string[]', description: 'Controlled array of expanded item values' },
  { name: 'defaultValue', type: 'string[]', default: '[]', description: 'Initially expanded items for uncontrolled usage' },
  { name: 'onChange', type: '(value: string[]) => void', description: 'Callback when expanded items change' },
  { name: 'multiple', type: 'boolean', default: 'false', description: 'Allow multiple items to be expanded simultaneously' },
  { name: 'children', type: 'ReactNode', description: 'AccordionItem components' },
  { name: 'style', type: 'CSSProperties', description: 'Custom inline styles' },
];

const accordionItemProps = [
  { name: 'value', type: 'string', description: 'Unique identifier for this item (required)' },
  { name: 'children', type: 'ReactNode', description: 'AccordionTrigger and AccordionContent' },
  { name: 'style', type: 'CSSProperties', description: 'Custom inline styles' },
];

const accordionTriggerProps = [
  { name: 'children', type: 'ReactNode', description: 'Trigger label content' },
  { name: 'style', type: 'CSSProperties', description: 'Custom inline styles' },
];

const accordionContentProps = [
  { name: 'children', type: 'ReactNode', description: 'Collapsible content revealed when expanded' },
  { name: 'style', type: 'CSSProperties', description: 'Custom inline styles' },
];

export function ComponentAccordion() {
  return (
    <div className="page-container">
      <div className="page-header">
        <ViewMarkdown slug="accordion" />
        <h1 className="page-title">Accordion</h1>
        <p className="page-description">
          Collapsible content sections. Composed from Accordion, AccordionItem,
          AccordionTrigger, and AccordionContent. Supports single or multiple
          expansion and controlled/uncontrolled modes.
        </p>
      </div>

      <div className="section">
        <h2 className="section-title">Single Expansion</h2>
        <Preview
          align="column"
          code={`<Accordion defaultValue={['faq-1']}>
  <AccordionItem value="faq-1">
    <AccordionTrigger>What is Jind UI Kit?</AccordionTrigger>
    <AccordionContent>
      A design-token-driven React component library built with
      inline styles and zero CSS dependencies.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="faq-2">
    <AccordionTrigger>How do I install it?</AccordionTrigger>
    <AccordionContent>
      Install via npm: npm install jind-ui-kit
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="faq-3">
    <AccordionTrigger>Can I customize the theme?</AccordionTrigger>
    <AccordionContent>
      Yes, wrap your app in ThemeProvider and pass a custom theme object.
    </AccordionContent>
  </AccordionItem>
</Accordion>`}
        >
          <Accordion defaultValue={['faq-1']}>
            <AccordionItem value="faq-1">
              <AccordionTrigger>What is Jind UI Kit?</AccordionTrigger>
              <AccordionContent>
                A design-token-driven React component library built with
                inline styles and zero CSS dependencies.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="faq-2">
              <AccordionTrigger>How do I install it?</AccordionTrigger>
              <AccordionContent>
                Install via npm: npm install jind-ui-kit
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="faq-3">
              <AccordionTrigger>Can I customize the theme?</AccordionTrigger>
              <AccordionContent>
                Yes, wrap your app in ThemeProvider and pass a custom theme object.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">Multiple Expansion</h2>
        <Preview
          align="column"
          code={`<Accordion multiple defaultValue={['a', 'b']}>
  <AccordionItem value="a">
    <AccordionTrigger>Section A</AccordionTrigger>
    <AccordionContent>Content for section A.</AccordionContent>
  </AccordionItem>
  <AccordionItem value="b">
    <AccordionTrigger>Section B</AccordionTrigger>
    <AccordionContent>Content for section B.</AccordionContent>
  </AccordionItem>
  <AccordionItem value="c">
    <AccordionTrigger>Section C</AccordionTrigger>
    <AccordionContent>Content for section C.</AccordionContent>
  </AccordionItem>
</Accordion>`}
        >
          <Accordion multiple defaultValue={['a', 'b']}>
            <AccordionItem value="a">
              <AccordionTrigger>Section A</AccordionTrigger>
              <AccordionContent>Content for section A.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="b">
              <AccordionTrigger>Section B</AccordionTrigger>
              <AccordionContent>Content for section B.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="c">
              <AccordionTrigger>Section C</AccordionTrigger>
              <AccordionContent>Content for section C.</AccordionContent>
            </AccordionItem>
          </Accordion>
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">Accordion Props</h2>
        <PropsTable props={accordionProps} />
      </div>

      <div className="section">
        <h2 className="section-title">AccordionItem Props</h2>
        <PropsTable props={accordionItemProps} />
      </div>

      <div className="section">
        <h2 className="section-title">AccordionTrigger Props</h2>
        <PropsTable props={accordionTriggerProps} />
      </div>

      <div className="section">
        <h2 className="section-title">AccordionContent Props</h2>
        <PropsTable props={accordionContentProps} />
      </div>
    </div>
  );
}
