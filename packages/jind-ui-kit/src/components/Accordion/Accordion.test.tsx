import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from './Accordion';

describe('Accordion', () => {
  const renderAccordion = (props = {}) =>
    render(
      <Accordion {...props}>
        <AccordionItem value="a">
          <AccordionTrigger>Section A</AccordionTrigger>
          <AccordionContent>Content A</AccordionContent>
        </AccordionItem>
        <AccordionItem value="b">
          <AccordionTrigger>Section B</AccordionTrigger>
          <AccordionContent>Content B</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );

  it('renders triggers', () => {
    renderAccordion();
    expect(screen.getByText('Section A')).toBeInTheDocument();
    expect(screen.getByText('Section B')).toBeInTheDocument();
  });

  it('content is hidden by default', () => {
    renderAccordion();
    expect(screen.queryByText('Content A')).not.toBeInTheDocument();
  });

  it('opens content on click', () => {
    renderAccordion();
    fireEvent.click(screen.getByText('Section A'));
    expect(screen.getByText('Content A')).toBeInTheDocument();
  });

  it('closes content on second click', () => {
    renderAccordion();
    fireEvent.click(screen.getByText('Section A'));
    fireEvent.click(screen.getByText('Section A'));
    expect(screen.queryByText('Content A')).not.toBeInTheDocument();
  });

  it('single mode collapses other items', () => {
    renderAccordion();
    fireEvent.click(screen.getByText('Section A'));
    fireEvent.click(screen.getByText('Section B'));
    expect(screen.queryByText('Content A')).not.toBeInTheDocument();
    expect(screen.getByText('Content B')).toBeInTheDocument();
  });

  it('multiple mode keeps all open', () => {
    renderAccordion({ multiple: true });
    fireEvent.click(screen.getByText('Section A'));
    fireEvent.click(screen.getByText('Section B'));
    expect(screen.getByText('Content A')).toBeInTheDocument();
    expect(screen.getByText('Content B')).toBeInTheDocument();
  });

  it('controlled mode calls onChange', () => {
    const onChange = vi.fn();
    render(
      <Accordion value={[]} onChange={onChange}>
        <AccordionItem value="a">
          <AccordionTrigger>Section A</AccordionTrigger>
          <AccordionContent>Content A</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );
    fireEvent.click(screen.getByText('Section A'));
    expect(onChange).toHaveBeenCalledWith(['a'], { reason: 'click' });
  });
});
