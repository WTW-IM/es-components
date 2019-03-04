import styled from 'styled-components';

// Note: ModalFooter relies on a parent (Modal) with ThemeProvider wrapping it
const ModalFooter = styled.div`
  display: flex;
  padding: 15px;
  text-align: right;

  button {
    width: auto;
  }
`;

export default ModalFooter;
