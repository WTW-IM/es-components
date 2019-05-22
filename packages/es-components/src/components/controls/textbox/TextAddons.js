import styled from 'styled-components';
import Icon from '../../base/icons/Icon';
import InputBase from './InputText';

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
  padding-right: 2em;
  -webkit-appearance: none;
`;

const ValidationIconWrapper = styled.span`
  height: 0;
  position: relative;
  width: 0;
`;

const ValidationIcon = styled(Icon)`
  height: 20px;
  pointer-events: none;
  position: absolute;
  right: 11px;
  top: 11px;
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
  display: table-cell;
  height: 39px;
  line-height: 1;
  margin: 0;
  outline: 0;
  padding: 6px 11px;

  i {
    line-height: 1;
    vertical-align: middle;
  }
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

export {
  ValidationIconWrapper,
  ValidationIcon,
  Prepend,
  Append,
  InputWrapper,
  TextboxBase
};
