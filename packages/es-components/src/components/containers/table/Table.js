import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

const TableBase = styled.table`
  border-collapse: collapse;
  border: 0;
  border-spacing: 0;
  margin: 0 0 25px 0;
  padding: 0;
  width: 100%;

  ${props =>
    props.isResponsive &&
    css`
      &&& {
        @media (max-width: ${props.theme.screenSize.phone}) {
          thead {
            border: none;
            clip: rect(0 0 0 0);
            height: 1px;
            margin: -1px;
            overflow: hidden;
            padding: 0;
            position: absolute;
            width: 1px;
          }

          tr {
            background-color: ${props.theme.colors.gray1};
            border: 1px solid ${props.theme.colors.gray4};
            border-bottom: 3px solid ${props.theme.colors.gray4};
            display: block;
            margin-bottom: 0.625em;
            padding: 0.35em;
          }

          td {
            border-bottom: 1px solid ${props.theme.colors.gray4};
            display: block;
            font-size: 0.8em;
            padding: 0.625em;
            text-align: right;

            &:before {
              content: attr(data-label);
              float: left;
              font-weight: bold;
            }

            &:last-child {
              border-bottom: 0;
            }
          }
        }
      }
    `};
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
  font-weight: bold;
  padding: 8px;
  text-align: left;
`;

function Table(props) {
  return <TableBase {...props} />;
}

Table.Row = TableRow;
Table.Cell = TableBodyCell;
Table.HeaderCell = TableHeaderCell;

Table.propTypes = {
  /** Render a responsive table that changes layout on mobile devices */
  isResponsive: PropTypes.bool
};

Table.defaultProps = {
  isResponsive: false
};

export default Table;
