import styled from 'styled-components';

const Dropdown = styled.select`
  background-color: ${props => props.theme.colors.white};
  border: 1px solid;
  border-color: inherit;
  border-radius: 2px;
  box-sizing: border-box;
  color: inherit;
  flex-basis: auto;
  font-size: ${props => props.theme.sizes.baseFontSize};
  font-weight: normal;
  height: 39px;
  padding: 6px 12px;
  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;

  &:focus {
    outline: 0;
  }

  &:disabled {
    background-color: ${props => props.theme.colors.gray2};
    cursor: not-allowed;
  }
`;

/** @component */
export default Dropdown;
