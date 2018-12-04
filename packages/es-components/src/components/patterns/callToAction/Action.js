import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from '../../controls/buttons/Button';

const ActionButton = styled(Button)`
  :not(:first-of-type) {
    margin-left: 15px;
  }
`;

export default function Action({ isPrimary, children, ...rest }) {
  return <ActionButton {...rest}>{children}</ActionButton>;
}

Action.propTypes = {
  isPrimary: PropTypes.bool,
  children: PropTypes.node
};

Action.defaultProps = {
  isPrimary: false,
  children: null
};
