/* eslint-env jest */

import React from 'react';
import { mountWithTheme } from '../../../testing';

import { DropdownButton } from './DropdownButton';
import Button from './Button';

const onClick = jest.fn();

it('opens/closes dropdown on click', () => {
  const instance = mountWithTheme(
    <DropdownButton buttonValue="Button">
      <DropdownButton.Button handleOnClick={onClick}>
        Inner
      </DropdownButton.Button>
    </DropdownButton>
  );
  const button = instance.find(Button).first();
  button.simulate('click');
  expect(instance.state().isOpen).toBe(true);

  button.simulate('click');
  expect(instance.state().isOpen).toBe(false);
});

it('updates buttonValue on child click when shouldUpdateButtonValue is true', () => {
  const innerContents = 'Inner';
  const instance = mountWithTheme(
    <DropdownButton buttonValue="Button" shouldUpdateButtonValue>
      <DropdownButton.Button handleOnClick={onClick}>
        {innerContents}
      </DropdownButton.Button>
    </DropdownButton>
  );

  instance.simulate('click');
  instance.find(DropdownButton.Button).simulate('click');
  expect(instance.state().buttonValue).toBe(innerContents);
});

it('closes dropdown on child click when shouldCloseOnButtonClick', () => {
  const instance = mountWithTheme(
    <DropdownButton buttonValue="Button" shouldCloseOnButtonClick>
      <DropdownButton.Button handleOnClick={onClick}>
        Content
      </DropdownButton.Button>
    </DropdownButton>
  );

  instance.simulate('click');
  instance.find(DropdownButton.Button).simulate('click');
  expect(instance.state().isOpen).toBe(false);
});
