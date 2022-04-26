import React, {
  createContext,
  useContext,
  useCallback,
  useEffect,
  useState
} from 'react';
import PropTypes from 'prop-types';
import AnimateHeight from 'react-animate-height';
import { DrawerContext } from './DrawerContext';
import useUniqueId from '../../util/useUniqueId';

export const DrawerItemContext = createContext({
  open: false,
  itemId: undefined,
  toggleOpen: () => {
    /* noop */
  }
});

export const useDrawerItemContext = () => useContext(DrawerItemContext);

export const DrawerItem = ({ id, open: openProp, ...props }) => {
  const { activeKeys, setActiveKey } = useContext(DrawerContext);
  const itemId = useUniqueId(id);
  const toggleOpen = useCallback(() => setActiveKey(itemId), [
    itemId,
    setActiveKey
  ]);
  const [open, setOpen] = useState(activeKeys.includes(itemId));
  const [itemContext, setItemContext] = useState({ open, itemId, toggleOpen });

  useEffect(() => {
    const newOpen = activeKeys.includes(itemId);
    setOpen(newOpen);
  }, [activeKeys]);

  useEffect(() => {
    if (openProp === open) return;
    setActiveKey(itemId);
  }, [openProp]);

  useEffect(() => {
    setItemContext({ open, itemId, toggleOpen });
  }, [open, itemId, toggleOpen]);

  return <DrawerItemContext.Provider {...props} value={itemContext} />;
};

DrawerItem.propTypes = {
  /** Set the drawer to open or closed (true/false) */
  open: PropTypes.bool,
  /** @ignore@ */
  id: PropTypes.string
};

DrawerItem.defaultProps = {
  open: false,
  id: undefined
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
  try {
    const child = React.Children.only(children);
    const childClick =
      child?.props?.onClick ||
      (() => {
        /* noop */
      });
    const { open, toggleOpen, itemId } = useContext(DrawerItemContext);
    const onClick = useCallback(
      ev => {
        childClick(ev);
        toggleOpen();
      },
      [toggleOpen, childClick]
    );
    const clickChild = React.cloneElement(child, {
      ...child.props,
      onClick,
      'aria-expanded': open,
      'aria-controls': `${itemId}-region`
    });

    return clickChild;
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
