import styled from 'styled-components';

import { sizes } from '../../theme';

const Addon = styled.span`
  flex: 0;

  background-color: ${props => props.backgroundColor};
  border: 1px solid ${props => props.borderColor};
  font-size: ${sizes.baseFontSize}px;
  font-weight: normal;
  padding: 6px 12px;

  &.prepend {
    border-right: 0;
  }

  &.append {
    border-left: 0;
    margin-right: ${props => (props.inline ? '20px' : 'initial')};
  }
`;

export default Addon;
