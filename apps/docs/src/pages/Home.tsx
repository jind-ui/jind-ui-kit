import { Link } from 'react-router-dom';

const features = [
  {
    icon: '🧩',
    bg: '#eff5ff',
    title: 'Polymorphic',
    desc: 'Every component accepts an `as` prop — render a Button as an anchor, a Box as a section.',
  },
  {
    icon: '🎨',
    bg: '#efebff',
    title: 'Themeable',
    desc: 'Full design token system with JindProvider. Swap themes at runtime with zero config.',
  },
  {
    icon: '📱',
    bg: '#e7f6ea',
    title: 'Responsive',
    desc: 'Built for mobile, tablet, and desktop. Breakpoint-aware props on every layout primitive.',
  },
  {
    icon: '🔒',
    bg: '#fdecea',
    title: 'Type-safe',
    desc: 'Full TypeScript coverage with exported types for every component, hook, and token.',
  },
  {
    icon: '⚡',
    bg: '#fff8ec',
    title: 'Lightweight',
    desc: 'Inline styles, zero CSS-in-JS runtime, tree-shakeable. Only ship what you use.',
  },
  {
    icon: '🧪',
    bg: '#dff6f3',
    title: 'Tested',
    desc: '325+ unit tests. Every component, hook, and primitive verified with Vitest.',
  },
];

const componentGroups = [
  {
    title: 'Layout',
    items: [
      { name: 'Box', path: '/components/box' },
      { name: 'Stack', path: '/components/stack' },
      { name: 'Grid', path: '/components/grid' },
      { name: 'Center', path: '/components/center' },
      { name: 'Container', path: '/components/container' },
    ],
  },
  {
    title: 'Forms',
    items: [
      { name: 'Input', path: '/components/input' },
      { name: 'Select', path: '/components/select' },
      { name: 'Checkbox', path: '/components/checkbox' },
      { name: 'Switch', path: '/components/switch' },
      { name: 'Slider', path: '/components/slider' },
    ],
  },
  {
    title: 'Feedback',
    items: [
      { name: 'Modal', path: '/components/modal' },
      { name: 'Toast', path: '/components/toast' },
      { name: 'Tooltip', path: '/components/tooltip' },
      { name: 'Drawer', path: '/components/drawer' },
      { name: 'Popover', path: '/components/popover' },
    ],
  },
  {
    title: 'Display',
    items: [
      { name: 'Badge', path: '/components/badge' },
      { name: 'Card', path: '/components/card' },
      { name: 'Avatar', path: '/components/avatar' },
      { name: 'Table', path: '/components/table' },
      { name: 'Skeleton', path: '/components/skeleton' },
    ],
  },
];

export function Home() {
  return (
    <div className="page-container">
      <div className="hero">
        <div className="hero-badge">React 19 &middot; TypeScript &middot; Cross-platform</div>
        <h1 className="hero-title">
          Build faster with<br /><span>Jind UI Kit</span>
        </h1>
        <p className="hero-subtitle">
          A modern, polymorphic component library with design tokens,
          theme support, and full TypeScript coverage. Built for React 19.
        </p>
        <div className="hero-actions">
          <Link to="/getting-started" className="hero-btn hero-btn-primary">
            Get Started
          </Link>
          <Link to="/components/button" className="hero-btn hero-btn-secondary">
            Browse Components
          </Link>
        </div>
      </div>

      <div className="features-grid">
        {features.map((f) => (
          <div className="feature-card" key={f.title}>
            <div className="feature-icon" style={{ background: f.bg }}>
              {f.icon}
            </div>
            <div className="feature-card-title">{f.title}</div>
            <div className="feature-card-desc">{f.desc}</div>
          </div>
        ))}
      </div>

      <div className="section">
        <h2 className="section-title">Components</h2>
        <p className="section-text">
          36 production-ready components, 14 layout primitives, and 8 hooks — all fully typed and tested.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 24 }}>
          {componentGroups.map((group) => (
            <div key={group.title}>
              <div style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--gray-400)', marginBottom: 8 }}>
                {group.title}
              </div>
              {group.items.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="component-card"
                  style={{ display: 'block', marginBottom: 8 }}
                >
                  <div className="component-card-name">{item.name}</div>
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="section" style={{ textAlign: 'center', padding: '40px 0' }}>
        <div style={{ fontSize: 14, color: 'var(--gray-400)' }}>
          Built with Jind UI Kit &middot; MIT License
        </div>
      </div>
    </div>
  );
}
