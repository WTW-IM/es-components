import React from 'react';
import PropTypes from 'prop-types';
import styled, { withTheme } from 'styled-components';

const AnswerLabel = styled.label`
  margin: 0px;
  background-color: #00a0d2;
  border: 1px solid #000;
  flex-grow: 1;

  background-color: ${props => props.variant.bgColor};
  border-color: transparent;
  box-shadow: 0 4px 0 0 ${props => props.variant.boxShadowColor};
  color: ${props => props.variant.textColor};
  margin-bottom: 4px;
  margin-top: 0;
  transition: background-color 250ms linear;

  &[disabled]:hover {
    background-color: ${props => props.variant.bgColor};
  }

  &:hover {
    background-color: ${props => props.variant.hoverBgColor};
  }

  &:active {
    margin-bottom: 0;
    margin-top: 4px;
    box-shadow: 0 0 0 0 transparent;
  }

  @media (min-width: ${props => props.theme.screenSize.desktop}) {
    min-width: ${props => props.itemWidth};
  }
`;

const OutlineAnswerLabel = styled(AnswerLabel)`
  box-shadow: none;
  background-color: ${props => props.variant.bgColor};
  border: 2px solid ${props => props.variant.borderColor};
  border-radius: 5px;
  color: ${props => props.variant.textColor};
  font-weight: bold;
  transition: background-color 250ms linear, color 250ms linear;

  &[disabled]:hover {
    background-color: ${props => props.variant.bgColor};
  }

  &:hover {
    background-color: ${props => props.variant.hoverBgColor};
    color: ${props => props.variant.activeTextColor};
  }

  &:active {
    margin-bottom: 0;
    margin-top: 4px;
    box-shadow: 0 0 0 0 transparent;
  }
`;

const AnswerDisplay = styled.span`
  text-align: center;
  font-size: 16px;
  font-weight: bold;
  display: block;
  padding: 10px 10px 10px 10px;
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently supported by Chrome and Opera */
`;

const AnswerInput = styled.input`
  clip-path: inset(100%);
  clip: rect(1px 1px 1px 1px); /* IE 6/7 */
  clip: rect(1px, 1px, 1px, 1px);
  height: 1px;
  overflow: hidden;
  position: absolute;
  white-space: nowrap; /* added line */
  width: 1px;

  &:checked + span {
    background-color: ${props => props.variant.activeBgColor};
    color: ${props => props.variant.activeTextColor};
  }
`;

export function AnswerButton({
  optionText,
  name,
  theme,
  styleType,
  isOutline,
  ...radioProps
}) {
  const defaultButton = {
    bgColor: theme.colors.primary,
    textColor: theme.colors.white,
    hoverBgColor: theme.colors.primary,
    hoverTextColor: theme.colors.defaultBtnText,
    activeBgColor: theme.colors.success,
    activeTextColor: theme.colors.white,
    boxShadowColor: theme.colors.defaultHover,
    borderColor: theme.colors.white
  };

  const defaultOutline = {
    bgColor: theme.colors.white,
    textColor: theme.colors.primary,
    hoverBgColor: theme.colors.primary,
    hoverTextColor: theme.colors.white,
    activeBgColor: theme.colors.success,
    activeTextColor: theme.colors.white,
    borderColor: theme.colors.primary
  };

  let variant = theme.buttonStyles.buttonsNormal[styleType] || defaultButton;

  let button = (
    <AnswerLabel itemWidth={radioProps.itemWidth} variant={variant}>
      <AnswerInput type="radio" name={name} {...radioProps} variant={variant} />
      <AnswerDisplay>{optionText}</AnswerDisplay>
    </AnswerLabel>
  );

  if (isOutline) {
    variant = theme.buttonStyles.buttonsOutline[styleType] || defaultOutline;
    button = (
      <OutlineAnswerLabel itemWidth={radioProps.itemWidth} variant={variant}>
        <AnswerInput
          type="radio"
          name={name}
          {...radioProps}
          variant={variant}
        />
        <AnswerDisplay>{optionText}</AnswerDisplay>
      </OutlineAnswerLabel>
    );
  }

  return button;
}

AnswerButton.propTypes = {
  optionText: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  inline: PropTypes.bool,
  /** Display radio button with contextual state colorings */
  validationState: PropTypes.oneOf(['default', 'success', 'warning', 'danger']),
  /**
   * Theme object used by the ThemeProvider,
   * automatically passed by any parent component using a ThemeProvider
   */
  theme: PropTypes.object.isRequired
};

AnswerButton.defaultProps = {
  inline: true,
  validationState: 'default'
};

export default withTheme(AnswerButton);
