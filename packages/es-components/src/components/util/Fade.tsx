import React from 'react';
import PropTypes from 'prop-types';
import Transition, {
  TransitionStatus,
  TimeoutProps
} from 'react-transition-group/Transition';

type Opacity = React.CSSProperties['opacity'];

export interface FadeProps extends Partial<TimeoutProps<HTMLElement>> {
  duration?: number;
  opacity?: Opacity;
  children: NonNullable<React.ReactNode>;
}

const getFadeStyle = (status: TransitionStatus, finalOpacity: Opacity) => {
  switch (status) {
    case 'entering':
    case 'entered':
      return { finalOpacity };
    default:
      return { opacity: 0 };
  }
};

type AnyReactHTMLElement = React.ReactHTMLElement<HTMLElement>;

const TransitionChild: React.FC<{
  children: AnyReactHTMLElement;
  style: React.CSSProperties;
  transitionStatus: TransitionStatus;
}> = ({ children, style, transitionStatus }) => {
  return React.cloneElement(children, {
    style: {
      ...((children?.props?.style as Maybe<React.CSSProperties>) || {}),
      ...style,
      ...getFadeStyle(
        transitionStatus,
        typeof style.opacity == 'number' || Boolean(style.opacity)
          ? style.opacity
          : 1
      )
    }
  });
};

const Fade: React.FC<FadeProps> = ({
  children,
  duration,
  opacity,
  ...otherProps
}) => {
  const transitionStyles = {
    transition: `opacity ${duration || 150}ms linear`,
    opacity
  };

  const transitionProps = {
    ...otherProps,
    timeout: duration || otherProps.timeout || 150
  };

  const hasValidChildren = React.isValidElement(children);

  return !hasValidChildren ? (
    <>{children}</>
  ) : (
    <Transition {...transitionProps}>
      {transitionStatus => {
        try {
          return (
            React.Children.only(children) && (
              <TransitionChild
                transitionStatus={transitionStatus}
                style={transitionStyles}
              >
                {children as AnyReactHTMLElement}
              </TransitionChild>
            )
          );
        } catch (e) {
          return React.Children.map(children, child => {
            return !child ? (
              child
            ) : (
              <TransitionChild
                transitionStatus={transitionStatus}
                style={transitionStyles}
              >
                {child as AnyReactHTMLElement}
              </TransitionChild>
            );
          });
        }
      }}
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
