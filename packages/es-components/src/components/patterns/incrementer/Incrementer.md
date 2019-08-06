Default incrementers will start at 0 and increase and decrease by 1 with no upper and lower limits. The `startingValue` may be set to `null` to start with a blank input.

```
<Incrementer />
```

Setting the increment and decrement amounts will increase and decrease by those amounts. This incrementer will increase and decrease by 2.

```
<Incrementer
  incrementAmount={2}
  decrementAmount={2}
/>
```

Thresholds can be set that will set a range for values that the incrementer will respect. Make sure to set a `startingValue` that respects your `lowerThreshold`.

```
<Incrementer
  lowerThreshold={5}
  upperThreshold={12}
  startingValue={5}
/>
```

Passing a function to `onValueUpdated` will execute that function with the new value.

```
import Control from '../../controls/Control';
import Label from '../../controls/label/Label';
import AdditionalHelp from '../../controls/AdditionalHelp';

function printNewValue(value) {
  console.log(`The new value is ${value}`);
}

<Control>
  <Label htmlFor="example-inc">Example</Label>
  <Incrementer id="example-inc" aria-describedby="example-help" useOutlineButton
    onValueUpdated={printNewValue}
  />
  <AdditionalHelp id="example-help">This incrementer will print the new value to the console.</AdditionalHelp>
</Control>
```
