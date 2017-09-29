import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../../base/icons/Icon';
import { colors } from '../../theme';
import styled from 'styled-components';
import genId from '../../util/generateAlphaName';
import AnimateHeight from 'react-animate-height';

const PanelWrapper = styled.div`border-bottom: 1px solid ${colors.grayLight};`;

const PanelButton = styled.button`
  background: none;
  border: 0;
  cursor: pointer;
  display: flex;
  font-size: 18px;
  justify-content: space-between;
  padding: 10px 15px;
  width: 100%;

  &:hover {
    background-color: ${colors.grayLighter};
    color: ${colors.accent};
  }
`;

const PanelIcon = styled(Icon)`
  margin-right: 0.4em;
  position: relative;
  top: -1px;
`;

const PanelBody = styled(({ noPadding, ...rest }) => (
  <AnimateHeight {...rest} />
))`
  background-color: ${colors.white};
  color: ${colors.grayDarkest};

  > div {
    border-bottom: 4px solid ${colors.grayLight};
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
    <PanelWrapper className={className}>
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
          {aside}
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
