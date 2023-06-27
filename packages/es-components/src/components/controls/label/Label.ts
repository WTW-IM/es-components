import styled from 'styled-components';
import getStyledProp from '../../util/getStyledProp';

const Label = styled.label`
  color: ${getStyledProp('colors.gray9')};
  cursor: pointer;
  font-family: 'Source Sans Pro', 'Segoe UI', Segoe, Calibri, Tahoma, sans-serif;
  font-size: ${props =>
    getStyledProp('font.labelFontSize')(props) ||
    getStyledProp('font.baseFontSize')(props)}
  font-weight: ${props =>
    getStyledProp('font.labelFontWeight')(props) || 'bold'};
  line-height: ${getStyledProp('font.baseLineHeight')};
  margin-bottom: 5px;
  display: inline-block;

  &[disabled] {
    cursor: not-allowed;
  }

  @media (min-width: ${getStyledProp('screenSize.tablet')}) {
    margin-right: 20px;
  }
`;

/** @component */
export default Label;
