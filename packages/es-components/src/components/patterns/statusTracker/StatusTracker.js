import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import genName from '../../util/generateAlphaName';

const List = styled.ol`
  display: flex;
  margin: 0;
  padding: 0;
  position: relative;
  z-index: 1;
`;

const ListItem = styled.li`
  color: ${props => props.theme.colors.gray6};
  list-style-type: none;
  position: relative;
  text-align: center;
  width: ${props => props.itemWidth}%;

  .status-text {
    display: none;
  }

  &.done > .status-text {
    color: ${props => props.theme.brandColors.primary1};
  }

  &.active > .status-text,
  &.error > .status-text {
    color: ${props => props.theme.brandColors.primary1};
    display: inherit;
    font-weight: bold;
  }

  &:before {
    background-color: white;
    border: 3px solid ${props => props.theme.colors.gray5};
    border-radius: 50%;
    content: '';
    display: block;
    height: 20px;
    line-height: 20px;
    margin: 5px auto 15px auto;
    text-align: center;
    width: 20px;
  }

  &:after {
    background-color: ${props => props.theme.colors.gray5};
    content: '';
    height: 4px;
    left: -50%;
    position: absolute;
    top: 17px;
    width: 100%;
    z-index: -1;
  }

  &:first-child:after {
    content: none;
  }

  &.done:before {
    border-color: ${props => props.theme.brandColors.primary1};
    color: ${props => props.theme.brandColors.primary1};
    content: '\\e67b';
    font-family: 'bds-func-icons';
    font-size: 14px;
    font-weight: bold;
  }

  &.active:before {
    border-color: ${props => props.theme.brandColors.primary1};
    color: ${props => props.theme.brandColors.primary1};
    content: '\\e67b';
    font-family: 'bds-func-icons';
    font-size: 22px;
    font-weight: bold;
    height: 30px;
    line-height: 30px;
    margin: 0 auto 10px auto;
    width: 30px;
  }

  &.error:before {
    border-color: ${props => props.theme.colors.danger};
    color: ${props => props.theme.colors.danger};
    content: '\\e68e';
    font-family: 'bds-func-icons';
    font-size: 18px;
    font-weight: bold;
    height: 30px;
    line-height: 30px;
    margin: 0 auto 10px auto;
    width: 30px;
  }

  &.active:after,
  &.done:after,
  &.error:after {
    background-color: ${props => props.theme.brandColors.primary1};
  }

  @media (min-width: ${props => props.theme.screenSize.tablet}) {
    .status-text {
      display: inherit;
    }

    &.active:before,
    &.done:before {
      content: '\\e67b';
      font-family: 'bds-func-icons';
      font-size: 22px;
      height: 30px;
      line-height: 30px;
      margin: 0 auto 10px auto;
      width: 30px;
    }
  }
`;

function StatusTracker({ statusArray, step, isErrorState, ...rest }) {
  const itemWidth = 100 / statusArray.length;

  return (
    <List {...rest}>
      {statusArray.map((status, i) => {
        let statusClass;
        if (i + 1 === step) statusClass = isErrorState ? 'error' : 'active';
        if (i + 1 < step) statusClass = 'done';
        const itemKey = genName();

        return (
          <ListItem key={itemKey} itemWidth={itemWidth} className={statusClass}>
            <span className="status-text">{status}</span>
          </ListItem>
        );
      })}
    </List>
  );
}

StatusTracker.propTypes = {
  /** Array of status descriptions which display sequentially under each step */
  statusArray: PropTypes.arrayOf(PropTypes.node).isRequired,
  /** Used to set the current active step (1-based) */
  step: PropTypes.number,
  /** Displays the active status with an error state instead of a check mark */
  isErrorState: PropTypes.bool
};

StatusTracker.defaultProps = {
  step: undefined,
  isErrorState: false
};

export default StatusTracker;
