import { useWindowSize } from './withWindowSize';

export function useWindowWidth() {
  const { windowWidth } = useWindowSize();

  return windowWidth;
}
