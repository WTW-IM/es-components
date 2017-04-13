/* eslint-env jest */

import React from 'react';
import renderer from 'react-test-renderer';

import FormGroup from './FormGroup';

describe('FormGroup container component', () => {
  it('renders as expected', () => {
    const tree = renderer.create(
      <FormGroup>
        <div>Some child</div>
      </FormGroup>
    );

    expect(tree).toMatchSnapshot();
  });

  it('renders as expected when there is an error', () => {
    const tree = renderer.create(
      <FormGroup hasError>
        <div>Some child</div>
      </FormGroup>
    );

    expect(tree).toMatchSnapshot();
  });

  it('renders as expected when inline', () => {
    const tree = renderer.create(
      <FormGroup inline>
        <div>First child</div>
        <div>Second child</div>
      </FormGroup>
    );

    expect(tree).toMatchSnapshot();
  });
});
