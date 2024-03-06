import React, {
  createContext,
  useContext,
  useCallback,
  useEffect,
  useState
} from 'react';
import PropTypes from 'prop-types';
import AnimateHeight, { AnimateHeightProps } from 'react-animate-height';
import { DrawerContext } from './DrawerContext';
import useUniqueId from '../../util/useUniqueId';
import {
  useMonitoringCallback,
  useMonitoringEffect
} from '../../../hooks/useMonitoringHooks';

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
  controlledOpen?: boolean;
  onChange?: (open: boolean) => void;
  id?: string;
  panelKey?: string | number;
  children?: React.ReactNode;
}

export const DrawerItem: React.FC<DrawerItemProps> = ({
  id,
  panelKey,
  open: openProp,
  controlledOpen,
  onChange,
  ...props
}) => {
  const { activeKeys, toggleActiveKey, setActiveKey, unsetActiveKey } =
    useContext(DrawerContext);
  const itemId = useUniqueId(id);
  const itemKey = useUniqueId(panelKey?.toString());

  const toggleOpen = useCallback(
    () => toggleActiveKey(itemKey),
    [itemKey, toggleActiveKey]
  );

  const [afterInitialRender, setAfterInitialRender] = useState(false);
  const [open, setOpen] = useState(activeKeys.includes(itemKey));

  const safeSetOpen = useCallback(
    (openState: boolean) => {
      let newOpen = openState;
      if (typeof controlledOpen !== 'undefined') newOpen = controlledOpen;
      setOpen(newOpen);
    },
    [controlledOpen]
  );

  const [itemContext, setItemContext] = useState({
    open,
    itemId,
    itemKey,
    toggleOpen
  });

  useEffect(
    function setOpenFromActiveKeys() {
      const newOpen = activeKeys.includes(itemKey);
      safeSetOpen(newOpen);
    },
    [activeKeys, itemKey, safeSetOpen]
  );

  useEffect(
    function setOpenFromOpenProp() {
      if (typeof openProp === 'undefined') return;

      (openProp ? setActiveKey : unsetActiveKey)(itemKey);
    },
    [openProp, itemKey, setActiveKey, unsetActiveKey]
  );

  useMonitoringEffect(
    function callOnChangeWhenOpenChanges({
      onChange: currentOnChange,
      afterInitialRender: afterRender
    }) {
      if (!afterRender) {
        return;
      }

      currentOnChange?.(open);
    },
    [open],
    { onChange, afterInitialRender }
  );

  useEffect(
    function setChangedContext() {
      setItemContext({ open, itemId, itemKey, toggleOpen });
    },
    [open, itemId, itemKey, toggleOpen]
  );

  useEffect(() => {
    setAfterInitialRender(true);
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
  panelKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
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

export const DrawerItemBody = React.forwardRef<
  HTMLDivElement,
  DrawerItemBodyProps
>(function ForwardedItemBody(props, ref) {
  const { open, itemId } = useDrawerItemContext();
  const height = open ? 'auto' : 0;

  return (
    <AnimateHeight
      ref={ref}
      height={height}
      duration={300}
      id={`${itemId}-region`}
      role="region"
      {...props}
    />
  );
});

DrawerItemBody.propTypes = {
  children: PropTypes.node
};

export interface DrawerItemOpenerProps {
  children: React.ReactElement<{
    onClick?: (event: React.SyntheticEvent) => void;
    'aria-expanded'?: boolean;
    'aria-controls'?: string;
  }>;
}

function DrawerItemOpenerSingle({ children }: DrawerItemOpenerProps) {
  const child = React.Children.only(children);
  const { open, toggleOpen, itemId } = useContext(DrawerItemContext);

  const onClick = useMonitoringCallback(
    (
      { onChildClick: currentOnClick, toggleOpen: currentToggle },
      ev: React.SyntheticEvent
    ) => {
      currentOnClick?.(ev);
      currentToggle();
    },
    { toggleOpen, onChildClick: child.props.onClick }
  );

  return React.cloneElement(child, {
    ...child.props,
    onClick,
    'aria-expanded': open,
    'aria-controls': `${itemId}-region`
  });
}

export const DrawerItemOpener: React.FC<DrawerItemOpenerProps> = ({
  children,
  ...props
}) => {
  try {
    return (
      <DrawerItemOpenerSingle {...props}>{children}</DrawerItemOpenerSingle>
    );
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
