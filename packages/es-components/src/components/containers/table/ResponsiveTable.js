import React from 'react';
import styled from 'styled-components';
import Table from './Table';

const TableBase = styled(Table)`
  tbody {
    th {
      font-weight: normal;
    }
  }

  &&& {
    @media (max-width: ${props => props.theme.screenSize.phone}) {
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
        background-color: ${props => props.theme.colors.gray1};
        border: 1px solid ${props => props.theme.colors.gray4};
        border-bottom: 3px solid ${props => props.theme.colors.gray4};
        display: block;
        margin-bottom: 0.625em;
        padding: 0.35em;
      }

      td,
      tbody th {
        border-top: 1px solid ${props => props.theme.colors.gray4};
        display: flex;
        font-size: 0.8em;
        justify-content: space-between;
        padding: 0.625em;
        text-align: right;

        &:before {
          content: attr(data-label);
          font-weight: bold;
          margin-right: 2em;
          max-width: 25%;
          text-align: left;
        }

        &:first-child {
          border-top: 0;
        }

        &:last-child {
          border-bottom: 0;
        }
      }
    }
  }
`;

function ResponsiveTable(props) {
  return <TableBase {...props} />;
}

export default ResponsiveTable;
