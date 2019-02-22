import React from 'react';
import styled from 'styled-components';
import genId from '../../util/generateAlphaName';
import { useTheme } from '../../util/useTheme';

const AnswerLabel = styled.label`
  margin: 0px;
  flex-grow: 1;

  background-color: ${props => props.style.bgColor};
  border-color: transparent;
  box-shadow: 0 4px 0 0 ${props => props.style.boxShadowColor};
  color: ${props => props.style.textColor};
  margin-bottom: 4px;
  margin-top: 0;
  transition: background-color 250ms linear;

  &:hover {
    background-color: ${props => props.style.successHover};
  }

  &:active {
    margin-bottom: 0;
    margin-top: 4px;
    box-shadow: 0 0 0 0 transparent;
  }

  @media (min-width: ${props => props.theme.screenSize.desktop}) {
    min-width: ${props => props.itemWidth};
    flex-grow: 0;
  }
`;

const AnswerDisplay = styled.span`
  text-align: center;
  font-size: 16px;
  font-weight: bold;
  display: block;
  padding: 10px 10px 10px 10px;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

const AnswerInput = styled.input`
  clip-path: inset(100%);
  clip: rect(1px, 1px, 1px, 1px);
  height: 1px;
  overflow: hidden;
  position: absolute;
  white-space: nowrap; /* added line */
  width: 1px;

  &:checked + span {
    background-color: ${props => props.selected.bgColor};
    box-shadow: 0 4px 0 0 ${props => props.selected.boxShadowColor};

    /* Selected Color should always be white */
    color: ${props => props.selected.textColor};
  }
`;

export function AnswerButton({
  name,
  children,
  itemWidth,
  styleType,
  selectedType,
  ...radioProps
}) {
  const id = radioProps.id || genId();
  const theme = useTheme();
  const style = theme.buttonStyles.button.variant[styleType];
  const selected = theme.buttonStyles.button.variant[selectedType];

  const labelProps = {
    itemWidth,
    style,
    selected
  };

  return (
    <AnswerLabel {...labelProps}>
      <AnswerInput
        type="radio"
        name={name}
        id={id}
        {...radioProps}
        {...labelProps}
      />
      <AnswerDisplay>{children}</AnswerDisplay>
    </AnswerLabel>
  );
}

export default AnswerButton;
