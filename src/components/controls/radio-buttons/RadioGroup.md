Group radio buttons together using a ``RadioGroup`` component.

```
const options = [{
  optionText: 'Red',
  value: 'red'
}, {
  optionText: 'Green',
  value: 'green'
}, {
  optionText: 'Blue',
  value: 'blue'
}];

<RadioGroup name="colors" radioOptions={options} checkedValue="green" />
```

Providing a ``legendText`` option will render a legend with the grouped radio buttons.

```
const options = [{
  optionText: 'Hiking',
  value: 'hiking'
}, {
  optionText: 'Biking',
  value: 'biking'
}, {
  optionText: 'kayaking',
  value: 'kayaking'
}];

<RadioGroup
  name="recreational-activities"
  legendText="Recreational activities"
  radioOptions={options}
/>
```

Setting the ``inline`` option to false will stack the radio buttons

```
const options = [{
  optionText: 'Meat',
  value: 'meat'
}, {
  optionText: 'Seafood',
  value: 'seafood'
}, {
  optionText: 'Vegetarian',
  value: 'vegetarian'
}];

<RadioGroup
  name="plates"
  radioOptions={options}
  inline={false}
/>
```

Each radio is displayed as an error when the ``hasError`` prop is true. An errored radio group with a default checked option is rendered with a filled radio button.

```
const options = [{
  optionText: 'First',
  value: '1'
}, {
  optionText: 'Second',
  value: '2'
}, {
  optionText: 'Third',

value: '3'
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
  value: 'plane'
}, {
  optionText: 'Trains',
  value: 'train'
}, {
  optionText: 'Automobiles',
  value: 'automobile'
}];

<RadioGroup
  name="transports"
  radioOptions={options}
  checkedValue="plane"
  hasError
/>
```

Each radio is disabled when the ``disableAllOptions`` prop is true. A disabled radio group with a default checked option is rendered with a filled radio button.

```
const options = [{
  optionText: 'Apple',
  value: 'apple'
}, {
  optionText: 'Banana',
  value: 'banana'
}, {
  optionText: 'Pear',
  value: 'pear'
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
  value: 'books'
}, {
  optionText: 'Television',
  value: 'tv'
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
  value: 'burger'
}, {
  optionText: 'Cheeseburger',
  value: 'cheeseburger'
}, {
  optionText: 'Hotdog',
  value: 'hotdog',
  disabled: true
}];

<RadioGroup
  name="cookout-food"
  radioOptions={options}
/>
```
