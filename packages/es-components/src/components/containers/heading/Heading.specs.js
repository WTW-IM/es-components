/* eslint-env jest */
import React from 'react';
import styled from 'styled-components';
import viaTheme from 'es-components-via-theme';
import { renderWithTheme } from '../../util/test-utils';
import Heading from './Heading';

it('renders proper heading level', () => {
  const { queryByText } = renderWithTheme(
    <Heading level={1}>Heading level 1</Heading>
  );

  expect(queryByText('Heading level 1')).not.toBeNull();
});

it('renders heading level with another size', () => {
  const { container } = renderWithTheme(
    <div>
      <Heading level={1}>Heading level 1</Heading>
      <Heading level={3}>Heading level 3</Heading>
      <Heading level={3} size={1}>
        Heading level 3 size 1
      </Heading>
    </div>
  );

  expect(container).toMatchSnapshot();
});

it('renders knockout heading with different class', () => {
  const { container } = renderWithTheme(
    <div>
      <Heading level={1}>Heading level 1</Heading>
      <Heading level={1} isKnockoutStyle>
        Knockout Heading level 1
      </Heading>
    </div>
  );

  expect(container).toMatchSnapshot();
});

it('works properly with downstream attrs', async () => {
  const TestHeading = styled(Heading).attrs(() => ({ level: 2, size: 4 }))``;
  const { findByRole } = renderWithTheme(
    <TestHeading>This is a test.</TestHeading>
  );

  const foundTitle = await findByRole('heading');
  expect(foundTitle).toBeInTheDocument();
  expect(foundTitle.tagName.toLowerCase()).toBe('h2');
  expect(foundTitle).toHaveStyleRule(
    'font-size',
    viaTheme.font.headingMobile[4]
  );
});
