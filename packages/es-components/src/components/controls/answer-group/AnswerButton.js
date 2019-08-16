/* eslint react/prop-types: 0 */
import React from 'react';
import styled from 'styled-components';
import useUniqueId from '../../util/useUniqueId';
import { useTheme } from '../../util/useTheme';
import ValidationContext from '../ValidationContext';

const AnswerLabel = styled.label`
  flex-grow: 1;

  @media (min-width: ${props => props.theme.screenSize.tablet}) {
    flex-grow: 0;
    min-width: ${props => props.itemWidth};
  }
`;

const AnswerDisplay = styled.div`
  background-color: ${props => props.buttonStyle.bgColor};
  border-color: transparent;
  box-shadow: 0 4px 0 0 ${props => props.buttonStyle.boxShadowColor};
  color: ${props => props.buttonStyle.textColor};
  font-weight: ${props => props.buttonSize.fontWeight || 'normal'};
  font-size: ${props => props.buttonSize.fontSize};
  line-height: ${props => props.buttonSize.lineHeight};
  margin-bottom: 4px;
  margin-top: 0;
  padding-top: ${props => props.buttonSize.paddingTop};
  padding-right: ${props => props.buttonSize.paddingSides};
  padding-bottom: ${props => props.buttonSize.paddingBottom};
  padding-left: ${props => props.buttonSize.paddingSides};
  text-align: center;
  text-transform: ${props =>
    props.buttonSize.textTransform ? props.buttonSize.textTransform : 'none'};
  transition: background-color 250ms linear, color 250ms linear;
  user-select: none;

  &:active {
    background-color: ${props => props.buttonStyle.activeBgColor};
    box-shadow: 0 0 0 0 transparent;
    color: ${props => props.buttonStyle.activeTextColor};
    margin-bottom: 0;
    margin-top: 4px;
  }

  &:hover {
    background-color: ${props => props.buttonStyle.hoverBgColor};
    color: ${props => props.buttonStyle.hoverTextColor};
  }

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.65;

    > * {
      pointer-events: none;
    }
  }
`;

const OutlineAnswerDisplay = styled(AnswerDisplay)`
  background-color: ${props =>
    props.isChecked
      ? props.buttonStyle.hoverBgColor
      : props.buttonStyle.bgColor};
  border: 2px solid ${props => props.buttonStyle.borderColor};
  box-shadow: ${props => (props.isChecked ? '0 0 0 0' : 'none')}
    ${props => props.isChecked && props.buttonStyle.boxShadowColor};
  box-sizing: border-box;
  color: ${props =>
    props.isChecked
      ? props.buttonStyle.hoverTextColor
      : props.buttonStyle.textColor};
  margin: 0;

  &:active {
    margin: 0;
  }
`;

const AnswerInput = styled.input`
  clip-path: inset(100%);
  clip: rect(1px, 1px, 1px, 1px);
  height: 1px;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
  width: 1px;

  &:focus + div {
    background-color: ${props => props.buttonStyle.activeBgColor};
    color: ${props => props.buttonStyle.activeTextColor};
  }
`;

function AnswerButton({
  name,
  children,
  itemWidth,
  styleType,
  selectedType,
  size,
  isOutline,
  checked,
  ...radioProps
}) {
  const id = useUniqueId(radioProps.id);
  const isChecked = radioProps.checked || radioProps.defaultChecked;
  const theme = useTheme();
  const validationState = React.useContext(ValidationContext);
  const buttonType = isOutline ? 'outlineButton' : 'button';
  const buttonSize = theme.buttonStyles[buttonType].size[size];

  const variant =
    validationState !== 'default' && !isOutline ? validationState : styleType;
  const validationBorder =
    theme.buttonStyles[buttonType].variant[validationState].borderColor;

  let selectedStyles = theme.buttonStyles[buttonType].variant[selectedType];
  let unSelectedStyles = theme.buttonStyles[buttonType].variant[variant];

  if (isOutline && validationState !== 'default') {
    selectedStyles = { ...selectedStyles, borderColor: validationBorder };
    unSelectedStyles = { ...unSelectedStyles, borderColor: validationBorder };
  }

  const buttonStyle = isChecked ? selectedStyles : unSelectedStyles;

  const buttonProps = {
    disabled: radioProps.disabled,
    isChecked,
    buttonStyle,
    buttonSize
  };

  const labelProps = {
    disabled: radioProps.disabled,
    itemWidth,
    htmlFor: id,
    validationState
  };

  const Display = isOutline ? OutlineAnswerDisplay : AnswerDisplay;

  return (
    <AnswerLabel {...labelProps}>
      <AnswerInput
        type="radio"
        name={name}
        id={id}
        buttonStyle={buttonStyle}
        {...radioProps}
      />
      <Display {...buttonProps}>{children}</Display>
    </AnswerLabel>
  );
}

export default AnswerButton;
