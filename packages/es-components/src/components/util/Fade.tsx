import React, { useRef, forwardRef } from 'react';
import PropTypes from 'prop-types';
import Transition, {
  TransitionStatus,
  TimeoutProps,
  TransitionProps
} from 'react-transition-group/Transition';
import { callRefs } from './callRef';

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
type TransitionChildProps = {
  children: AnyReactHTMLElement;
  style: React.CSSProperties;
  transitionStatus: TransitionStatus;
};

const TransitionChild = forwardRef<unknown, TransitionChildProps>(
  function ForwardedTransitionChild(
    { children, style, transitionStatus },
    ref
  ) {
    return React.cloneElement(children, {
      ref: (el: unknown) =>
        callRefs(el, ref, children.ref as React.Ref<unknown> | undefined),
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
  }
);

type TransitionElement = HTMLElement | undefined;

type FadeTransitionProps<T extends TransitionElement> = Omit<
  TransitionChildProps,
  'transitionStatus'
> &
  Omit<TransitionProps<T>, 'timeout'> & {
    timeout: NonNullable<TransitionProps<T>['timeout']>;
  };

function FadeTransition<T extends TransitionElement>({
  children,
  style,
  ...transitionProps
}: FadeTransitionProps<T>) {
  const nodeRef = useRef(null);
  const child = React.Children.only(children);

  return (
    <Transition nodeRef={nodeRef} {...transitionProps}>
      {transitionStatus => (
        <TransitionChild
          ref={nodeRef}
          transitionStatus={transitionStatus}
          style={style}
        >
          {child}
        </TransitionChild>
      )}
    </Transition>
  );
}

const Fade: React.FC<FadeProps> = ({
  children,
  duration = 150,
  opacity = 1,
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

  return React.Children.map(children, child =>
    !React.isValidElement(child) ? (
      child
    ) : (
      <FadeTransition {...transitionProps} style={transitionStyles}>
        {child as AnyReactHTMLElement}
      </FadeTransition>
    )
  );
};

Fade.propTypes = {
  children: PropTypes.any.isRequired,
  duration: PropTypes.number,
  opacity: PropTypes.number
};

export default Fade;
