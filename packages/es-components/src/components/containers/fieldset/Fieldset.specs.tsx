import React from 'react';
import { screen } from '@testing-library/react';
import viaTheme from 'es-components-via-theme';
import { renderWithTheme } from '../../util/test-utils';
import OrientationContext, {
  Orientation
} from '../../controls/OrientationContext';

import Fieldset from './Fieldset';

it('renders legend when legendContent is provided', () => {
  renderWithTheme(
    <Fieldset legendContent="I am legend">
      <div>Fieldset child</div>
    </Fieldset>
  );

  expect(screen.getByText('I am legend')).toBeInTheDocument();
});

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace jest {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface Matchers<R, T> {
      toHaveOrientation(orientation: Orientation): R;
    }
  }
}

expect.extend({
  /* eslint-disable jest/no-standalone-expect */
  toHaveOrientation(received: HTMLElement, orientation: Orientation) {
    const styleRuleArgs = [
      'flex-direction',
      'row',
      {
        media: `(min-width:${viaTheme.screenSize.tablet})`
      }
    ] as const;

    let pass = true;
    let message = `expected Fieldset to have ${orientation} orientation`;
    try {
      if (orientation === 'stacked') {
        expect(received).not.toHaveStyleRule(...styleRuleArgs);
      } else {
        expect(received).toHaveStyleRule(...styleRuleArgs);
      }
    } catch (err) {
      console.log(this.utils.printReceived(received));
      pass = false;
      message = (err as Error).message;
    }

    return {
      pass,
      message: () => message
    };
  }
  /* eslint-enable jest/no-standalone-expect */
});

test.each<{
  providerOrientation: Orientation;
  fieldsetOrientation?: Orientation;
  expectedOrientation: Orientation;
}>([
  {
    providerOrientation: 'stacked',
    fieldsetOrientation: undefined,
    expectedOrientation: 'stacked'
  },
  {
    providerOrientation: 'stacked',
    fieldsetOrientation: 'stacked',
    expectedOrientation: 'stacked'
  },
  {
    providerOrientation: 'stacked',
    fieldsetOrientation: 'inline',
    expectedOrientation: 'inline'
  },
  {
    providerOrientation: 'inline',
    fieldsetOrientation: undefined,
    expectedOrientation: 'inline'
  },
  {
    providerOrientation: 'inline',
    fieldsetOrientation: 'stacked',
    expectedOrientation: 'stacked'
  },
  {
    providerOrientation: 'inline',
    fieldsetOrientation: 'inline',
    expectedOrientation: 'inline'
  }
])(
  `renders with orientation $expectedOrientation when provider orientation is $providerOrientation and fieldset orientation is $fieldsetOrientation`,
  async ({ providerOrientation, fieldsetOrientation, expectedOrientation }) => {
    renderWithTheme(
      <OrientationContext.Provider value={providerOrientation}>
        <Fieldset legendContent="I am legend" orientation={fieldsetOrientation}>
          <div>Fieldset child</div>
        </Fieldset>
      </OrientationContext.Provider>
    );
    const fieldset = await screen.findByRole('group', { name: /i am legend/i });
    expect(fieldset).toHaveOrientation(expectedOrientation);
  }
);
