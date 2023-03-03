import React, { useEffect, useState }from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const RangeSelectorBase = styled.div`
   width: 100%;
  `;
const RangeSelectorSlider = styled.div`
  height: 5px;
  border-radius: 5px;
  background: ${props => (props.sliderColor)};;
  position: relative;
`;
const RangeSelectorProgress = styled.div`
  height: 5px;
  left: ${props => (`${props.minPercentage}%`)};
  right: ${props => (`${100 - props.maxPercentage}%`)};
  border-radius: 5px;
  background: ${props => (props.progressColor)};
  position: absolute;
`;
const RangeSelectorInputContainer = styled.div`
  position: relative;
`;

const RangeSelectorInput = styled.input`
  position:absolute;
  top: -5px;
  height: 5px;
  width: 100%;
  background: none;
  pointer-events: none;
  -webkit-appearance: none;
  &:focus {
    outline: none;
}
  &::-webkit-slider-thumb{
    height: 17px;
    width: 17px;
    border-radius : 50%;
    pointer-events: auto;
    -webkit-appearance: none;
    background: ${props => (props.progressColor)};
  }
  &::-moz-range-thumb{
    height: 17px;
    width: 17px;
    border: none;
    pointer-events: auto;
    -moz-appearance: none;
    background: ${props => (props.progressColor)};
  }
`;

function RangeSelector({
  currentMinValue,
  currentMaxValue,
  minValue,
  maxValue,
  progressColor,
  sliderColor,
  onChange,
   ...RangeSelectorProps
}) {
  const initStateMin = () => {
    console.log("min  2");
    console.log(currentMinValue);
    console.log(minValue);
    console.log(maxValue);
    if (currentMinValue < minValue) return 0;
    if (currentMinValue > maxValue) return 100;
    return ((currentMinValue - minValue) / (maxValue - minValue) * 100);
  };
  const initStateMax = () => {
    console.log("max 2");
    console.log(currentMaxValue);
    console.log(minValue);
    console.log(maxValue);
    if (currentMaxValue > maxValue) return 100;
    if (currentMaxValue < minValue) return 0;
    return ((currentMaxValue - minValue) / (maxValue - minValue) * 100);
  };
  const [min, setMin] = useState(currentMinValue);
  const [max, setMax] = useState(currentMaxValue);
  const [minPercentage, setMinPercentage] = useState(initStateMin);
  const [maxPercentage, setMaxPercentage] = useState(initStateMax);

  const changeMin = (event) => {
    setMin(event.target.value);
    setMinPercentage((event.target.value - minValue) / (maxValue - minValue) * 100);
    onChange(event.target.value, max);
  };
  const changeMax = (event) => {
    setMax(event.target.value);
    setMaxPercentage((event.target.value - minValue) / (maxValue - minValue) * 100);
    onChange(min, event.target.value);
  };
  
 return (
    <RangeSelectorBase  {...RangeSelectorProps}>
      <RangeSelectorSlider sliderColor = {sliderColor} >
        <RangeSelectorProgress minPercentage = {minPercentage} maxPercentage = {maxPercentage} progressColor = { progressColor } ></RangeSelectorProgress>
      </RangeSelectorSlider>
      <RangeSelectorInputContainer>
        <RangeSelectorInput type="range" min = {minValue} max= {maxValue} value = {min} onChange={changeMin}  progressColor = { progressColor } ></RangeSelectorInput>
        <RangeSelectorInput type="range" min = {minValue} max= {maxValue} value = {max}  onChange={changeMax}  progressColor = { progressColor } ></RangeSelectorInput>
      </RangeSelectorInputContainer>
    </RangeSelectorBase>
  );
}

RangeSelector.propTypes = {
  /** The type attribute for the switch */
  currentMinValue: PropTypes.number,
  /** current minimium of range */
  currentMaxValue: PropTypes.number,
  /** current maximium of range */
  minValue: PropTypes.number,
  /** minimium of range */
  maxValue: PropTypes.number,
  /** maximium of range */
  progressColor: PropTypes.string,
  /** progress color */
  sliderColor: PropTypes.string,
  /** slider color */
  onChange: PropTypes.func
};

RangeSelector.defaultProps = {
  currentMinValue: 2500,
  currentMaxValue: 7500,
  minValue: 0,
  maxValue: 10000,
  progressColor: '#17A2B8',
  sliderColor:  '#ddd'
};

export default RangeSelector;