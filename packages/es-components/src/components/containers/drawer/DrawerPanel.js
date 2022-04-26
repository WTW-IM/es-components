import React, {
  useImperativeHandle,
  useRef,
  useContext,
  useCallback
} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import AnimateHeight from 'react-animate-height';

import Heading from '../heading/Heading';
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

  @media (hover: hover), (-ms-high-contrast: none) {
    &:hover {
      background-color: ${props => props.theme.colors.gray2};
      color: ${props => props.theme.brandColors.brandPrimary1};
    }
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

const DrawerPanel = React.forwardRef(function DrawerPanel(props, ref) {
  const {
    children,
    noPadding,
    title,
    titleAside,
    headingLevel,
    panelKey,
    ...other
  } = props;

  const buttonRef = useRef();
  useImperativeHandle(ref, () => ({
    focusHeaderButton: () => buttonRef.current.focus()
  }));
  const {
    openedIconName,
    closedIconName,
    activeKeys,
    setActiveKey
  } = useContext(DrawerContext);
  const openerClicked = useCallback(() => setActiveKey(panelKey), [
    setActiveKey,
    panelKey
  ]);
  const headingAriaId = `${useUniqueId(other.id)}-heading`;
  const regionAriaId = `${useUniqueId(other.id)}-region`;
  const opened = Boolean(activeKeys.find(activeKey => activeKey === panelKey));

  return (
    <PanelWrapper {...other}>
      <div id={headingAriaId} role="heading" aria-level={headingLevel}>
        <PanelButton
          aria-expanded={opened}
          aria-controls={regionAriaId}
          ref={buttonRef}
          onClick={openerClicked}
        >
          <span>
            <PanelIcon name={opened ? openedIconName : closedIconName} />
            {title}
          </span>
          {titleAside && <aside>{titleAside}</aside>}
        </PanelButton>
      </div>
      <PanelBody
        aria-labelledby={headingAriaId}
        duration={300}
        height={opened ? 'auto' : 0}
        id={regionAriaId}
        noPadding={noPadding}
        role="region"
      >
        {children}
      </PanelBody>
    </PanelWrapper>
  );
});

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
  /** Removes the default padding from the panel body */
  noPadding: PropTypes.bool,
  /** Set desired aria-level for heading */
  headingLevel: Heading.propTypes.level,
  /* @ignore@ */
  panelKey: PropTypes.string
};

DrawerPanel.defaultProps = {
  noPadding: false,
  titleAside: undefined,
  headingLevel: 2,
  panelKey: undefined
};

export default DrawerPanel;
