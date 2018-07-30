/* eslint-env jest */

import React from 'react';
import { mountWithTheme } from 'styled-enzyme';
import Modal from './Modal';

describe('modal component', () => {
  let instance;
  const onHide = jest.fn();

  beforeEach(() => {
    instance = mountWithTheme(
      <Modal show onHide={onHide} animation={false}>
        <div className="body">Modal body text.</div>
      </Modal>
    );
  });

  it('mounts as expected', () => {
    expect(instance.find(Modal).length).toBe(1);
    expect(instance.find(Modal).prop('show')).toBe(true);
  });
});
