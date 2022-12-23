import React, {
  createContext,
  useContext,
  useCallback,
  useEffect,
  useState,
  useRef
} from 'react';
import PropTypes from 'prop-types';
import AnimateHeight from 'react-animate-height';
import { DrawerContext } from './DrawerContext';
import useUniqueId from '../../util/useUniqueId';

const noop = () => {
  // noop
};

export const DrawerItemContext = createContext({
  open: false,
  itemId: undefined,
  toggleOpen: () => {
    /* noop */
  }
});

export const useDrawerItemContext = () => useContext(DrawerItemContext);

export const DrawerItem = ({
  id,
  panelKey,
  open: openProp,
  onChange: onChangeProp,
  ...props
}) => {
  const { activeKeys, toggleActiveKey, setActiveKey, unsetActiveKey } =
    useContext(DrawerContext);
  const itemId = useUniqueId(id);
  const itemKey = useUniqueId(panelKey);
  const toggleOpen = useCallback(
    () => toggleActiveKey(itemKey),
    [itemKey, toggleActiveKey]
  );
  const onChange = useRef(onChangeProp);
  onChange.current = onChangeProp;
  const afterInitialRender = useRef(false);
  const [open, setOpen] = useState(activeKeys.includes(itemKey));
  const [itemContext, setItemContext] = useState({ open, itemKey, toggleOpen });

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
      setItemContext({ open, itemId, toggleOpen });
    },
    [open, itemId, toggleOpen]
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
  panelKey: PropTypes.string
};

DrawerItem.defaultProps = {
  open: undefined,
  id: undefined,
  panelKey: undefined
};

export const DrawerItemBody = props => {
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

export const DrawerItemOpener = ({ children }) => {
  let child = {};
  let hasMultipleChildren = false;
  try {
    child = React.Children.only(children);
  } catch {
    // eslint-disable-next-line no-console
    console.error(
      'Drawer.ItemOpener could not set onClick. Please ensure it has only one root child component.'
    );
    hasMultipleChildren = false;
  }

  const { open, toggleOpen, itemId } = useContext(DrawerItemContext);

  const childClick = useRef(child?.props?.onClick);
  useEffect(() => {
    childClick.current = child?.props?.onClick;
  }, [child?.props?.onClick]);

  const onClick = useCallback(
    ev => {
      (childClick.current || noop)(ev);
      toggleOpen();
    },
    [toggleOpen]
  );

  return hasMultipleChildren
    ? children
    : React.cloneElement(child, {
        ...child?.props,
        onClick,
        'aria-expanded': open,
        'aria-controls': `${itemId}-region`
      });
};

DrawerItemOpener.propTypes = {
  children: PropTypes.element.isRequired
};
