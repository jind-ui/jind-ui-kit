import { CodeBlock } from '../components/CodeBlock';

export function GettingStarted() {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Getting Started</h1>
        <p className="page-description">
          Install Jind UI Kit and start building in under a minute.
        </p>
      </div>

      <div className="section">
        <h2 className="section-title">Installation</h2>
        <div className="install-block">
          <span className="prompt">$ </span>npm install jind-ui-kit
        </div>
        <p className="section-text">
          Jind UI Kit has a single dependency (Zustand for internal state) and
          requires React 19+. It ships ESM, CJS, and TypeScript declarations.
        </p>
      </div>

      <div className="section">
        <h2 className="section-title">Setup the Provider</h2>
        <p className="section-text">
          Wrap your app with <code>JindProvider</code> to enable theming across
          all components. Without the provider, components fall back to the
          default theme automatically.
        </p>
        <CodeBlock
          code={`
import { JindProvider } from 'jind-ui-kit';

function App() {
  return (
    <JindProvider>
      <YourApp />
    </JindProvider>
  );
}
`}
        />
      </div>

      <div className="section">
        <h2 className="section-title">Use a Component</h2>
        <p className="section-text">
          Import any component and start using it. Every component is fully
          typed and accepts standard HTML attributes alongside its own props.
        </p>
        <CodeBlock
          code={`
import { Button, Input, HStack, VStack } from 'jind-ui-kit';

function LoginForm() {
  return (
    <VStack gap={4}>
      <Input placeholder="Email" />
      <Input placeholder="Password" type="password" />
      <HStack gap={3}>
        <Button variant="primary">Sign In</Button>
        <Button variant="secondary">Register</Button>
      </HStack>
    </VStack>
  );
}
`}
        />
      </div>

      <div className="section">
        <h2 className="section-title">Polymorphic Components</h2>
        <p className="section-text">
          Most components accept an <code>as</code> prop, letting you change the
          rendered element while keeping the component's styles and behavior.
        </p>
        <CodeBlock
          code={`
import { Button, Box } from 'jind-ui-kit';

// Render a Button as an anchor tag
<Button as="a" href="/dashboard" variant="primary">
  Go to Dashboard
</Button>

// Render a Box as a section element
<Box as="section" p={6} bg="#f9f9f9" radius="lg">
  Content goes here
</Box>
`}
        />
      </div>

      <div className="section">
        <h2 className="section-title">Custom Themes</h2>
        <p className="section-text">
          Create a custom theme by passing overrides to <code>createTheme</code>.
          Only specify the values you want to change — everything else inherits
          from the default theme.
        </p>
        <CodeBlock
          code={`
import { JindProvider, createTheme } from 'jind-ui-kit';

const myTheme = createTheme({
  colors: {
    blue: { 500: '#6366f1' },
  },
  semantic: {
    fill: { primary: '#6366f1' },
  },
  radius: { md: 12 },
});

function App() {
  return (
    <JindProvider theme={myTheme}>
      <YourApp />
    </JindProvider>
  );
}
`}
        />
      </div>

      <div className="section">
        <h2 className="section-title">TypeScript</h2>
        <p className="section-text">
          Every component exports its props type. Use them to build typed
          wrappers, higher-order components, or pass-through props.
        </p>
        <CodeBlock
          code={`
import { Button, type ButtonProps } from 'jind-ui-kit';

interface SubmitButtonProps extends ButtonProps {
  loading?: boolean;
}

function SubmitButton({ loading, children, ...rest }: SubmitButtonProps) {
  return (
    <Button variant="primary" disabled={loading} {...rest}>
      {loading ? 'Saving...' : children}
    </Button>
  );
}
`}
        />
      </div>
    </div>
  );
}
