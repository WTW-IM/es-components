import styled from 'styled-components';

export default styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: 100%;

  @media (min-width: ${props => props.theme.screenSize.tablet}) {
    flex-direction: row;
  }
`;
