import React from 'react';
import PropTypes from 'prop-types';
import Transition from 'react-transition-group/Transition';

const Fade = ({ children, duration, opacity, withWrapper, ...otherProps }) => {
  const transitionStyles = {
    transition: `opacity ${duration}ms ease-in-out`,
    opacity: 0
  };

  const stateStyles = {
    entering: { opacity },
    entered: { opacity }
  };

  // the withWrapper option is to support components using the Overlay/Position
  // react-overlay components, which don't properly pass children style props
  // as of the 0.8.3
  return withWrapper ? (
    <Transition {...otherProps} timeout={duration}>
      {(state, innerProps) => (
        <div style={{ ...transitionStyles, ...stateStyles[state] }}>
          {children}
        </div>
      )}
    </Transition>
  ) : (
    <Transition {...otherProps} timeout={duration}>
      {(state, innerProps) =>
        React.cloneElement(children, {
          ...innerProps,
          style: {
            ...children.props.style,
            ...transitionStyles,
            ...stateStyles[state]
          }
        })}
    </Transition>
  );
};

Fade.propTypes = {
  children: PropTypes.any.isRequired,
  duration: PropTypes.number,
  opacity: PropTypes.number,
  withWrapper: PropTypes.bool
};

Fade.defaultProps = {
  duration: 300,
  opacity: 1,
  withWrapper: false
};

export default Fade;
