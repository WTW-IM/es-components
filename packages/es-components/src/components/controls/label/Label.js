import styled from 'styled-components';

export default styled.label`
  color: inherit;
  cursor: pointer;
  flex: 0 1 20%;
  font-size: ${props => props.theme.sizes.baseFontSize};
  font-weight: 700;
  margin-bottom: 5px;

  &[disabled] {
    cursor: not-allowed;
  }
`;
