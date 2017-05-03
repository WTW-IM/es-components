import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../icons/Icon';
import { colors } from '../../theme';
import styled from 'styled-components';
import Collapse from 'react-smooth-collapse-customizable';

const PanelWrapper = styled.div`
  border-bottom: 1px solid ${colors.grayLight};
`;

const PanelTitle = styled.div`
  cursor: pointer;
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
  overflow: hidden;

  > div {
    padding: ${(props) => (props.noPadding ? '0' : '10px')};
  }
`;

const DrawerPanel = (props) => {
  const {
    children,
    className,
    closedIconName,
    title,
    isActive,
    noPadding,
    onItemClick,
    openedIconName
  } = props;

  return (
    <PanelWrapper className={className}>
      <PanelTitle onClick={() => onItemClick()} role="tab" aria-expanded={isActive}>
        <PanelIcon name={isActive ? openedIconName : closedIconName} />
        {title}
      </PanelTitle>
      <PanelBody expanded={isActive} heightTransition=".35s ease" noPadding={noPadding}>
        {children}
      </PanelBody>
    </PanelWrapper>
  );
};

DrawerPanel.propTypes = {
  children: PropTypes.any.isRequired,
  /** Add additional CSS classes to the drawer item element */
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
  closedIconName: PropTypes.string,
  /** Title text displayed next to the open/close icon */
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.node
  ]).isRequired,
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
