import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../../base/icons/Icon';
import { colors } from '../../theme';
import styled from 'styled-components';
import Collapse from '../../util/Collapse';
import genId from '../../util/generateAlphaName';

const PanelWrapper = styled.div`
  border-bottom: 1px solid ${colors.grayLight};
`;

const PanelTitle = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  padding: 10px 15px;

  &:hover {
    background-color: ${colors.grayLighter};
    color: ${colors.accent};
  }
`;

const PanelIcon = styled(Icon)`
  margin-right: .4em;
  position: relative;
  top: -1px;
`;

const PanelBody = styled(Collapse)`
  background-color: ${colors.white};
  border-bottom: 4px solid ${colors.grayLight};
  color: ${colors.grayDarkest};

  > div {
    padding: ${props => (props.noPadding ? '0' : '10px 10px 10px 40px')};
  }
`;

const DrawerPanel = props => {
  const {
    children,
    className,
    closedIconName,
    title,
    titleAside,
    isActive,
    noPadding,
    onItemClick,
    openedIconName
  } = props;

  const ariaId = genId();
  const aside = titleAside !== undefined ? <span>{titleAside}</span> : null;

  return (
    <PanelWrapper className={className} noPadding={noPadding}>
      <PanelTitle
        onClick={() => onItemClick()}
        role="tab"
        aria-expanded={isActive}
        aria-controls={ariaId}
      >
        <span>
          <PanelIcon name={isActive ? openedIconName : closedIconName} />
          {title}
        </span>
        {aside}
      </PanelTitle>
      <PanelBody expanded={isActive} heightTransition=".35s ease" id={ariaId}>
        {children}
      </PanelBody>
    </PanelWrapper>
  );
};

DrawerPanel.propTypes = {
  children: PropTypes.any.isRequired,
  /** Add additional CSS classes to the drawer item element */
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  closedIconName: PropTypes.string,
  /** Title text displayed next to the open/close icon */
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.node
  ]).isRequired,
  /** Aside text/content displayed on the right side of the panel title */
  titleAside: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  isActive: PropTypes.bool,
  /** Removes the default padding from the panel body */
  noPadding: PropTypes.bool,
  onItemClick: PropTypes.func,
  openedIconName: PropTypes.string
};

DrawerPanel.defaultProps = {
  isActive: false,
  noPadding: false
};

export default DrawerPanel;
