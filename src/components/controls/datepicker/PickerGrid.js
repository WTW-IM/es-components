import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import PickerButton from './PickerButton';

function isWeeklyColumnAmount(columnAmount) {
  return columnAmount === 7;
}

const PickerGridWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: 250px;

  @supports (display: grid) {
    display: grid;
    grid-column-gap: 3px;
    grid-row-gap: ${props => (isWeeklyColumnAmount(props.columnAmount) ? '5px' : '15px')};
    grid-template-columns: repeat(${props => props.columnAmount}, 1fr);
  }


  > button {
    align-self: flex-start;
    flex: 1 ${props => (isWeeklyColumnAmount(props.columnAmount) ? '6%' : '25%')};
    justify-self: center;
    padding: 5px 10px;

    &:nth-of-type(${props => props.columnAmount}n+1) {
      justify-self: ${props => (isWeeklyColumnAmount(props.columnAmount) ? 'center' : 'start')};
    }

    &:nth-of-type(${props => props.columnAmount}n+${props => props.columnAmount}) {
      justify-self: ${props => (isWeeklyColumnAmount(props.columnAmount) ? 'center' : 'end')};
    }

    @supports (display: grid) {
      flex: initial;
    }
  }
`;

const SubHeaderCell = styled.span`
  font-weight: bold;
  justify-self: center;
  flex: 1 ${props => 100 / props.columnAmount}%;
  text-align: center;

  @supports (display: grid) {
    flex: initial;
  }
`;

function PickerGrid({
  set,
  pickerElementSelected,
  selectedItem,
  columnAmount = 3
}) {
  const { subHeaderItems, prependedContent, includedContent, appendedContent } = set;

  const subHeaderCells = subHeaderItems !== undefined ?
          subHeaderItems.map((subHeaderItem, index) => <SubHeaderCell columnAmount={columnAmount} key={index}>{subHeaderItem}</SubHeaderCell>) :
          null;

  return (
    <PickerGridWrapper columnAmount={columnAmount}>
      {subHeaderCells}
      {prependedContent}
      {includedContent}
      {set.included.map(setValue => {
        const handlePickerElementClick = () => pickerElementSelected(setValue);
        const selected = setValue === selectedItem;
        return (
          <PickerButton
            key={setValue}
            onClick={handlePickerElementClick}
            selected={selected}
            displayed
          >
            {setValue}
          </PickerButton>
        );
      })}
      {appendedContent}
    </PickerGridWrapper>
  );
}

const setShape = {
  included: PropTypes.array.isRequired,
  subHeaderItems: PropTypes.array,
  prependedExclusions: PropTypes.array,
  appendedExclusions: PropTypes.array
};

PickerGrid.propTypes = {
  set: PropTypes.shape(setShape).isRequired,
  selectedItem: PropTypes.any,
  pickerElementSelected: PropTypes.func.isRequired,
  columnAmount: PropTypes.number
};

export default PickerGrid;
