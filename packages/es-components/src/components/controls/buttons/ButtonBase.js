import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const noop = () => {
  // noop
};

// Using this because React does not like many of our upstream props.
// This allows that to flow without issue.
const UnstyledButton = styled.button`
  // noop
`;

export function ButtonBaseComponent({ waiting, onClick, ...props }, ref) {
  const innerClick = useCallback(
    (...args) => !waiting && (onClick || noop)(...args),
    [waiting, onClick]
  );
  const computedProps = {
    ...props,
    ...(waiting ? { 'data-waiting': waiting } : {})
  };
  return (
    <UnstyledButton
      type="button"
      onClick={innerClick}
      {...computedProps}
      ref={ref}
    />
  );
}

ButtonBaseComponent.propTypes = {
  ...(styled.button.propTypes || {}),
  /** Styles the Button with the "disabled" state and prevents click action */
  waiting: PropTypes.bool
};

ButtonBaseComponent.defaultProps = {
  waiting: false
};

const ButtonBase = React.forwardRef(ButtonBaseComponent);
export default ButtonBase;
