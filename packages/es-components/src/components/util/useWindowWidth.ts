import { useEffect, useState } from 'react';

export function useWindowWidth() {
  const getMediaWidth = () =>
    // https://stackoverflow.com/a/6850319
    window.innerWidth > 0 ? window.innerWidth : window.screen.width;
  const [width, setWidth] = useState(getMediaWidth());

  useEffect(() => {
    const handleResize = () => setWidth(getMediaWidth());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return width;
}
