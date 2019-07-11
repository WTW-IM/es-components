/* eslint-env jest */

import React from 'react';
import { cleanup } from 'react-testing-library';
import { renderWithTheme } from '../../util/test-utils';

import Drawer from './Drawer';

jest.mock('../../util/generateAlphaName', () => () => 'abcdef');

const buildDrawer = props => (
  <Drawer className="important" {...props}>
    <Drawer.Panel
      title="collapse 1"
      key="1"
      className="first"
      titleAside="side text"
    >
      first
    </Drawer.Panel>
    <Drawer.Panel title="collapse 2" key="2" className="second" noPadding>
      second
    </Drawer.Panel>
    <Drawer.Panel title="collapse 3" key="3" className="third">
      third
    </Drawer.Panel>
  </Drawer>
);

beforeEach(cleanup);

describe('drawer', () => {
  it('active panel is opened', () => {
    const onActiveKeysChanged = jest.fn();
    const { getByText } = renderWithTheme(
      buildDrawer({ onActiveKeysChanged, activeKeys: ['1'] })
    );

    expect(getByText('first')).toBeVisible();
    expect(getByText('second')).not.toBeVisible();
    expect(getByText('third')).not.toBeVisible();
  });

  it('allows multiple panels to be opened at the same time', () => {
    const onActiveKeysChanged = jest.fn();
    const { getByText } = renderWithTheme(
      buildDrawer({ onActiveKeysChanged, activeKeys: ['1', '3'] })
    );

    expect(getByText('first')).toBeVisible();
    expect(getByText('second')).not.toBeVisible();
    expect(getByText('third')).toBeVisible();
  });
});

describe('accordion', () => {
  const isAccordion = true;

  it('should only allow one drawer to be opened at a time', () => {
    const onActiveKeysChanged = jest.fn();
    const { getByText } = renderWithTheme(
      buildDrawer({ isAccordion, onActiveKeysChanged, activeKeys: ['1', '2'] })
    );

    expect(getByText('first')).toBeVisible();
    expect(getByText('second')).not.toBeVisible();
  });
});
