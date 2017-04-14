import styled from 'styled-components';

import { sizes } from '../theme';

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  text-transform: uppercase;
  font-size: ${sizes.baseFontSize * 0.75}px;
  font-weight: bold;
  line-height: ${sizes.baseLineHeight * 0.75}px;

  &[disabled] {
    cursor: not-allowed;
  }
`;

export default Label;
