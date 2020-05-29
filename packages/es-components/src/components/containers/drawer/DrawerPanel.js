import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import AnimateHeight from 'react-animate-height';
import { noop } from 'lodash';

import { DrawerContext } from './DrawerContext';
import Icon from '../../base/icons/Icon';
import useUniqueId from '../../util/useUniqueId';

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
    color: ${props => props.theme.brandColors.brandPrimary1};
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

function DrawerPanel(props) {
  const {
    children,
    isOpen,
    noPadding,
    onItemClick,
    title,
    titleAside,
    ...other
  } = props;

  const { openedIconName, closedIconName } = React.useContext(DrawerContext);
  const headingAriaId = `${useUniqueId(other.id)}-heading`;
  const regionAriaId = `${useUniqueId(other.id)}-region`;

  return (
    <PanelWrapper {...other}>
      <div id={headingAriaId} role="heading">
        <PanelButton
          aria-expanded={isOpen}
          aria-controls={regionAriaId}
          onClick={() => onItemClick()}
        >
          <span>
            <PanelIcon name={isOpen ? openedIconName : closedIconName} />
            {title}
          </span>
          {titleAside && <aside>{titleAside}</aside>}
        </PanelButton>
      </div>
      <PanelBody
        aria-labelledby={headingAriaId}
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
}

DrawerPanel.propTypes = {
  children: PropTypes.any.isRequired,
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
  onItemClick: PropTypes.func
};

DrawerPanel.defaultProps = {
  isOpen: false,
  noPadding: false,
  titleAside: undefined,
  onItemClick: noop
};

export default DrawerPanel;
