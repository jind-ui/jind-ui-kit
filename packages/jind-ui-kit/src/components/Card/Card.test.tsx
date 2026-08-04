import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Card } from './Card';

describe('Card', () => {
  it('renders without crashing', () => {
    render(<Card data-testid="card" />);
    expect(screen.getByTestId('card')).toBeTruthy();
  });

  it('renders children', () => {
    render(<Card>Card content</Card>);
    expect(screen.getByText('Card content')).toBeTruthy();
  });

  it('renders title when provided', () => {
    render(<Card title="My Title">Content</Card>);
    expect(screen.getByText('My Title')).toBeTruthy();
  });

  it('renders actions when provided', () => {
    render(
      <Card title="Title" actions={<button>Edit</button>}>
        Content
      </Card>,
    );
    expect(screen.getByText('Edit')).toBeTruthy();
  });

  it('applies custom padding', () => {
    render(<Card padding={32} data-testid="card">Content</Card>);
    const card = screen.getByTestId('card');
    expect(card.style.padding).toBe('32px');
  });

  it('applies custom style', () => {
    render(
      <Card style={{ border: '1px solid red' }} data-testid="card">
        Content
      </Card>,
    );
    const card = screen.getByTestId('card');
    expect(card.style.border).toBe('1px solid red');
  });

  it('renders as different element with as prop', () => {
    render(
      <Card as="section" data-testid="card">
        Content
      </Card>,
    );
    const card = screen.getByTestId('card');
    expect(card.tagName).toBe('SECTION');
  });
});
