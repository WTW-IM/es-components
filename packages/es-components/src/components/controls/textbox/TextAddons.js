import styled from 'styled-components';
import Icon from '../../base/icons/Icon';
import InputBase from './InputBase';

const defaultBorderRadius = '2px';

const TextboxBase = styled(InputBase)`
  border-bottom-left-radius: ${props =>
    props.hasPrepend ? '0' : defaultBorderRadius};
  border-bottom-right-radius: ${props =>
    props.hasAppend ? '0' : defaultBorderRadius};
  border-top-left-radius: ${props =>
    props.hasPrepend ? '0' : defaultBorderRadius};
  border-top-right-radius: ${props =>
    props.hasAppend ? '0' : defaultBorderRadius};
  color: inherit;
  display: table-cell;
  -webkit-appearance: none;
`;

const ValidationIcon = styled(Icon)`
  align-self: flex-start;
  font-size: 35px;
  margin-right: 5px;
`;

const AddOn = styled.button`
  background-color: ${props => props.addOnBgColor};
  border: 1px solid
    ${props =>
      props.addOnBgColor === props.theme.colors.gray3
        ? props.theme.colors.gray5
        : props.addOnBgColor};
  border-radius: ${defaultBorderRadius};
  box-sizing: border-box;
  color: ${props => props.addOnTextColor};
  display: flex;
  flex-direction: column;
  height: 39px;
  justify-content: center;
  line-height: 1;
  margin: 0;
  outline: 0;
  padding: 6px 11px;
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
`;

export { ValidationIcon, Prepend, Append, InputWrapper, TextboxBase };
