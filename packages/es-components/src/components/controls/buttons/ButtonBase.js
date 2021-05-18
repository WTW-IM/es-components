import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const noop = () => {
  // noop
};

const UnstyledButton = styled(props => <button type="button" {...props} />)``;
const ButtonBase = React.forwardRef(function ButtonBaseInner(
  { waiting, onClick, ...props },
  ref
) {
  const innerClick = useCallback(
    (...args) => !waiting && (onClick || noop)(...args),
    [waiting, onClick]
  );
  const computedProps = {
    ...props,
    ...(waiting ? { 'data-waiting': waiting } : {})
  };
  return <UnstyledButton onClick={innerClick} {...computedProps} ref={ref} />;
});

ButtonBase.propTypes = {
  ...(styled.button.propTypes || {}),
  /** Styles the Button with the "disabled" state and prevents click action */
  waiting: PropTypes.bool
};

ButtonBase.defaultProps = {
  waiting: false
};

export default ButtonBase;
