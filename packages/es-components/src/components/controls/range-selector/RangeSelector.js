import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { noop } from 'lodash';
import formatMessage from 'format-message';

const RangeSelectorBase = styled.div`
  width: 100%;
  
`;
const LabelContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const RangeSelectorInputContainer = styled.div`
  position: relative;
 `;

const RangeSelectorInput = styled.input`
  height: 5px;
  width: 100%;
  background: ${props => props.defaultColor};
  pointer-events: auto;
  -webkit-appearance: none;
  &:focus {
    outline: none;
  }
  &::-webkit-slider-runnable-track {
      height: 5px;
      -webkit-appearance: none;
      background: linear-gradient(to right,${props => props.sliderColor} , ${props => props.sliderColor});
      background-size: ${props => `${props.maxPercentage}%`} 100%;
      background-repeat: no-repeat;
  }
  &::-webkit-slider-thumb {
    height: 17px;
    width: 17px;
    margin-top: -6px;
    border-radius: 50%;
    pointer-events: auto;
    -webkit-appearance: none;
    background: ${props => props.thumbColor};
  }  
  &::-moz-range-thumb {
    height: 17px;
    width: 17px;
    margin-top: -6px;
    border: none;
    pointer-events: auto;
    -moz-appearance: none;
    background: ${props => props.thumbColor};
  }
  &::-moz-range-track {  
  background-color: ${props => props.defaultColor};
 }
  &::-moz-range-progress {
    background-color: ${props => props.sliderColor}; 
  }
`;

function RangeSelector({
  currentMaxValue,
  minValue,
  maxValue,
  progressColor,
  activeColor,
  defaultColor,
  minTitle,
  maxTitle,
  onChange,
  ...RangeSelectorProps
}) {
  
  const changeMax = event => {
    onChange(Number(event.target.value));
   };

  const thumbColor = (maxValue == currentMaxValue) ? defaultColor : activeColor;
  const sliderColor = (maxValue == currentMaxValue) ? defaultColor : progressColor;

  const initStateMax = () => {
    if (currentMaxValue > maxValue) return 100;
    if (currentMaxValue < minValue) return 0;
    return ((currentMaxValue - minValue) / (maxValue - minValue)) * 100;
  };

  const maxPercentage = initStateMax();


 return (
    <RangeSelectorBase {...RangeSelectorProps}>
      <RangeSelectorInputContainer>
        <RangeSelectorInput
         type="range"
         aria-label="Maximum Value Input"
         min={minValue}
         max={maxValue}
         value={currentMaxValue}
         onChange={changeMax}
         thumbColor={thumbColor}
         sliderColor={sliderColor}
         defaultColor={defaultColor}
         maxPercentage={maxPercentage}
        ></RangeSelectorInput>
     </RangeSelectorInputContainer>
     <LabelContainer>
       <div>
         <div>{formatMessage(minTitle)}</div>
         <div>{formatMessage(minValue.toString())}</div>
       </div>
       <div>
         <div>{formatMessage(maxTitle)}</div>
         <div>{formatMessage(currentMaxValue.toString())}</div>
       </div>
     </LabelContainer>
    </RangeSelectorBase>
  );
}

RangeSelector.propTypes = {
  /** The type attribute for the switch */
  currentMaxValue: PropTypes.number,
  /** current maximium of range */
  minValue: PropTypes.number,
  /** minimium of range */
  maxValue: PropTypes.number,
  /** maximium of range */
  progressColor: PropTypes.string,
  /** progress slider color */
  defaultColor: PropTypes.string,
  /** default color */
  activeColor: PropTypes.string,
  /** active thumb color */
  minTitle: PropTypes.string,
  /** min title */
  maxTitle: PropTypes.string,
  /** max title */
  onChange: PropTypes.func
};

RangeSelector.defaultProps = {
  currentMaxValue: 7500,
  minValue: 0,
  maxValue: 10000,
  progressColor: props => props.theme.colors.success,
  defaultColor: props => props.theme.colors.gray2,
  activeColor: props => props.theme.colors.primary,
  minTitle: "",
  maxTitle: "",
  onChange: noop
};

export default RangeSelector;