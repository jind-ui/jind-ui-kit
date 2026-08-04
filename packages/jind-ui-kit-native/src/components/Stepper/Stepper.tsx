import { memo } from 'react';
import { Pressable, Text, View, type TextStyle, type ViewStyle } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';

export interface StepItem {
  label: string;
  description?: string;
}

export interface StepperProps {
  ref?: React.Ref<View>;
  steps: StepItem[];
  activeStep: number;
  orientation?: 'horizontal' | 'vertical';
  onStepPress?: (index: number) => void;
  style?: ViewStyle;
}

type StepStatus = 'completed' | 'active' | 'pending';

function getStepStatus(index: number, activeStep: number): StepStatus {
  if (index < activeStep) return 'completed';
  if (index === activeStep) return 'active';
  return 'pending';
}

const CIRCLE_SIZE = 28;

function StepperInner({
  ref,
  steps,
  activeStep,
  orientation = 'horizontal',
  onStepPress,
  style,
}: StepperProps) {
  const theme = useTheme();
  const isHorizontal = orientation === 'horizontal';

  const containerStyle: ViewStyle = {
    flexDirection: isHorizontal ? 'row' : 'column',
    alignItems: isHorizontal ? 'flex-start' : 'stretch',
    ...style,
  };

  return (
    <View ref={ref} style={containerStyle}>
      {steps.map((step, index) => {
        const status = getStepStatus(index, activeStep);
        const isLast = index === steps.length - 1;
        const clickable = status === 'completed' && onStepPress != null;

        if (isHorizontal) {
          return (
            <HorizontalStep
              key={index}
              step={step}
              index={index}
              status={status}
              isLast={isLast}
              clickable={clickable}
              onStepPress={onStepPress}
              theme={theme}
            />
          );
        }

        return (
          <VerticalStep
            key={index}
            step={step}
            index={index}
            status={status}
            isLast={isLast}
            clickable={clickable}
            onStepPress={onStepPress}
            theme={theme}
          />
        );
      })}
    </View>
  );
}

StepperInner.displayName = 'Stepper';

export const Stepper = memo(StepperInner);

// ---- Internal sub-components ----

interface StepProps {
  step: StepItem;
  index: number;
  status: StepStatus;
  isLast: boolean;
  clickable: boolean;
  onStepPress: ((index: number) => void) | undefined;
  theme: ReturnType<typeof useTheme>;
}

function useStepColors(status: StepStatus, theme: ReturnType<typeof useTheme>) {
  const circleBackgroundColor =
    status === 'completed'
      ? theme.colors.green[500]
      : status === 'active'
        ? theme.colors.blue[500]
        : 'transparent';

  const circleBorderColor =
    status === 'completed'
      ? theme.colors.green[500]
      : status === 'active'
        ? theme.colors.blue[500]
        : theme.colors.gray[300];

  const circleTextColor =
    status === 'completed' || status === 'active'
      ? '#ffffff'
      : theme.colors.gray[400];

  const connectorColor =
    status === 'completed'
      ? theme.colors.green[500]
      : status === 'active'
        ? theme.colors.blue[500]
        : theme.colors.gray[200];

  const labelColor =
    status === 'active' || status === 'completed'
      ? theme.semantic.text.primary
      : theme.semantic.text.muted;

  return {
    circleBackgroundColor,
    circleBorderColor,
    circleTextColor,
    connectorColor,
    labelColor,
    descriptionColor: theme.semantic.text.muted,
  };
}

function StepCircle({
  index,
  status,
  colors,
  theme,
}: {
  index: number;
  status: StepStatus;
  colors: ReturnType<typeof useStepColors>;
  theme: ReturnType<typeof useTheme>;
}) {
  const circleStyle: ViewStyle = {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: theme.radius.full,
    backgroundColor: colors.circleBackgroundColor,
    borderWidth: 2,
    borderColor: colors.circleBorderColor,
    alignItems: 'center',
    justifyContent: 'center',
  };

  const circleTextStyle: TextStyle = {
    fontFamily: theme.fontFamily.sans,
    fontSize: theme.fontSize[13],
    fontWeight: theme.fontWeight.bold,
    color: colors.circleTextColor,
  };

  return (
    <View style={circleStyle}>
      <Text style={circleTextStyle}>
        {status === 'completed' ? '✓' : `${index + 1}`}
      </Text>
    </View>
  );
}

function HorizontalStep({
  step,
  index,
  status,
  isLast,
  clickable,
  onStepPress,
  theme,
}: StepProps) {
  const colors = useStepColors(status, theme);

  const wrapperStyle: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    flex: isLast ? 0 : 1,
  };

  const labelGroupStyle: ViewStyle = {
    marginLeft: 8,
  };

  const labelStyle: TextStyle = {
    fontFamily: theme.fontFamily.sans,
    fontSize: theme.fontSize[14],
    fontWeight: status === 'active' ? theme.fontWeight.medium : theme.fontWeight.regular,
    color: colors.labelColor,
  };

  const descriptionStyle: TextStyle = {
    fontFamily: theme.fontFamily.sans,
    fontSize: theme.fontSize[13],
    fontWeight: theme.fontWeight.regular,
    color: colors.descriptionColor,
    marginTop: 2,
  };

  const connectorStyle: ViewStyle = {
    flex: 1,
    height: 2,
    backgroundColor: colors.connectorColor,
    marginLeft: 8,
    marginRight: 8,
    minWidth: 16,
  };

  const handlePress = clickable ? () => onStepPress?.(index) : undefined;

  const stepContent = (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <StepCircle index={index} status={status} colors={colors} theme={theme} />
      <View style={labelGroupStyle}>
        <Text style={labelStyle}>{step.label}</Text>
        {step.description != null && (
          <Text style={descriptionStyle}>{step.description}</Text>
        )}
      </View>
    </View>
  );

  return (
    <View style={wrapperStyle}>
      {clickable ? (
        <Pressable onPress={handlePress}>{stepContent}</Pressable>
      ) : (
        stepContent
      )}
      {!isLast && <View style={connectorStyle} />}
    </View>
  );
}

function VerticalStep({
  step,
  index,
  status,
  isLast,
  clickable,
  onStepPress,
  theme,
}: StepProps) {
  const colors = useStepColors(status, theme);

  const wrapperStyle: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'stretch',
  };

  const circleColumnStyle: ViewStyle = {
    alignItems: 'center',
    width: CIRCLE_SIZE,
  };

  const verticalConnectorStyle: ViewStyle = {
    width: 2,
    flex: 1,
    backgroundColor: colors.connectorColor,
    marginTop: 4,
    marginBottom: 4,
    minHeight: 20,
  };

  const labelGroupStyle: ViewStyle = {
    marginLeft: 12,
    paddingBottom: isLast ? 0 : 24,
  };

  const labelStyle: TextStyle = {
    fontFamily: theme.fontFamily.sans,
    fontSize: theme.fontSize[14],
    fontWeight: status === 'active' ? theme.fontWeight.medium : theme.fontWeight.regular,
    color: colors.labelColor,
  };

  const descriptionStyle: TextStyle = {
    fontFamily: theme.fontFamily.sans,
    fontSize: theme.fontSize[13],
    fontWeight: theme.fontWeight.regular,
    color: colors.descriptionColor,
    marginTop: 2,
  };

  const handlePress = clickable ? () => onStepPress?.(index) : undefined;

  const labelContent = (
    <View style={labelGroupStyle}>
      <Text style={labelStyle}>{step.label}</Text>
      {step.description != null && (
        <Text style={descriptionStyle}>{step.description}</Text>
      )}
    </View>
  );

  return (
    <View style={wrapperStyle}>
      <View style={circleColumnStyle}>
        {clickable ? (
          <Pressable onPress={handlePress}>
            <StepCircle index={index} status={status} colors={colors} theme={theme} />
          </Pressable>
        ) : (
          <StepCircle index={index} status={status} colors={colors} theme={theme} />
        )}
        {!isLast && <View style={verticalConnectorStyle} />}
      </View>
      {clickable ? (
        <Pressable onPress={handlePress}>{labelContent}</Pressable>
      ) : (
        labelContent
      )}
    </View>
  );
}
