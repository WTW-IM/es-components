import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { noop } from 'lodash';

const RangeSelectorBase = styled.div`
  width: 100%;
`;
const RangeSelectorSlider = styled.div`
  height: 5px;
  border-radius: 5px;
  background: ${props => props.sliderColor};
  position: relative;
`;
const RangeSelectorProgress = styled.div`
  height: 5px;
  left: ${props => `${props.minPercentage}%`};
  right: ${props => `${100 - props.maxPercentage}%`};
  border-radius: 5px;
  background: ${props => props.progressColor};
  position: absolute;
`;
const RangeSelectorInputContainer = styled.div`
  position: relative;
`;

const RangeSelectorInput = styled.input`
  position: absolute;
  top: -5px;
  height: 5px;
  width: 100%;
  background: none;
  pointer-events: none;
  -webkit-appearance: none;
  &:focus {
    outline: none;
  }
  &::-webkit-slider-thumb {
    height: 17px;
    width: 17px;
    border-radius: 50%;
    pointer-events: auto;
    -webkit-appearance: none;
    background: ${props => props.thumbColor};
  }
  &::-moz-range-thumb {
    height: 17px;
    width: 17px;
    border: none;
    pointer-events: auto;
    -moz-appearance: none;
    background: ${props => props.thumbColor};
  }
`;

function RangeSelector({
  currentMinValue,
  currentMaxValue,
  minValue,
  maxValue,
  progressColor,
  sliderColor,
  thumbColor,
  onChange,
  ...RangeSelectorProps
}) {
  const [min, setMin] = useState(currentMinValue);
  const [max, setMax] = useState(currentMaxValue);

  const initStateMin = () => {
    if (min < minValue) return 0;
    if (min > maxValue) return 100;
    return ((min - minValue) / (maxValue - minValue)) * 100;
  };
  const initStateMax = () => {
    if (max > maxValue) return 100;
    if (max < minValue) return 0;
    return ((max - minValue) / (maxValue - minValue)) * 100;
  };

  useEffect(() => {
    setMin(currentMinValue);
  }, [currentMinValue, minValue, maxValue]);

  useEffect(() => {
    setMax(currentMaxValue);
  }, [currentMaxValue, minValue, maxValue]);

  const changeMin = event => {
    setMin(Number(event.target.value));
  };
  const changeMinEnd = event => {
    setMin(Number(event.target.value));
    onChange(Number(event.target.value), max);
  };
  const changeMax = event => {
    setMax(Number(event.target.value));
  };
  const changeMaxEnd = event => {
    setMax(Number(event.target.value));
    onChange(min, Number(event.target.value));
  };

  const minPercentage = initStateMin();
  const maxPercentage = initStateMax();

  return (
    <RangeSelectorBase {...RangeSelectorProps}>
      <RangeSelectorSlider sliderColor={sliderColor}>
        <RangeSelectorProgress
          minPercentage={minPercentage}
          maxPercentage={maxPercentage}
          progressColor={progressColor}
        ></RangeSelectorProgress>
      </RangeSelectorSlider>
      <RangeSelectorInputContainer>
        <RangeSelectorInput
          type="range"
          aria-label="Minimum Value Input"
          min={minValue}
          max={maxValue}
          value={min}
          onChange={changeMin}
          onMouseUp={changeMinEnd}
          progressColor={progressColor}
          thumbColor={thumbColor}
        ></RangeSelectorInput>
        <RangeSelectorInput
          type="range"
          aria-label="Maximum Value Input"
          min={minValue}
          max={maxValue}
          value={max}
          onChange={changeMax}
          onMouseUp={changeMaxEnd}
          progressColor={progressColor}
          thumbColor={thumbColor}
        ></RangeSelectorInput>
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
  thumbColor: PropTypes.string,
  /** slider color */
  onChange: PropTypes.func
};

RangeSelector.defaultProps = {
  currentMinValue: 2500,
  currentMaxValue: 7500,
  minValue: 0,
  maxValue: 10000,
  progressColor: '#17A2B8',
  sliderColor: '#ddd',
  thumbColor: '#17A2B8',
  onChange: noop
};

export default RangeSelector;
