import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Table, TableHeader, TableRow, TableCell } from './Table';

function SampleTable({ onRowClick }: { onRowClick?: () => void }) {
  return (
    <Table>
      <TableHeader>
        <TableCell header>Name</TableCell>
        <TableCell header align="right">Amount</TableCell>
      </TableHeader>
      <tbody>
        <TableRow onClick={onRowClick}>
          <TableCell>Alice</TableCell>
          <TableCell align="right">$100</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Bob</TableCell>
          <TableCell align="right">$200</TableCell>
        </TableRow>
      </tbody>
    </Table>
  );
}

describe('Table', () => {
  it('renders without crashing', () => {
    render(<SampleTable />);
    expect(screen.getByText('Name')).toBeTruthy();
  });

  it('renders header cells as th elements', () => {
    render(<SampleTable />);
    const headerCell = screen.getByText('Name');
    expect(headerCell.tagName).toBe('TH');
  });

  it('renders body cells as td elements', () => {
    render(<SampleTable />);
    const bodyCell = screen.getByText('Alice');
    expect(bodyCell.tagName).toBe('TD');
  });

  it('renders all rows', () => {
    render(<SampleTable />);
    expect(screen.getByText('Alice')).toBeTruthy();
    expect(screen.getByText('Bob')).toBeTruthy();
  });

  it('handles row click', () => {
    const onClick = vi.fn();
    render(<SampleTable onRowClick={onClick} />);
    fireEvent.click(screen.getByText('Alice'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('applies text alignment', () => {
    render(<SampleTable />);
    const cell = screen.getByText('$100');
    expect(cell.style.textAlign).toBe('right');
  });

  it('applies hover style on row mouse enter', () => {
    render(<SampleTable />);
    const cell = screen.getByText('Alice');
    const row = cell.closest('tr')!;
    fireEvent.mouseEnter(row);
    expect(row.style.background).toBeTruthy();
    fireEvent.mouseLeave(row);
    expect(row.style.background).toBe('');
  });
});
