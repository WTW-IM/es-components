import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import _noop from 'lodash/noop';
import styled, { createGlobalStyle } from 'styled-components';
import Heading from '../heading/Heading';
import LinkButton from '../../controls/buttons/LinkButton';
import screenReaderOnly from '../../patterns/screenReaderOnly/screenReaderOnly';
import Icon from '../../base/icons/Icon';

const PaneBase = styled(Modal)`
  background: ${props => props.theme.colors.white};
  box-shadow: 0 8px 8px ${props => props.theme.colors.boxShadowDark};
  display: flex;
  flex-direction: column;
  height: 100%;
  min-width: 100px;
  transition: transform 0.5s;
  width: 100%;
  will-change: transform;

  &:focus {
    outline-style: none;
  }

  @media (min-width: ${props => props.theme.screenSize.tablet}) {
    width: 900px;
  }
`;

const PaneRight = styled(PaneBase)`
  margin-left: auto;
  transform: translateX(100%);

  &.ReactModal__Content--after-open {
    transform: translateX(0%);
  }

  &.ReactModal__Content--before-close {
    transform: translateX(100%);
  }
`;

const PaneLeft = styled(PaneBase)`
  margin-right: auto;
  transform: translateX(-100%);

  &.ReactModal__Content--after-open {
    transform: translateX(0%);
  }

  &.ReactModal__Content--before-close {
    transform: translateX(-100%);
  }
`;

const PaneBottom = styled(PaneBase)`
  height: 90vh;
  margin-top: 10vh;
  transform: translateY(100%);

  &.ReactModal__Content--after-open {
    transform: translateY(0%);
  }

  &.ReactModal__Content--before-close {
    transform: translateY(100%);
  }
`;

const Header = styled.div`
  align-items: center;
  background-color: ${props => props.theme.colors.popoverHeader};
  color: ${props => props.theme.colors.white};
  display: flex;
  flex: 0 0 64px;
  height: 64px;
`;

const CloseLink = styled(LinkButton)`
  cursor: pointer;
  opacity: 0.7;
  padding: 16px;
`;

const TitleWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  min-width: 0;
`;

const TitleText = styled(Heading)`
  margin: 0;
  max-width: 80%;
  overflow: hidden;
  padding: 1px;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const SubTitle = styled.div`
  font-size: 12px;
  margin-top: 2px;
`;

const Content = styled.div`
  flex: 1 1 auto;
  overflow-y: auto;
  padding: 1.5em;
  position: relative;
`;

const ScreenReaderText = screenReaderOnly('span');

const defaultStyles = {
  overlay: {
    backgroundColor: 'rgba(0,0,0,0)',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    position: 'fixed',
    zIndex: '1000',
    transition: 'background-color 0.5s'
  },
  content: {}
};

const GlobalPaneStyles = createGlobalStyle`
  .ReactModal__Body--open {
    overflow-y: hidden;
  }

  .ReactModal__Overlay--after-open {
    background-color: rgba(0,0,0,0.5) !important;
  }

  .ReactModal__Overlay--before-close {
    background-color: rgba(0,0,0,0) !important;
  }
`;

function getPane(direction) {
  switch (direction) {
    case 'bottom':
      return PaneBottom;
    case 'left':
      return PaneLeft;
    default:
      return PaneRight;
  }
}

export default function SlidingPane({
  isOpen,
  title,
  subTitle,
  shouldCloseOnEsc,
  onRequestClose,
  onAfterOpen,
  children,
  closeIcon,
  closeIconScreenReaderText,
  from,
  headingLevel,
  headingSize,
  closeTimeout,
  overlayStyles,
  contentStyles,
  appElement,
  parentSelector,
  ...rest
}) {
  const Pane = getPane(from);
  const styles = {
    overlay: { ...defaultStyles.overlay, ...overlayStyles },
    content: { ...defaultStyles.content, ...contentStyles }
  };

  if (appElement) {
    Pane.setAppElement(appElement);
  } else {
    Object.assign(rest, { ariaHideApp: false });
  }

  return (
    <>
      <GlobalPaneStyles />
      <Pane
        style={styles}
        closeTimeoutMS={closeTimeout}
        isOpen={isOpen}
        onAfterOpen={onAfterOpen}
        onRequestClose={onRequestClose}
        shouldCloseOnEsc={shouldCloseOnEsc}
        contentLabel={`Modal "${title}"`}
        parentSelector={parentSelector}
        {...rest}
      >
        <Header>
          <CloseLink onClick={onRequestClose}>
            {closeIcon || <Icon name="remove" size={34} />}
            <ScreenReaderText>{closeIconScreenReaderText}</ScreenReaderText>
          </CloseLink>
          <TitleWrapper>
            <TitleText level={headingLevel} size={headingSize}>
              {title}
            </TitleText>
            <SubTitle>{subTitle}</SubTitle>
          </TitleWrapper>
        </Header>
        <Content>{children}</Content>
      </Pane>
    </>
  );
}

SlidingPane.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  title: PropTypes.any,
  subTitle: PropTypes.any,
  shouldCloseOnEsc: PropTypes.bool,
  onRequestClose: PropTypes.func,
  onAfterOpen: PropTypes.func,
  children: PropTypes.any.isRequired,
  from: PropTypes.oneOf(['left', 'right', 'bottom']),
  closeIcon: PropTypes.any,
  closeIconScreenReaderText: PropTypes.string,
  headingLevel: Heading.propTypes.level,
  headingSize: Heading.propTypes.size,
  closeTimeout: PropTypes.number,
  overlayStyles: PropTypes.object,
  contentStyles: PropTypes.object,
  /** selector of application element (e.g. #root), for hiding of
   main content for screenreaders when pane is open */
  appElement: PropTypes.string,
  parentSelector: PropTypes.func
};

SlidingPane.defaultProps = {
  /* Timeout is in milliseconds */
  closeTimeout: 500,
  from: 'right',
  headingLevel: 2,
  headingSize: 3,
  shouldCloseOnEsc: true,
  title: undefined,
  subTitle: undefined,
  onRequestClose: _noop,
  onAfterOpen: _noop,
  closeIcon: undefined,
  closeIconScreenReaderText: 'Close',
  overlayStyles: {},
  contentStyles: {},
  appElement: undefined,
  parentSelector: () => document.body
};
