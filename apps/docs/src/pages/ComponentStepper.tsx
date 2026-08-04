import { useState } from 'react';
import { Stepper, Button, HStack } from 'jind-ui-kit';
import { Preview } from '../components/Preview';
import { PropsTable } from '../components/PropsTable';
import { ViewMarkdown } from '../components/ViewMarkdown';

const props = [
  { name: 'steps', type: 'StepItem[]', description: 'Array of step configurations (label, description?, icon?)' },
  { name: 'activeStep', type: 'number', description: 'Current active step (0-indexed)' },
  { name: 'orientation', type: "'horizontal' | 'vertical'", description: 'Layout direction (default: horizontal)' },
  { name: 'variant', type: "'inline' | 'stacked'", description: 'Label placement: beside circle (inline) or below (stacked)' },
  { name: 'connector', type: "'solid' | 'dotted' | 'dashed'", description: 'Connector line style (default: solid)' },
  { name: 'size', type: "'sm' | 'md' | 'lg'", description: 'Step circle size (default: md)' },
  { name: 'onStepClick', type: '(index: number) => void', description: 'Makes completed steps clickable' },
  { name: 'style', type: 'CSSProperties', description: 'Custom inline styles' },
];

const stepItemProps = [
  { name: 'label', type: 'string', description: 'Step title text' },
  { name: 'description', type: 'string', description: 'Optional subtitle text' },
  { name: 'icon', type: 'ReactNode', description: 'Custom icon (replaces number/check)' },
];

const steps = [
  { label: 'Your details', description: 'Name and email' },
  { label: 'Company details', description: 'Website and location' },
  { label: 'Invite your team', description: 'Start collaborating' },
  { label: 'Add your socials', description: 'Automatic sharing' },
];

const shortSteps = [
  { label: 'Account', description: 'Create your account' },
  { label: 'Profile', description: 'Set up your profile' },
  { label: 'Review', description: 'Review and submit' },
];

function StepperDemo() {
  const [step, setStep] = useState(1);
  return (
    <div style={{ width: '100%' }}>
      <Stepper steps={steps} activeStep={step} variant="stacked" connector="dotted" onStepClick={setStep} />
      <HStack gap={8} style={{ marginTop: 20, justifyContent: 'center' }}>
        <Button size="sm" tone="neutral" onClick={() => setStep(s => Math.max(0, s - 1))}>
          Back
        </Button>
        <Button size="sm" tone="primary" onClick={() => setStep(s => Math.min(steps.length - 1, s + 1))}>
          Next
        </Button>
      </HStack>
    </div>
  );
}

export function ComponentStepper() {
  return (
    <div className="page-container">
      <div className="page-header">
        <ViewMarkdown slug="stepper" />
        <h1 className="page-title">Stepper</h1>
        <p className="page-description">
          Multi-step progress indicator with inline and stacked variants,
          dotted/dashed/solid connectors, and three sizes.
        </p>
      </div>

      <div className="section">
        <h2 className="section-title">Stacked (Untitled UI style)</h2>
        <Preview
          align="column"
          code={`<Stepper
  variant="stacked"
  connector="dotted"
  steps={steps}
  activeStep={1}
  onStepClick={setStep}
/>`}
        >
          <StepperDemo />
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">Inline (default)</h2>
        <Preview
          align="column"
          code={`<Stepper steps={steps} activeStep={1} />`}
        >
          <Stepper steps={shortSteps} activeStep={1} />
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">Connector Styles</h2>
        <Preview
          align="column"
          code={`<Stepper connector="solid" ... />
<Stepper connector="dotted" ... />
<Stepper connector="dashed" ... />`}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 32, width: '100%' }}>
            <Stepper variant="stacked" connector="solid" steps={steps} activeStep={1} />
            <Stepper variant="stacked" connector="dotted" steps={steps} activeStep={1} />
            <Stepper variant="stacked" connector="dashed" steps={steps} activeStep={1} />
          </div>
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">Sizes</h2>
        <Preview
          align="column"
          code={`<Stepper size="sm" ... />
<Stepper size="md" ... />
<Stepper size="lg" ... />`}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 32, width: '100%' }}>
            <Stepper variant="stacked" connector="dotted" size="sm" steps={steps} activeStep={1} />
            <Stepper variant="stacked" connector="dotted" size="md" steps={steps} activeStep={1} />
            <Stepper variant="stacked" connector="dotted" size="lg" steps={steps} activeStep={1} />
          </div>
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">Vertical</h2>
        <Preview
          code={`<Stepper
  orientation="vertical"
  connector="dashed"
  steps={steps}
  activeStep={1}
/>`}
        >
          <Stepper orientation="vertical" connector="dashed" steps={shortSteps} activeStep={1} />
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">Props</h2>
        <PropsTable props={props} />
      </div>

      <div className="section">
        <h2 className="section-title">StepItem</h2>
        <PropsTable props={stepItemProps} />
      </div>
    </div>
  );
}
