import styled from 'styled-components';

import { sizes } from '../theme';

const Label = styled.label`
  color: ${props => props.color || 'inherit'};
  display: ${props => (props.inline ? 'inline-flex' : 'block')};
  margin-bottom: ${props => (props.inline ? 'none' : '5px')};
  text-transform: uppercase;
  flex: ${props => (props.inline ? 'auto' : 'initial')};
  font-size: ${sizes.baseFontSize * 0.75}px;
  font-weight: bold;

  &[disabled] {
    cursor: not-allowed;
  }
`;

export default Label;
