import styled from 'styled-components';
import { Label } from '../../controls/BaseControls';

const backgroundColorSelect = (checked, theme, validationState) => {
  if (checked) {
    return validationState === 'default'
      ? theme.colors.primary
      : theme.colors[validationState];
  }
  return theme.colors.white;
};

export default styled(Label)`
  color: ${props => props.theme.colors[props.validationState]};
  font-size: ${props => props.theme.sizes.baseFontSize};
  font-weight: bold;
  line-height: ${props => props.theme.sizes.baseLineHeight};
  margin-bottom: 10px;
  margin-left: -10px;
  min-height: 25px;
  padding: 10px 0 10px 42px;
  position: relative;

  @media (min-width: ${props => props.theme.screenSize.tablet}) {
    margin-left: 0;
    padding: 5px 0 5px 32px;
  }

  > .es-checkbox__fill {
    background-color: ${({ checked, theme, validationState }) =>
      backgroundColorSelect(checked, theme, validationState)};
    border-color: ${({ checked, theme, validationState }) =>
      checked && validationState === 'default'
        ? theme.colors.primary
        : theme.colors[validationState]};

    &:after {
      border-color: ${props => props.theme.colors.white};
    }
  }

  &:hover > .es-checkbox__fill:after {
    border-color: ${({ checked, theme }) =>
      checked ? theme.colors.white : theme.colors.gray3};
  }

  &[disabled] > .es-checkbox__fill {
    background-color: ${({ checked, theme }) =>
      checked ? theme.colors.gray5 : theme.colors.white};
    border-color: ${props => props.theme.colors.gray5};
    cursor: not-allowed;
    outline: 0;

    &:after {
      border-color: ${props => props.theme.colors.white};
    }
  }
`;