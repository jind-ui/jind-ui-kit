import { Tabs, TabList, Tab, TabPanel } from 'jind-ui-kit';
import { Preview } from '../components/Preview';
import { PropsTable } from '../components/PropsTable';
import { ViewMarkdown } from '../components/ViewMarkdown';

const tabsProps = [
  { name: 'value', type: 'string', description: 'Controlled active tab value' },
  { name: 'defaultValue', type: 'string', default: "''", description: 'Initial active tab value for uncontrolled usage' },
  { name: 'onChange', type: '(value: string) => void', description: 'Callback when the active tab changes' },
  { name: 'children', type: 'ReactNode', description: 'TabList and TabPanel components' },
];

const tabListProps = [
  { name: 'children', type: 'ReactNode', description: 'Tab components' },
  { name: 'style', type: 'CSSProperties', description: 'Custom inline styles' },
];

const tabProps = [
  { name: 'value', type: 'string', description: 'Unique value that identifies this tab (required)' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the tab' },
  { name: 'children', type: 'ReactNode', description: 'Tab label content' },
];

const tabPanelProps = [
  { name: 'value', type: 'string', description: 'Value matching the corresponding Tab (required)' },
  { name: 'children', type: 'ReactNode', description: 'Panel content shown when this tab is active' },
];

export function ComponentTabs() {
  return (
    <div className="page-container">
      <div className="page-header">
        <ViewMarkdown slug="tabs" />
        <h1 className="page-title">Tabs</h1>
        <p className="page-description">
          Tabbed content navigation. Composed from Tabs, TabList, Tab, and
          TabPanel sub-components. Supports controlled and uncontrolled modes.
        </p>
      </div>

      <div className="section">
        <h2 className="section-title">Basic Tabs</h2>
        <Preview
          align="column"
          code={`<Tabs defaultValue="overview">
  <TabList>
    <Tab value="overview">Overview</Tab>
    <Tab value="features">Features</Tab>
    <Tab value="pricing">Pricing</Tab>
  </TabList>
  <TabPanel value="overview">
    <p>Welcome to the overview section.</p>
  </TabPanel>
  <TabPanel value="features">
    <p>Explore our features here.</p>
  </TabPanel>
  <TabPanel value="pricing">
    <p>View pricing plans.</p>
  </TabPanel>
</Tabs>`}
        >
          <Tabs defaultValue="overview">
            <TabList>
              <Tab value="overview">Overview</Tab>
              <Tab value="features">Features</Tab>
              <Tab value="pricing">Pricing</Tab>
            </TabList>
            <TabPanel value="overview">
              <p style={{ margin: 0 }}>Welcome to the overview section.</p>
            </TabPanel>
            <TabPanel value="features">
              <p style={{ margin: 0 }}>Explore our features here.</p>
            </TabPanel>
            <TabPanel value="pricing">
              <p style={{ margin: 0 }}>View pricing plans.</p>
            </TabPanel>
          </Tabs>
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">With Disabled Tab</h2>
        <Preview
          align="column"
          code={`<Tabs defaultValue="active">
  <TabList>
    <Tab value="active">Active</Tab>
    <Tab value="disabled" disabled>Disabled</Tab>
    <Tab value="other">Other</Tab>
  </TabList>
  <TabPanel value="active">
    <p>This tab is active.</p>
  </TabPanel>
  <TabPanel value="other">
    <p>Other content.</p>
  </TabPanel>
</Tabs>`}
        >
          <Tabs defaultValue="active">
            <TabList>
              <Tab value="active">Active</Tab>
              <Tab value="disabled" disabled>Disabled</Tab>
              <Tab value="other">Other</Tab>
            </TabList>
            <TabPanel value="active">
              <p style={{ margin: 0 }}>This tab is active.</p>
            </TabPanel>
            <TabPanel value="other">
              <p style={{ margin: 0 }}>Other content.</p>
            </TabPanel>
          </Tabs>
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">Tabs Props</h2>
        <PropsTable props={tabsProps} />
      </div>

      <div className="section">
        <h2 className="section-title">TabList Props</h2>
        <PropsTable props={tabListProps} />
      </div>

      <div className="section">
        <h2 className="section-title">Tab Props</h2>
        <PropsTable props={tabProps} />
      </div>

      <div className="section">
        <h2 className="section-title">TabPanel Props</h2>
        <PropsTable props={tabPanelProps} />
      </div>
    </div>
  );
}
