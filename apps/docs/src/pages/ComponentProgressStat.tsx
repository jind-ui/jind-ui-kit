import { ProgressStat } from 'jind-ui-kit';
import { Preview } from '../components/Preview';
import { PropsTable } from '../components/PropsTable';
import { ViewMarkdown } from '../components/ViewMarkdown';

const props = [
  { name: 'value', type: 'number', default: '0', description: 'Current progress value' },
  { name: 'total', type: 'number', default: '100', description: 'Maximum value representing 100% completion' },
  { name: 'caption', type: 'string', default: "'in total'", description: 'Descriptive text shown on the right side of the label row' },
  { name: 'tone', type: "'neutral' | 'primary' | 'danger' | 'success' | 'warning' | 'info' | 'accent' | 'brand'", default: "'brand'", description: 'Color tone of the progress fill bar' },
  { name: 'style', type: 'CSSProperties', description: 'Custom inline styles' },
];

export function ComponentProgressStat() {
  return (
    <div className="page-container">
      <div className="page-header">
        <ViewMarkdown slug="progress-stat" />
        <h1 className="page-title">ProgressStat</h1>
        <p className="page-description">
          Progress bar with a value label and caption. Shows completion as a
          fraction alongside a visual fill track.
        </p>
      </div>

      <div className="section">
        <h2 className="section-title">Basic</h2>
        <Preview
          align="column"
          code={`<ProgressStat value={65} total={100} />`}
        >
          <ProgressStat value={65} total={100} />
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">Custom Caption</h2>
        <Preview
          align="column"
          code={`<ProgressStat value={42} total={50} caption="tasks completed" />`}
        >
          <ProgressStat value={42} total={50} caption="tasks completed" />
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">Tones</h2>
        <Preview
          align="column"
          code={`<ProgressStat value={80} total={100} tone="success" caption="on track" />
<ProgressStat value={45} total={100} tone="warning" caption="needs attention" />
<ProgressStat value={20} total={100} tone="danger" caption="at risk" />`}
        >
          <ProgressStat value={80} total={100} tone="success" caption="on track" />
          <ProgressStat value={45} total={100} tone="warning" caption="needs attention" />
          <ProgressStat value={20} total={100} tone="danger" caption="at risk" />
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">Props</h2>
        <PropsTable props={props} />
      </div>
    </div>
  );
}
