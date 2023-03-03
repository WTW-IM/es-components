A `RangeSelector` component examples.

```
import RangeSelector from '../range-selector/RangeSelector';

<>
    <RangeSelector />
</>
```

```
import RangeSelector from '../range-selector/RangeSelector';
const handleSlider = (min, max) => {
    console.log(min);
    console.log(max);
  };
<>

<RangeSelector  currentMinValue = '100'   currentMaxValue = '1200'   minValue = '0'  maxValue = '5000'   progressColor = '#0073b6'  sliderColor = '#69aa7c'  onChange={(min, max) => handleSlider(min, max) } />

</>
```
