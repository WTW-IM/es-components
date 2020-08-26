import styled from 'styled-components';

const defaultBorderRadius = '2px';

const AddOn = styled.div`
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

export { Prepend, Append, InputWrapper };
