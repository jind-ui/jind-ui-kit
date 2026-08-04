import { MegaMenu, Grid, VStack, Text, HStack, Button } from 'jind-ui-kit';
import { Preview } from '../components/Preview';
import { PropsTable } from '../components/PropsTable';
import { ViewMarkdown } from '../components/ViewMarkdown';

const megaMenuProps = [
  { name: 'children', type: 'ReactNode', description: 'MegaMenu.Trigger and MegaMenu.Panel' },
  { name: 'panelWidth', type: "'trigger' | 'container' | 'full'", description: 'Width mode for the dropdown panel (default: container)' },
  { name: 'open', type: 'boolean', description: 'Controlled open state' },
  { name: 'defaultOpen', type: 'boolean', description: 'Initial open state (uncontrolled)' },
  { name: 'onOpenChange', type: '(open: boolean) => void', description: 'Called when open state changes' },
  { name: 'closeOnClickOutside', type: 'boolean', description: 'Close panel on outside click (default: true)' },
  { name: 'closeDelay', type: 'number', description: 'Delay in ms before closing on mouse leave (default: 200)' },
  { name: 'style', type: 'CSSProperties', description: 'Custom inline styles for root' },
];

const triggerProps = [
  { name: 'children', type: 'ReactNode', description: 'Trigger button content (text, icon, etc.)' },
  { name: 'style', type: 'CSSProperties', description: 'Custom inline styles for trigger button' },
];

const panelProps = [
  { name: 'children', type: 'ReactNode', description: 'Any content — use Grid, VStack, your own components' },
  { name: 'style', type: 'CSSProperties', description: 'Custom inline styles for panel' },
];

const groupProps = [
  { name: 'title', type: 'string', description: 'Optional section heading' },
  { name: 'children', type: 'ReactNode', description: 'Group content' },
  { name: 'style', type: 'CSSProperties', description: 'Custom inline styles' },
];

const itemProps = [
  { name: 'children', type: 'ReactNode', description: 'Custom children (overrides icon/label/description)' },
  { name: 'icon', type: 'ReactNode', description: 'Leading icon' },
  { name: 'label', type: 'string', description: 'Item title' },
  { name: 'description', type: 'string', description: 'Item subtitle' },
  { name: 'href', type: 'string', description: 'Renders as anchor link' },
  { name: 'onClick', type: '() => void', description: 'Click handler' },
  { name: 'disabled', type: 'boolean', description: 'Disabled state' },
  { name: 'style', type: 'CSSProperties', description: 'Custom inline styles' },
];

function ContainerDemo() {
  return (
    <div style={{ width: '100%' }}>
      <MegaMenu panelWidth="container">
        <HStack gap={0} style={{ alignItems: 'center', padding: '0 20px', height: 56 }}>
          <Text variant="card-title" weight="bold" style={{ marginRight: 32 }}>
            Acme
          </Text>
          <MegaMenu.Trigger>
            Products <span style={{ fontSize: 10 }}>&#x25BC;</span>
          </MegaMenu.Trigger>
        </HStack>
        <MegaMenu.Panel>
          <Grid columns={3} gap={8}>
            <MegaMenu.Group title="Products">
              <VStack gap={0}>
                <MegaMenu.Item icon="✨" label="Analytics" description="Track user behavior and conversions" />
                <MegaMenu.Item icon="⚡" label="Automation" description="Build workflows without code" />
                <MegaMenu.Item icon="🔗" label="Integrations" description="Connect with 200+ tools" />
                <MegaMenu.Item icon="🛡️" label="Security" description="Enterprise-grade protection" />
              </VStack>
            </MegaMenu.Group>
            <MegaMenu.Group title="Solutions">
              <VStack gap={0}>
                <MegaMenu.Item icon="🚀" label="Startups" description="Move fast with built-in best practices" />
                <MegaMenu.Item icon="🏢" label="Enterprise" description="Scale with confidence" />
                <MegaMenu.Item icon="🎨" label="Agencies" description="Manage multiple accounts" />
              </VStack>
            </MegaMenu.Group>
            <MegaMenu.Group title="Resources">
              <VStack gap={0}>
                <MegaMenu.Item icon="📖" label="Docs" description="Guides and tutorials" />
                <MegaMenu.Item icon="💬" label="Community" description="Join 10k+ developers" />
                <MegaMenu.Item icon="🎓" label="Academy" description="Free courses" />
              </VStack>
            </MegaMenu.Group>
          </Grid>
        </MegaMenu.Panel>
      </MegaMenu>
    </div>
  );
}

function FullWidthDemo() {
  return (
    <div style={{ width: '100%' }}>
      <MegaMenu panelWidth="full">
        <HStack gap={0} style={{ alignItems: 'center', padding: '0 20px', height: 56 }}>
          <Text variant="card-title" weight="bold" style={{ marginRight: 32 }}>
            Store
          </Text>
          <MegaMenu.Trigger>
            Categories <span style={{ fontSize: 10 }}>&#x25BC;</span>
          </MegaMenu.Trigger>
        </HStack>
        <MegaMenu.Panel>
          <Grid columns={4} gap={12}>
            <MegaMenu.Group title="Electronics">
              <VStack gap={0}>
                <MegaMenu.Item label="Smartphones" description="Latest models" />
                <MegaMenu.Item label="Laptops" description="Work & gaming" />
                <MegaMenu.Item label="Tablets" description="Portable power" />
              </VStack>
            </MegaMenu.Group>
            <MegaMenu.Group title="Fashion">
              <VStack gap={0}>
                <MegaMenu.Item label="Men" description="Shirts, pants, shoes" />
                <MegaMenu.Item label="Women" description="Dresses, tops, accessories" />
                <MegaMenu.Item label="Kids" description="Cute & durable" />
              </VStack>
            </MegaMenu.Group>
            <MegaMenu.Group title="Home">
              <VStack gap={0}>
                <MegaMenu.Item label="Furniture" description="Modern & classic" />
                <MegaMenu.Item label="Kitchen" description="Cookware & appliances" />
                <MegaMenu.Item label="Decor" description="Art, lighting, rugs" />
              </VStack>
            </MegaMenu.Group>
            <MegaMenu.Group title="Featured">
              <VStack gap={4}>
                <Text variant="caption" color="var(--muted)">New arrivals this week</Text>
                <Button variant="primary" size="sm">Shop Now</Button>
              </VStack>
            </MegaMenu.Group>
          </Grid>
        </MegaMenu.Panel>
      </MegaMenu>
    </div>
  );
}

function TriggerWidthDemo() {
  return (
    <div style={{ width: '100%' }}>
      <MegaMenu panelWidth="trigger">
        <HStack gap={0} style={{ alignItems: 'center', padding: '0 20px', height: 56 }}>
          <Text variant="card-title" weight="bold" style={{ marginRight: 32 }}>
            App
          </Text>
          <MegaMenu.Trigger>
            Help <span style={{ fontSize: 10 }}>&#x25BC;</span>
          </MegaMenu.Trigger>
        </HStack>
        <MegaMenu.Panel style={{ minWidth: 240 }}>
          <VStack gap={0}>
            <MegaMenu.Item icon="📖" label="Documentation" />
            <MegaMenu.Item icon="💬" label="Support Chat" />
            <MegaMenu.Item icon="🐛" label="Report a Bug" />
            <MegaMenu.Item icon="📧" label="Contact Us" />
          </VStack>
        </MegaMenu.Panel>
      </MegaMenu>
    </div>
  );
}

function CustomChildrenDemo() {
  return (
    <div style={{ width: '100%' }}>
      <MegaMenu panelWidth="container">
        <HStack gap={0} style={{ alignItems: 'center', padding: '0 20px', height: 56 }}>
          <Text variant="card-title" weight="bold" style={{ marginRight: 32 }}>
            Platform
          </Text>
          <MegaMenu.Trigger>
            Explore <span style={{ fontSize: 10 }}>&#x25BC;</span>
          </MegaMenu.Trigger>
        </HStack>
        <MegaMenu.Panel>
          <HStack gap={16} style={{ alignItems: 'stretch' }}>
            <VStack gap={4} style={{ flex: 1 }}>
              <Text variant="label" weight="bold">Getting Started</Text>
              <Text variant="caption">Build your first app in under 5 minutes with our quickstart guide.</Text>
              <Button variant="primary" size="sm" style={{ alignSelf: 'flex-start', marginTop: 8 }}>
                Start Tutorial
              </Button>
            </VStack>
            <div style={{ width: 1, background: 'var(--border, #e0e0e0)' }} />
            <VStack gap={0} style={{ flex: 1 }}>
              <MegaMenu.Item icon="🔧" label="API Reference" description="Full REST & GraphQL docs" />
              <MegaMenu.Item icon="📦" label="SDKs" description="Python, Node, Go, Ruby" />
              <MegaMenu.Item icon="🧪" label="Playground" description="Try the API in your browser" />
            </VStack>
          </HStack>
        </MegaMenu.Panel>
      </MegaMenu>
    </div>
  );
}

export function ComponentMegaMenu() {
  return (
    <div className="page-container">
      <div className="page-header">
        <ViewMarkdown slug="mega-menu" />
        <h1 className="page-title">MegaMenu</h1>
        <p className="page-description">
          Full-featured mega menu with configurable width modes and children-based content.
          Supports any layout inside the panel — use Grid, HStack, custom components, anything.
        </p>
      </div>

      <div className="section">
        <h2 className="section-title">Container Width (default)</h2>
        <p className="section-description">Panel matches the width of the MegaMenu root container.</p>
        <Preview
          align="column"
          code={`<MegaMenu panelWidth="container">
  <MegaMenu.Trigger>Products ▼</MegaMenu.Trigger>
  <MegaMenu.Panel>
    <Grid columns={3} gap={8}>
      <MegaMenu.Group title="Products">
        <MegaMenu.Item icon="✨" label="Analytics" description="..." />
      </MegaMenu.Group>
    </Grid>
  </MegaMenu.Panel>
</MegaMenu>`}
        >
          <ContainerDemo />
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">Full Width</h2>
        <p className="section-description">Panel spans the full viewport width — great for e-commerce category menus.</p>
        <Preview
          align="column"
          code={`<MegaMenu panelWidth="full">
  <MegaMenu.Trigger>Categories ▼</MegaMenu.Trigger>
  <MegaMenu.Panel>
    <Grid columns={4} gap={12}>...</Grid>
  </MegaMenu.Panel>
</MegaMenu>`}
        >
          <FullWidthDemo />
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">Trigger Width</h2>
        <p className="section-description">Panel matches the trigger button width — useful for compact menus.</p>
        <Preview
          align="column"
          code={`<MegaMenu panelWidth="trigger">
  <MegaMenu.Trigger>Help ▼</MegaMenu.Trigger>
  <MegaMenu.Panel>
    <MegaMenu.Item icon="📖" label="Documentation" />
  </MegaMenu.Panel>
</MegaMenu>`}
        >
          <TriggerWidthDemo />
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">Custom Children</h2>
        <p className="section-description">
          Put anything inside the panel — buttons, dividers, promotional content.
          MegaMenu.Panel accepts any ReactNode children.
        </p>
        <Preview
          align="column"
          code={`<MegaMenu panelWidth="container">
  <MegaMenu.Trigger>Explore ▼</MegaMenu.Trigger>
  <MegaMenu.Panel>
    <HStack gap={16}>
      <VStack gap={4}>
        <Text>Getting Started</Text>
        <Button>Start Tutorial</Button>
      </VStack>
      <div style={{ width: 1, background: '...' }} />
      <VStack gap={0}>
        <MegaMenu.Item icon="🔧" label="API Reference" />
      </VStack>
    </HStack>
  </MegaMenu.Panel>
</MegaMenu>`}
        >
          <CustomChildrenDemo />
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">MegaMenu Props</h2>
        <PropsTable props={megaMenuProps} />
      </div>

      <div className="section">
        <h2 className="section-title">MegaMenu.Trigger Props</h2>
        <PropsTable props={triggerProps} />
      </div>

      <div className="section">
        <h2 className="section-title">MegaMenu.Panel Props</h2>
        <PropsTable props={panelProps} />
      </div>

      <div className="section">
        <h2 className="section-title">MegaMenu.Group Props</h2>
        <PropsTable props={groupProps} />
      </div>

      <div className="section">
        <h2 className="section-title">MegaMenu.Item Props</h2>
        <PropsTable props={itemProps} />
      </div>
    </div>
  );
}
