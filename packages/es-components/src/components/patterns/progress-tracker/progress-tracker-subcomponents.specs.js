/* eslint-env jest */

import React from 'react';
import { waitFor, cleanup } from '@testing-library/react';
import viaTheme from 'es-components-via-theme';
import useUniqueId from '../../util/useUniqueId';

jest.mock('../../util/useUniqueId');

import {
  ProgressContainer,
  ProgressItem
} from './progress-tracker-subcomponents';
import { renderWithTheme } from '../../util/test-utils';
import sizes from './pt-sizes';

const { ACTIVE, INACTIVE } = sizes;

function getInstance(ComponentType, props) {
  return renderWithTheme(<ComponentType {...props} />);
}

beforeEach(async () => {
  await useUniqueId.mockImplementation(() => '123');
});

it('breaks the background line at the expected point in ProgressContainer', () => {
  const expectedPercentages = [
    { numberOfSteps: 2, percentage: 100 },
    { numberOfSteps: 3, percentage: 50 },
    { numberOfSteps: 4, percentage: (1 / 3) * 100 },
    { numberOfSteps: 5, percentage: 25 }
  ];

  const { gray9, gray5 } = viaTheme.colors;

  expectedPercentages.forEach(({ numberOfSteps, percentage }) => {
    const { getByTestId } = getInstance(ProgressContainer, {
      'data-testid': 'progress-tracker',
      activeStepIndex: 1,
      numberOfSteps
    });

    expect(getByTestId('progress-tracker')).toHaveStyleRule(
      'background-image',
      `linear-gradient( to right,${gray9} 0%,${gray9} ${percentage}%,${gray5} ${percentage}%,${gray5} 100% )`
    );
    cleanup();
  });
});

it('sets the appropriate margin-top when inactive', () => {
  const { container } = getInstance(ProgressItem, {
    active: false,
    isPastStep: false,
    numberOfSteps: 2
  });
  const topMargin = ACTIVE / 2 - INACTIVE / 2;

  const instance = container.querySelector('button');
  waitFor(() => {
    expect(instance).toHaveStyleRule('margin-top', `${topMargin}px`);
    expect(instance).not.toHaveStyleRule('margin-top', '0');
    expect(instance).toHaveStyleRule('margin-top', '0', {
      media: `(min-width:${viaTheme.screenSize.tablet})`
    });
  });
});

it('sets the appropriate margin-top when active', () => {
  const { container } = getInstance(ProgressItem, {
    active: true,
    isPastStep: false,
    numberOfSteps: 2
  });

  const instance = container.querySelector('button');

  waitFor(() => {
    expect(instance).toHaveStyleRule('margin-top', '0');
    expect(instance).toHaveStyleRule('margin-top', '0', {
      media: `(min-width:${viaTheme.screenSize.tablet})`
    });
  });
});

it('sets the appropriate styles for isPastStep', () => {
  const { container } = getInstance(ProgressItem, {
    active: false,
    isPastStep: true,
    numberOfSteps: 2
  });

  const instance = container.querySelector('button');

  waitFor(() => {
    expect(instance).toMatchSnapshot();
  });
});

it('cannot be clicked when not isPastStep', () => {
  const clicked = jest.fn();
  const { container } = getInstance(ProgressItem, {
    active: false,
    isPastStep: false,
    numberOfSteps: 2,
    onPastStepClicked: clicked
  });
  const instance = container.querySelector('button');

  instance.click();
  waitFor(() => {
    expect(clicked).not.toHaveBeenCalled();
  });
});

it('can be clicked when isPastStep', () => {
  const clicked = jest.fn();
  const { container } = getInstance(ProgressItem, {
    active: false,
    isPastStep: true,
    numberOfSteps: 2,
    onPastStepClicked: clicked
  });

  const instance = container.querySelector('button');
  instance.click();
  waitFor(() => {
    expect(clicked).toHaveBeenCalled();
  });
});
