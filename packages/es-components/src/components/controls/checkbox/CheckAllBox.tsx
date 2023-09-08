import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import {
  CheckboxLabel,
  CheckboxDisplayWrapper,
  CheckboxDisplay,
  CheckboxInput,
  CheckboxProps
} from './Checkbox';
import ValidationContext from '../ValidationContext';
import { htmlInputPropTypes } from '../../util/htmlProps';

type CheckAllBoxProps = CheckboxProps & {
  textOnHover?: boolean;
};

const Label = styled(CheckboxLabel)<CheckAllBoxProps>`
  font-weight: bold;
  margin-bottom: 10px;
  padding: 10px 0 10px 62px;

  @media (min-width: ${props => props.theme.screenSize.tablet}) {
    margin-left: 0;
    padding: 5px 0 5px 52px;
  }

  ${({ textOnHover }) =>
    textOnHover &&
    css`
      &:hover {
        ${Text} {
          opacity: 1;
          transition:
            visibility 0s linear 10ms,
            opacity 10ms;
          visibility: visible;
        }
      }
    `}
`;

const Well = styled.div`
  background-color: ${props => props.theme.colors.gray1};
  border: solid 1px ${props => props.theme.colors.gray3};
  border-radius: 2px;
  display: inline-block;
  height: 45px;
  left: 10px;
  margin-right: 6px;
  position: absolute;
  top: -1px;
  width: 45px;

  @media (min-width: ${props => props.theme.screenSize.tablet}) {
    left: 0;
    top: -6px;
  }
`;

const Wrapper = styled(CheckboxDisplayWrapper)`
  && {
    left: 10px;
    top: 10px;
  }
`;

const Text = styled.span<CheckAllBoxProps>`
  ${({ textOnHover, theme }) =>
    textOnHover &&
    css`
      @media (min-width: ${theme.screenSize.tablet}) {
        opacity: 0;
        transition:
          visibility 0s linear 500ms,
          opacity 500ms;
        visibility: hidden;
      }
    `}
`;

function CheckAllBox({
  children,
  displayClassName,
  ...checkboxProps
}: CheckAllBoxProps) {
  const validationState = React.useContext(ValidationContext);

  return (
    <Label
      validationState={validationState}
      checked={checkboxProps.checked}
      disabled={checkboxProps.disabled}
      textOnHover={checkboxProps.textOnHover}
    >
      <Well>
        <CheckboxInput type="checkbox" {...checkboxProps} />
        <Wrapper className={displayClassName}>
          <CheckboxDisplay className="es-checkbox__fill" />
        </Wrapper>
      </Well>
      <Text
        className="es-checkbox__text"
        textOnHover={checkboxProps.textOnHover}
      >
        {children}
      </Text>
    </Label>
  );
}

CheckAllBox.propTypes = {
  ...CheckboxInput.propTypes,
  children: PropTypes.any,
  textOnHover: PropTypes.bool,
  /** applies to the display wrapper */
  displayClassName: htmlInputPropTypes['className']
};

CheckAllBox.defaultProps = {
  ...CheckboxInput.defaultProps,
  textOnHover: false,
  children: undefined,
  displayClassName: ''
};

export default CheckAllBox;
