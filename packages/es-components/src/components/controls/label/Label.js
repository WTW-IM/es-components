import styled from 'styled-components';

const Label = styled.label`
  color: inherit;
  cursor: pointer;
  font-size: ${props => props.theme.sizes.baseFontSize};
  font-weight: 700;
  margin-bottom: 5px;
  margin-right: 20px;

  &[disabled] {
    cursor: not-allowed;
  }
`;

/** @component */
export default Label;
