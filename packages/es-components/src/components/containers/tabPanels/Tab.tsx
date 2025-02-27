import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import noop from '../../util/noop';

import screenReaderOnly from '../../patterns/screenReaderOnly/screenReaderOnly';

const TabButton = styled.button<{ selected?: boolean }>`
  z-index: 1;
  display: inline-block;
  padding: 10px;
  background-color: ${props =>
    props.selected ? props.theme.colors.white : props.theme.colors.gray2};
  box-shadow: ${props =>
    props.selected ? '0 6px 12px rgba(0, 0, 0, 0.175)' : 'none'};
  color: ${props =>
    props.selected ? props.theme.colors.black : props.theme.colors.primary};
  font-size: inherit;
  line-height: ${props => props.theme.font.baseLineHeight};
  text-align: left;

  &:focus {
    outline: none;
  }

  @media (max-width: ${props => props.theme.screenSize.desktop}) {
    border: 1px solid ${props => props.theme.colors.gray4};
  }

  @media (min-width: ${props => props.theme.screenSize.desktop}) {
    padding: 10px 15px;
    border: ${props =>
      props.selected
        ? `1px solid ${props.theme.colors.gray4}`
        : '1px solid transparent'};
    border-bottom-color: ${props =>
      props.selected ? ' transparent' : `${props.theme.colors.gray4}`};
    margin: 0 2px 0 0;
    background-color: ${props => props.theme.colors.white};
    box-shadow: none;

    &:hover,
    &:focus {
      background-color: ${props =>
        props.selected ? props.theme.colors.white : props.theme.colors.gray2};
    }
  }
`;

const AriaAnnouncer = screenReaderOnly('div');

export type RequiredReactNode = NonNullable<React.ReactNode>;
export type TabAction = (
  name: RequiredReactNode,
  children: React.ReactNode,
  simpleName: string,
  announcerText: string
) => void | Promise<void>;

export type TabProps = Override<
  JSXElementProps<'button'>,
  {
    name: RequiredReactNode;
    selected?: boolean;
    action?: TabAction;
    simpleName?: string;
    announcerText?: string;
  }
>;

const Tab = React.forwardRef<HTMLButtonElement, TabProps>(function ForwardedTab(
  {
    name,
    selected,
    action = noop,
    children,
    simpleName = '',
    announcerText = '',
    ...props
  },
  ref
) {
  const className = `tab-button-${selected ? 'selected' : 'unselected'} ${
    props.className || ''
  }`;
  // eslint-disable-next-line @typescript-eslint/no-base-to-string
  const ariaLabel = `${simpleName || name.toString()} tab`;

  return (
    <TabButton
      ref={ref}
      className={className}
      onClick={() => {
        void action(name, children, simpleName, announcerText);
      }}
      selected={selected}
      aria-label={ariaLabel}
      aria-selected={selected}
      role="tab"
      {...props}
    >
      {selected && (simpleName.length > 0 || announcerText.length > 0) && (
        <AriaAnnouncer id="announcer" aria-live="assertive">
          {`${simpleName} ${announcerText}`}
        </AriaAnnouncer>
      )}
      {name}
    </TabButton>
  );
});

Tab.propTypes = {
  /**
   * The name of the tab, and the displayed value
   */
  name: PropTypes.node.isRequired,
  /**
   * Whether the tab is selected and should be rendered to appear selected.
   */
  selected: PropTypes.bool,
  /**
   * The function to call when the tab is clicked
   */
  action: PropTypes.func,
  /**
   * Children to be rendered in the TabContent area.
   */
  children: PropTypes.node,
  /**
   * A simpler representation for screen readers.
   */
  simpleName: PropTypes.string,
  /*
   * Additional text to be read after the simple name
   */
  announcerText: PropTypes.string
};

Tab.defaultProps = {
  selected: false,
  action: noop,
  children: undefined,
  simpleName: '',
  announcerText: ''
};

export default Tab;
