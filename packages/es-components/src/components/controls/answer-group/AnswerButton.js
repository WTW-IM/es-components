import React from 'react';
import styled from 'styled-components';
import genId from '../../util/generateAlphaName';
import { useTheme } from '../../util/useTheme';

const AnswerLabel = styled.label`
  flex-grow: 1;

  @media (min-width: ${props => props.theme.screenSize.desktop}) {
    flex-grow: 0;
    min-width: ${props => props.itemWidth};
  }
`;

const AnswerDisplay = styled.div`
  background-color: ${props => props.style.bgColor};
  border-color: transparent;
  box-shadow: 0 4px 0 0 ${props => props.style.boxShadowColor};
  color: ${props => props.style.textColor};
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
    background-color: ${props => props.style.activeBgColor};
    box-shadow: 0 0 0 0 transparent;
    color: ${props => props.style.activeTextColor};
    margin-bottom: 0;
    margin-top: 4px;
  }

  &:hover {
    background-color: ${props => props.style.hoverBgColor};
    color: ${props => props.style.hoverTextColor};
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
    props.isChecked ? props.style.hoverBgColor : props.style.bgColor};
  border: 2px solid ${props => props.style.borderColor};
  box-shadow: ${props => (props.isChecked ? '0 0 0 0' : 'none')}
    ${props => props.isChecked && props.style.boxShadowColor};
  box-sizing: border-box;
  color: ${props =>
    props.isChecked ? props.style.hoverTextColor : props.style.textColor};
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
  const id = radioProps.id || genId();
  const isChecked = radioProps.checked || radioProps.defaultChecked;
  const theme = useTheme();
  const buttonStyle = isOutline ? 'outlineButton' : 'button';
  const buttonSize = theme.buttonStyles[buttonStyle].size[size];
  const style = isChecked
    ? theme.buttonStyles[buttonStyle].variant[selectedType]
    : theme.buttonStyles[buttonStyle].variant[styleType];

  const buttonProps = {
    disabled: radioProps.disabled,
    isChecked,
    style,
    buttonSize
  };

  const Display = isOutline ? OutlineAnswerDisplay : AnswerDisplay;

  return (
    <AnswerLabel itemWidth={itemWidth} htmlFor={id}>
      <AnswerInput type="radio" name={name} id={id} {...radioProps} />
      <Display {...buttonProps}>{children}</Display>
    </AnswerLabel>
  );
}

export default AnswerButton;
