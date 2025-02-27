import React from 'react';
import PropTypes from 'prop-types';
import {
  ProgressContainer,
  ProgressItem
} from './progress-tracker-subcomponents';
import noop from '../../util/noop';

export interface Step {
  label?: Maybe<string>;
  active?: Maybe<boolean>;
}

export interface ProgressTrackerInternalProps {
  steps?: Step[];
  onPastStepClicked?: (index: number) => void;
  onFutureStepClicked?: (index: number) => void;
  showNav?: boolean;
}

export type ProgressTrackerProps = Override<
  JSXElementProps<'ol'>,
  ProgressTrackerInternalProps
>;

const getMappedSteps = ({
  steps,
  onPastStepClicked,
  onFutureStepClicked,
  showNav
}: Override<
  ProgressTrackerInternalProps,
  Omit<Required<ProgressTrackerInternalProps>, 'onFutureStepClicked'>
>) => {
  let isPastStep = true;
  return steps.map((step, index) => {
    isPastStep = !(step.active || !isPastStep);
    return (
      <ProgressItem
        key={`${index}-${step.label}`}
        active={step.active}
        isPastStep={isPastStep}
        numberOfSteps={steps.length}
        onPastStepClicked={() => onPastStepClicked(index)}
        onFutureStepClicked={() => onFutureStepClicked?.(index)}
        canClickFutureStep={Boolean(onFutureStepClicked)}
        label={step.label || ''}
        showNav={showNav}
      />
    );
  });
};

const getIndexOfActiveStep = (steps: Step[]) =>
  steps.findIndex(step => step.active);

const ProgressTracker = React.forwardRef<
  HTMLOListElement,
  ProgressTrackerProps
>(function ForwardedProgressTracker(
  {
    steps = [],
    onPastStepClicked = noop,
    onFutureStepClicked,
    showNav = true,
    ...props
  },
  ref
) {
  return (
    <ProgressContainer
      ref={ref}
      data-testid="progress-tracker"
      $activeStepIndex={getIndexOfActiveStep(steps)}
      $numberOfSteps={steps.length}
      {...props}
    >
      {getMappedSteps({
        steps,
        onPastStepClicked,
        onFutureStepClicked,
        showNav
      })}
    </ProgressContainer>
  );
});

ProgressTracker.propTypes = {
  steps: PropTypes.arrayOf<Step>(
    PropTypes.shape({
      active: PropTypes.bool,
      label: PropTypes.string
    }).isRequired
  ),
  onPastStepClicked: PropTypes.func,
  onFutureStepClicked: PropTypes.func,
  showNav: PropTypes.bool
};

export default ProgressTracker;
