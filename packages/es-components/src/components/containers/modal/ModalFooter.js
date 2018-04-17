import styled from 'styled-components';

// Note: ModalFooter relies on a parent (Modal) with ThemeProvider wrapping it
const ModalFooter = styled.div`
  background-color: ${props => props.theme.colors.gray2};
  border-top: 1px solid ${props => props.theme.colors.gray5};
  padding: 15px;
  text-align: right;
`;

export default ModalFooter;
