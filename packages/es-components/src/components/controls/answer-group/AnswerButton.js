import React from 'react';
import styled from 'styled-components';
import genId from '../../util/generateAlphaName';
import { useTheme } from '../../util/useTheme';

const AnswerLabel = styled.label`
  flex-grow: 1;
  font-weight: ${props => props.style.fontWeight || 'normal'};
  font-size: ${props => props.style.fontSize};
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

const OutlineAnswerLabel = styled(AnswerLabel)`
  flex-grow: 1;
  border: 2px solid ${props => props.style.bgColor};
  box-sizing: border-box;
  color: ${props => props.style.bgColor};
  font-size: ${props => props.style.fontSize};
  font-weight: ${props => props.style.fontWeight || 'normal'};
  text-align: center;
  text-transform: ${props =>
    props.style.textTransform ? props.style.textTransform : 'none'};
  transition: background-color 250ms linear, color 250ms linear;
  vertical-align: middle;
  white-space: nowrap;
  box-shadow: none;
  background-color: transparent;
  margin: 0;

  @media (min-width: ${props => props.theme.screenSize.desktop}) {
    min-width: ${props => props.itemWidth};
    flex-grow: 0;
  }

  &:active {
    margin: 0;
    background-color: ${props => props.style.activeBgColor};
    color: ${props => props.style.activeTextColor};
  }

  &:first-child {
    border-radius: 5px 2px 2px 5px;
    border-right: none;
  }

  &:last-child {
    border-radius: 2px 5px 5px 2px;
    border-left: none;
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

const OutlineAnswerInput = styled(AnswerInput)`
  &:checked + span {
    background-color: ${props => props.selected.bgColor};
    box-shadow: 0 0 0 0 ${props => props.selected.boxShadowColor};
    /* Selected Color should always be white */
    color: ${props => props.selected.textColor};
  }
`;

function AnswerButton({
  name,
  children,
  itemWidth,
  styleType,
  selectedType,
  isOutline,
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

  let button = (
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

  if (isOutline) {
    button = (
      <OutlineAnswerLabel {...labelProps}>
        <OutlineAnswerInput
          type="radio"
          name={name}
          id={id}
          {...radioProps}
          {...labelProps}
        />
        <AnswerDisplay>{children}</AnswerDisplay>
      </OutlineAnswerLabel>
    );
  }

  return button;
}

export default AnswerButton;
