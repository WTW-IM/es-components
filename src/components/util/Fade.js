import React from 'react';
import PropTypes from 'prop-types';
import Transition from 'react-overlays/lib/Transition';

const Fade = (props) => (
  <Transition
    className={props.transitionClassOut}
    enteredClassName={props.transitionClassIn}
    enteringClassName={props.transitionClassIn}
    in={props.in}
    mountOnEnter
    unmountOnExit
    timeout={2000}
    transitionAppear
    {...props}
  />
);

Fade.propTypes = {
  children: PropTypes.any.isRequired,
  in: PropTypes.bool,
  transitionClassIn: PropTypes.string,
  transitionClassOut: PropTypes.string
};

export default Fade;
