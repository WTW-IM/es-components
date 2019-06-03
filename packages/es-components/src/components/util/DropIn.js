import React from 'react';
import PropTypes from 'prop-types';
import Transition from 'react-transition-group/Transition';

const DropIn = ({ children, duration, ...otherProps }) => {
  const transitionStyles = {
    opacity: 0,
    transform: `translate(0, -25%)`,
    transition: `transform ${duration}ms ease-out, opacity ${duration}ms linear`
  };

  const stateStyles = {
    entering: { opacity: 1, transform: `translate(0, 0)` },
    entered: { opacity: 1, transform: `translate(0, 0)` }
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

DropIn.propTypes = {
  children: PropTypes.any.isRequired,
  duration: PropTypes.number
};

DropIn.defaultProps = {
  duration: 300
};

export default DropIn;
