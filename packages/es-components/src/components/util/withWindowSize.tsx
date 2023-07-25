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

function getWindowSize({
  defaultWidth,
  defaultHeight
}: DefaultSizeProps = {}): WindowSizeProps {
  return {
    windowWidth: defaultWidth || document.body.clientWidth,
    windowHeight: defaultHeight || document.body.clientHeight
  };
}

type AllWindowSizeProps<P> = P & DefaultSizeProps & WindowSizeProps;
type WithWindowSizeProps<P> = Omit<P, keyof WindowSizeProps> & DefaultSizeProps;

export default function withWindowSize<P extends WindowSizeProps>(
  ComponentClass: React.ComponentType<AllWindowSizeProps<P>>
) {
  const WithWindowSize = (props: WithWindowSizeProps<P>) => {
    const [windowSize, setWindowSize] = useState(getWindowSize(props));

    useEffect(() => {
      const handleResize = () => {
        const activeTag = document.activeElement?.tagName.toLocaleLowerCase();
        if (activeTag === 'input' || activeTag === 'select') {
          return;
        }

        setWindowSize(getWindowSize());
      };

      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
      <ComponentClass
        {...(props as P & DefaultSizeProps)}
        windowWidth={windowSize.windowWidth}
        windowHeight={windowSize.windowHeight}
      />
    );
  };

  WithWindowSize.propTypes = {
    defaultWidth: PropTypes.number,
    defaultHeight: PropTypes.number
  };

  WithWindowSize.defaultProps = {
    defaultWidth: undefined,
    defaultHeight: undefined
  };

  return WithWindowSize;
}
