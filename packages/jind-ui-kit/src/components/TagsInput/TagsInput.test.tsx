import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { TagsInput } from './TagsInput';

describe('TagsInput', () => {
  it('renders without crashing', () => {
    render(<TagsInput tags={[]} />);
    expect(screen.getByTestId('tags-input')).toBeTruthy();
  });

  it('renders tags', () => {
    render(<TagsInput tags={['React', 'TypeScript']} />);
    const tags = screen.getAllByTestId('tag');
    expect(tags).toHaveLength(2);
    expect(tags[0].textContent).toContain('React');
    expect(tags[1].textContent).toContain('TypeScript');
  });

  it('calls onRemove when remove button clicked', () => {
    const onRemove = vi.fn();
    render(<TagsInput tags={['React', 'TypeScript']} onRemove={onRemove} />);
    const removeButtons = screen.getAllByTestId('tag-remove');
    fireEvent.click(removeButtons[1]);
    expect(onRemove).toHaveBeenCalledWith(1);
  });

  it('shows placeholder when no tags', () => {
    render(<TagsInput tags={[]} placeholder="Type here..." />);
    expect(screen.getByText('Type here...')).toBeTruthy();
  });

  it('does not call onRemove when disabled', () => {
    const onRemove = vi.fn();
    render(<TagsInput tags={['React']} onRemove={onRemove} disabled />);
    const removeButton = screen.getByTestId('tag-remove');
    fireEvent.click(removeButton);
    expect(onRemove).not.toHaveBeenCalled();
  });
});
