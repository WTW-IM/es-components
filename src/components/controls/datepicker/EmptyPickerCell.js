import styled from 'styled-components';

import { colors } from '../../theme';

const EmptyPickerCell = styled.span`
  background-color: ${colors.grayLighter};
  border-radius: 3px;
  flex: 1 13.28%;
  height: 33px;
  justify-self: center;
  width: 33px;

  @supports (display: grid) {
    flex: initial;
  }
`;

export default EmptyPickerCell;
