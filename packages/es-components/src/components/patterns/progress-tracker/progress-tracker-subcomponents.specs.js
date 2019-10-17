/* eslint-env jest */

import React from 'react';
import { wait } from 'react-testing-library';
import viaTheme from 'es-components-via-theme';
import 'jest-styled-components';

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

it('breaks the background line at the expected point in ProgressContainer', () => {
  const expectedPercentages = [
    { numberOfSteps: 2, percentage: 100 },
    { numberOfSteps: 3, percentage: 50 },
    { numberOfSteps: 4, percentage: (1 / 3) * 100 },
    { numberOfSteps: 5, percentage: 25 }
  ];
  expectedPercentages.forEach(({ numberOfSteps, percentage }) => {
    const { getByTestId } = getInstance(ProgressContainer, {
      'data-testid': 'progress-tracker',
      activeStepIndex: 1,
      numberOfSteps
    });

    wait(() => {
      const { gray9, gray5 } = viaTheme.colors;

      expect(getByTestId('progress-tracker')).toHaveStyleRule(
        'background-image',
        `linear-gradient( to right,${gray9} 0%,${gray9} ${percentage}%,${gray5} ${percentage}%,${gray5} 100% )`
      );
    });
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
  wait(() => {
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

  wait(() => {
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

  wait(() => {
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
  wait(() => {
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
  wait(() => {
    expect(clicked).toHaveBeenCalled();
  });
});
