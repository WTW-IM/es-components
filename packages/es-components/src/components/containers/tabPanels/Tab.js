import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { noop } from 'lodash';

import screenReaderOnly from '../../patterns/screenReaderOnly/screenReaderOnly';

const TabButton = styled.button`
  background-color: ${props =>
    props.selected ? props.theme.colors.white : props.theme.colors.gray2};
  border: 1px solid ${props => props.theme.colors.gray4};
  box-shadow: ${props =>
    props.selected ? '0 6px 12px rgba(0, 0, 0, 0.175)' : 'none'};
  color: ${props =>
    props.selected ? props.theme.colors.black : props.theme.colors.primary};
  display: inline-block;
  font-size: inherit;
  line-height: ${props => props.theme.font.baseLineHeight};
  padding: 10px;
  text-align: left;
  z-index: 1;

  &:focus {
    outline: none;
  }

  @media (min-width: ${props => props.theme.screenSize.desktop}) {
    background-color: ${props => props.theme.colors.white};
    border: ${props =>
      props.selected
        ? `1px solid ${props.theme.colors.gray4}`
        : '1px solid transparent'};
    border-bottom-color: ${props =>
      props.selected ? ' transparent' : `${props.theme.colors.gray4}`};
    box-shadow: none;
    color: ${props =>
      props.selected ? props.theme.colors.black : props.theme.colors.primary};
    padding: 10px 15px;
    margin: 0 2px 0px 0;

    &:hover,
    &:focus {
      background-color: ${props =>
        props.selected ? props.theme.colors.white : props.theme.colors.gray2};
    }
  }
`;

const AriaAnnouncer = screenReaderOnly('div');

function Tab({
  name,
  selected,
  action,
  children,
  simpleName,
  announcerText,
  ...props
}) {
  return (
    <TabButton
      onClick={() => action(name, children, simpleName, announcerText)}
      selected={selected}
      aria-label={`${simpleName || name} tab`}
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
}

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
