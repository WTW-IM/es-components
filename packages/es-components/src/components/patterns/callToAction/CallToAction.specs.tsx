import React from 'react';
import { screen } from '@testing-library/react';
import CallToAction from './CallToAction';
import LightCallToAction from './LightCallToAction';
import { renderWithTheme } from '../../util/test-utils';
import Action from './Action';

test.each([
  {
    Container: CallToAction,
    ContainerName: 'CallToAction',
    actionsWithinNotification: false
  },
  {
    Container: LightCallToAction,
    ContainerName: 'LightCallToAction',
    actionsWithinNotification: true
  }
])(
  'properly renders a $ContainerName',
  async ({ Container, actionsWithinNotification }) => {
    renderWithTheme(
      <Container type="success">
        <div>First</div>
        <Action>First Action</Action>
        <Action>Second Action</Action>
        <p>A paragraph</p>
        <Action>Primary Action</Action>
        <h3>A third level header</h3>
      </Container>
    );

    /* eslint-disable testing-library/no-node-access */
    const actionsParent = (
      await screen.findByRole('button', { name: /First Action/ })
    ).parentElement;
    const nonActionsParent = (await screen.findByText(/First(?! Action)/))
      .parentElement;
    const notificationParent = nonActionsParent?.parentElement;
    /* eslint-enable testing-library/no-node-access */

    expect(notificationParent?.contains(actionsParent)).toBe(
      actionsWithinNotification
    );

    expect(await screen.findByText(/First(?! Action)/)).toEqual(
      nonActionsParent?.childNodes[0]
    );
    expect(await screen.findByText(/A paragraph/)).toEqual(
      nonActionsParent?.childNodes[1]
    );
    expect(
      await screen.findByRole('heading', { name: /a third level header/i })
    ).toEqual(nonActionsParent?.childNodes[2]);

    expect(await screen.findByRole('button', { name: /First Action/ })).toEqual(
      actionsParent?.childNodes[0]
    );
    expect(
      await screen.findByRole('button', { name: /Second Action/ })
    ).toEqual(actionsParent?.childNodes[1]);
    expect(
      await screen.findByRole('button', { name: /Primary Action/ })
    ).toEqual(actionsParent?.childNodes[2]);
  }
);
