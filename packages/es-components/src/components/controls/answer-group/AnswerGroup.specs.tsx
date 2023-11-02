import React from 'react';
import { screen } from '@testing-library/react';
import viaTheme from 'es-components-via-theme';

import AnswerGroup from './AnswerGroup';
import { renderWithTheme } from '../../util/test-utils';
import AnswerButton from './AnswerButton';
import Control from '../Control';

function getNumArray(length: number) {
  return Array.from({ length }, (_, idx) => idx);
}

// For syntax highlighting
const css = (strings: TemplateStringsArray, ...values: unknown[]) => {
  const interpolated = strings.map((str, idx) => {
    return `${str}${(values[idx] as string | undefined) || ''}`;
  });

  return interpolated.join('');
};

const AnswerOptions: React.FC<{ numberOfOptions: number }> = ({
  numberOfOptions
}) => {
  return (
    <>
      {getNumArray(numberOfOptions).map(idx => (
        <AnswerButton key={`option-${idx}`} value={idx}>
          {`Option ${idx}`}
        </AnswerButton>
      ))}
    </>
  );
};

it('renders each radio input as disabled when disableAllOptions is true', async () => {
  renderWithTheme(
    <AnswerGroup name="test" disableAllOptions>
      <AnswerOptions numberOfOptions={3} />
    </AnswerGroup>
  );

  const inputs = await screen.findAllByRole('radio');

  expect(inputs).toHaveLength(3);
  inputs.forEach(input => expect(input).toBeDisabled());
});

it('renders each radio input with the itemWidth size', async () => {
  renderWithTheme(
    <AnswerGroup name="test" itemWidth="200px">
      <AnswerOptions numberOfOptions={3} />
    </AnswerGroup>
  );

  const labels = (await screen.findAllByText(/Option/))
    .map(opt => opt.parentElement) // eslint-disable-line testing-library/no-node-access
    .filter((el): el is HTMLElement => Boolean(el));

  expect(labels).toHaveLength(3);
  labels.forEach(label =>
    expect(label).toHaveStyleRule('min-width', '200px', {
      media: `(min-width: ${viaTheme.screenSize.tablet})`
    })
  );
});

it('renders each outline buttons with the validation border', async () => {
  renderWithTheme(
    <Control validationState="danger">
      <AnswerGroup name="test" isOutline>
        <AnswerOptions numberOfOptions={3} />
      </AnswerGroup>
    </Control>
  );

  const buttons = await screen.findAllByText(/Option/);

  expect(buttons).toHaveLength(3);
  buttons.forEach(button =>
    expect(button).toHaveStyleRule(
      'border',
      `2px solid ${viaTheme.buttonStyles.outlineButton.variant['danger'].bgColor}`
    )
  );
});

it('renders the correct buttons for the validation', async () => {
  renderWithTheme(
    <Control validationState="danger">
      <AnswerGroup name="test">
        <AnswerOptions numberOfOptions={3} />
      </AnswerGroup>
    </Control>
  );

  const buttons = await screen.findAllByText(/Option/);

  expect(buttons).toHaveLength(3);
  buttons.forEach(button =>
    expect(button).toHaveStyleRule(
      'background-color',
      viaTheme.buttonStyles.button.variant['danger'].bgColor
    )
  );
});

it('renders the correct buttons for the styleType', async () => {
  renderWithTheme(
    <AnswerGroup name="test" styleType="danger">
      <AnswerOptions numberOfOptions={3} />
    </AnswerGroup>
  );

  const buttons = await screen.findAllByText(/Option/);

  expect(buttons).toHaveLength(3);
  buttons.forEach(button =>
    expect(button).toHaveStyleRule(
      'background-color',
      viaTheme.buttonStyles.button.variant['danger'].bgColor
    )
  );
});

it('renders the correct button for the selectedType', async () => {
  renderWithTheme(
    <AnswerGroup name="test" selectedType="danger" selectedValue={0}>
      <AnswerOptions numberOfOptions={3} />
    </AnswerGroup>
  );

  const buttons = await screen.findAllByText(/Option/);
  expect(buttons).toHaveLength(3);

  const unselectedButtons = buttons.slice(1);
  const selectedButton = await screen.findByText('Option 0');

  unselectedButtons.forEach(button =>
    expect(button).not.toHaveStyleRule(
      'background-color',
      viaTheme.buttonStyles.button.variant['danger'].bgColor
    )
  );

  expect(selectedButton).toHaveStyleRule(
    'background-color',
    viaTheme.buttonStyles.button.variant['danger'].bgColor
  );
});

it('renders the correct buttons for the size', async () => {
  renderWithTheme(
    <AnswerGroup name="test" size="sm">
      <AnswerOptions numberOfOptions={3} />
    </AnswerGroup>
  );

  const buttons = await screen.findAllByText(/Option/);

  expect(buttons).toHaveLength(3);
  buttons.forEach(button =>
    expect(button).toHaveStyle(css`
      font-size: ${viaTheme.buttonStyles.button.size.sm.fontSize};
      line-height: ${viaTheme.buttonStyles.button.size.sm.lineHeight};
    `)
  );
});
