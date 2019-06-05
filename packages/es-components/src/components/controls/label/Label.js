import styled from 'styled-components';

const Label = styled.label`
  color: ${props => props.theme.colors.gray9};
  cursor: pointer;
  font-size: ${props => props.theme.sizes.baseFontSize};
  font-weight: 700;
  margin-bottom: 5px;
  display: inline-block;

  &[disabled] {
    cursor: not-allowed;
  }

  @media (min-width: ${props => props.theme.screenSize.tablet}) {
    margin-right: 20px;
  }
`;

/** @component */
export default Label;
