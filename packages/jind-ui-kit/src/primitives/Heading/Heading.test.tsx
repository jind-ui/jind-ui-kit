import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Heading } from './Heading';

describe('Heading', () => {
  it('renders h2 by default', () => {
    render(<Heading data-testid="heading">Title</Heading>);
    expect(screen.getByTestId('heading').tagName).toBe('H2');
  });

  it('renders correct heading level', () => {
    render(<Heading level={1} data-testid="h1">H1</Heading>);
    expect(screen.getByTestId('h1').tagName).toBe('H1');
  });

  it('renders as a custom element with as prop', () => {
    render(<Heading as="span" data-testid="heading">Custom</Heading>);
    expect(screen.getByTestId('heading').tagName).toBe('SPAN');
  });

  it('applies font size based on level', () => {
    render(<Heading level={3} data-testid="h3">H3</Heading>);
    expect(screen.getByTestId('h3').style.fontSize).toBe('18px');
  });
});
