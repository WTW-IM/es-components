import styled from 'styled-components';

export const Table = styled.table`
  border-collapse: collapse;
  border-spacing: 0;
  width: 100%;
`;

export const TableRow = styled.tr`
  &:last-of-type td {
    border: 0;
  }
`;

export const TableBodyCell = styled.td`
  border-bottom: 1px solid ${props => props.theme.colors.gray4};
  padding: 8px;
  text-align: left;
`;

export const TableHeaderCell = styled.th`
  border-bottom: 2px solid ${props => props.theme.colors.gray4};
  padding: 8px;
  text-align: left;
`;
