/* eslint-env jest */

import React from 'react';
import { fireEvent, cleanup, wait } from 'react-testing-library';

import Modal from './Modal';
import ModalHeader from './ModalHeader';
import ModalBody from './ModalBody';
import ModalFooter from './ModalFooter';
import { renderWithTheme } from '../../util/test-utils';

jest.mock('../../util/generateAlphaName', () => () => 'abcdef');

beforeEach(cleanup);

function renderModal(modalProps) {
  return renderWithTheme(
    <Modal show {...modalProps}>
      <ModalHeader>Header</ModalHeader>
      <ModalBody>Body</ModalBody>
      <ModalFooter>Footer</ModalFooter>
    </Modal>
  );
}

it('invokes functions when triggered', () => {
  const onEnter = jest.fn();
  const onHide = jest.fn();

  const { getByText } = renderModal({ onEnter, onHide });

  expect(onEnter).toHaveBeenCalled();

  getByText('Header')
    .parentElement.querySelector('button')
    .click();
  expect(onHide).toHaveBeenCalled();
});

it('renders different modal sections', () => {
  const onEnter = jest.fn();
  const onHide = jest.fn();

  const { getByText } = renderModal({ onEnter, onHide });

  expect(onEnter).toHaveBeenCalled();

  expect(getByText('Header')).toMatchSnapshot();
  expect(getByText('Body')).toMatchSnapshot();
  expect(getByText('Footer')).toMatchSnapshot();
});

it('hides dismiss button when hideCloseButton is true', () => {
  const { getByText } = renderWithTheme(
    <Modal show>
      <ModalHeader hideCloseButton>Header</ModalHeader>
      <ModalBody>Body</ModalBody>
      <ModalFooter>Footer</ModalFooter>
    </Modal>
  );
  expect(getByText('Header').parentElement.querySelector('button')).toBeNull();
});

it('passes through class names', () => {
  const { container } = renderModal({ className: 'myclass' });
  const element = container.parentElement.querySelector('.myclass');
  expect(element).not.toBeNull();
});

describe('when ESC is pressed', () => {
  it('invokes onHide by default', () => {
    const onHide = jest.fn();
    const { container } = renderModal({ onEnter: jest.fn(), onHide });

    fireEvent.keyDown(container, { keyCode: 27 });
    wait(() => {
      expect(onHide).toHaveBeenCalled();
    });
  });

  it('does not invoke onHide when escapeExits is false', () => {
    const onHide = jest.fn();
    const { container } = renderModal({ onHide, escapeExits: false });

    fireEvent.keyDown(container, { keyCode: 27 });
    wait(() => {
      expect(onHide).not.toHaveBeenCalled();
    });
  });
});
