/* eslint-env jest */

import React from 'react';
import { cleanup } from '@testing-library/react';

import { renderWithTheme } from '../../util/test-utils';
import useUniqueId from '../../util/useUniqueId';
import ProgressTracker from './ProgressTracker';

jest.mock('../../util/useUniqueId');

function getInstance(props) {
  return renderWithTheme(<ProgressTracker {...props} />);
}

beforeEach(async () => {
  await useUniqueId.mockImplementationOnce(() => '1');
  await useUniqueId.mockImplementationOnce(() => '2');
  await useUniqueId.mockImplementationOnce(() => '3');
  await useUniqueId.mockImplementationOnce(() => '1');
  await useUniqueId.mockImplementationOnce(() => '2');
  await useUniqueId.mockImplementationOnce(() => '3');
  await useUniqueId.mockImplementationOnce(() => '1');
  await useUniqueId.mockImplementationOnce(() => '2');
  await useUniqueId.mockImplementationOnce(() => '3');
});
it('builds a ProgressTracker', () => {
  const stepsToTest = [
    [
      { label: 'step 1', active: true },
      { label: 'step 2', active: false },
      { label: 'step 3', active: false }
    ],
    [
      { label: 'step 1', active: false },
      { label: 'step 2', active: true },
      { label: 'step 3', active: false }
    ],
    [
      { label: 'step 1', active: false },
      { label: 'step 2', active: false },
      { label: 'step 3', active: true }
    ]
  ];
  stepsToTest.forEach(steps => {
    const { getByTestId } = getInstance({ steps });
    expect(getByTestId('progress-tracker')).toMatchSnapshot();
    cleanup();
  });
});
