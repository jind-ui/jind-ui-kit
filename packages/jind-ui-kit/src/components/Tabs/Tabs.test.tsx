import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Tabs, TabList, Tab, TabPanel } from './Tabs';

function TestTabs({ defaultValue = 'one', onChange }: { defaultValue?: string; onChange?: (v: string) => void }) {
  return (
    <Tabs defaultValue={defaultValue} onChange={onChange}>
      <TabList>
        <Tab value="one">Tab One</Tab>
        <Tab value="two">Tab Two</Tab>
        <Tab value="three" disabled>Tab Three</Tab>
      </TabList>
      <TabPanel value="one">Panel One Content</TabPanel>
      <TabPanel value="two">Panel Two Content</TabPanel>
      <TabPanel value="three">Panel Three Content</TabPanel>
    </Tabs>
  );
}

describe('Tabs', () => {
  it('renders without crashing', () => {
    render(<TestTabs />);
    expect(screen.getByRole('tablist')).toBeTruthy();
  });

  it('shows the default active panel', () => {
    render(<TestTabs defaultValue="one" />);
    expect(screen.getByText('Panel One Content')).toBeTruthy();
    expect(screen.queryByText('Panel Two Content')).toBeNull();
  });

  it('switches panel when a tab is clicked', () => {
    render(<TestTabs />);
    fireEvent.click(screen.getByText('Tab Two'));
    expect(screen.getByText('Panel Two Content')).toBeTruthy();
    expect(screen.queryByText('Panel One Content')).toBeNull();
  });

  it('calls onChange when a tab is clicked', () => {
    const onChange = vi.fn();
    render(<TestTabs onChange={onChange} />);
    fireEvent.click(screen.getByText('Tab Two'));
    expect(onChange).toHaveBeenCalledWith('two', { reason: 'click' });
  });

  it('does not switch to a disabled tab', () => {
    render(<TestTabs />);
    fireEvent.click(screen.getByText('Tab Three'));
    expect(screen.queryByText('Panel Three Content')).toBeNull();
    expect(screen.getByText('Panel One Content')).toBeTruthy();
  });

  it('marks the active tab as selected', () => {
    render(<TestTabs />);
    const tab = screen.getByText('Tab One');
    expect(tab.getAttribute('aria-selected')).toBe('true');
  });

  it('marks the disabled tab with aria-disabled', () => {
    render(<TestTabs />);
    const tab = screen.getByText('Tab Three');
    expect(tab.getAttribute('aria-disabled')).toBe('true');
  });
});
