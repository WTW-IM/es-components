import styled from 'styled-components';

const Table = styled.table`
  border-collapse: collapse;
  border-spacing: 0;
  width: 100%;
`;

const TableRow = styled.tr`
  &:last-of-type td {
    border: 0;
  }
`;

const TableBodyCell = styled.td`
  border-bottom: 1px solid ${props => props.theme.colors.gray4};
  padding: 8px;
  text-align: left;
`;

const TableHeaderCell = styled.th`
  border-bottom: 2px solid ${props => props.theme.colors.gray4};
  padding: 8px;
  text-align: left;
`;

Table.Row = TableRow;
Table.Cell = TableBodyCell;
Table.HeaderCell = TableHeaderCell;

/** @component */
export default Table;
