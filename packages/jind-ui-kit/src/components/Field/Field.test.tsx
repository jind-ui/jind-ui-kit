import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Field } from './Field';

describe('Field', () => {
  it('renders children', () => {
    render(
      <Field>
        <input data-testid="child-input" />
      </Field>,
    );
    expect(screen.getByTestId('child-input')).toBeTruthy();
  });

  it('renders label when provided', () => {
    render(
      <Field label="Email">
        <input />
      </Field>,
    );
    expect(screen.getByText('Email')).toBeTruthy();
    expect(screen.getByText('Email').tagName).toBe('LABEL');
  });

  it('renders hint when provided', () => {
    render(
      <Field hint="We will never share your email.">
        <input />
      </Field>,
    );
    expect(screen.getByText('We will never share your email.')).toBeTruthy();
  });

  it('label has htmlFor attribute', () => {
    render(
      <Field label="Username" htmlFor="username-input">
        <input id="username-input" />
      </Field>,
    );
    const label = screen.getByText('Username');
    expect(label.getAttribute('for')).toBe('username-input');
  });

  it('renders without label and hint', () => {
    render(
      <Field>
        <input data-testid="solo-input" />
      </Field>,
    );
    expect(screen.getByTestId('solo-input')).toBeTruthy();
    expect(screen.queryByRole('label')).toBeNull();
  });
});
