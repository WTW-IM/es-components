import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithTheme } from '../../util/test-utils';
import useUniqueId from '../../util/useUniqueId';
import ProgressTracker, {
  ProgressTrackerInternalProps,
  Step
} from './ProgressTracker';

jest.mock('../../util/useUniqueId');

function doMocks() {
  const useUnId = useUniqueId as jest.Mock;
  useUnId.mockImplementationOnce(() => '1');
  useUnId.mockImplementationOnce(() => '2');
  useUnId.mockImplementationOnce(() => '3');
  useUnId.mockImplementationOnce(() => '4');
}

afterEach(() => {
  jest.resetAllMocks();
});

test.each<
  Omit<ProgressTrackerInternalProps, 'steps'> & {
    steps: Step[];
  }
>([
  {
    steps: [
      { label: 'step 1', active: true },
      { label: 'step 2', active: false },
      { label: 'step 3', active: false }
    ]
  },
  {
    steps: [
      { label: 'step 1', active: false },
      { label: 'step 2', active: true },
      { label: 'step 3', active: false }
    ]
  },
  {
    steps: [
      { label: 'step 1', active: false },
      { label: 'step 2', active: false },
      { label: 'step 3', active: true }
    ]
  },
  {
    steps: [
      { label: 'step 1', active: false },
      { label: 'step 2', active: false },
      { label: 'step 3', active: true }
    ]
  }
])(`ProgressTracker renders as expected`, async ({ steps }) => {
  doMocks();
  renderWithTheme(<ProgressTracker steps={steps} />);
  expect(await screen.findByTestId('progress-tracker')).toMatchSnapshot();
});

test.each<
  Omit<ProgressTrackerInternalProps, 'steps' | 'onPastStepClicked'> & {
    steps: Step[];
    onPastStepClicked: jest.Mock;
  }
>([
  {
    steps: [
      { label: 'step 1', active: false },
      { label: 'step 2', active: false },
      { label: 'step 3', active: true },
      { label: 'step 4', active: false }
    ],
    onPastStepClicked: jest.fn()
  },
  {
    steps: [
      { label: 'step 1', active: false },
      { label: 'step 2', active: false },
      { label: 'step 3', active: true },
      { label: 'step 4', active: false }
    ],
    onPastStepClicked: jest.fn(),
    onFutureStepClicked: jest.fn()
  }
])(`ProgressTracker steps are clicked as expected`, async props => {
  const { steps, onPastStepClicked, onFutureStepClicked } = props;
  doMocks();
  renderWithTheme(<ProgressTracker {...props} />);
  const firstStep = steps[0];
  await userEvent.click(await screen.findByLabelText(firstStep.label || ''));
  expect(onPastStepClicked).toHaveBeenCalled();

  const lastStep = steps[steps.length - 1];
  const lastStepEl = await screen.findByLabelText(lastStep.label || '');
  await userEvent.click(lastStepEl, { pointerEventsCheck: 0 });

  // eslint-disable-next-line jest/valid-expect
  const disabledExpect = expect(lastStepEl);
  const disabledExpectChain = onFutureStepClicked
    ? disabledExpect.not
    : disabledExpect;
  disabledExpectChain.toBeDisabled();

  // eslint-disable-next-line jest/valid-expect
  const futureExpect = expect(onFutureStepClicked || jest.fn());
  const clickExpectChain = onFutureStepClicked
    ? futureExpect
    : futureExpect.not;
  clickExpectChain.toHaveBeenCalled();
});
