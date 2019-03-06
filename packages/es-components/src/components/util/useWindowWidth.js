import React from 'react';

export function useWindowWidth() {
  const [width, setWidth] = React.useState(document.body.clientWidth);

  React.useEffect(() => {
    const handleResize = () => setWidth(document.body.clientWidth);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return width;
}
