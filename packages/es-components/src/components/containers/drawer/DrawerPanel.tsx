import React, { useImperativeHandle, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Heading from '../heading/Heading';
import {
  useDrawerItemContext,
  DrawerItem,
  DrawerItemBody,
  DrawerItemOpener
} from './DrawerItem';
import Icon, { IconProps } from '../../base/icons/Icon';
import useUniqueId from '../../util/useUniqueId';
import { IconName, iconNames, HeadingLevel } from 'es-components-shared-types';

const PanelWrapper = styled.div`
  border-bottom: 1px solid ${props => props.theme.colors.gray3};
`;

export const PanelButton = styled.button`
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 10px 15px;
  border: 0;
  background: none;
  color: ${props => props.theme.colors.primary};
  cursor: pointer;
  font-size: 18px;

  @media (hover: hover), (-ms-high-contrast: none) {
    &:hover {
      background-color: ${props => props.theme.colors.gray2};
      color: ${props => props.theme.brandColors.primary1};
    }
  }
`;

type DrawerIconProps = IconProps & {
  openedIconName: IconName;
  closedIconName: IconName;
};

const PanelIcon = styled(
  ({ openedIconName, closedIconName, ...props }: DrawerIconProps) => {
    const { open } = useDrawerItemContext();
    return <Icon name={open ? openedIconName : closedIconName} {...props} />;
  }
)`
  position: relative;
  top: -2px;
  margin-right: 0.4em;
`;

interface PanelBodyProps {
  noPadding?: boolean;
  panelKey?: React.Key;
}

const PanelBody = styled(DrawerItemBody).withConfig({
  shouldForwardProp: prop =>
    !['noPadding', 'panelKey'].some(disallowedProp => prop === disallowedProp)
})<PanelBodyProps>`
  background-color: ${props => props.theme.colors.white};
  color: ${props => props.theme.colors.gray9};

  > div {
    padding: ${props => (props.noPadding ? '0' : '10px 10px 10px 40px')};
    border-bottom: 4px solid ${props => props.theme.colors.gray3};
  }
`;

export type DrawerPanelProps = Omit<JSXElementProps<'div'>, 'title'> & {
  // this is only any because of the old value in the propTypes object below
  // we should change this to React.ReactNode in the future
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: any;
  title: string | number | React.ReactNode;
  titleAside?: string | React.ReactNode;
  noPadding?: boolean;
  headingLevel?: HeadingLevel;
  open?: boolean;

  // INTERNAL PROPS
  /** @ignore */
  closedIconName?: IconName;
  /** @ignore */
  openedIconName?: IconName;
  /** @ignore */
  panelKey?: string;
};

const DrawerPanel = React.forwardRef<unknown, DrawerPanelProps>(
  function DrawerPanel(
    {
      children,
      title,
      titleAside,
      noPadding = false,
      headingLevel = 2,
      open,
      openedIconName = 'add',
      closedIconName = 'minus',
      panelKey,
      ...other
    },
    ref
  ) {
    const buttonRef = useRef<HTMLButtonElement>(null);
    useImperativeHandle(ref, () => ({
      focusHeaderButton: () => buttonRef.current?.focus()
    }));
    const panelId = useUniqueId(other.id);
    const headingAriaId = `${panelId}-heading`;

    const itemProps = {
      id: panelId,
      panelKey,
      open
    };

    return (
      <DrawerItem {...itemProps}>
        <PanelWrapper {...other}>
          <div id={headingAriaId} role="heading" aria-level={headingLevel}>
            <DrawerItemOpener>
              <PanelButton ref={buttonRef}>
                <span>
                  <PanelIcon
                    closedIconName={closedIconName}
                    openedIconName={openedIconName}
                  />
                  {title}
                </span>
                {titleAside && <aside>{titleAside}</aside>}
              </PanelButton>
            </DrawerItemOpener>
          </div>
          <PanelBody aria-labelledby={headingAriaId} noPadding={noPadding}>
            {children}
          </PanelBody>
        </PanelWrapper>
      </DrawerItem>
    );
  }
);

export default DrawerPanel;
