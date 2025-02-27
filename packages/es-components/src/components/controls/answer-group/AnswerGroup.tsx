import React from 'react';
import styled, { css } from 'styled-components';

import RadioGroup, {
  propTypes as radioGroupPropTypes,
  RadioGroupProps
} from '../radio-buttons/RadioGroup';
import {
  AnswerButtonProps,
  propTypes as answerButtonPropTypes
} from './AnswerButton';
import { ButtonSize } from 'es-components-shared-types';

const outlineStyles = css`
  > label:first-child > div {
    border-radius: 4px 0 0 4px;
  }

  > label:last-child > div {
    border-radius: 0 4px 4px 0;
    border-left: none;
  }

  > label:not(:first-child, :last-child) > div {
    border-left: 1px;
  }
`;

interface AnswerSetProps {
  $isOutline?: boolean;
}

const AnswerSet = styled.div<AnswerSetProps>`
  display: flex;
  flex-wrap: nowrap;

  ${props => props.$isOutline && outlineStyles};
`;

export type AnswerGroupProps = Override<
  RadioGroupProps<true>,
  Override<AnswerButtonProps, Pick<RadioGroupProps<true>, 'name' | 'children'>>
>;

const AnswerGroup = React.forwardRef<HTMLDivElement, AnswerGroupProps>(
  function ForwardedAnswerGroup(
    {
      styleType = 'default',
      selectedType = 'success',
      size = 'default' as ButtonSize,
      itemWidth = '100px',
      isOutline = false,
      disableAllOptions = false,
      ...props
    },
    ref
  ) {
     
    return (
      <AnswerSet $isOutline={isOutline} ref={ref}>
        <RadioGroup
          {...{
            ...props,
            styleType,
            selectedType,
            size,
            itemWidth,
            isOutline,
            disableAllOptions
          }}
          isAnswerGroup={true}
        />
      </AnswerSet>
    );
  }
);

AnswerGroup.propTypes = {
  ...answerButtonPropTypes,
  ...radioGroupPropTypes,
  /** The name of the answer group */
  name: radioGroupPropTypes.name,
  /** The width of each item when not in mobile view */
  itemWidth: answerButtonPropTypes.itemWidth,
  /** Select the color style of the buttons, types come from theme */
  styleType: answerButtonPropTypes.styleType,
  /** Select the color style of the selected button, types come from theme */
  selectedType: answerButtonPropTypes.selectedType,
  /** Set the button size, sizes come from theme (buttonStyles) */
  size: answerButtonPropTypes.size,
  /** Set if the items should have a flat outline style */
  isOutline: answerButtonPropTypes.isOutline,
  /** Disable all radio buttons */
  disableAllOptions: radioGroupPropTypes.disableAllOptions,
  /** Selected option for the answer group */
  selectedValue: radioGroupPropTypes.selectedValue
};

export default AnswerGroup;
