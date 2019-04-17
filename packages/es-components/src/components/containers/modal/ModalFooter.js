import styled from 'styled-components';

// Note: ModalFooter relies on a parent (Modal) with ThemeProvider wrapping it
const ModalFooter = styled.div`
  align-items: baseline;
  display: flex;
  padding: 15px 15px 55px;
  text-align: right;

  button {
    width: auto;
  }

  @media (min-width: ${props => props.theme.screenSize.tablet}) {
    padding: 15px 15px 19px;
  }
`;

export default ModalFooter;
