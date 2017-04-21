```
const options = [{
  optionText: 'Eastern',
  optionValue: 'east'
}, {
  optionText: 'Central',
  optionValue: 'central'
}, {
  optionText: 'Western',
  optionValue: 'west'
}];

<div>
  <Dropdown
    labelText="Region"
    options={options}
  />
  <Dropdown
    labelText="inline"
    options={options}
    inline
  />
</div>
```

Passing an ``onOptionChanged`` function will execute with the value of the dropdown when the option has changed.

```
const options = [{
  optionText: 'Windows',
  optionValue: 'windows'
}, {
  optionText: 'Mac',
  optionValue: 'mac'
}, {
  optionText: 'Linux',
  optionValue: 'linux'
}];

function onOptionChanged(value) {
  alert(`You selected ${value}`);
}

<Dropdown
  labelText="Choose your operating system"
  options={options}
  onOptionChanged={onOptionChanged}
/>
```

Passing an ``onDropdownFocusLost`` function will execute with the value of the dropdown when the dropdown loses focus.

```
const options = [{
  optionText: 'Car',
  optionValue: 'car'
}, {
  optionText: 'Truck',
  optionValue: 'truck'
}, {
  optionText: 'SUV',
  optionValue: 'suv'
}, {
  optionText: 'ATV',
  optionValue: 'atv'
}, {
  optionText: 'Boat',
  optionValue: 'boat'
}];

function onDropdownFocusLost(value) {
  alert(`You selected ${value}`);
}

<Dropdown
  labelText="Choose your favorite vehicle"
  options={options}
  onDropdownFocusLost={onDropdownFocusLost}
/>
```

### Validation states

```
const options = [{
  optionText: 'Success',
  optionValue: 'success'
}, {
  optionText: 'Warning',
  optionValue: 'warning'
}, {
  optionText: 'Danger',
  optionValue: 'danger'
}];

<div>
  <Dropdown
    labelText="Success"
    options={options}
    validationState="success"
  />

  <Dropdown
    labelText="Warning"
    options={options}
    validationState="warning"
  />

  <Dropdown
    labelText="danger"
    options={options}
    validationState="danger"
  />
</div>
```

Any additional props will get passed to the select HTML element.

```
const options = [{
  optionText: 'Jr.',
  optionValue: 'jr'
}, {
  optionText: 'Sr.',
  optionValue: 'sr'
}, {
  optionText: 'III',
  optionValue: 'iii'
}, {
  optionText: 'IV',
  optionValue: 'iv'
}];

<Dropdown
  labelText="Suffix"
  options={options}
  selectedValue="sr"
  disabled
/>
````