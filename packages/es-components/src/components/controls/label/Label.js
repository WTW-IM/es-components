import styled from 'styled-components';

const Label = styled.label`
  color: ${props => props.theme.colors.gray9};
  cursor: pointer;
  font-family: 'Source Sans Pro', 'Segoe UI', Segoe, Calibri, Tahoma, sans-serif;
  font-size: ${props => props.theme.font.baseFontSize};
  font-weight: bold;
  line-height: ${props => props.theme.font.baseLineHeight};
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
