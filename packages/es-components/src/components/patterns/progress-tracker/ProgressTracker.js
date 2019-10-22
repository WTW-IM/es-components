import React from 'react';
import { withTheme } from 'styled-components';
import PropTypes from 'prop-types';
import {
  ProgressContainer,
  ProgressItem
} from './progress-tracker-subcomponents';

const getMappedSteps = (steps, onPastStepClicked, onFutureStepClicked) => {
  let isPastStep = true;
  return steps.map((step, index) => {
    isPastStep = !(step.active || !isPastStep);
    return (
      <ProgressItem
        /* eslint-disable react/no-array-index-key */
        key={`${index}-${step.label}`}
        /* eslint-enable */
        active={step.active}
        isPastStep={isPastStep}
        numberOfSteps={steps.length}
        onPastStepClicked={() => onPastStepClicked(index)}
        canClickFutureStep={
          onFutureStepClicked !== null && onFutureStepClicked !== undefined
        }
        onFutureStepClicked={() => onFutureStepClicked(index)}
        label={step.label}
      />
    );
  });
};

const getIndexOfActiveStep = steps => steps.findIndex(step => step.active);

function ProgressTracker({ steps, onPastStepClicked, onFutureStepClicked }) {
  return (
    <ProgressContainer
      data-testid="progress-tracker"
      activeStepIndex={getIndexOfActiveStep(steps)}
      numberOfSteps={steps.length}
    >
      {getMappedSteps(steps, onPastStepClicked, onFutureStepClicked)}
    </ProgressContainer>
  );
}

ProgressTracker.propTypes = {
  steps: PropTypes.arrayOf(
    PropTypes.shape({
      active: PropTypes.bool,
      label: PropTypes.string
    })
  ),
  onPastStepClicked: PropTypes.func,
  onFutureStepClicked: PropTypes.func
};

ProgressTracker.defaultProps = {
  steps: [],
  onPastStepClicked() {},
  onFutureStepClicked: null
};

export default withTheme(ProgressTracker);
