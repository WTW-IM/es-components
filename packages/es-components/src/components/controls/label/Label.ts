import styled from 'styled-components';
import getStyledProp, { ESThemeProps } from '../../util/getStyledProp';

const Label = styled.label`
  color: ${getStyledProp('colors.gray9')};
  cursor: pointer;
  font-family: 'Source Sans Pro', 'Segoe UI', Segoe, Calibri, Tahoma, sans-serif;
  font-size: ${props =>
    getStyledProp('font.labelFontSize', props as ESThemeProps) ||
    getStyledProp('font.baseFontSize', props as ESThemeProps)};
  font-weight: ${props =>
    getStyledProp('font.labelFontWeight', props as ESThemeProps) || 'bold'};
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
