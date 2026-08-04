import type { Meta, StoryObj } from '@storybook/react';
import { Table, TableHeader, TableRow, TableCell } from './Table';

const meta: Meta<typeof Table> = {
  title: 'Components/Table',
  component: Table,
};

export default meta;
type Story = StoryObj<typeof Table>;

const sampleData = [
  { name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin', amount: '$1,200' },
  { name: 'Bob Smith', email: 'bob@example.com', role: 'Editor', amount: '$850' },
  { name: 'Carol Williams', email: 'carol@example.com', role: 'Viewer', amount: '$430' },
  { name: 'Dan Brown', email: 'dan@example.com', role: 'Editor', amount: '$920' },
];

export const Default: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableCell header>Name</TableCell>
        <TableCell header>Email</TableCell>
        <TableCell header>Role</TableCell>
        <TableCell header align="right">Amount</TableCell>
      </TableHeader>
      <tbody>
        {sampleData.map((row) => (
          <TableRow key={row.email}>
            <TableCell>{row.name}</TableCell>
            <TableCell>{row.email}</TableCell>
            <TableCell>{row.role}</TableCell>
            <TableCell align="right">{row.amount}</TableCell>
          </TableRow>
        ))}
      </tbody>
    </Table>
  ),
};

export const ClickableRows: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableCell header>Name</TableCell>
        <TableCell header>Email</TableCell>
        <TableCell header>Role</TableCell>
      </TableHeader>
      <tbody>
        {sampleData.map((row) => (
          <TableRow key={row.email} onClick={() => alert(`Clicked ${row.name}`)}>
            <TableCell>{row.name}</TableCell>
            <TableCell>{row.email}</TableCell>
            <TableCell>{row.role}</TableCell>
          </TableRow>
        ))}
      </tbody>
    </Table>
  ),
};

export const WithWidths: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableCell header width={200}>Name</TableCell>
        <TableCell header>Description</TableCell>
        <TableCell header width={100} align="center">Status</TableCell>
      </TableHeader>
      <tbody>
        <TableRow>
          <TableCell width={200}>Project Alpha</TableCell>
          <TableCell>A long description for the project.</TableCell>
          <TableCell width={100} align="center">Active</TableCell>
        </TableRow>
        <TableRow>
          <TableCell width={200}>Project Beta</TableCell>
          <TableCell>Another description here.</TableCell>
          <TableCell width={100} align="center">Paused</TableCell>
        </TableRow>
      </tbody>
    </Table>
  ),
};
