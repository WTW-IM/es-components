import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { noop } from 'lodash';

/* eslint-disable no-confusing-arrow */
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
  line-height: ${props => props.theme.sizes.baseLineHeight};
  padding: 10px;
  text-align: left;
  z-index: 1;

  &:focus {
    outline: 1px dotted ${props => props.theme.colors.gray4};
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

const AriaAnnouncer = styled.p`
  height: 1px;
  left: -10000px;
  overflow: hidden;
  position: absolute;
  top: auto;
  width: 1px;
`;

/* eslint-enable */

function Tab({
  header,
  selected,
  action,
  children,
  simpleName,
  announcerText,
  ...props
}) {
  return (
    <TabButton
      onClick={() => action(header)}
      selected={selected}
      aria-label={`${simpleName || header} tab`}
      aria-expanded={selected}
      {...props}
    >
      {selected &&
        (simpleName.length > 0 || announcerText.length > 0) && (
          <AriaAnnouncer id="announcer" aria-live="assertive">
            {`${simpleName} ${announcerText}`}
          </AriaAnnouncer>
        )}
      {header}
    </TabButton>
  );
}

Tab.propTypes = {
  /**
   * The header of the tab, and the displayed value
   */
  header: PropTypes.node.isRequired,
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
