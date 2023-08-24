import React, { useEffect, useState, useSyncExternalStore } from 'react';
import PropTypes from 'prop-types';

export interface DefaultSizeProps {
  defaultWidth?: number;
  defaultHeight?: number;
}

export interface WindowSizeProps {
  windowWidth: number;
  windowHeight: number;
}

const getMediaWidth = () =>
  // https://stackoverflow.com/a/8876069
  document.documentElement.clientWidth || window.innerWidth || 0;

const getMediaHeight = () =>
  // https://stackoverflow.com/a/8876069
  document.documentElement.clientHeight || window.innerHeight || 0;

function getWindowSize({
  defaultWidth,
  defaultHeight
}: DefaultSizeProps = {}): WindowSizeProps {
  return {
    windowWidth: defaultWidth || getMediaWidth(),
    windowHeight: defaultHeight || getMediaHeight()
  };
}

const windowSizeListeners = new Set<() => void>();
let windowSize = getWindowSize();

const notify = () => {
  windowSizeListeners.forEach(listener => listener());
};

let running = false;
const handleResize = () => {
  if (running) return;

  const activeTag = document.activeElement?.tagName.toLocaleLowerCase();
  if (activeTag === 'input' || activeTag === 'select') {
    return;
  }

  running = true;
  requestAnimationFrame(() => {
    running = false;
    windowSize = getWindowSize();
    notify();
  });
};

const subscribe = (listener: () => void) => {
  if (!windowSizeListeners.size) {
    window.addEventListener('resize', handleResize);
  }

  windowSizeListeners.add(listener);

  return () => {
    windowSizeListeners.delete(listener);

    if (!windowSizeListeners.size) {
      window.removeEventListener('resize', handleResize);
    }
  };
};

export const useWindowSizeStore = () => {
  return useSyncExternalStore(subscribe, () => windowSize);
};

type AllWindowSizeProps<P> = P & DefaultSizeProps & WindowSizeProps;
type WithWindowSizeProps<P> = Omit<P, keyof WindowSizeProps> & DefaultSizeProps;

export function useWindowSize({
  defaultWidth,
  defaultHeight
}: DefaultSizeProps = {}): WindowSizeProps {
  const [windowSize, setWindowSize] = useState(
    getWindowSize({ defaultWidth, defaultHeight })
  );

  useEffect(() => {
    let running = false;
    const handleResize = () => {
      if (running) return;

      const activeTag = document.activeElement?.tagName.toLocaleLowerCase();
      if (activeTag === 'input' || activeTag === 'select') {
        return;
      }

      running = true;
      requestAnimationFrame(() => {
        running = false;
        setWindowSize(getWindowSize());
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [defaultWidth, defaultHeight]);

  return {
    windowWidth: windowSize.windowWidth,
    windowHeight: windowSize.windowHeight
  };
}

export default function withWindowSize<
  P extends WindowSizeProps = WindowSizeProps,
  T = never
>(
  ComponentClass:
    | React.ComponentType<AllWindowSizeProps<P>>
    | React.ForwardRefExoticComponent<
        AllWindowSizeProps<P> & React.RefAttributes<T>
      >
) {
  const WithWindowSize = React.forwardRef<T, WithWindowSizeProps<P>>(
    function ForwardedWithWindowSize(props, ref) {
      const windowSize = useWindowSize(props);

      return (
        <ComponentClass
          ref={ref}
          {...(props as P & DefaultSizeProps)}
          windowWidth={windowSize.windowWidth}
          windowHeight={windowSize.windowHeight}
        />
      );
    }
  );

  (
    WithWindowSize as React.ForwardRefExoticComponent<DefaultSizeProps>
  ).propTypes = {
    defaultWidth: PropTypes.number,
    defaultHeight: PropTypes.number
  };

  (
    WithWindowSize as React.ForwardRefExoticComponent<DefaultSizeProps>
  ).defaultProps = {
    defaultWidth: undefined,
    defaultHeight: undefined
  };

  return WithWindowSize;
}
