import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../../base/icons/Icon';
import styled from 'styled-components';
import AnimateHeight from 'react-animate-height';
import classnames from 'classnames';

import genId from '../../util/generateAlphaName';

// Note: DrawerPanel relies on a parent (Drawer) with ThemeProvider wrapping it
const PanelWrapper = styled.div`
  border-bottom: 1px solid ${props => props.theme.colors.gray3};
`;

const PanelButton = styled.button`
  background: none;
  border: 0;
  color: ${props => props.theme.colors.primary};
  cursor: pointer;
  display: flex;
  font-size: 18px;
  justify-content: space-between;
  padding: 10px 15px;
  width: 100%;

  &:hover {
    background-color: ${props => props.theme.colors.gray2};
    color: ${props => props.theme.brandColors.vbBlue};
  }
`;

const PanelIcon = styled(Icon)`
  margin-right: 0.4em;
  position: relative;
  top: -2px;
`;

const PanelBody = styled(({ noPadding, ...rest }) => (
  <AnimateHeight {...rest} />
))`
  background-color: ${props => props.theme.colors.white};
  color: ${props => props.theme.colors.gray9};

  > div {
    border-bottom: 4px solid ${props => props.theme.colors.gray3};
    padding: ${props => (props.noPadding ? '0' : '10px 10px 10px 40px')};
  }
`;

const DrawerPanel = props => {
  const {
    children,
    className,
    closedIconName,
    isOpen,
    noPadding,
    onItemClick,
    openedIconName,
    title,
    titleAside
  } = props;

  const headingAriaId = genId();
  const regionAriaId = genId();
  const aside = titleAside !== undefined && <aside>{titleAside}</aside>;

  return (
    <PanelWrapper className={classnames('es-drawer__panel', className)}>
      <div className="es-drawer__heading" id={headingAriaId} role="heading">
        <PanelButton
          aria-expanded={isOpen}
          aria-controls={regionAriaId}
          onClick={() => onItemClick()}
        >
          <span>
            <PanelIcon name={isOpen ? openedIconName : closedIconName} />
            {title}
          </span>
          {aside}
        </PanelButton>
      </div>
      <PanelBody
        aria-labelledby={headingAriaId}
        className="es-drawer__body"
        duration={300}
        height={isOpen ? 'auto' : 0}
        id={regionAriaId}
        noPadding={noPadding}
        role="region"
      >
        {children}
      </PanelBody>
    </PanelWrapper>
  );
};

DrawerPanel.propTypes = {
  children: PropTypes.any.isRequired,
  /** Add additional CSS classes to the drawer item element */
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  /** @ignore */
  closedIconName: PropTypes.string,
  /** Title text displayed next to the open/close icon */
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.node
  ]).isRequired,
  /** Aside text/content displayed on the right side of the panel title */
  titleAside: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  /** @ignore */
  isOpen: PropTypes.bool,
  /** Removes the default padding from the panel body */
  noPadding: PropTypes.bool,
  /** @ignore */
  onItemClick: PropTypes.func,
  /** @ignore */
  openedIconName: PropTypes.string
};

DrawerPanel.defaultProps = {
  isOpen: false,
  noPadding: false
};

export default DrawerPanel;
