/* eslint-env jest */

import React from 'react';
import { fireEvent, waitFor } from '@testing-library/react';

import Modal from './Modal';
import ModalHeader from './ModalHeader';
import ModalBody from './ModalBody';
import ModalFooter from './ModalFooter';
import { renderWithTheme } from '../../util/test-utils';

jest.mock('../../util/generateAlphaName', () => () => 'abcdef');

type ModalType = typeof Modal;

function renderModal(
  modalProps: Parameters<ModalType>[0],
  children: React.ReactNode
) {
  return renderWithTheme(
    <Modal ariaHideApp={false} show {...{ ...modalProps, children }} />
  );
}

function renderBasicModal(modalProps: Parameters<ModalType>[0]) {
  return renderModal(
    modalProps,
    <>
      <ModalHeader>Header</ModalHeader>
      <ModalBody>Body</ModalBody>
      <ModalFooter>Footer</ModalFooter>
    </>
  );
}

it('invokes functions when triggered', async () => {
  const onEnter = jest.fn();
  const onHide = jest.fn();

  const utils = renderBasicModal({
    onEnter,
    onHide
  });

  if (utils === null) {
    return;
  }
  const { findByRole } = utils;

  await waitFor(() => {
    expect(onEnter).toHaveBeenCalled();
  });

  fireEvent.click(await findByRole('button', { name: 'Close', exact: false }));

  expect(onHide).toHaveBeenCalled();
});

it('renders different modal sections', async () => {
  const onEnter = jest.fn();
  const onHide = jest.fn();

  const { getByText } = renderBasicModal({ onEnter, onHide });

  await waitFor(() => {
    expect(onEnter).toHaveBeenCalled();
  });

  expect(getByText('Header')).toMatchSnapshot();
  expect(getByText('Body')).toMatchSnapshot();
  expect(getByText('Footer')).toMatchSnapshot();
});

it('hides dismiss button when hideCloseButton is true', () => {
  const { getByText } = renderModal(
    {},
    <>
      <ModalHeader hideCloseButton>Header</ModalHeader>
      <ModalBody>Body</ModalBody>
      <ModalFooter>Footer</ModalFooter>
    </>
  );
  expect(getByText('Header').parentElement?.querySelector('button')).toBeNull();
});

it('passes through class names', () => {
  const { container } = renderBasicModal({ className: 'myclass' });
  const element = container.parentElement?.querySelector('.myclass');
  expect(element).not.toBeNull();
});

describe('when ESC is pressed', () => {
  it('invokes onHide by default', async () => {
    const onHide = jest.fn();

    const { queryByText } = renderBasicModal({ onEnter: jest.fn(), onHide });

    const view = queryByText('Header');
    if (view === null) {
      return;
    }
    fireEvent.keyDown(view, { keyCode: 27 });
    await waitFor(() => {
      expect(onHide).toHaveBeenCalled();
    });
  });

  it('does not invoke onHide when escapeExits is false', async () => {
    const onHide = jest.fn();
    const { container } = renderBasicModal({ onHide, escapeExits: false });

    fireEvent.keyDown(container, { keyCode: 27 });
    await waitFor(() => {
      expect(onHide).not.toHaveBeenCalled();
    });
  });
});
