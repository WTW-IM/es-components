import React from 'react';
import { waitFor, screen } from '@testing-library/react';
import viaTheme from 'es-components-via-theme';

jest.mock('../../util/useUniqueId', () => ({
  __esModule: true,
  default: jest.fn(() => '123')
}));

import {
  ProgressContainer,
  ProgressItem
} from './progress-tracker-subcomponents';
import { renderWithTheme } from '../../util/test-utils';
import sizes from './pt-sizes';

const { ACTIVE, INACTIVE } = sizes;

test.each([
  { numberOfSteps: 2, percentage: 100 },
  { numberOfSteps: 3, percentage: 50 },
  { numberOfSteps: 4, percentage: (1 / 3) * 100 },
  { numberOfSteps: 5, percentage: 25 }
])(
  'with $numberOfSteps steps, breaks the background line at $percentage%',
  ({ numberOfSteps, percentage }) => {
    const { gray9, gray5 } = viaTheme.colors;
    renderWithTheme(
      <ProgressContainer
        data-testid="progress-tracker"
        activeStepIndex={1}
        numberOfSteps={numberOfSteps}
      />
    );

    expect(screen.getByTestId('progress-tracker')).toHaveStyle(`
      background-image: linear-gradient(
          to right,
          ${gray9} 0%,
          ${gray9} ${percentage}%,
          ${gray5} ${percentage}%,
          ${gray5} 100%)
    `);
  }
);

it('sets the appropriate margin-top when inactive', async () => {
  renderWithTheme(
    <ProgressItem active={false} isPastStep={false} numberOfSteps={2} />
  );
  const topMargin = ACTIVE / 2 - INACTIVE / 2;

  const instance = await screen.findByRole('button');
  expect(instance).toHaveStyle(`
    margin-top: ${topMargin}px;
  `);
  expect(instance).toHaveStyleRule('margin-top', '0', {
    media: `(min-width:${viaTheme.screenSize.tablet})`
  });
});

it('sets the appropriate margin-top when active', async () => {
  renderWithTheme(
    <ProgressItem active={true} isPastStep={false} numberOfSteps={2} />
  );

  const instance = await screen.findByRole('button');

  await waitFor(() => {
    expect(instance).toHaveStyle('margin-top: 0');
  });
  expect(instance).toHaveStyleRule('margin-top', '0', {
    media: `(min-width:${viaTheme.screenSize.tablet})`
  });
});

it('sets the appropriate styles for isPastStep', () => {
  renderWithTheme(
    <ProgressItem active={false} isPastStep={true} numberOfSteps={2} />
  );

  const instance = screen.getByRole('button');
  expect(instance).toMatchSnapshot();
});

it('cannot be clicked when not isPastStep', async () => {
  const clicked = jest.fn();
  renderWithTheme(
    <ProgressItem
      active={false}
      isPastStep={false}
      numberOfSteps={2}
      onPastStepClicked={clicked}
    />
  );
  const instance = await screen.findByRole('button');

  instance.click();
  await waitFor(() => {
    expect(clicked).not.toHaveBeenCalled();
  });
});

it('can be clicked when isPastStep', async () => {
  const clicked = jest.fn();
  renderWithTheme(
    <ProgressItem
      active={false}
      isPastStep={true}
      numberOfSteps={2}
      onPastStepClicked={clicked}
    />
  );

  const instance = await screen.findByRole('button');
  instance.click();
  await waitFor(() => {
    expect(clicked).toHaveBeenCalled();
  });
});
