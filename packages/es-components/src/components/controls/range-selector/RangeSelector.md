A `RangeSelector` component examples.

```
import RangeSelector from '../range-selector/RangeSelector';

<>
    <RangeSelector />
</>
```

```
import RangeSelector from '../range-selector/RangeSelector';
const progressColor = '#585858';
const sliderColor = '#D8D8D8';
const thumbColor = '#00A0D2';
const minValue = 0;
const maxValue = 5000;
const minCurrent = 500;
const maxCurrent = 1200;
const handleSlider = (min, max) => {
    console.log(min);
    console.log(max);
  };
<>

<RangeSelector  currentMinValue = {minCurrent}   currentMaxValue = {maxCurrent}  minValue = {minValue}  maxValue = {maxValue}   progressColor = {progressColor}  sliderColor = {sliderColor }  thumbColor = {thumbColor}  onChange = {(min, max) => handleSlider(min, max) } />

</>
```
