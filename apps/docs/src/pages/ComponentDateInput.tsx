import { useState } from 'react';
import { DateInput, DateRangeInput } from 'jind-ui-kit';
import { Preview } from '../components/Preview';
import { PropsTable } from '../components/PropsTable';
import { CodeBlock } from '../components/CodeBlock';
import { ViewMarkdown } from '../components/ViewMarkdown';

const dateProps = [
  { name: 'value', type: 'Date | null', description: 'Currently selected date' },
  { name: 'onChange', type: '(date: Date | null) => void', description: 'Called when a date is selected or cleared' },
  { name: 'placeholder', type: 'string', default: "'Pick a date'", description: 'Placeholder text when no value is set' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Disabled state' },
  { name: 'style', type: 'CSSProperties', description: 'Custom inline styles' },
];

const rangeProps = [
  { name: 'startDate', type: 'Date | null', description: 'Range start date' },
  { name: 'endDate', type: 'Date | null', description: 'Range end date' },
  { name: 'onChange', type: '(start: Date | null, end: Date | null) => void', description: 'Called when dates change' },
  { name: 'startPlaceholder', type: 'string', default: "'Start date'", description: 'Placeholder for start' },
  { name: 'endPlaceholder', type: 'string', default: "'End date'", description: 'Placeholder for end' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Disabled state' },
  { name: 'style', type: 'CSSProperties', description: 'Custom inline styles' },
];

function SingleDemo() {
  const [date, setDate] = useState<Date | null>(null);
  return (
    <div style={{ maxWidth: 320 }}>
      <DateInput value={date} onChange={setDate} />
    </div>
  );
}

function PrefilledDemo() {
  const [date, setDate] = useState<Date | null>(new Date());
  return (
    <div style={{ maxWidth: 320 }}>
      <DateInput value={date} onChange={setDate} />
    </div>
  );
}

function RangeDemo() {
  const [start, setStart] = useState<Date | null>(null);
  const [end, setEnd] = useState<Date | null>(null);
  return (
    <div style={{ maxWidth: 420 }}>
      <DateRangeInput
        startDate={start}
        endDate={end}
        onChange={(s, e) => { setStart(s); setEnd(e); }}
      />
    </div>
  );
}

export function ComponentDateInput() {
  return (
    <div className="page-container">
      <div className="page-header">
        <ViewMarkdown slug="date-input" />
        <h1 className="page-title">DateInput</h1>
        <p className="page-description">
          Date picker with built-in calendar dropdown. Supports single date and date range modes
          with month navigation, today highlighting, and range visualization.
        </p>
      </div>

      <div className="section">
        <h2 className="section-title">Single Date Picker</h2>
        <p className="section-text">
          Click the input to open a calendar dropdown. Select a date or clear to reset.
        </p>
        <div className="preview-card">
          <div className="preview-area" style={{ overflow: 'visible', minHeight: 380 }}>
            <SingleDemo />
          </div>
          <CodeBlock code={`const [date, setDate] = useState<Date | null>(null);

<DateInput value={date} onChange={setDate} />`} />
        </div>
      </div>

      <div className="section">
        <h2 className="section-title">Pre-filled</h2>
        <p className="section-text">
          Initialize with a Date object. The calendar opens to the selected month.
        </p>
        <div className="preview-card">
          <div className="preview-area" style={{ overflow: 'visible', minHeight: 380 }}>
            <PrefilledDemo />
          </div>
          <CodeBlock code={`const [date, setDate] = useState<Date | null>(new Date());

<DateInput value={date} onChange={setDate} />`} />
        </div>
      </div>

      <div className="section">
        <h2 className="section-title">Date Range</h2>
        <p className="section-text">
          Pick a start and end date with visual range highlighting. The picker guides you
          through selecting start first, then end. Hover previews the range before clicking.
        </p>
        <div className="preview-card">
          <div className="preview-area" style={{ overflow: 'visible', minHeight: 400 }}>
            <RangeDemo />
          </div>
          <CodeBlock code={`const [start, setStart] = useState<Date | null>(null);
const [end, setEnd] = useState<Date | null>(null);

<DateRangeInput
  startDate={start}
  endDate={end}
  onChange={(s, e) => { setStart(s); setEnd(e); }}
/>`} />
        </div>
      </div>

      <div className="section">
        <h2 className="section-title">Disabled</h2>
        <Preview code={`<DateInput disabled />`}>
          <div style={{ maxWidth: 320 }}>
            <DateInput disabled />
          </div>
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">DateInput Props</h2>
        <PropsTable props={dateProps} />
      </div>

      <div className="section">
        <h2 className="section-title">DateRangeInput Props</h2>
        <PropsTable props={rangeProps} />
      </div>
    </div>
  );
}
