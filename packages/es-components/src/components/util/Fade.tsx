import React, {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  forwardRef
} from 'react';
import PropTypes from 'prop-types';
import { callRefs } from './callRef';

type Opacity = React.CSSProperties['opacity'];

type TransitionStatus = 'entering' | 'entered' | 'exiting' | 'exited';

export interface FadeProps {
  in?: boolean;
  appear?: boolean;
  mountOnEnter?: boolean;
  unmountOnExit?: boolean;
  /** @deprecated use `duration` instead */
  timeout?: number;
  duration?: number;
  opacity?: Opacity;
  onEnter?: () => void;
  onEntering?: () => void;
  onEntered?: () => void;
  onExit?: () => void;
  onExiting?: () => void;
  onExited?: () => void;
  children: NonNullable<React.ReactNode>;
}

const getFadeStyle = (status: TransitionStatus, finalOpacity: Opacity) => {
  switch (status) {
    case 'entering':
    case 'entered':
      return { opacity: finalOpacity };
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

// Keeps the latest value of config/callbacks that shouldn't restart the
// running enter/exit animation (e.g. a parent re-rendering with a new
// inline onExited handler) available to the effect without needing them
// in its dependency array. Updated in a layout effect (not during render)
// so a running transition's callbacks stay current, including the one
// invoked from the very commit that changed them.
function useLatest<T>(value: T) {
  const ref = useRef(value);
  useLayoutEffect(() => {
    ref.current = value;
  });
  return ref;
}

type FadeTransitionCallbacks = Pick<
  FadeProps,
  'onEnter' | 'onEntering' | 'onEntered' | 'onExit' | 'onExiting' | 'onExited'
>;

type FadeTransitionProps = Omit<TransitionChildProps, 'transitionStatus'> &
  FadeTransitionCallbacks & {
    in: boolean;
    appear: boolean;
    mountOnEnter: boolean;
    unmountOnExit: boolean;
    timeout: number;
  };

function FadeTransition({
  children,
  style,
  in: inProp,
  appear,
  mountOnEnter,
  unmountOnExit,
  timeout,
  onEnter,
  onEntering,
  onEntered,
  onExit,
  onExiting,
  onExited
}: FadeTransitionProps) {
  const child = React.Children.only(children);
  const configRef = useLatest({
    appear,
    unmountOnExit,
    timeout,
    onEnter,
    onEntering,
    onEntered,
    onExit,
    onExiting,
    onExited
  });

  const isInitialMount = useRef(true);
  const [status, setStatus] = useState<TransitionStatus>(() =>
    inProp && !appear ? 'entered' : 'exited'
  );
  const [mounted, setMounted] = useState<boolean>(
    () => inProp || !mountOnEnter
  );

  useEffect(() => {
    const {
      appear: shouldAppear,
      unmountOnExit: shouldUnmount,
      timeout: duration,
      onEnter: handleEnter,
      onEntering: handleEntering,
      onEntered: handleEntered,
      onExit: handleExit,
      onExiting: handleExiting,
      onExited: handleExited
    } = configRef.current;

    const wasInitialMount = isInitialMount.current;
    isInitialMount.current = false;
    if (wasInitialMount && !(inProp && shouldAppear)) {
      return undefined;
    }

    let enterFrame1 = 0;
    let enterFrame2 = 0;
    let exitTimer: ReturnType<typeof setTimeout> | undefined;
    let enteredTimer: ReturnType<typeof setTimeout> | undefined;

    if (inProp) {
      handleEnter?.();
      setMounted(true);
      setStatus('entering');
      // Two animation frames let the browser paint the opacity:0 frame
      // before flipping to the final opacity, so the CSS transition
      // actually animates instead of jumping straight to the end state.
      enterFrame1 = requestAnimationFrame(() => {
        enterFrame2 = requestAnimationFrame(() => {
          handleEntering?.();
          setStatus('entered');
          enteredTimer = setTimeout(() => {
            handleEntered?.();
          }, duration);
        });
      });
    } else {
      handleExit?.();
      setStatus('exiting');
      handleExiting?.();
      exitTimer = setTimeout(() => {
        setStatus('exited');
        if (shouldUnmount) {
          setMounted(false);
        }
        handleExited?.();
      }, duration);
    }

    return () => {
      cancelAnimationFrame(enterFrame1);
      cancelAnimationFrame(enterFrame2);
      clearTimeout(exitTimer);
      clearTimeout(enteredTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only `in` should restart the enter/exit cycle; the remaining config/callbacks are read from configRef so a parent re-render with a new inline callback doesn't rewind an in-flight transition.
  }, [inProp]);

  if (!mounted) {
    return null;
  }

  return (
    <TransitionChild transitionStatus={status} style={style}>
      {child}
    </TransitionChild>
  );
}

const Fade: React.FC<FadeProps> = ({
  children,
  in: inProp = false,
  appear = false,
  mountOnEnter = false,
  unmountOnExit = false,
  duration,
  timeout,
  opacity = 1,
  onEnter,
  onEntering,
  onEntered,
  onExit,
  onExiting,
  onExited
}) => {
  const resolvedDuration = duration || timeout || 150;
  const transitionStyles = {
    transition: `opacity ${resolvedDuration}ms linear`,
    opacity
  };

  return React.Children.map(children, child =>
    !React.isValidElement(child) ? (
      child
    ) : (
      <FadeTransition
        in={inProp}
        appear={appear}
        mountOnEnter={mountOnEnter}
        unmountOnExit={unmountOnExit}
        timeout={resolvedDuration}
        onEnter={onEnter}
        onEntering={onEntering}
        onEntered={onEntered}
        onExit={onExit}
        onExiting={onExiting}
        onExited={onExited}
        style={transitionStyles}
      >
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
