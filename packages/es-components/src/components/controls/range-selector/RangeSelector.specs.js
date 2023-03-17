import React from 'react';

import { cleanup, screen, fireEvent } from '@testing-library/react';

import RangeSelector from './RangeSelector';
import { renderWithTheme } from '../../util/test-utils';

beforeEach(cleanup);

function buildRangeSelector(props) {
  return (
    <RangeSelector 
      {...props}
    />
  );
}

it('executes the OnChange function when slider min is changed', () => {
  const defaults = {
    currentMinValue: 100,
    currentMaxValue: 1200,
    minValue : 0,
    maxValue : 5000 ,
    progressColor : '#0073b6',
    sliderColor :'#69aa7c',
    thumbColor: '#0073b6',
    onChange : jest.fn()
  };
  renderWithTheme(buildRangeSelector(defaults));
  const inputMin = screen.getByLabelText('min-input');
  fireEvent.change( inputMin, {
    target: { value: '1000' }
  });
  fireEvent.mouseUp(inputMin);
  expect(defaults.onChange).toHaveBeenCalled();
});

it('executes the OnChange function when slider max is changed', () => {
  const defaults = {
    currentMinValue: 100,
    currentMaxValue: 1200,
    minValue : 0,
    maxValue : 5000 ,
    progressColor : '#0073b6',
    sliderColor :'#69aa7c',
    thumbColor: '#0073b6',
    onChange : jest.fn()
  };
  renderWithTheme(buildRangeSelector(defaults));
  const inputMax = screen.getByLabelText('Maximum Value Input');
  fireEvent.change( inputMax, {
    target: { value: '4000' }
  });
  fireEvent.mouseUp(inputMax);
  expect(defaults.onChange).toHaveBeenCalled();
});
