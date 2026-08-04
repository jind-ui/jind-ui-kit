import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Modal } from './Modal';

describe('Modal', () => {
  it('renders nothing when open is false', () => {
    const { container } = render(
      <Modal open={false}>Content</Modal>,
    );
    expect(container.innerHTML).toBe('');
  });

  it('renders children when open is true', () => {
    render(<Modal open>Hello Modal</Modal>);
    expect(screen.getByText('Hello Modal')).toBeTruthy();
  });

  it('renders title in the header', () => {
    render(<Modal open title="My Title">Content</Modal>);
    expect(screen.getByText('My Title')).toBeTruthy();
  });

  it('renders footer when provided', () => {
    render(
      <Modal open footer={<button>Save</button>}>
        Content
      </Modal>,
    );
    expect(screen.getByText('Save')).toBeTruthy();
  });

  it('calls onClose when close button is clicked', () => {
    const handleClose = vi.fn();
    render(
      <Modal open onClose={handleClose} title="Title">
        Content
      </Modal>,
    );
    const closeBtn = screen.getByLabelText('Close');
    fireEvent.click(closeBtn);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when Escape key is pressed', () => {
    const handleClose = vi.fn();
    render(
      <Modal open onClose={handleClose}>
        Content
      </Modal>,
    );
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('does not call onClose on Escape when closed', () => {
    const handleClose = vi.fn();
    render(
      <Modal open={false} onClose={handleClose}>
        Content
      </Modal>,
    );
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(handleClose).not.toHaveBeenCalled();
  });

  it('renders as a portal in document.body', () => {
    render(<Modal open>Portal Content</Modal>);
    const dialog = screen.getByRole('dialog');
    expect(dialog.parentElement).toBe(document.body);
  });

  it('has role dialog and aria-modal', () => {
    render(<Modal open>Content</Modal>);
    const dialog = screen.getByRole('dialog');
    expect(dialog.getAttribute('aria-modal')).toBe('true');
  });

  it('applies custom width', () => {
    render(<Modal open width={600}>Content</Modal>);
    const dialog = screen.getByRole('dialog');
    const content = dialog.firstElementChild as HTMLElement;
    expect(content.style.width).toBe('600px');
  });
});
