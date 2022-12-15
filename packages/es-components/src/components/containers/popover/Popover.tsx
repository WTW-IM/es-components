import React, { useState, useRef, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import DismissButton from '../../controls/DismissButton';
import OriginalButton from '../../controls/buttons/Button';
import Popup from './Popup';
import RootCloseWrapper from '../../util/RootCloseWrapper';
import noop from '../../util/noop';

const Button = OriginalButton as ReturnType<
  typeof React.forwardRef<
    HTMLElement | undefined,
    JSX.IntrinsicElements['button']
  >
>;

const reactVersionString = React.version.match(/\d+/)?.[0] || '0';
const REACT_MAJOR_VERSION = parseInt(reactVersionString, 10);

const Container = styled.div`
  display: inline-block;
`;

type HeaderTypes = 'primary' | 'info' | 'success' | 'warning' | 'danger';

const PopoverHeader = styled.div<{
  hasTitle?: boolean;
  styleType?: HeaderTypes;
}>`
  background-color: ${props =>
    props.hasTitle
      ? props.theme.colors[props.styleType || 'primary']
      : props.theme.colors.white};
  color: ${props => props.theme.colors.white};
  display: flex;
  justify-content: space-between;
  line-height: ${props => props.theme.font.baseLineHeight};
  outline: none;
`;

const TitleBar = styled.h3`
  flex: 1 1;
  font-size: 18px;
  margin: 0;
  padding: 8px 14px;
  text-align: left;
`;

const PopoverBody = styled.div<{ hasAltCloseWithNoTitle?: boolean }>`
  background: ${props => props.theme.colors.white};
  color: ${props => props.theme.colors.gray9};
  font-size: 18px;
  font-weight: normal;
  line-height: ${props => props.theme.font.baseLineHeight};
  padding: ${props =>
    props.hasAltCloseWithNoTitle ? '0 14px 8px' : '8px 14px'};
  text-align: right;
`;

const PopoverContent = styled.div<{ showCloseButton?: boolean }>`
  margin-bottom: ${props => (props.showCloseButton ? '8px' : '0')};
  text-align: left;
`;

const PopoverCloseButton = styled(Button)`
  display: inline-block;
  margin: 5px 0;
  width: auto;
`;

const AltCloseButton = styled(DismissButton)<{ hasTitle: boolean }>`
  color: ${props =>
    props.hasTitle ? props.theme.colors.white : props.theme.colors.black};

  flex: 0 1;
  margin-left: auto;
  padding: 8px;
`;

const CloseHelpText = styled.span`
  color: transparent;
  flex: none;
  height: 1px;
  outline: 0;
  width: 1px;
`;

type RenderFuncParams = {
  toggleShow: (ev?: React.UIEvent) => void;
};

export type RenderTriggerParams = RenderFuncParams & {
  ref?: React.ForwardedRef<HTMLElement>;
  isOpen: boolean;
};

export type RenderTriggerFunc = (
  params: RenderTriggerParams
) => React.ReactNode;

export type PopoverProps = {
  name: string;
  renderTrigger: RenderTriggerFunc;
  title?: string;
  content?: React.ReactNode;
  renderContent?: (contentProps: RenderFuncParams) => React.ReactNode;
  placement?: 'top' | 'bottom' | 'left' | 'right';
  arrowSize?: 'sm' | 'lg' | 'none' | 'default';
  disableOnScroll?: boolean;
  disableFlipping?: boolean;
  disableRootClose?: boolean;
  hasCloseButton?: boolean;
  hasAltCloseButton?: boolean;
  disableCloseOnScroll?: boolean;
  enableEvents?: boolean;
  strategy?: 'absolute' | 'fixed';
  keepTogether?: boolean;
  popoverWrapperClassName?: string;
  styleType?: HeaderTypes;
};

const Popover = React.forwardRef<HTMLDivElement, PopoverProps>(
  function ForwardedPopover(props, ref) {
    const {
      name,
      title,
      content,
      renderContent,
      placement,
      arrowSize,
      renderTrigger,
      hasCloseButton,
      hasAltCloseButton,
      disableCloseOnScroll,
      disableRootClose,
      disableFlipping,
      enableEvents,
      keepTogether,
      strategy,
      popoverWrapperClassName,
      styleType,
      ...otherProps
    } = props;

    const hasTitle = title !== undefined;
    const hasAltCloseWithNoTitle = !hasTitle && hasAltCloseButton;
    const showCloseButton = hasCloseButton && !hasAltCloseButton;
    const isFirstRun = useRef(true);

    const triggerBtnRef = useRef<HTMLElement>();
    const popperRef = useRef<HTMLElement>();
    const contentRef = useRef<HTMLElement>();
    const escMsgRef = useRef<HTMLElement>();
    const closeBtnRef = useRef<HTMLButtonElement>();
    const timeoutRef = useRef<number>();

    const [isOpen, setIsOpen] = useState(false);

    function toggleShow(event?: React.UIEvent) {
      event?.preventDefault();
      if (REACT_MAJOR_VERSION <= 16) {
        event?.stopPropagation();
      }
      setIsOpen(!isOpen);
    }

    function hidePopover(event: Event) {
      if (isOpen) {
        if (event.type !== 'click') {
          triggerBtnRef.current?.focus();
        }
        setIsOpen(false);
      }
    }

    const hidePopOnScroll = useCallback(() => {
      setInterval(() => {
        if (popperRef.current) {
          const bounds = popperRef.current.getBoundingClientRect();
          const inViewport =
            bounds.top >= 0 && bounds.bottom <= window.innerHeight;

          if (!inViewport && isOpen) {
            setIsOpen(false);
          }
        }
      }, 100);
    }, [isOpen]);

    useEffect(() => {
      if (isFirstRun.current) {
        isFirstRun.current = false;
        return;
      }

      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
      }

      if (isOpen) {
        timeoutRef.current = setTimeout(() => {
          if (closeBtnRef.current) {
            closeBtnRef.current.focus();
          } else if (escMsgRef.current) {
            escMsgRef.current.focus();
          }
        }, 100);
      } else {
        triggerBtnRef.current?.focus();
      }
    }, [isOpen]);

    useEffect(() => {
      if (disableCloseOnScroll) {
        return noop;
      }

      if (isOpen) {
        window.addEventListener('scroll', hidePopOnScroll);
      }
      return () => window.removeEventListener('scroll', hidePopOnScroll);
    }, [isOpen, disableCloseOnScroll, hidePopOnScroll]);

    const closeButton = (
      <PopoverCloseButton onClick={toggleShow} ref={closeBtnRef}>
        Close
      </PopoverCloseButton>
    );

    const altCloseButton = (
      <AltCloseButton
        aria-label="Close"
        hasTitle={hasTitle}
        onClick={toggleShow}
        ref={closeBtnRef}
      />
    );

    return (
      <Container ref={ref}>
        <Popup
          name={name}
          trigger={renderTrigger({ ref: triggerBtnRef, toggleShow, isOpen })}
          position={placement}
          arrowSize={arrowSize}
          transitionIn={isOpen}
          hasTitle={hasTitle}
          disableFlipping={disableFlipping}
          popperRef={elem => {
            popperRef.current = elem;
          }}
          enableEvents={enableEvents}
          strategy={strategy}
          keepTogether={keepTogether}
          {...otherProps}
        >
          <RootCloseWrapper
            onRootClose={hidePopover}
            disabled={disableRootClose}
            className={popoverWrapperClassName}
          >
            <div role="dialog" ref={contentRef}>
              <PopoverHeader hasTitle={hasTitle} styleType={styleType}>
                {hasTitle && <TitleBar>{title}</TitleBar>}
                {hasAltCloseButton && altCloseButton}
                <CloseHelpText
                  tabIndex={-1}
                  ref={escMsgRef}
                  aria-label="Press escape to close the Popover"
                />
              </PopoverHeader>
              <PopoverBody hasAltCloseWithNoTitle={hasAltCloseWithNoTitle}>
                <PopoverContent showCloseButton={showCloseButton}>
                  {renderContent ? renderContent({ toggleShow }) : content}
                </PopoverContent>
                {showCloseButton && closeButton}
              </PopoverBody>
            </div>
          </RootCloseWrapper>
        </Popup>
      </Container>
    );
  }
);

function contentRequired(
  props: Record<string, unknown>,
  propName: string,
  componentName: string
) {
  const isContentProvided = props.content || props.renderContent;
  if (!isContentProvided)
    new Error('Neither content nor renderContent were provided to Popover');

  PropTypes.checkPropTypes(
    {
      content: PropTypes.node,
      renderContent: PropTypes.func
    },
    props,
    propName,
    componentName
  );
  return null;
}

Popover.propTypes = {
  /** The name of the popover. Used for differentiating popovers */
  name: PropTypes.string.isRequired,
  /** The text displayed in the popover title section */
  title: PropTypes.string,
  /** The content displayed in the popover body. This is required if renderContent is not used */
  // eslint-disable-next-line react/require-default-props
  content: contentRequired,
  /** Function returning the content to be displayed in the popover body. This is required if content is not used */
  // eslint-disable-next-line react/require-default-props
  renderContent: contentRequired,
  /** The placement of the popover in relation to the link */
  placement: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
  /** The size of the arrow on the popover box */
  arrowSize: PropTypes.oneOf(['sm', 'lg', 'none', 'default']),
  /** Disables popover's ability to close when the user scrolls  */
  disableCloseOnScroll: PropTypes.bool,
  /** Disables popover's ability to change position to stay in viewport */
  disableFlipping: PropTypes.bool,
  /** Prevents popover from closing when clicked outside of it */
  disableRootClose: PropTypes.bool,
  /** Display a close button in the bottom right of the popover body */
  hasCloseButton: PropTypes.bool,
  /** Display a close ('x') button in the popover title bar */
  hasAltCloseButton: PropTypes.bool,
  /** Function returning a button component to be used as the popover trigger */
  renderTrigger: PropTypes.func.isRequired,
  /** Enable event handlers provided by Popper.js */
  enableEvents: PropTypes.bool,
  /** Sets the strategy for positioning the popover in Popper.js */
  strategy: PropTypes.oneOf(['absolute', 'fixed']),
  /** When using a React portal, such as sliding pane, this helps the arrow to stay aligned with the trigger */
  keepTogether: PropTypes.bool,
  /** Pass a className to the wrapper of the popover content */
  popoverWrapperClassName: PropTypes.string,
  /** Specify the background color of the popover header (similar to Button style types) */
  styleType: PropTypes.oneOf([
    'primary',
    'info',
    'success',
    'warning',
    'danger'
  ])
};

Popover.defaultProps = {
  placement: 'bottom',
  arrowSize: 'default',
  disableRootClose: false,
  hasCloseButton: false,
  hasAltCloseButton: false,
  disableFlipping: false,
  disableCloseOnScroll: false,
  title: undefined,
  enableEvents: true,
  strategy: 'absolute',
  keepTogether: true,
  styleType: 'primary',
  popoverWrapperClassName: 'popover--active'
};

export default Popover;
