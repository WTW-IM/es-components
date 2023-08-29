import React, {
  useCallback,
  useEffect,
  useState,
  useSyncExternalStore,
  useTransition
} from 'react';
import ESTheme from 'es-components-shared-types';
import viaTheme from 'es-components-via-theme';
import wtwTheme from 'es-components-wtw-theme';
import Switch from '../components/controls/switch/Switch';
import Modal from '../components/containers/modal/Modal';

function createStore() {
  type Listener = () => void;
  let useViaTheme = true;
  const listeners = new Set<Listener>();

  const getState = () => useViaTheme;
  const setState = (isViaTheme: boolean) => {
    useViaTheme = isViaTheme;
    listeners.forEach(listener => listener());
  };
  const subscribe = (listener: Listener) => {
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

export function useStyleguideTheme(): ESTheme {
  const isViaTheme = useIsViaTheme();
  return isViaTheme ? viaTheme : wtwTheme;
}

export function ThemeSwitch() {
  const [isTransitioning, startTransition] = useTransition();
  const isViaTheme = useIsViaTheme();
  /* eslint-disable @typescript-eslint/no-unused-vars */
  const [nextTheme, setNextTheme] = useState(isViaTheme);
  const [isBlocking, setIsBlocking] = useState(false);
  /* eslint-enable @typescript-eslint/no-unused-vars */

  const onChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    e => {
      // setIsBlocking(true);
      // setNextTheme(e.target.checked);
      startTransition(() => {
        themeStore.setState(e.target.checked);
      });
    },
    []
  );

  const onEnter = useCallback(() => {
    setTimeout(() => {
      startTransition(() => {
        themeStore.setState(nextTheme);
      });
      // ensure the modal enter animation is completed before starting the transition
    }, 2000);
    // only running this on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // if (!isTransitioning) {
    //   setIsBlocking(false);
    // }
    console.log({ isViaTheme, nextTheme });
  }, [isTransitioning, isViaTheme, nextTheme]);

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
