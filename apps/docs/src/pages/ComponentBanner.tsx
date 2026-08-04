import { useState } from 'react';
import { Banner, Button, TextButton, Input, HStack, Text } from 'jind-ui-kit';
import { Preview } from '../components/Preview';
import { PropsTable } from '../components/PropsTable';
import { ViewMarkdown } from '../components/ViewMarkdown';

const props = [
  { name: 'tone', type: "'neutral' | 'primary' | 'danger' | 'success' | 'warning' | 'info' | 'accent' | 'brand'", description: 'Color tone (default: neutral)' },
  { name: 'children', type: 'ReactNode', description: 'Banner message content' },
  { name: 'icon', type: 'string', description: 'Leading emoji or character icon' },
  { name: 'action', type: 'ReactNode', description: 'Action element (button, link, etc.)' },
  { name: 'onDismiss', type: '() => void', description: 'Shows dismiss button when provided' },
  { name: 'position', type: "'top' | 'bottom' | 'inline'", description: 'Fixed or inline positioning (default: inline)' },
  { name: 'style', type: 'CSSProperties', description: 'Custom inline styles' },
];

function NewsletterBanner() {
  const [dismissed, setDismissed] = useState(false);
  const [email, setEmail] = useState('');

  if (dismissed) {
    return (
      <div style={{ padding: 16, textAlign: 'center' }}>
        <TextButton onClick={() => setDismissed(false)}>Show banner again</TextButton>
      </div>
    );
  }

  return (
    <Banner tone="primary" onDismiss={() => setDismissed(true)}>
      <div>
        <Text style={{ fontWeight: 600, marginBottom: 4, display: 'block' }}>
          Stay up to date with the latest news
        </Text>
        <Text style={{ fontSize: 13, opacity: 0.8 }}>
          Be the first to hear about new components, updates, and design resources.
        </Text>
        <HStack gap={8} style={{ marginTop: 12 }}>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            style={{ maxWidth: 280 }}
          />
          <Button tone="primary" size="sm">Subscribe</Button>
        </HStack>
      </div>
    </Banner>
  );
}

export function ComponentBanner() {
  return (
    <div className="page-container">
      <div className="page-header">
        <ViewMarkdown slug="banner" />
        <h1 className="page-title">Banner</h1>
        <p className="page-description">
          Announcement bar for displaying important messages, promotions, or
          calls to action. Supports tones, icons, action slots, and dismissal.
        </p>
      </div>

      <div className="section">
        <h2 className="section-title">Tones</h2>
        <Preview
          align="column"
          code={`<Banner tone="primary" icon="📢">New version available!</Banner>
<Banner tone="success" icon="✅">Your changes have been saved.</Banner>
<Banner tone="warning" icon="⚠️">Your trial expires in 3 days.</Banner>
<Banner tone="danger" icon="🚨">Service outage detected.</Banner>
<Banner tone="info" icon="💡">Check out our new documentation.</Banner>`}
        >
          <Banner tone="primary" icon="📢">New version available!</Banner>
          <Banner tone="success" icon="✅">Your changes have been saved.</Banner>
          <Banner tone="warning" icon="⚠️">Your trial expires in 3 days.</Banner>
          <Banner tone="danger" icon="🚨">Service outage detected.</Banner>
          <Banner tone="info" icon="💡">Check out our new documentation.</Banner>
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">With Action & Dismiss</h2>
        <Preview
          align="column"
          code={`<Banner
  tone="primary"
  icon="🚀"
  action={<Button tone="primary" size="sm">Upgrade</Button>}
  onDismiss={() => {}}
>
  Jind UI Kit v2.0 is here — with 50 new components!
</Banner>

<Banner
  tone="warning"
  action={<TextButton>Renew now</TextButton>}
  onDismiss={() => {}}
>
  Your subscription expires on Aug 15, 2026.
</Banner>`}
        >
          <Banner
            tone="primary"
            icon="🚀"
            action={<Button tone="primary" size="sm">Upgrade</Button>}
            onDismiss={() => {}}
          >
            Jind UI Kit v2.0 is here — with 50 new components!
          </Banner>
          <Banner
            tone="warning"
            action={<TextButton>Renew now</TextButton>}
            onDismiss={() => {}}
          >
            Your subscription expires on Aug 15, 2026.
          </Banner>
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">Newsletter Banner (Untitled UI Style)</h2>
        <p style={{ marginBottom: 12 }}>
          Composing Banner with Input and Button to create a newsletter signup — like Untitled UI's banner pattern.
        </p>
        <Preview
          align="column"
          code={`<Banner tone="primary" onDismiss={() => setDismissed(true)}>
  <div>
    <Text style={{ fontWeight: 600 }}>
      Stay up to date with the latest news
    </Text>
    <Text style={{ fontSize: 13, opacity: 0.8 }}>
      Be the first to hear about new components.
    </Text>
    <HStack gap={8} style={{ marginTop: 12 }}>
      <Input placeholder="Enter your email" />
      <Button tone="primary" size="sm">Subscribe</Button>
    </HStack>
  </div>
</Banner>`}
        >
          <NewsletterBanner />
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">Props</h2>
        <PropsTable props={props} />
      </div>
    </div>
  );
}
