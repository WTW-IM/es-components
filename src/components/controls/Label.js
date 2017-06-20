import styled from 'styled-components';

import { sizes } from '../theme';

const Label = styled.label`
  color: ${props => props.color || 'inherit'};
  cursor: pointer;
  display: ${props => (props.inline ? 'flex' : 'block')};
  margin-bottom: 20px;
  text-transform: uppercase;
  flex: ${props => (props.inline ? 'auto' : 'initial')};
  font-size: ${sizes.baseFontSize * 0.75}px;
  font-weight: bold;

  &[disabled] {
    cursor: not-allowed;
  }
`;

export default Label;
