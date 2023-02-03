import React, {
  useCallback,
  useEffect,
  useState,
  useSyncExternalStore,
  useTransition
} from 'react';
import viaTheme from 'es-components-via-theme';
import wtwTheme from 'es-components-wtw-theme';
import Switch from '../components/controls/switch/Switch';
import Modal from '../components/containers/modal/Modal';

function createStore() {
  let useViaTheme = true;
  const listeners = new Set();

  const getState = () => useViaTheme;
  const setState = isViaTheme => {
    useViaTheme = isViaTheme;
    listeners.forEach(listener => listener());
  };
  const subscribe = listener => {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  };

  return { getState, setState, subscribe };
}

const themeStore = createStore();

export function useIsViaTheme() {
  return useSyncExternalStore(themeStore.subscribe, themeStore.getState);
}

export function useStyleguideTheme() {
  const isViaTheme = useIsViaTheme();
  return isViaTheme ? viaTheme : wtwTheme;
}

export function ThemeSwitch() {
  const [isTransitioning, startTransition] = useTransition();
  const isViaTheme = useIsViaTheme();
  const [nextTheme, setNextTheme] = useState(isViaTheme);
  const [isBlocking, setIsBlocking] = useState(false);

  const onChange = useCallback(e => {
    // setIsBlocking(true);
    // setNextTheme(e.target.checked);
    startTransition(() => {
      themeStore.setState(e.target.checked);
    });
  }, []);

  const onEnter = useCallback(() => {
    setTimeout(() => {
      startTransition(() => {
        themeStore.setState(nextTheme);
      });
      // ensure the modal enter animation is completed before starting the transition
    }, 2000);
  }, []);

  useEffect(() => {
    // if (!isTransitioning) {
    //   setIsBlocking(false);
    // }
    console.log({ isViaTheme, nextTheme });
  }, [isTransitioning]);

  return (
    <>
      <Switch
        offText="WTW"
        onText="Via"
        label="Theme"
        checked={isViaTheme}
        onChange={onChange}
      />
      <Modal size="small" show={isBlocking} onEnter={onEnter}>
        <Modal.Header hideCloseButton>Updating Theme</Modal.Header>
        <Modal.Body>
          Updating theme to {nextTheme ? 'via' : 'wtw'} theme
        </Modal.Body>
      </Modal>
    </>
  );
}
