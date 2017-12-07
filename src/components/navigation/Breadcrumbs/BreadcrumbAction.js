import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const SpanStyled = styled.span`
  &:hover {
    text-decoration: underline;
  }
`;

function BreadcrumbAction({ action, name, actionClasses }) {
  const actionProps = {
    onClick: action,
    className: actionClasses
  };
  return <SpanStyled {...actionProps}>{name}</SpanStyled>;
}

BreadcrumbAction.propTypes = {
  name: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired,
  actionClasses: PropTypes.string
};

export default BreadcrumbAction;
