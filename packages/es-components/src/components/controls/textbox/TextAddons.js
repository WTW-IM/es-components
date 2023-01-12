import styled from 'styled-components';
import { validationStateInputStyles } from './InputBase';
import getStyledProp from '../../util/getStyledProp';

const defaultBorderRadius = '2px';

const AddOn = styled.div`
  ${validationStateInputStyles}
  background-color: ${getStyledProp('backgroundColor', 'addOn')};
  border: 1px solid ${getStyledProp('borderColor', 'addOn')};

  // todo fix border-radius
  border-radius: ${defaultBorderRadius};

  box-sizing: border-box;
  color: ${getStyledProp('textColor', 'addOn')};
  display: flex;
  flex-direction: column;
  justify-content: center;
  line-height: 1;
  margin: 0;
  outline: 0;
  padding: 0.333em 0.6111em;
`;

const Prepend = styled(AddOn)`
  border-bottom-right-radius: 0;
  border-right: none;
  border-top-right-radius: 0;
`;

const Append = styled(AddOn)`
  border-bottom-left-radius: 0;
  border-left: none;
  border-top-left-radius: 0;
`;

const InputWrapper = styled.div`
  display: flex;
  font-size: ${getStyledProp('font.baseFontSize')};
  height: 2.2em;
`;

export { Prepend, Append, InputWrapper };
