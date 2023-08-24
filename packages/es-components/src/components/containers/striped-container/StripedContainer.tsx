import styled from 'styled-components';

const StripedContainer = styled.div`
  > * {
    display: block;
    padding: 20px;

    &:nth-child(even) {
      background-color: ${({ theme }) => theme.colors.gray4};
    }

    &:nth-child(odd) {
      background-color: ${({ theme }) => theme.colors.gray2};
    }
  }
`;

/** @component */
export default StripedContainer;
