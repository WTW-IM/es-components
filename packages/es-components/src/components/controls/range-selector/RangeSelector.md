A `RangeSelector` component examples.

```
import { useState } from 'react';
import RangeSelector from '../range-selector/RangeSelector';
const minTitle = "Min";
const maxTitle = "Max";
const [maxCurrent, setMaxCurrent] = useState(4000);
const handleSlider = (max) => {
    setMaxCurrent(max);
  };
<>

<RangeSelector   currentMaxValue = {maxCurrent} minTitle = {minTitle} maxTitle = {maxTitle}  onChange = {(max) => handleSlider(max) } />

</>
```

```
import { useState } from 'react';
import RangeSelector from '../range-selector/RangeSelector';
const progressColor = '#585858';
const defaultColor = '#D8D8D8';
const activeColor = '#00A0D2';
const minValue = 200;
const maxValue = 5000;
const [maxCurrent, setMaxCurrent] = useState(maxValue);
const handleSlider = (max) => {
    setMaxCurrent(max);
  };
<>

<RangeSelector   currentMaxValue = {maxCurrent}  minValue = {minValue}  maxValue = {maxValue}   progressColor = {progressColor}  defaultColor = {defaultColor }  activeColor = {activeColor}  onChange = {(max) => handleSlider(max) } />

</>
```
