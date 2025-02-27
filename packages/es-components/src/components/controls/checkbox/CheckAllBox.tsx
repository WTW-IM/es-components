import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import Checkbox, {
  CheckboxProps,
  CheckboxDisplay,
  propTypes as checkboxPropTypes
} from './Checkbox';
import useUniqueId from '../../util/useUniqueId';

type CheckAllBoxProps = CheckboxProps & {
  textOnHover?: boolean;
};

type CheckAllBoxStyleProps = Omit<CheckAllBoxProps, 'textOnHover'> & {
  $textOnHover?: boolean;
};

const shouldForwardProp = (prop: string) =>
  !['displayClassName'].includes(prop);

const Label = styled.label.withConfig({
  shouldForwardProp
})<CheckAllBoxStyleProps>`
  ${({ theme, $textOnHover }) => css`
    font-weight: bold;
    margin-bottom: 10px;
    padding: 10px 0;
    display: flex;
    align-items: center;
    justify-content: flex-start;

    @media (min-width: ${theme.screenSize.tablet}) {
      padding: 5px 0;
      margin-left: 0;
    }

    ${$textOnHover &&
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
  `}
`;

const Well = styled.div`
  display: flex;
  width: 45px;
  height: 45px;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  border: solid 1px ${props => props.theme.colors.gray3};
  border-radius: 2px;
  margin-right: 6px;
  background-color: ${props => props.theme.colors.gray1};

  label {
    position: relative;
    top: 0;
    left: 0;
    display: block;
    padding: 0;
    margin: 0;
  }

  ${CheckboxDisplay} {
    position: relative;
    top: 0;
    left: 0;
    display: block;
  }
`;

const Text = styled.span.withConfig({
  shouldForwardProp
})<CheckAllBoxStyleProps>`
  ${({ $textOnHover, theme }) =>
    $textOnHover &&
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
  textOnHover,
  id: idProp,
  ...checkboxProps
}: CheckAllBoxProps) {
  const id = useUniqueId(idProp);
  const sharedCheckboxProps = { ...checkboxProps, $textOnHover: textOnHover };
  return (
    <Label htmlFor={id} {...sharedCheckboxProps}>
      <Well>
        <Checkbox {...checkboxProps} id={id} />
      </Well>
      <Text className="es-checkbox__text" {...sharedCheckboxProps}>
        {children}
      </Text>
    </Label>
  );
}

CheckAllBox.propTypes = {
  ...checkboxPropTypes,
  textOnHover: PropTypes.bool
};

export default CheckAllBox;
