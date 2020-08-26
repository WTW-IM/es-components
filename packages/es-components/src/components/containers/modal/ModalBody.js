import styled from 'styled-components';

// Note: ModalBody relies on a parent (Modal) with ThemeProvider wrapping it
const ModalBody = styled.div`
  color: ${props => props.theme.colors.gray9};
  margin-top: ${props => props.theme.headerHeight}px;
  padding: 15px;

  .small & {
    @media (min-width: ${props => props.theme.screenSize.phone}) {
      margin-top: unset;
    }
  }

  .medium & {
    @media (min-width: ${props => props.theme.screenSize.tablet}) {
      margin-top: unset;
    }
  }

  .large & {
    @media (min-width: ${props => props.theme.screenSize.desktop}) {
      margin-top: unset;
    }
  }
`;

export default ModalBody;
