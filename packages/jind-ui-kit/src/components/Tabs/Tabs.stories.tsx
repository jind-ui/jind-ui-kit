import type { Meta, StoryObj } from '@storybook/react';
import { Tabs, TabList, Tab, TabPanel } from './Tabs';

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="overview">
      <TabList>
        <Tab value="overview">Overview</Tab>
        <Tab value="activity">Activity</Tab>
        <Tab value="settings">Settings</Tab>
      </TabList>
      <TabPanel value="overview">
        <p>Overview content goes here.</p>
      </TabPanel>
      <TabPanel value="activity">
        <p>Activity feed content.</p>
      </TabPanel>
      <TabPanel value="settings">
        <p>Settings panel content.</p>
      </TabPanel>
    </Tabs>
  ),
};

export const WithDisabled: Story = {
  render: () => (
    <Tabs defaultValue="tab1">
      <TabList>
        <Tab value="tab1">Active</Tab>
        <Tab value="tab2">Available</Tab>
        <Tab value="tab3" disabled>Disabled</Tab>
      </TabList>
      <TabPanel value="tab1">First tab panel.</TabPanel>
      <TabPanel value="tab2">Second tab panel.</TabPanel>
      <TabPanel value="tab3">Third tab panel.</TabPanel>
    </Tabs>
  ),
};

export const ManyTabs: Story = {
  render: () => (
    <Tabs defaultValue="1">
      <TabList>
        {Array.from({ length: 6 }, (_, i) => (
          <Tab key={i} value={String(i + 1)}>Tab {i + 1}</Tab>
        ))}
      </TabList>
      {Array.from({ length: 6 }, (_, i) => (
        <TabPanel key={i} value={String(i + 1)}>Content for tab {i + 1}.</TabPanel>
      ))}
    </Tabs>
  ),
};
