/* eslint-env jest */

import React from 'react';
import { shallow, mount } from 'enzyme';

jest.mock('../icons/oe-icons.less', () => {});
jest.mock('./alerts.less', () => {});

import Icon from '../icons/Icon';

import Alert from './Alert';

let instanceToRender;

beforeEach(() => {
  instanceToRender = (
    <Alert
      type="success"
      header="alert header"
      additionalText="test alert text"
    />
  );
});

function getShallowInstance() {
  return shallow(instanceToRender);
}

function getMountedInstance(props) {
  mount(instanceToRender);
  return mount(instanceToRender).setProps(props);
}

it('alert has the alert role', () => {
  const instance = getShallowInstance();
  expect(instance.prop('role')).toBe('alert');
});

it('applies the appropriate alert classes based on the type', () => {
  const instance = getShallowInstance();
  expect(instance.hasClass('alert')).toBe(true);
  expect(instance.hasClass('alert__success')).toBe(true);
});

it('header text is emphasized by strong tag', () => {
  const instance = getShallowInstance();
  expect(instance.find('strong').text()).toBe('alert header');
});

it('alert has dismissable button when dismissable is true', () => {
  const instance = getMountedInstance();
  expect(instance.find('.alert__dismiss').length).toBe(0);

  instance.setProps({ dismissable: true });

  expect(instance.find('.alert__dismiss').length).toBe(1);
});

it('alert prepends icon appropriate to type when includeIcon is true', () => {
  const instance = getMountedInstance();
  expect(instance.find(Icon).length).toBe(0);

  instance.setProps({ includeIcon: true });

  expect(instance.find(Icon).length).toBe(1);
});

describe('when callsToAction are provided', () => {
  const primaryAction = jest.fn();
  const secondaryAction = jest.fn();
  const tertiaryAction = jest.fn();

  const callsToAction = [
    {
      actionButtonContent: 'primary',
      action: primaryAction
    },
    {
      actionButtonContent: 'secondary',
      action: secondaryAction
    },
    {
      actionButtonContent: 'tertiary',
      action: tertiaryAction
    }
  ];

  const instanceProps = { callsToAction };

  let instance;


  beforeEach(() => {
    instance = getMountedInstance(instanceProps);
  });

  it('adds a button with the btn-primary class for the first call to action', () => {
    expect(instance.find('.btn').first().hasClass('btn-primary')).toBe(true);
  });

  it('adds additional buttons with btn-default class for any additional call to action', () => {
    const buttons = instance.find('.btn').not('.btn-primary');

    expect(buttons.every('.btn-default')).toBe(true);
  });

  it('executes callToAction function provided to the button', () => {
    const button = instance.find('.btn-primary');

    button.simulate('click');

    expect(primaryAction.mock.calls.length).toBe(1);
  });
});
