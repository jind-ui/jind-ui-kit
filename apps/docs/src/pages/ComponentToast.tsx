import { Toast } from 'jind-ui-kit';
import { Preview } from '../components/Preview';
import { PropsTable } from '../components/PropsTable';
import { ViewMarkdown } from '../components/ViewMarkdown';

const props = [
  { name: 'tone', type: "'neutral' | 'primary' | 'danger' | 'success' | 'warning' | 'info' | 'accent' | 'brand'", description: 'Color tone of the toast (required)' },
  { name: 'icon', type: 'string', description: 'Emoji or character displayed as a leading icon' },
  { name: 'onDismiss', type: '() => void', description: 'Callback when dismiss button is clicked; renders a dismiss button when provided' },
  { name: 'children', type: 'ReactNode', description: 'Toast message content' },
  { name: 'style', type: 'CSSProperties', description: 'Custom inline styles' },
];

export function ComponentToast() {
  return (
    <div className="page-container">
      <div className="page-header">
        <ViewMarkdown slug="toast" />
        <h1 className="page-title">Toast</h1>
        <p className="page-description">
          Notification banner for feedback messages. Supports multiple color
          tones, an optional icon, and a dismiss action.
        </p>
      </div>

      <div className="section">
        <h2 className="section-title">Tones</h2>
        <Preview
          align="column"
          code={`<Toast tone="success">Changes saved successfully.</Toast>
<Toast tone="danger">Something went wrong. Please try again.</Toast>
<Toast tone="warning">Your session is about to expire.</Toast>
<Toast tone="info">A new version is available.</Toast>
<Toast tone="neutral">This is a neutral message.</Toast>`}
        >
          <Toast tone="success">Changes saved successfully.</Toast>
          <Toast tone="danger">Something went wrong. Please try again.</Toast>
          <Toast tone="warning">Your session is about to expire.</Toast>
          <Toast tone="info">A new version is available.</Toast>
          <Toast tone="neutral">This is a neutral message.</Toast>
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">With Dismiss</h2>
        <Preview
          align="column"
          code={`<Toast tone="success" onDismiss={() => {}}>Dismissible toast.</Toast>
<Toast tone="danger" onDismiss={() => {}}>Error that can be dismissed.</Toast>`}
        >
          <Toast tone="success" onDismiss={() => {}}>Dismissible toast.</Toast>
          <Toast tone="danger" onDismiss={() => {}}>Error that can be dismissed.</Toast>
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">Props</h2>
        <PropsTable props={props} />
      </div>
    </div>
  );
}
