import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { noop } from 'lodash';
import PickerButton from './PickerButton';

const PickerHeaderWrapper = styled.div`
  display: flex;
  font-weight: bold;
  justify-content: space-between;
  margin-bottom: 10px;
`;

function PickerHeader({
  shouldRenderPreviousButton = true,
  previousMode,
  previousAction = noop,
  pickerHeaderText,
  suppressCurrentAction = false,
  currentSelectionAction = noop,
  shouldRenderNextButton = true,
  nextAction = noop
}) {
  const previousLabel = `Go to previous ${previousMode}`;
  const nextLabel = `Go to next ${previousMode}`;
  const currentLabel = suppressCurrentAction ? null : `Select a ${previousMode}`;

  return (
    <PickerHeaderWrapper>
      <PickerButton
        displayed={shouldRenderPreviousButton}
        onClick={previousAction}
        aria-label={previousLabel}
      >
        «
      </PickerButton>
      <PickerButton displayed onClick={currentSelectionAction} aria-label={currentLabel}>{pickerHeaderText}</PickerButton>
      <PickerButton
        displayed={shouldRenderNextButton}
        onClick={nextAction}
        aria-label={nextLabel}
      >
        »
      </PickerButton>
    </PickerHeaderWrapper>
  );
}

PickerHeader.propTypes = {
  shouldRenderPreviousButton: PropTypes.bool,
  currentMode: PropTypes.string,
  previousMode: PropTypes.string,
  previousAction: PropTypes.func,
  pickerHeaderText: PropTypes.any.isRequired,
  suppressCurrentAction: PropTypes.bool,
  currentSelectionAction: PropTypes.func,
  shouldRenderNextButton: PropTypes.bool,
  nextAction: PropTypes.func
};

export default PickerHeader;
