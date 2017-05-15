import styled from 'styled-components';

import { colors, sizes } from '../../theme';

const PickerButton = styled.button`
  align-self: center;
  background-color: ${props => (props.selected ? colors.accent : colors.white)};
  border: 0;
  border-radius: 3px;
  color: ${props => (props.selected ? colors.white : colors.grayDarkest)};
  cursor: pointer;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: ${sizes.baseFontSize}px;
  font-weight: inherit;
  min-height: 20px;
  padding: 10px;
  visibility: ${props => (props.displayed ? 'visible' : 'hidden')};

  &:hover {
    background-color: ${props => (props.selected ? colors.accent : colors.grayLight)};
  }

  &:disabled {
    color: ${colors.gray};
    cursor: not-allowed;

    &:hover {
      background-color: ${colors.white};
    }
  }
`;

export default PickerButton;
