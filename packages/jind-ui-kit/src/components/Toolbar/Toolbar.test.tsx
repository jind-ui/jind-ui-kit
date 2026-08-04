import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Toolbar } from './Toolbar';
import { ToolbarButton } from '../ToolbarButton/ToolbarButton';

describe('Toolbar', () => {
  it('renders without crashing', () => {
    render(
      <Toolbar value="bold">
        <ToolbarButton name="bold" label="Bold" />
        <ToolbarButton name="italic" label="Italic" />
      </Toolbar>,
    );
    expect(screen.getByRole('toolbar')).toBeTruthy();
  });

  it('sets active state on matching child', () => {
    render(
      <Toolbar value="bold">
        <ToolbarButton name="bold" label="Bold" />
        <ToolbarButton name="italic" label="Italic" />
      </Toolbar>,
    );
    // Active button should show the bar
    expect(screen.getByTestId('toolbar-active-bar')).toBeTruthy();
  });

  it('calls onChange when a button is clicked', () => {
    const onChange = vi.fn();
    render(
      <Toolbar value="bold" onChange={onChange}>
        <ToolbarButton name="bold" label="Bold" />
        <ToolbarButton name="italic" label="Italic" />
      </Toolbar>,
    );
    fireEvent.click(screen.getByLabelText('Italic'));
    expect(onChange).toHaveBeenCalledWith('italic');
  });

  it('renders all children', () => {
    render(
      <Toolbar value="bold">
        <ToolbarButton name="bold" label="Bold" />
        <ToolbarButton name="italic" label="Italic" />
        <ToolbarButton name="underline" label="Underline" />
      </Toolbar>,
    );
    expect(screen.getByLabelText('Bold')).toBeTruthy();
    expect(screen.getByLabelText('Italic')).toBeTruthy();
    expect(screen.getByLabelText('Underline')).toBeTruthy();
  });

  it('applies custom style', () => {
    render(
      <Toolbar value="bold" style={{ padding: 8 }}>
        <ToolbarButton name="bold" label="Bold" />
      </Toolbar>,
    );
    expect(screen.getByRole('toolbar').style.padding).toBe('8px');
  });

  it('does not crash with non-element children', () => {
    render(
      <Toolbar value="bold">
        <ToolbarButton name="bold" label="Bold" />
        {null}
        {false}
      </Toolbar>,
    );
    expect(screen.getByRole('toolbar')).toBeTruthy();
  });
});
