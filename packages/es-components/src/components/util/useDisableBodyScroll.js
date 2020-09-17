import { useEffect } from 'react';

export const useDisableBodyScroll = shouldDisableScroll => {
  useEffect(() => {
    const newStyle = 'overflow: hidden;';
    const getCurrentStyle = () => document.body.getAttribute('style') || '';
    const disableScroll = () =>
      document.body.setAttribute('style', `${getCurrentStyle()} ${newStyle}`);
    const enableScroll = () =>
      document.body.setAttribute(
        'style',
        getCurrentStyle().replace(newStyle, '')
      );

    if (shouldDisableScroll) {
      disableScroll();
    } else {
      enableScroll();
    }

    return enableScroll;
  }, [shouldDisableScroll]);
};
