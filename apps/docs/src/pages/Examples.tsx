import { useState, useRef } from 'react';
import {
  Box, HStack, VStack, Text, Heading, Button, Input,
  Badge, Card, Avatar, Switch, Divider, Grid,
  useTheme, useDisclosure, useClickOutside,
} from 'jind-ui-kit';
import { CodeBlock } from '../components/CodeBlock';

function LoginCard() {
  const theme = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Box
      p={8}
      bg={theme.semantic.surface.card}
      radius="lg"
      shadow="card"
      style={{ width: 380, maxWidth: '100%' }}
    >
      <VStack gap={5}>
        <VStack gap={2}>
          <Heading level={3}>Welcome back</Heading>
          <Text variant="body" color={theme.semantic.text.secondary}>
            Sign in to your account to continue
          </Text>
        </VStack>
        <VStack gap={3}>
          <Input placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </VStack>
        <Button variant="primary" fullWidth>Sign In</Button>
        <Text variant="caption" color={theme.semantic.text.muted} style={{ textAlign: 'center' }}>
          Don't have an account? Sign up
        </Text>
      </VStack>
    </Box>
  );
}

function UserProfileCard() {
  const theme = useTheme();
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <Box
      p={6}
      bg={theme.semantic.surface.card}
      radius="lg"
      shadow="card"
      style={{ width: 340, maxWidth: '100%' }}
    >
      <VStack gap={5}>
        <HStack gap={4} style={{ alignItems: 'center' }}>
          <Avatar name="Sarah Chen" size="lg" />
          <VStack gap={1}>
            <Text variant="card-title">Sarah Chen</Text>
            <Text variant="caption" color={theme.semantic.text.secondary}>
              Product Designer
            </Text>
            <Badge tone="green">Pro Member</Badge>
          </VStack>
        </HStack>
        <Divider />
        <VStack gap={4}>
          <HStack gap={3} style={{ justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
            <Text variant="body">Push Notifications</Text>
            <Switch checked={notifications} onChange={setNotifications} />
          </HStack>
          <HStack gap={3} style={{ justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
            <Text variant="body">Dark Mode</Text>
            <Switch checked={darkMode} onChange={setDarkMode} />
          </HStack>
        </VStack>
        <Divider />
        <HStack gap={3}>
          <Button variant="secondary" size="sm">Edit Profile</Button>
          <Button variant="secondary" size="sm">Settings</Button>
        </HStack>
      </VStack>
    </Box>
  );
}

function PricingCard({ featured = false }: { featured?: boolean }) {
  const theme = useTheme();
  return (
    <Box
      p={6}
      bg={featured ? theme.semantic.fill.primary : theme.semantic.surface.card}
      radius="lg"
      shadow={featured ? 'menu' : 'card'}
      style={{
        width: 280,
        maxWidth: '100%',
        border: featured ? 'none' : `1px solid ${theme.semantic.border.default}`,
      }}
    >
      <VStack gap={4}>
        <VStack gap={1}>
          <Text variant="caption" color={featured ? 'rgba(255,255,255,0.7)' : theme.semantic.text.secondary}>
            {featured ? 'MOST POPULAR' : 'STARTER'}
          </Text>
          <HStack gap={1} style={{ alignItems: 'baseline' }}>
            <Text
              variant="heading"
              size={32}
              weight="bold"
              color={featured ? '#fff' : theme.semantic.text.primary}
            >
              {featured ? '$29' : '$9'}
            </Text>
            <Text
              variant="caption"
              color={featured ? 'rgba(255,255,255,0.7)' : theme.semantic.text.muted}
            >
              /month
            </Text>
          </HStack>
        </VStack>
        <Divider style={{ borderColor: featured ? 'rgba(255,255,255,0.2)' : undefined }} />
        <VStack gap={2}>
          {(featured
            ? ['Unlimited projects', '50GB storage', 'Priority support', 'Advanced analytics', 'Custom domain']
            : ['3 projects', '5GB storage', 'Email support']
          ).map((item) => (
            <Text
              key={item}
              variant="body"
              color={featured ? 'rgba(255,255,255,0.9)' : theme.semantic.text.secondary}
            >
              {item}
            </Text>
          ))}
        </VStack>
        <Button
          variant={featured ? 'secondary' : 'primary'}
          fullWidth
          style={featured ? { background: '#fff', color: theme.semantic.fill.primary } : undefined}
        >
          Get Started
        </Button>
      </VStack>
    </Box>
  );
}

function NotificationList() {
  const theme = useTheme();
  const items = [
    { avatar: 'Alex Kim', text: 'Commented on your design', time: '2m ago', unread: true },
    { avatar: 'Jordan Lee', text: 'Approved the pull request', time: '15m ago', unread: true },
    { avatar: 'Casey Park', text: 'Shared a new document', time: '1h ago', unread: false },
    { avatar: 'Morgan Chen', text: 'Invited you to a project', time: '3h ago', unread: false },
  ];

  return (
    <Box
      bg={theme.semantic.surface.card}
      radius="lg"
      shadow="card"
      style={{ width: 380, maxWidth: '100%', overflow: 'hidden' }}
    >
      <Box p={5} style={{ borderBottom: `1px solid ${theme.semantic.border.subtle}` }}>
        <HStack gap={3} style={{ justifyContent: 'space-between', alignItems: 'center' }}>
          <Heading level={4}>Notifications</Heading>
          <Badge tone="blue">2 new</Badge>
        </HStack>
      </Box>
      {items.map((item, i) => (
        <Box
          key={i}
          p={4}
          style={{
            borderBottom: i < items.length - 1 ? `1px solid ${theme.semantic.border.subtle}` : undefined,
            background: item.unread ? theme.semantic.surface.selected : undefined,
            cursor: 'pointer',
          }}
        >
          <HStack gap={3} style={{ alignItems: 'flex-start' }}>
            <Avatar name={item.avatar} size="sm" />
            <VStack gap={1} style={{ flex: 1 }}>
              <Text variant="body">
                <Text as="span" weight="medium">{item.avatar}</Text>{' '}
                {item.text}
              </Text>
              <Text variant="caption" color={theme.semantic.text.muted}>
                {item.time}
              </Text>
            </VStack>
            {item.unread && (
              <Box
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 999,
                  background: theme.semantic.fill.primary,
                  marginTop: 6,
                  flexShrink: 0,
                }}
              />
            )}
          </HStack>
        </Box>
      ))}
    </Box>
  );
}

function HookDemo() {
  const { isOpen, onToggle } = useDisclosure();
  const theme = useTheme();

  return (
    <Box
      p={6}
      bg={theme.semantic.surface.card}
      radius="lg"
      shadow="card"
      style={{ width: 380, maxWidth: '100%' }}
    >
      <VStack gap={4}>
        <Heading level={4}>useDisclosure Hook</Heading>
        <Text variant="body" color={theme.semantic.text.secondary}>
          Manages boolean open/close state for modals, menus, panels.
        </Text>
        <HStack gap={3} style={{ alignItems: 'center' }}>
          <Button variant="primary" size="sm" onClick={onToggle}>
            {isOpen ? 'Hide' : 'Show'} Content
          </Button>
          <Badge tone={isOpen ? 'green' : 'gray'}>
            {isOpen ? 'Open' : 'Closed'}
          </Badge>
        </HStack>
        {isOpen && (
          <Box p={4} bg={theme.semantic.surface.selected} radius="md">
            <Text variant="body" color={theme.semantic.text.primary}>
              This content is toggled by the useDisclosure hook.
              It manages isOpen, onOpen, onClose, and onToggle.
            </Text>
          </Box>
        )}
      </VStack>
    </Box>
  );
}

function StatsDashboard() {
  const theme = useTheme();
  const stats = [
    { label: 'Revenue', value: '$48,290', change: '+12.5%', up: true },
    { label: 'Users', value: '2,847', change: '+8.2%', up: true },
    { label: 'Bounce Rate', value: '24.3%', change: '-3.1%', up: false },
  ];

  return (
    <HStack gap={4} style={{ flexWrap: 'wrap' }}>
      {stats.map((stat) => (
        <Box
          key={stat.label}
          p={5}
          bg={theme.semantic.surface.card}
          radius="lg"
          shadow="card"
          style={{ flex: '1 1 160px', minWidth: 160 }}
        >
          <VStack gap={2}>
            <Text variant="caption" color={theme.semantic.text.secondary}>
              {stat.label}
            </Text>
            <Text variant="heading" weight="bold">{stat.value}</Text>
            <Badge tone={stat.up ? 'green' : 'red'}>{stat.change}</Badge>
          </VStack>
        </Box>
      ))}
    </HStack>
  );
}

function HeaderMenuDropdown() {
  const theme = useTheme();
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  useClickOutside(navRef, () => setActiveMenu(null), !!activeMenu);

  const menus: Record<string, { label: string; href: string }[]> = {
    Products: [
      { label: 'Analytics', href: '#' },
      { label: 'Automation', href: '#' },
      { label: 'Integrations', href: '#' },
      { label: 'API', href: '#' },
    ],
    Solutions: [
      { label: 'For Startups', href: '#' },
      { label: 'For Enterprise', href: '#' },
      { label: 'For Agencies', href: '#' },
    ],
    Resources: [
      { label: 'Documentation', href: '#' },
      { label: 'Blog', href: '#' },
      { label: 'Community', href: '#' },
      { label: 'Changelog', href: '#' },
    ],
  };

  return (
    <Box
      bg={theme.semantic.surface.card}
      shadow="card"
      style={{ borderRadius: theme.radius.md, overflow: 'visible', width: '100%' }}
    >
      <div ref={navRef}>
        <HStack gap={0} style={{ alignItems: 'center', padding: '0 20px', height: 56 }}>
          <Text variant="card-title" weight="bold" style={{ marginRight: 32 }}>
            Acme
          </Text>
          {Object.keys(menus).map((key) => (
            <div key={key} style={{ position: 'relative' }}>
              <button
                onClick={() => setActiveMenu(activeMenu === key ? null : key)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                  padding: '8px 16px',
                  border: 'none',
                  background: activeMenu === key ? theme.semantic.surface.hover : 'transparent',
                  borderRadius: theme.radius.sm,
                  cursor: 'pointer',
                  fontFamily: theme.fontFamily.sans,
                  fontSize: 14,
                  fontWeight: theme.fontWeight.medium,
                  color: theme.semantic.text.primary,
                }}
              >
                {key}
                <span style={{ fontSize: 10, color: theme.semantic.text.muted }}>&#x25BC;</span>
              </button>
              {activeMenu === key && (
                <div
                  style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    marginTop: 4,
                    minWidth: 180,
                    background: theme.semantic.surface.card,
                    borderRadius: theme.radius.md,
                    boxShadow: theme.shadow.menu,
                    border: `1px solid ${theme.semantic.border.subtle}`,
                    padding: '4px 0',
                    zIndex: 100,
                  }}
                >
                  {menus[key].map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      onClick={(e) => { e.preventDefault(); setActiveMenu(null); }}
                      style={{
                        display: 'block',
                        padding: '10px 16px',
                        fontSize: 14,
                        fontFamily: theme.fontFamily.sans,
                        color: theme.semantic.text.primary,
                        textDecoration: 'none',
                        cursor: 'pointer',
                      }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = theme.semantic.surface.hover; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div style={{ flex: 1 }} />
          <Button variant="primary" size="sm">Get Started</Button>
        </HStack>
      </div>
    </Box>
  );
}

function HeaderMenuMega() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  useClickOutside(navRef, () => setOpen(false), open);

  const sections = [
    {
      title: 'Products',
      items: [
        { icon: '✨', label: 'Analytics', desc: 'Track user behavior and conversions' },
        { icon: '⚡', label: 'Automation', desc: 'Build workflows without code' },
        { icon: '🔗', label: 'Integrations', desc: 'Connect with 200+ tools' },
        { icon: '🛡️', label: 'Security', desc: 'Enterprise-grade protection' },
      ],
    },
    {
      title: 'Solutions',
      items: [
        { icon: '🚀', label: 'Startups', desc: 'Move fast with built-in best practices' },
        { icon: '🏢', label: 'Enterprise', desc: 'Scale with confidence and compliance' },
        { icon: '🎨', label: 'Agencies', desc: 'Manage multiple client accounts' },
      ],
    },
    {
      title: 'Resources',
      items: [
        { icon: '📖', label: 'Docs', desc: 'Guides, references, and tutorials' },
        { icon: '💬', label: 'Community', desc: 'Join 10k+ developers' },
        { icon: '🎓', label: 'Academy', desc: 'Free courses and certifications' },
      ],
    },
  ];

  return (
    <Box
      bg={theme.semantic.surface.card}
      shadow="card"
      style={{ borderRadius: theme.radius.md, overflow: 'visible', width: '100%' }}
    >
      <div ref={navRef}>
        <HStack gap={0} style={{ alignItems: 'center', padding: '0 20px', height: 56 }}>
          <Text variant="card-title" weight="bold" style={{ marginRight: 32 }}>
            Acme
          </Text>
          <button
            onClick={() => setOpen(!open)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 4,
              padding: '8px 16px',
              border: 'none',
              background: open ? theme.semantic.surface.hover : 'transparent',
              borderRadius: theme.radius.sm,
              cursor: 'pointer',
              fontFamily: theme.fontFamily.sans,
              fontSize: 14,
              fontWeight: theme.fontWeight.medium,
              color: theme.semantic.text.primary,
            }}
          >
            Products
            <span style={{ fontSize: 10, color: theme.semantic.text.muted }}>&#x25BC;</span>
          </button>
          {['Pricing', 'Blog', 'About'].map((item) => (
            <button
              key={item}
              style={{
                padding: '8px 16px',
                border: 'none',
                background: 'transparent',
                cursor: 'pointer',
                fontFamily: theme.fontFamily.sans,
                fontSize: 14,
                fontWeight: theme.fontWeight.medium,
                color: theme.semantic.text.primary,
              }}
            >
              {item}
            </button>
          ))}
          <div style={{ flex: 1 }} />
          <Button variant="secondary" size="sm" style={{ marginRight: 8 }}>Log in</Button>
          <Button variant="primary" size="sm">Sign up</Button>
        </HStack>

        {open && (
          <div
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              marginTop: 0,
              background: theme.semantic.surface.card,
              borderRadius: `0 0 ${theme.radius.md}px ${theme.radius.md}px`,
              boxShadow: theme.shadow.menu,
              borderTop: `1px solid ${theme.semantic.border.subtle}`,
              padding: '24px 32px',
              zIndex: 100,
            }}
          >
            <Grid columns={3} gap={8}>
              {sections.map((section) => (
                <VStack key={section.title} gap={3}>
                  <Text variant="caption" color={theme.semantic.text.muted} style={{ textTransform: 'uppercase', letterSpacing: 1 }}>
                    {section.title}
                  </Text>
                  {section.items.map((item) => (
                    <HStack
                      key={item.label}
                      gap={3}
                      style={{
                        padding: '10px 12px',
                        borderRadius: theme.radius.sm,
                        cursor: 'pointer',
                      }}
                      onClick={() => setOpen(false)}
                      onMouseEnter={(e: React.MouseEvent) => {
                        (e.currentTarget as HTMLElement).style.background = theme.semantic.surface.hover;
                      }}
                      onMouseLeave={(e: React.MouseEvent) => {
                        (e.currentTarget as HTMLElement).style.background = 'transparent';
                      }}
                    >
                      <span style={{ fontSize: 20 }}>{item.icon}</span>
                      <VStack gap={0}>
                        <Text variant="label" weight="medium">{item.label}</Text>
                        <Text variant="caption" color={theme.semantic.text.muted}>{item.desc}</Text>
                      </VStack>
                    </HStack>
                  ))}
                </VStack>
              ))}
            </Grid>
          </div>
        )}
      </div>
    </Box>
  );
}

export function Examples() {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Examples</h1>
        <p className="page-description">
          Real-world UI patterns built entirely with Jind UI Kit components.
          Copy and adapt these for your own projects.
        </p>
      </div>

      <div className="section">
        <h2 className="section-title">Login Form</h2>
        <p className="section-text">
          A complete sign-in card using Input, Button, Text, Heading, and layout primitives.
        </p>
        <div className="preview-card">
          <div className="preview-area" style={{ background: '#ffffff', padding: 40 }}>
            <LoginCard />
          </div>
          <CodeBlock code={`function LoginCard() {
  const theme = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Box p={8} bg={theme.semantic.surface.card} radius="lg" shadow="card">
      <VStack gap={5}>
        <Heading level={3}>Welcome back</Heading>
        <Text variant="body" color={theme.semantic.text.secondary}>
          Sign in to your account
        </Text>
        <Input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <Input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <Button variant="primary" fullWidth>Sign In</Button>
      </VStack>
    </Box>
  );
}`} />
        </div>
      </div>

      <div className="section">
        <h2 className="section-title">User Profile</h2>
        <p className="section-text">
          Profile card with Avatar, Badge, Switch toggles, and action buttons.
        </p>
        <div className="preview-card">
          <div className="preview-area" style={{ background: '#ffffff', padding: 40 }}>
            <UserProfileCard />
          </div>
          <CodeBlock code={`function UserProfileCard() {
  const theme = useTheme();
  const [notifications, setNotifications] = useState(true);

  return (
    <Box p={6} bg={theme.semantic.surface.card} radius="lg" shadow="card">
      <HStack gap={4} style={{ alignItems: 'center' }}>
        <Avatar name="Sarah Chen" size="lg" />
        <VStack gap={1}>
          <Text variant="card-title">Sarah Chen</Text>
          <Badge tone="green">Pro Member</Badge>
        </VStack>
      </HStack>
      <Divider />
      <HStack style={{ justifyContent: 'space-between' }}>
        <Text>Push Notifications</Text>
        <Switch checked={notifications} onChange={setNotifications} />
      </HStack>
    </Box>
  );
}`} />
        </div>
      </div>

      <div className="section">
        <h2 className="section-title">Stats Dashboard</h2>
        <p className="section-text">
          Metric cards using Box, Text, Badge, and HStack for a dashboard layout.
        </p>
        <div className="preview-card">
          <div className="preview-area" style={{ background: '#ffffff', padding: 32 }}>
            <StatsDashboard />
          </div>
          <CodeBlock code={`function StatsDashboard() {
  const theme = useTheme();
  const stats = [
    { label: 'Revenue', value: '$48,290', change: '+12.5%', up: true },
    { label: 'Users', value: '2,847', change: '+8.2%', up: true },
    { label: 'Bounce Rate', value: '24.3%', change: '-3.1%', up: false },
  ];

  return (
    <HStack gap={4} style={{ flexWrap: 'wrap' }}>
      {stats.map(stat => (
        <Box key={stat.label} p={5} radius="lg" shadow="card">
          <Text variant="caption">{stat.label}</Text>
          <Text variant="heading" weight="bold">{stat.value}</Text>
          <Badge tone={stat.up ? 'green' : 'red'}>{stat.change}</Badge>
        </Box>
      ))}
    </HStack>
  );
}`} />
        </div>
      </div>

      <div className="section">
        <h2 className="section-title">Pricing Cards</h2>
        <p className="section-text">
          Side-by-side pricing comparison with featured highlight.
        </p>
        <div className="preview-card">
          <div className="preview-area" style={{ background: '#ffffff', padding: 40, gap: 20 }}>
            <PricingCard />
            <PricingCard featured />
          </div>
        </div>
      </div>

      <div className="section">
        <h2 className="section-title">Notification List</h2>
        <p className="section-text">
          Activity feed with Avatar, Badge, and unread indicators.
        </p>
        <div className="preview-card">
          <div className="preview-area" style={{ background: '#ffffff', padding: 40 }}>
            <NotificationList />
          </div>
        </div>
      </div>

      <div className="section">
        <h2 className="section-title">Header Menu with Dropdowns</h2>
        <p className="section-text">
          Horizontal navigation bar with click-activated dropdown menus using useClickOutside for dismiss.
        </p>
        <div className="preview-card">
          <div className="preview-area" style={{ padding: 24, overflow: 'visible', position: 'relative', minHeight: 200 }}>
            <HeaderMenuDropdown />
          </div>
          <CodeBlock code={`function HeaderMenuDropdown() {
  const theme = useTheme();
  const [activeMenu, setActiveMenu] = useState(null);
  const navRef = useRef(null);
  useClickOutside(navRef, () => setActiveMenu(null), !!activeMenu);

  return (
    <Box bg={theme.semantic.surface.card} shadow="card">
      <HStack style={{ height: 56, padding: '0 20px' }}>
        <Text variant="card-title" weight="bold">Acme</Text>
        {menus.map(menu => (
          <div style={{ position: 'relative' }}>
            <button onClick={() => setActiveMenu(menu.key)}>
              {menu.label} ▼
            </button>
            {activeMenu === menu.key && (
              <div style={{ position: 'absolute', top: '100%' }}>
                {menu.items.map(item => (
                  <a href={item.href}>{item.label}</a>
                ))}
              </div>
            )}
          </div>
        ))}
        <Button variant="primary" size="sm">Get Started</Button>
      </HStack>
    </Box>
  );
}`} />
        </div>
      </div>

      <div className="section">
        <h2 className="section-title">Mega Menu</h2>
        <p className="section-text">
          Full-width dropdown panel with categorized links, icons, and descriptions — common on marketing sites.
        </p>
        <div className="preview-card">
          <div className="preview-area" style={{ padding: 24, overflow: 'visible', position: 'relative', minHeight: 200 }}>
            <HeaderMenuMega />
          </div>
          <CodeBlock code={`function MegaMenu() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <Box bg={theme.semantic.surface.card} shadow="card">
      <HStack style={{ height: 56 }}>
        <button onClick={() => setOpen(!open)}>Products ▼</button>
        {/* other nav items */}
      </HStack>
      {open && (
        <div style={{ position: 'absolute', left: 0, right: 0 }}>
          <Grid columns={3} gap={8}>
            {sections.map(section => (
              <VStack>
                <Text variant="caption">{section.title}</Text>
                {section.items.map(item => (
                  <HStack gap={3}>
                    <span>{item.icon}</span>
                    <VStack>
                      <Text variant="label">{item.label}</Text>
                      <Text variant="caption">{item.desc}</Text>
                    </VStack>
                  </HStack>
                ))}
              </VStack>
            ))}
          </Grid>
        </div>
      )}
    </Box>
  );
}`} />
        </div>
      </div>

      <div className="section">
        <h2 className="section-title">Hook Usage: useDisclosure</h2>
        <p className="section-text">
          Interactive demo showing the useDisclosure hook managing toggle state.
        </p>
        <div className="preview-card">
          <div className="preview-area" style={{ background: '#ffffff', padding: 40 }}>
            <HookDemo />
          </div>
          <CodeBlock code={`import { useDisclosure } from 'jind-ui-kit';

function TogglePanel() {
  const { isOpen, onToggle, onOpen, onClose } = useDisclosure();

  return (
    <VStack gap={4}>
      <Button onClick={onToggle}>
        {isOpen ? 'Hide' : 'Show'} Content
      </Button>
      {isOpen && (
        <Box p={4} bg={theme.semantic.surface.selected} radius="md">
          <Text>Toggled content managed by useDisclosure</Text>
        </Box>
      )}
    </VStack>
  );
}`} />
        </div>
      </div>
    </div>
  );
}
