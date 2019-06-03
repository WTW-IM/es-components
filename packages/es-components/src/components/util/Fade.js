import React from 'react';
import PropTypes from 'prop-types';
import Transition from 'react-transition-group/Transition';

const Fade = ({ children, duration, opacity, ...otherProps }) => {
  const transitionStyles = {
    transition: `opacity ${duration}ms linear`,
    opacity: 0
  };

  const stateStyles = {
    entering: { opacity },
    entered: { opacity }
  };

  return (
    <Transition {...otherProps} timeout={duration}>
      {(state, innerProps) =>
        React.cloneElement(children, {
          ...innerProps,
          style: {
            ...children.props.style,
            ...transitionStyles,
            ...stateStyles[state]
          }
        })
      }
    </Transition>
  );
};

Fade.propTypes = {
  children: PropTypes.any.isRequired,
  duration: PropTypes.number,
  opacity: PropTypes.number
};

Fade.defaultProps = {
  duration: 150,
  opacity: 1
};

export default Fade;
