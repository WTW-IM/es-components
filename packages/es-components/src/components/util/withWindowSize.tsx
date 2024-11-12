import React, { useEffect, useState } from 'react';
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
type PropsWithoutWindowSizeProps<P> =
    P extends unknown ? (keyof WindowSizeProps extends keyof P ? Omit<P, keyof WindowSizeProps> : P) : P;

type AllWindowSizeProps<P = object> = P & DefaultSizeProps & WindowSizeProps;
type WithWindowSizeProps<P = object> = PropsWithoutWindowSizeProps<P> & DefaultSizeProps;

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
  P extends AllWindowSizeProps=AllWindowSizeProps,
  T = unknown
>(
  ComponentClass: React.ComponentType<P & React.RefAttributes<T>>
) {
  const WithWindowSize = React.forwardRef<T, WithWindowSizeProps<P>>(
    function ForwardedWithWindowSize(props, ref) {
      const { windowWidth, windowHeight} = useWindowSize(props);

      const allProps = {...props, windowWidth, windowHeight} as AllWindowSizeProps<P>;

      return (
        <ComponentClass
          ref={ref}
          {...(allProps)}
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

  return WithWindowSize;
}
