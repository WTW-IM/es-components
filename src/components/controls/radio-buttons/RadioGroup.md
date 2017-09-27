Group radio buttons together using a `RadioGroup` component.

```
const options = [{
  optionText: 'Red',
  optionValue: 'red'
}, {
  optionText: 'Green',
  optionValue: 'green'
}, {
  optionText: 'Blue',
  optionValue: 'blue'
}];

<RadioGroup name="colors" radioOptions={options} checkedValue="green" />
```

Providing a `legendText` option will render a legend with the grouped radio buttons.

```
const options = [{
  optionText: 'Hiking',
  optionValue: 'hiking'
}, {
  optionText: 'Biking',
  optionValue: 'biking'
}, {
  optionText: 'kayaking',
  optionValue: 'kayaking'
}];

<RadioGroup
  name="recreational-activities"
  legendText="Recreational activities"
  radioOptions={options}
/>
```

Setting the `inline` option to false will stack the radio buttons

```
const options = [{
  optionText: 'Meat',
  optionValue: 'meat'
}, {
  optionText: 'Seafood',
  optionValue: 'seafood'
}, {
  optionText: 'Vegetarian',
  optionValue: 'vegetarian'
}];

<RadioGroup
  name="plates"
  radioOptions={options}
  inline={false}
/>
```

Each radio is displayed as an error when the `hasError` prop is true. An errored radio group with a default checked option is rendered with a filled radio button.

```
const options = [{
  optionText: 'First',
  optionValue: '1'
}, {
  optionText: 'Second',
  optionValue: '2'
}, {
  optionText: 'Third',
  optionValue: '3'
}];

<RadioGroup
  name="placings"
  radioOptions={options}
  hasError
/>
```

```
const options = [{
  optionText: 'Planes',
  optionValue: 'plane'
}, {
  optionText: 'Trains',
  optionValue: 'train'
}, {
  optionText: 'Automobiles',
  optionValue: 'automobile'
}];

<RadioGroup
  name="transports"
  radioOptions={options}
  checkedValue="plane"
  hasError
/>
```

Each radio is disabled when the `disableAllOptions` prop is true. A disabled radio group with a default checked option is rendered with a filled radio button.

```
const options = [{
  optionText: 'Apple',
  optionValue: 'apple'
}, {
  optionText: 'Banana',
  optionValue: 'banana'
}, {
  optionText: 'Pear',
  optionValue: 'pear'
}];

<RadioGroup
  name="fruits"
  radioOptions={options}
  disableAllOptions
/>
```

```
const options = [{
  optionText: 'Books',
  optionValue: 'books'
}, {
  optionText: 'Television',
  optionValue: 'tv'
}];

<RadioGroup
  name="media-preference"
  radioOptions={options}
  disableAllOptions
  checkedValue="books"
/>
```

Individual options can also be disabled.
```
const options = [{
  optionText: 'Hamburger',
  optionValue: 'burger'
}, {
  optionText: 'Cheeseburger',
  optionValue: 'cheeseburger'
}, {
  optionText: 'Hotdog',
  optionValue: 'hotdog',
  disabled: true
}];

<RadioGroup
  name="cookout-food"
  radioOptions={options}
/>
```
