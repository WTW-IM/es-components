/* eslint-env jest */
import React from 'react';
import StatusTracker from './StatusTracker';
import { renderWithTheme } from '../../util/test-utils';

describe('StatusTracker', () => {
  let planStates;

  beforeEach(() => {
    planStates = ['step 1', 'step 2', 'step 3', 'step 4'];
  });

  it('should display the third step with the active class', () => {
    const { container } = renderWithTheme(
      <StatusTracker statusArray={planStates} step={3} />
    );

    expect(container).toMatchSnapshot();
  });

  it('should display the first step with the active class', () => {
    const { container } = renderWithTheme(
      <StatusTracker statusArray={planStates} step={1} />
    );

    expect(container).toMatchSnapshot();
  });

  it('should display the last step with the active class', () => {
    const { container } = renderWithTheme(
      <StatusTracker statusArray={planStates} step={4} />
    );

    expect(container).toMatchSnapshot();
  });

  it('should display the last step with the error class when isErrorState is true', () => {
    const { container } = renderWithTheme(
      <StatusTracker isErrorState statusArray={planStates} step={4} />
    );

    expect(container).toMatchSnapshot();
  });
});
