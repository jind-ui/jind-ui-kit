import { useState } from 'react';
import { Alert, Button, TextButton } from 'jind-ui-kit';
import { Preview } from '../components/Preview';
import { PropsTable } from '../components/PropsTable';
import { ViewMarkdown } from '../components/ViewMarkdown';

const props = [
  { name: 'tone', type: "'neutral' | 'primary' | 'danger' | 'success' | 'warning' | 'info' | 'accent' | 'brand'", description: 'Color tone (default: neutral)' },
  { name: 'variant', type: "'subtle' | 'solid'", description: 'Visual style variant (default: subtle)' },
  { name: 'title', type: 'string', description: 'Bold heading text above the message' },
  { name: 'children', type: 'ReactNode', description: 'Alert message content' },
  { name: 'icon', type: 'string', description: 'Leading emoji or character icon' },
  { name: 'onDismiss', type: '() => void', description: 'Shows dismiss button when provided' },
  { name: 'style', type: 'CSSProperties', description: 'Custom inline styles' },
];

function DismissibleDemo() {
  const [visible, setVisible] = useState(true);

  if (!visible) {
    return (
      <div style={{ padding: 16, textAlign: 'center' }}>
        <TextButton variant="plain" onClick={() => setVisible(true)}>Show alert again</TextButton>
      </div>
    );
  }

  return (
    <Alert tone="info" icon="💡" title="Tip" onDismiss={() => setVisible(false)}>
      You can dismiss this alert by clicking the close button.
    </Alert>
  );
}

export function ComponentAlert() {
  return (
    <div className="page-container">
      <div className="page-header">
        <ViewMarkdown slug="alert" />
        <h1 className="page-title">Alert</h1>
        <p className="page-description">
          Contextual feedback messages for user actions, system status, or important
          information. Supports tones, variants, titles, icons, and dismissal.
        </p>
      </div>

      <div className="section">
        <h2 className="section-title">Basic Usage</h2>
        <Preview
          code={`<Alert>This is a neutral alert message.</Alert>`}
        >
          <Alert>This is a neutral alert message.</Alert>
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">With Title</h2>
        <Preview
          align="column"
          code={`<Alert title="Heads up!" tone="primary" icon="📢">
  A new version of the application is available.
</Alert>

<Alert title="Success" tone="success" icon="✅">
  Your profile has been updated successfully.
</Alert>`}
        >
          <Alert title="Heads up!" tone="primary" icon="📢">
            A new version of the application is available.
          </Alert>
          <Alert title="Success" tone="success" icon="✅">
            Your profile has been updated successfully.
          </Alert>
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">Tones</h2>
        <Preview
          align="column"
          code={`<Alert tone="neutral" icon="ℹ️">Neutral informational message.</Alert>
<Alert tone="primary" icon="📢">Primary highlighted message.</Alert>
<Alert tone="success" icon="✅">Operation completed successfully.</Alert>
<Alert tone="warning" icon="⚠️">Please review before continuing.</Alert>
<Alert tone="danger" icon="🚨">Something went wrong.</Alert>
<Alert tone="info" icon="💡">Here's a helpful tip.</Alert>`}
        >
          <Alert tone="neutral" icon="ℹ️">Neutral informational message.</Alert>
          <Alert tone="primary" icon="📢">Primary highlighted message.</Alert>
          <Alert tone="success" icon="✅">Operation completed successfully.</Alert>
          <Alert tone="warning" icon="⚠️">Please review before continuing.</Alert>
          <Alert tone="danger" icon="🚨">Something went wrong.</Alert>
          <Alert tone="info" icon="💡">Here's a helpful tip.</Alert>
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">Solid Variant</h2>
        <Preview
          align="column"
          code={`<Alert tone="primary" variant="solid" icon="🚀">
  Solid primary alert with stronger emphasis.
</Alert>
<Alert tone="danger" variant="solid" icon="🚨">
  Solid danger alert for critical errors.
</Alert>
<Alert tone="success" variant="solid" icon="✅">
  Solid success alert for confirmations.
</Alert>`}
        >
          <Alert tone="primary" variant="solid" icon="🚀">
            Solid primary alert with stronger emphasis.
          </Alert>
          <Alert tone="danger" variant="solid" icon="🚨">
            Solid danger alert for critical errors.
          </Alert>
          <Alert tone="success" variant="solid" icon="✅">
            Solid success alert for confirmations.
          </Alert>
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">Dismissible</h2>
        <Preview
          align="column"
          code={`<Alert
  tone="info"
  icon="💡"
  title="Tip"
  onDismiss={() => setVisible(false)}
>
  You can dismiss this alert by clicking the close button.
</Alert>`}
        >
          <DismissibleDemo />
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">Props</h2>
        <PropsTable props={props} />
      </div>
    </div>
  );
}
