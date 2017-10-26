import React from 'react';
import PropTypes from 'prop-types';
import Transition from 'react-overlays/lib/Transition';
import { injectGlobal } from 'styled-components';

/* eslint-disable no-unused-expressions */
injectGlobal`
  .default-transition-out {
    opacity: 0;
    transition: opacity 300ms linear;
  }

  .default-transition-in {
    opacity: 1;
  }
`;
/* eslint-enable no-unused-expressions */

const Fade = props => {
  const {
    in: transitionIn,
    timeout,
    transitionClassIn,
    transitionClassOut,
    ...otherProps
  } = props;

  return (
    <Transition
      className={transitionClassOut}
      enteredClassName={transitionClassIn}
      enteringClassName={transitionClassIn}
      in={transitionIn}
      unmountOnExit
      timeout={timeout}
      transitionAppear
      {...otherProps}
    />
  );
};

Fade.propTypes = {
  children: PropTypes.any.isRequired,
  in: PropTypes.bool,
  transitionClassIn: PropTypes.string,
  transitionClassOut: PropTypes.string,
  timeout: PropTypes.number
};

Fade.defaultProps = {
  transitionClassIn: 'default-transition-in',
  transitionClassOut: 'default-transition-out',
  timeout: 5000
};

export default Fade;
