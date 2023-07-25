import PropTypes from 'prop-types';
import React from 'react';
import styled, { css } from 'styled-components';

type TableProps = Override<
  JSXElementProps<'table'>,
  {
    isCondensed?: boolean;
    isRoomy?: boolean;
    hasStripes?: boolean;
    hasHover?: boolean;
  }
>;

export interface TableBaseProps extends TableProps {
  cellPadding?: number | string;
}

const TableBase = styled.table<TableBaseProps>`
  border-collapse: collapse;
  border: 0;
  border-spacing: 0;
  margin: 0 0 25px 0;
  padding: 0;
  width: 100%;

  caption {
    padding-top: 8px;
    padding-bottom: 8px;
    color: ${props => props.theme.colors.gray8};
    font-size: 1.3em;
    margin: 0.5em 0;
    text-align: left;
  }

  thead th {
    border-bottom: 2px solid ${props => props.theme.colors.gray4};
  }

  tbody tr:not(:first-child) {
    th,
    td {
      border-top: 1px solid ${props => props.theme.colors.gray4};
    }
  }

  th {
    font-family: 'Source Sans Pro', 'Segoe UI', Segoe, Calibri, Tahoma,
      sans-serif;
    font-weight: bold;
    line-height: ${props => props.theme.font.baseLineHeight};
    padding: ${props => props.cellPadding};
    text-align: left;
    vertical-align: bottom;
  }

  td {
    line-height: ${props => props.theme.font.baseLineHeight};
    padding: ${(props: TableBaseProps) => props.cellPadding};
    vertical-align: top;
  }

  && tbody {
    ${props =>
      props.hasStripes &&
      css`
        tr:nth-of-type(odd) {
          background-color: ${props.theme.colors.gray0};
        }
      `};

    th {
      vertical-align: top;
    }
  }

  && tbody {
    ${props =>
      props.hasHover &&
      css`
        tr:hover {
          background-color: ${props.theme.colors.gray1};
        }
      `};
  }
`;

const Table = React.forwardRef<HTMLTableElement, TableProps>(
  function ForwardedTable(props, ref) {
    const { isCondensed, isRoomy, ...rest } = props;
    let cellPadding = '8px';
    cellPadding = isCondensed ? '5px' : cellPadding;
    cellPadding = isRoomy ? '12px' : cellPadding;

    return <TableBase ref={ref} cellPadding={cellPadding} {...rest} />;
  }
);

// kept to preserve backward-compatibility for now
const TableRow = styled.tr``;
const TableBodyCell = styled.td``;
const TableHeaderCell = styled.th``;

type TableComponent = typeof Table & {
  Row: typeof TableRow;
  Cell: typeof TableBodyCell;
  HeaderCell: typeof TableHeaderCell;
};

(Table as TableComponent).Row = TableRow;
(Table as TableComponent).Cell = TableBodyCell;
(Table as TableComponent).HeaderCell = TableHeaderCell;

Table.propTypes = {
  /** adds a darker background to every other row */
  hasStripes: PropTypes.bool,
  /** adds a hover effect to rows */
  hasHover: PropTypes.bool,
  /** reduce cell padding for a smaller footprint */
  isCondensed: PropTypes.bool,
  /** increase cell padding for more white space */
  isRoomy: PropTypes.bool
};

Table.defaultProps = {
  hasStripes: false,
  hasHover: false,
  isCondensed: false,
  isRoomy: false
};

export default Table as TableComponent;
