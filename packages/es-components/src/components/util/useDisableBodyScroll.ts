import { useEffect } from 'react';

export const useDisableBodyScroll = (shouldDisableScroll: Maybe<boolean>) => {
  useEffect(() => {
    const newStyle = 'overflow: hidden;';
    const getCurrentStyle = () => document.body.getAttribute('style') || '';
    let scrollDisabled = false;
    const disableScroll = () => {
      scrollDisabled = true;
      document.body.setAttribute('style', `${getCurrentStyle()} ${newStyle}`);
    };
    const enableScroll = () => {
      if (!scrollDisabled) return;
      scrollDisabled = false;
      document.body.setAttribute(
        'style',
        // this will only replace one instance of newStyle, which is what we want.
        getCurrentStyle().replace(newStyle, '')
      );
    };

    if (shouldDisableScroll) {
      disableScroll();
    } else {
      enableScroll();
    }

    return enableScroll;
  }, [shouldDisableScroll]);
};
