import React from 'react';
import { screen } from '@testing-library/react';

import { renderWithTheme } from '../../util/test-utils';
import useUniqueId from '../../util/useUniqueId';
import ProgressTracker, { Step } from './ProgressTracker';

jest.mock('../../util/useUniqueId');

function doMocks() {
  const useUnId = useUniqueId as jest.Mock;
  useUnId.mockImplementationOnce(() => '1');
  useUnId.mockImplementationOnce(() => '2');
  useUnId.mockImplementationOnce(() => '3');
}

afterEach(() => {
  jest.resetAllMocks();
});

test.each<Step[][]>([
  [
    [
      { label: 'step 1', active: true },
      { label: 'step 2', active: false },
      { label: 'step 3', active: false }
    ]
  ],
  [
    [
      { label: 'step 1', active: false },
      { label: 'step 2', active: true },
      { label: 'step 3', active: false }
    ]
  ],
  [
    [
      { label: 'step 1', active: false },
      { label: 'step 2', active: false },
      { label: 'step 3', active: true }
    ]
  ]
])(`ProgressTracker renders as expected`, async steps => {
  doMocks();
  renderWithTheme(<ProgressTracker steps={steps} />);
  expect(await screen.findByTestId('progress-tracker')).toMatchSnapshot();
});
