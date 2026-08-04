import { type CSSProperties, type ReactNode, type Ref } from 'react';
import { useTheme } from '../../theme/ThemeProvider';

export interface StepItem {
  label: string;
  description?: string;
  icon?: ReactNode;
}

export interface StepperProps {
  ref?: Ref<HTMLOListElement>;
  steps: StepItem[];
  activeStep: number;
  orientation?: 'horizontal' | 'vertical';
  variant?: 'inline' | 'stacked';
  connector?: 'solid' | 'dotted' | 'dashed';
  size?: 'sm' | 'md' | 'lg';
  onStepClick?: (index: number) => void;
  style?: CSSProperties;
}

type StepStatus = 'completed' | 'active' | 'pending';

function getStepStatus(index: number, activeStep: number): StepStatus {
  if (index < activeStep) return 'completed';
  if (index === activeStep) return 'active';
  return 'pending';
}

const SIZES = {
  sm: { circle: 24, font: 12, gap: 6, connector: 1.5 },
  md: { circle: 32, font: 14, gap: 8, connector: 2 },
  lg: { circle: 40, font: 16, gap: 10, connector: 2 },
} as const;

export function Stepper({
  ref,
  steps,
  activeStep,
  orientation = 'horizontal',
  variant = 'inline',
  connector = 'solid',
  size = 'md',
  onStepClick,
  style,
}: StepperProps) {
  const theme = useTheme();
  const isHorizontal = orientation === 'horizontal';
  const isStacked = variant === 'stacked';
  const dims = SIZES[size];

  const containerStyle: CSSProperties = {
    display: 'flex',
    flexDirection: isHorizontal ? 'row' : 'column',
    alignItems: isHorizontal
      ? isStacked ? 'stretch' : 'flex-start'
      : 'stretch',
    listStyle: 'none',
    margin: 0,
    padding: 0,
    ...style,
  };

  return (
    <ol ref={ref} role="list" style={containerStyle}>
      {steps.map((step, index) => {
        const status = getStepStatus(index, activeStep);
        const isLast = index === steps.length - 1;
        const clickable = status === 'completed' && onStepClick != null;

        return (
          <li
            key={index}
            style={{ display: 'contents' }}
            {...(status === 'active' ? { 'aria-current': 'step' as const } : {})}
          >
            {isStacked && isHorizontal ? (
              <StackedStep
                step={step}
                index={index}
                status={status}
                isLast={isLast}
                clickable={clickable}
                onStepClick={onStepClick}
                theme={theme}
                dims={dims}
                connector={connector}
              />
            ) : isHorizontal ? (
              <InlineStep
                step={step}
                index={index}
                status={status}
                isLast={isLast}
                clickable={clickable}
                onStepClick={onStepClick}
                theme={theme}
                dims={dims}
                connector={connector}
              />
            ) : (
              <VerticalStep
                step={step}
                index={index}
                status={status}
                isLast={isLast}
                clickable={clickable}
                onStepClick={onStepClick}
                theme={theme}
                dims={dims}
                connector={connector}
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}

interface StepNodeProps {
  step: StepItem;
  index: number;
  status: StepStatus;
  isLast: boolean;
  clickable: boolean;
  onStepClick: ((index: number) => void) | undefined;
  theme: ReturnType<typeof useTheme>;
  dims: (typeof SIZES)[keyof typeof SIZES];
  connector: 'solid' | 'dotted' | 'dashed';
}

function useStepColors(status: StepStatus, theme: ReturnType<typeof useTheme>) {
  const completedBg = theme.colors.green[500];
  const activeBorder = theme.semantic.fill.primary;

  return {
    circleBg: status === 'completed' ? completedBg : 'transparent',
    circleBorder: status === 'completed'
      ? completedBg
      : status === 'active'
        ? activeBorder
        : theme.colors.gray[300],
    circleText: status === 'completed'
      ? '#ffffff'
      : status === 'active'
        ? activeBorder
        : theme.colors.gray[400],
    connectorColor: status === 'completed'
      ? completedBg
      : theme.colors.gray[200],
    labelColor: status === 'pending'
      ? theme.semantic.text.muted
      : theme.semantic.text.primary,
    descColor: theme.semantic.text.muted,
  };
}

function StepCircle({
  step,
  index,
  status,
  clickable,
  onStepClick,
  theme,
  dims,
  colors,
}: {
  step: StepItem;
  index: number;
  status: StepStatus;
  clickable: boolean;
  onStepClick: ((index: number) => void) | undefined;
  theme: ReturnType<typeof useTheme>;
  dims: (typeof SIZES)[keyof typeof SIZES];
  colors: ReturnType<typeof useStepColors>;
}) {
  const handleClick = clickable ? () => onStepClick?.(index) : undefined;
  const handleKeyDown = clickable
    ? (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onStepClick?.(index);
        }
      }
    : undefined;

  const circleStyle: CSSProperties = {
    width: dims.circle,
    height: dims.circle,
    borderRadius: theme.radius.full,
    backgroundColor: colors.circleBg,
    border: `2px solid ${colors.circleBorder}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    boxSizing: 'border-box',
    cursor: clickable ? 'pointer' : 'default',
  };

  const textStyle: CSSProperties = {
    fontFamily: theme.fontFamily.sans,
    fontSize: dims.font - 1,
    fontWeight: theme.fontWeight.bold,
    color: colors.circleText,
    lineHeight: 1,
    userSelect: 'none',
  };

  return (
    <div
      style={circleStyle}
      onClick={handleClick}
      {...(clickable ? { role: 'button', tabIndex: 0, onKeyDown: handleKeyDown } : {})}
      aria-label={clickable ? `Go to step ${index + 1}: ${step.label}` : undefined}
    >
      {status === 'completed' ? (
        step.icon ?? <CheckIcon size={dims.font} />
      ) : (
        step.icon ?? <span style={textStyle}>{index + 1}</span>
      )}
    </div>
  );
}

function CheckIcon({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.5 8.5L6.5 11.5L12.5 4.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Connector({
  isHorizontal,
  color,
  variant,
  thickness,
}: {
  isHorizontal: boolean;
  color: string;
  variant: 'solid' | 'dotted' | 'dashed';
  thickness: number;
}) {
  if (isHorizontal) {
    return (
      <div
        style={{
          flex: 1,
          height: 0,
          borderTop: `${thickness}px ${variant} ${color}`,
          marginLeft: 8,
          marginRight: 8,
          alignSelf: 'center',
          minWidth: 16,
        }}
      />
    );
  }

  return (
    <div
      style={{
        width: 0,
        flex: 1,
        borderLeft: `${thickness}px ${variant} ${color}`,
        marginTop: 4,
        marginBottom: 4,
        minHeight: 20,
      }}
    />
  );
}

function StackedStep({
  step,
  index,
  status,
  isLast,
  clickable,
  onStepClick,
  theme,
  dims,
  connector,
}: StepNodeProps) {
  const colors = useStepColors(status, theme);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: isLast ? '0 0 auto' : '1 1 0', alignItems: 'center' }}>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>
        {!isLast ? (
          <>
            <div style={{ display: 'flex', justifyContent: 'center', flexShrink: 0 }}>
              <StepCircle
                step={step} index={index} status={status}
                clickable={clickable} onStepClick={onStepClick}
                theme={theme} dims={dims} colors={colors}
              />
            </div>
            <Connector
              isHorizontal
              color={colors.connectorColor}
              variant={connector}
              thickness={dims.connector}
            />
          </>
        ) : (
          <StepCircle
            step={step} index={index} status={status}
            clickable={clickable} onStepClick={onStepClick}
            theme={theme} dims={dims} colors={colors}
          />
        )}
      </div>
      <div
        style={{
          textAlign: 'center',
          marginTop: dims.gap,
          cursor: clickable ? 'pointer' : 'default',
        }}
        onClick={clickable ? () => onStepClick?.(index) : undefined}
      >
        <div style={{
          fontFamily: theme.fontFamily.sans,
          fontSize: theme.fontSize[14],
          fontWeight: status === 'active' ? theme.fontWeight.medium : theme.fontWeight.regular,
          color: colors.labelColor,
          lineHeight: 1.4,
        }}>
          {step.label}
        </div>
        {step.description != null && (
          <div style={{
            fontFamily: theme.fontFamily.sans,
            fontSize: theme.fontSize[13],
            fontWeight: theme.fontWeight.regular,
            color: colors.descColor,
            lineHeight: 1.4,
            marginTop: 2,
          }}>
            {step.description}
          </div>
        )}
      </div>
    </div>
  );
}

function InlineStep({
  step,
  index,
  status,
  isLast,
  clickable,
  onStepClick,
  theme,
  dims,
  connector,
}: StepNodeProps) {
  const colors = useStepColors(status, theme);

  const handleClick = clickable ? () => onStepClick?.(index) : undefined;

  return (
    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', flex: isLast ? '0 0 auto' : '1 1 0' }}>
      <div
        style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', cursor: clickable ? 'pointer' : 'default' }}
        onClick={handleClick}
      >
        <StepCircle
          step={step} index={index} status={status}
          clickable={clickable} onStepClick={onStepClick}
          theme={theme} dims={dims} colors={colors}
        />
        <div style={{ marginLeft: dims.gap, display: 'flex', flexDirection: 'column', whiteSpace: 'nowrap' }}>
          <span style={{
            fontFamily: theme.fontFamily.sans,
            fontSize: theme.fontSize[14],
            fontWeight: status === 'active' ? theme.fontWeight.medium : theme.fontWeight.regular,
            color: colors.labelColor,
            lineHeight: 1.4,
          }}>
            {step.label}
          </span>
          {step.description != null && (
            <span style={{
              fontFamily: theme.fontFamily.sans,
              fontSize: theme.fontSize[13],
              fontWeight: theme.fontWeight.regular,
              color: colors.descColor,
              lineHeight: 1.4,
              marginTop: 2,
            }}>
              {step.description}
            </span>
          )}
        </div>
      </div>
      {!isLast && (
        <Connector
          isHorizontal
          color={colors.connectorColor}
          variant={connector}
          thickness={dims.connector}
        />
      )}
    </div>
  );
}

function VerticalStep({
  step,
  index,
  status,
  isLast,
  clickable,
  onStepClick,
  theme,
  dims,
  connector,
}: StepNodeProps) {
  const colors = useStepColors(status, theme);

  const handleClick = clickable ? () => onStepClick?.(index) : undefined;

  return (
    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'stretch' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: dims.circle, flexShrink: 0 }}>
        <StepCircle
          step={step} index={index} status={status}
          clickable={clickable} onStepClick={onStepClick}
          theme={theme} dims={dims} colors={colors}
        />
        {!isLast && (
          <Connector
            isHorizontal={false}
            color={colors.connectorColor}
            variant={connector}
            thickness={dims.connector}
          />
        )}
      </div>
      <div
        style={{
          marginLeft: 12,
          display: 'flex',
          flexDirection: 'column',
          paddingBottom: isLast ? 0 : 24,
          cursor: clickable ? 'pointer' : 'default',
        }}
        onClick={handleClick}
      >
        <span style={{
          fontFamily: theme.fontFamily.sans,
          fontSize: theme.fontSize[14],
          fontWeight: status === 'active' ? theme.fontWeight.medium : theme.fontWeight.regular,
          color: colors.labelColor,
          lineHeight: 1.4,
        }}>
          {step.label}
        </span>
        {step.description != null && (
          <span style={{
            fontFamily: theme.fontFamily.sans,
            fontSize: theme.fontSize[13],
            fontWeight: theme.fontWeight.regular,
            color: colors.descColor,
            lineHeight: 1.4,
            marginTop: 2,
          }}>
            {step.description}
          </span>
        )}
      </div>
    </div>
  );
}
