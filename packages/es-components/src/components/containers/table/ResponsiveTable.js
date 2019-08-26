import React from 'react';
import styled from 'styled-components';
import Table from './Table';

const TableBase = styled(Table)`
  tbody {
    th {
      font-family: 'SourceSansPro-Regular', 'Source Sans Pro', 'Segoe UI', Segoe,
        Calibri, Tahoma, sans-serif;
      font-weight: normal;
    }
  }

  &&& {
    @media (max-width: ${props => props.theme.screenSize.phone}) {
      background-color: ${props => props.theme.colors.gray2};

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
        background-color: ${props => props.theme.colors.white};
        box-shadow: 1px 1px 3px 1px rgba(0, 0, 0, 0.2);
        display: block;
        margin: 0.625em;
        padding: 0.35em;
      }

      td,
      tbody th {
        border-top: 1px solid ${props => props.theme.colors.gray4};
        display: flex;
        justify-content: space-between;
        padding: 0.625em;
        text-align: right;

        &:before {
          content: attr(data-label);
          font-family: 'SourceSansPro-Bold', 'Source Sans Pro', 'Segoe UI',
            Segoe, Calibri, Tahoma, sans-serif;
          font-weight: bold;
          margin-right: 2em;
          max-width: 25%;
          text-align: left;

          @-moz-document url-prefix() {
            font-weight: lighter !important;
          }
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
