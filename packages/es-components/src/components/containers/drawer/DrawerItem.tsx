import React, {
  createContext,
  useContext,
  useCallback,
  useEffect,
  useState,
  useRef
} from 'react';
import PropTypes from 'prop-types';
import AnimateHeight, { AnimateHeightProps } from 'react-animate-height';
import { DrawerContext } from './DrawerContext';
import useUniqueId from '../../util/useUniqueId';

const noop = () => {
  // noop
};

interface DrawerItemContextShape {
  open: boolean;
  itemId: string;
  itemKey: string;
  toggleOpen: () => void;
}

export const DrawerItemContext = createContext<DrawerItemContextShape>({
  open: false,
  itemId: '',
  itemKey: '',
  toggleOpen: () => {
    /* noop */
  }
});

export const useDrawerItemContext = () => useContext(DrawerItemContext);

export interface DrawerItemProps {
  open?: boolean;
  onChange?: (open: boolean) => void;
  id?: string;
  panelKey?: React.Key;
  children?: React.ReactNode;
}

export const DrawerItem = ({
  id,
  panelKey,
  open: openProp,
  onChange: onChangeProp,
  ...props
}: DrawerItemProps) => {
  const { activeKeys, toggleActiveKey, setActiveKey, unsetActiveKey } =
    useContext(DrawerContext);
  const itemId = useUniqueId(id);
  const itemKey = useUniqueId(panelKey?.toString());
  const toggleOpen = useCallback(
    () => toggleActiveKey(itemKey),
    [itemKey, toggleActiveKey]
  );
  const onChange = useRef(onChangeProp);
  onChange.current = onChangeProp;
  const afterInitialRender = useRef(false);
  const [open, setOpen] = useState(activeKeys.includes(itemKey));
  const [itemContext, setItemContext] = useState({
    open,
    itemId,
    itemKey,
    toggleOpen
  });

  useEffect(
    function setOpenFromActiveKeys() {
      const newOpen = activeKeys.includes(itemKey);
      setOpen(newOpen);
    },
    [activeKeys, itemKey]
  );

  useEffect(
    function setOpenFromOpenProp() {
      if (typeof openProp === 'undefined') return;

      (openProp ? setActiveKey : unsetActiveKey)(itemKey);
    },
    [openProp, itemKey, setActiveKey, unsetActiveKey]
  );

  useEffect(
    function callOnChangeWhenOpenChanges() {
      if (!afterInitialRender.current) {
        return;
      }

      (onChange.current || noop)(open);
    },
    [open]
  );

  useEffect(
    function setChangedContext() {
      setItemContext({ open, itemId, itemKey, toggleOpen });
    },
    [open, itemId, itemKey, toggleOpen]
  );

  useEffect(() => {
    afterInitialRender.current = true;
  }, []);

  return <DrawerItemContext.Provider {...props} value={itemContext} />;
};

DrawerItem.propTypes = {
  /** Set the drawer to open or closed (true/false) */
  open: PropTypes.bool,
  /** React when drawer opens or closes */
  onChange: PropTypes.func,

  // INTERNAL PROPS
  /** @ignore@ */
  id: PropTypes.string,
  /** @ignore */
  panelKey: PropTypes.oneOf([PropTypes.string, PropTypes.number])
};

DrawerItem.defaultProps = {
  open: undefined,
  id: undefined,
  panelKey: undefined
};

export type DrawerItemBodyProps = Omit<
  AnimateHeightProps,
  'height' | 'duration' | 'id' | 'role'
>;

export const DrawerItemBody = (props: DrawerItemBodyProps) => {
  const { open, itemId } = useDrawerItemContext();
  const height = open ? 'auto' : 0;
  return (
    <AnimateHeight
      height={height}
      duration={300}
      id={`${itemId}-region`}
      role="region"
      {...props}
    />
  );
};

DrawerItemBody.propTypes = {
  children: PropTypes.node
};

export interface DrawerItemOpenerProps {
  children: React.ReactElement<{
    onClick: (event: React.SyntheticEvent) => void;
    'aria-expanded'?: boolean;
    'aria-controls'?: string;
  }>;
}

function DrawerItemOpenerSingle({ children }: DrawerItemOpenerProps) {
  const child = React.Children.only(children);
  const { open, toggleOpen, itemId } = useContext(DrawerItemContext);
  const childClick = useRef(child?.props?.onClick || noop);

  useEffect(() => {
    childClick.current = child?.props?.onClick || noop;
  }, [child?.props?.onClick]);

  const onClick = useCallback(
    (ev: React.SyntheticEvent) => {
      childClick.current(ev);
      toggleOpen();
    },
    [toggleOpen, childClick]
  );
  return React.cloneElement(child, {
    ...child?.props,
    onClick,
    'aria-expanded': open,
    'aria-controls': `${itemId}-region`
  });
}

export const DrawerItemOpener = ({ children }: DrawerItemOpenerProps) => {
  try {
    return <DrawerItemOpenerSingle>{children}</DrawerItemOpenerSingle>;
  } catch {
    // eslint-disable-next-line no-console
    console.error(
      'Drawer.ItemOpener could not set onClick. Please ensure it has only one root child component.'
    );
    return children;
  }
};

DrawerItemOpener.propTypes = {
  children: PropTypes.element.isRequired
};
