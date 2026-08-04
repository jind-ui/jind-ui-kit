import { CodeBlock } from '../components/CodeBlock';

export function Theming() {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Theming</h1>
        <p className="page-description">
          Customize every design token through the theme provider. Build your
          own brand on top of Jind's defaults.
        </p>
      </div>

      <div className="section">
        <h2 className="section-title">How Theming Works</h2>
        <p className="section-text">
          Jind UI Kit uses a React Context powered by Zustand to distribute
          theme values to every component. Wrap your app with{' '}
          <code>JindProvider</code> and pass a custom theme — every component
          picks up your overrides automatically.
        </p>
        <p className="section-text">
          Without a provider, all components fall back to the built-in default
          theme. This means you can use components standalone in prototypes or
          tests without any setup.
        </p>
      </div>

      <div className="section">
        <h2 className="section-title">Creating a Custom Theme</h2>
        <p className="section-text">
          Use <code>createTheme()</code> to deep-merge your overrides with the
          default theme. Only specify what you want to change.
        </p>
        <CodeBlock
          code={`
import { createTheme, JindProvider } from 'jind-ui-kit';

const brandTheme = createTheme({
  colors: {
    blue: {
      500: '#6366f1',  // Indigo instead of blue
      600: '#4f46e5',
      700: '#4338ca',
    },
  },
  semantic: {
    fill: {
      primary: '#6366f1',
      primaryHover: '#4f46e5',
      primaryActive: '#4338ca',
    },
  },
  radius: {
    md: 12,   // Rounder corners
    lg: 16,
  },
});

function App() {
  return (
    <JindProvider theme={brandTheme}>
      <YourApp />
    </JindProvider>
  );
}
`}
        />
      </div>

      <div className="section">
        <h2 className="section-title">Accessing the Theme</h2>
        <p className="section-text">
          Use the <code>useTheme()</code> hook inside any component to read the
          current theme values.
        </p>
        <CodeBlock
          code={`
import { useTheme } from 'jind-ui-kit';

function CustomCard({ children }) {
  const theme = useTheme();

  return (
    <div style={{
      padding: theme.space[6],
      borderRadius: theme.radius.lg,
      background: theme.semantic.surface.card,
      boxShadow: theme.shadow.card,
      fontFamily: theme.fontFamily.sans,
    }}>
      {children}
    </div>
  );
}
`}
        />
      </div>

      <div className="section">
        <h2 className="section-title">Color Mode</h2>
        <p className="section-text">
          The theme store includes color mode state. Use{' '}
          <code>useColorMode()</code> to read or toggle between light and dark.
        </p>
        <CodeBlock
          code={`
import { useColorMode } from 'jind-ui-kit';

function ThemeToggle() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <button onClick={toggleColorMode}>
      {colorMode === 'light' ? 'Dark' : 'Light'} Mode
    </button>
  );
}
`}
        />
      </div>

      <div className="section">
        <h2 className="section-title">Theme Structure</h2>
        <p className="section-text">
          The <code>JindTheme</code> interface covers every token category:
        </p>
        <CodeBlock
          code={`
interface JindTheme {
  colors         // Color palette ramps
  semantic       // Semantic aliases (text, surface, border, fill, icon)
  fontFamily     // sans, mono
  fontSize       // 11-28 scale
  fontWeight     // regular, medium, bold
  lineHeight     // tight, snug, normal
  typeVariants   // Pre-composed typography styles
  space          // 1-12 spacing scale
  controlHeight  // xs, sm, md, lg
  controlPadding // field, button, chip
  radius         // xs, sm, md, lg, full, none
  shadow         // xs, sm, card, menu, none
  focusRing      // primary, danger
  duration       // fast, base
  easing         // standard
  breakpoints    // mobile, tablet, desktop
}
`}
        />
      </div>
    </div>
  );
}
