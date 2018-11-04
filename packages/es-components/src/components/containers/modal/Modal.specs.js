/* eslint-env jest */

import React from 'react';
import { render, fireEvent, cleanup } from 'react-testing-library';
import { ThemeProvider } from 'styled-components';
import viaTheme from 'es-components-via-theme';

import Modal from './Modal';
import ModalHeader from './ModalHeader';
import ModalBody from './ModalBody';
import ModalFooter from './ModalFooter';

jest.mock('../../util/generateAlphaName', () => () => 'abcdef');

beforeEach(cleanup);

function renderModal(modalProps) {
  return render(
    <ThemeProvider theme={viaTheme}>
      <Modal show {...modalProps}>
        <ModalHeader>Header</ModalHeader>
        <ModalBody>Body</ModalBody>
        <ModalFooter>Footer</ModalFooter>
      </Modal>
    </ThemeProvider>
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
  const { getByText } = render(
    <ThemeProvider theme={viaTheme}>
      <Modal show>
        <ModalHeader hideCloseButton>Header</ModalHeader>
        <ModalBody>Body</ModalBody>
        <ModalFooter>Footer</ModalFooter>
      </Modal>
    </ThemeProvider>
  );
  expect(getByText('Header').parentElement.querySelector('button')).toBeNull();
});

describe('when ESC is pressed', () => {
  it('invokes onHide by default', () => {
    const onHide = jest.fn();
    const { container } = renderModal({ onEnter: jest.fn(), onHide });

    fireEvent.keyDown(container, { keyCode: 27 });
    expect(onHide).toHaveBeenCalled();
  });

  it('does not invoke onHide when escapeExits is false', () => {
    const onHide = jest.fn();
    const { container } = renderModal({ onHide, escapeExits: false });

    fireEvent.keyDown(container, { keyCode: 27 });
    expect(onHide).not.toHaveBeenCalled();
  });
});
