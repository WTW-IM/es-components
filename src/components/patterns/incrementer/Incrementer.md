Default incrementers will start at 0 and increase and decrease by 1 with no upper and lower limits.
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

Thresholds can be set that will set a range for values that the incrementer will respect.

```
<Incrementer
  lowerThreshold={0}
  upperThreshold={5}
/>
```

Passing a function to `onValueUpdated` will execute that function with the new value.

```
function printNewValue(value) {
  console.log(`The new value is ${value}`);
}

<div>
  <p>This incrementer will print the new value to the console.</p>
  <Incrementer
    onValueUpdated={printNewValue}
  />
</div>
```
