import React from 'react';
import { fireEvent, waitFor, screen } from '@testing-library/react';

import Modal, { ModalProps } from './Modal';
import ModalHeader from './ModalHeader';
import ModalBody from './ModalBody';
import ModalFooter from './ModalFooter';
import { renderWithTheme } from '../../util/test-utils';

jest.mock('../../util/generateAlphaName', () => () => 'abcdef');

function renderModal(modalProps: ModalProps, children: React.ReactNode) {
  const show = modalProps.show !== undefined ? modalProps.show : true;
  const ariaHideApp =
    modalProps.ariaHideApp !== undefined ? modalProps.ariaHideApp : false;
  return renderWithTheme(
    <Modal {...{ ...modalProps, show, ariaHideApp, children }} />
  );
}

function renderBasicModal(modalProps: ModalProps) {
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

  renderBasicModal({
    onEnter,
    onHide
  });

  await waitFor(() => {
    expect(onEnter).toHaveBeenCalled();
  });

  fireEvent.click(
    await screen.findByRole('button', { name: 'Close', exact: false })
  );

  expect(onHide).toHaveBeenCalled();
});

it('renders different modal sections', async () => {
  const onEnter = jest.fn();
  const onHide = jest.fn();

  renderBasicModal({ onEnter, onHide });

  await waitFor(() => {
    expect(onEnter).toHaveBeenCalled();
  });

  expect(screen.getByText('Header')).toMatchSnapshot();
  expect(screen.getByText('Body')).toMatchSnapshot();
  expect(screen.getByText('Footer')).toMatchSnapshot();
});

it('hides dismiss button when hideCloseButton is true', () => {
  renderModal(
    {},
    <>
      <ModalHeader hideCloseButton>Header</ModalHeader>
      <ModalBody>Body</ModalBody>
      <ModalFooter>Footer</ModalFooter>
    </>
  );
  expect(
    screen.queryByRole('button', { name: 'Close', exact: false })
  ).toBeNull();
});

it('passes through class names', async () => {
  renderBasicModal({ className: 'myclass' });
  const element = await screen.findByRole('dialog', { name: 'Header' });
  expect(element).toHaveClass('myclass');
});

describe('when ESC is pressed', () => {
  it('invokes onHide by default', async () => {
    const onHide = jest.fn();

    renderBasicModal({ onEnter: jest.fn(), onHide });

    const view = screen.queryByText('Header');
    expect(view).not.toBeNull();

    if (view) {
      fireEvent.keyDown(view, { keyCode: 27 });
    }

    await waitFor(() => {
      expect(onHide).toHaveBeenCalled();
    });
  });

  it('does not invoke onHide when escapeExits is false', async () => {
    const onHide = jest.fn();
    renderBasicModal({ onHide, escapeExits: false });

    const container = await screen.findByRole('dialog', { name: 'Header' });
    fireEvent.keyDown(container, { keyCode: 27 });
    await waitFor(() => {
      expect(onHide).not.toHaveBeenCalled();
    });
  });
});
