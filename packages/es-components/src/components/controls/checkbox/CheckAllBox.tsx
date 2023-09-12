import React from 'react';
import styled, { css } from 'styled-components';
import Checkbox, {
  CheckboxProps,
  CheckboxDisplay,
  propTypes as checkboxPropTypes,
  defaultProps as checkboxDefaultProps
} from './Checkbox';
import useUniqueId from '../../util/useUniqueId';

type CheckAllBoxProps = CheckboxProps & {
  textOnHover?: boolean;
};

const Label = styled.label<CheckAllBoxProps>`
  font-weight: bold;
  margin-bottom: 10px;
  padding: 10px 0;
  display: flex;
  align-items: center;
  justify-content: flex-start;

  @media (min-width: ${props => props.theme.screenSize.tablet}) {
    margin-left: 0;
    padding: 5px 0;
  }

  ${({ textOnHover }) =>
    textOnHover &&
    css`
      &:hover {
        ${Text} {
          opacity: 1;
          transition: visibility 0s linear 10ms, opacity 10ms;
          visibility: visible;
        }
      }
    `}
`;

const Well = styled.div`
  background-color: ${props => props.theme.colors.gray1};
  border: solid 1px ${props => props.theme.colors.gray3};
  border-radius: 2px;
  height: 45px;
  margin-right: 6px;
  width: 45px;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;

  label {
    position: relative;
    display: block;
    top: 0;
    left: 0;
    margin: 0;
    padding: 0;
  }

  ${CheckboxDisplay} {
    display: block;
    position: relative;
    top: 0;
    left: 0;
  }
`;

const Text = styled.span<CheckAllBoxProps>`
  ${({ textOnHover, theme }) =>
    textOnHover &&
    css`
      @media (min-width: ${theme.screenSize.tablet}) {
        opacity: 0;
        transition: visibility 0s linear 500ms, opacity 500ms;
        visibility: hidden;
      }
    `}
`;

function CheckAllBox({ children, ...checkboxProps }: CheckAllBoxProps) {
  const id = useUniqueId(checkboxProps.id);
  return (
    <Label htmlFor={id}>
      <Well>
        <Checkbox {...checkboxProps} id={id} />
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
  ...checkboxPropTypes
};

CheckAllBox.defaultProps = {
  ...checkboxDefaultProps
};

export default CheckAllBox;
