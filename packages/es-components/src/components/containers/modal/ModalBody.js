import styled from 'styled-components';

// Note: ModalBody relies on a parent (Modal) with ThemeProvider wrapping it
const ModalBody = styled.div`
  color: ${props => props.theme.colors.gray9};
  padding: 15px;
`;

export default ModalBody;
