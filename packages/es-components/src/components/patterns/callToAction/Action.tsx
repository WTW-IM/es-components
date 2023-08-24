import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button, { ButtonProps } from '../../controls/buttons/Button';

export interface ActionProps extends ButtonProps {
  isPrimary?: boolean;
}

const ActionButton = styled(Button)`
  :not(:first-of-type) {
    margin-left: 15px;
  }
`;

// TODO: we should remove the isPrimary prop
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Action({ isPrimary, ...rest }: ActionProps) {
  return <ActionButton {...rest} />;
}

Action.propTypes = {
  isPrimary: PropTypes.bool
};

Action.defaultProps = {
  isPrimary: false
};
