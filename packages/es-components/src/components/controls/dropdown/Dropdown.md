Passing an `onChange` function will execute with the value of the dropdown when the option has changed.

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

class DropdownChangedExample extends React.Component {
  constructor() {
    this.state = { selectedValue: '' };

    this.optionChanged = this.optionChanged.bind(this)
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.selectedValue !== this.state.selectedValue && this.state.selectedValue !== '') {
      alert(`You selected ${this.state.selectedValue}`);
    }
  }

  optionChanged(event) {
    this.setState({ selectedValue: event.target.value });
  }

  render() {
    return (
      <Dropdown
        inline={this.props.inline}
        value={this.state.selectedValue}
        labelText="Operating Systems"
        isDefaultFirstOptionDisabled={false}
        options={options}
        onChange={this.optionChanged}
      />
    );
  }
}


<div>
  <DropdownChangedExample inline={false} />
  <p>Dropdowns can also be rendered inline</p>
  <DropdownChangedExample inline />
</div>

```

Passing an `onBlur` function will execute with the value of the dropdown when the dropdown loses focus.

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

class DropdownBlurExample extends React.Component {
  constructor() {
    this.state = { selectedValue: '' };

    this.optionChanged = this.optionChanged.bind(this);
    this.displayChosenValue = this.displayChosenValue.bind(this);
  }

  optionChanged(event) {
    this.setState({ selectedValue: event.target.value });
  }

  displayChosenValue(event) {;
    alert(`You selected ${event.target.value}`);
  }

  render() {
    return (
      <Dropdown
        value={this.state.selectedValue}
        labelText="Choose your favorite vehicle"
        isDefaultFirstOptionDisabled={false}
        options={options}
        onChange={this.optionChanged}
        onBlur={this.displayChosenValue}
      />
    );
  }
}

<DropdownBlurExample />
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

class DropdownExample extends React.Component {
  constructor() {
    this.state = { selectedOption: options.find(opt => opt.optionValue === 'success') };

    this.optionChanged = this.optionChanged.bind(this);
  }

  optionChanged(event) {
    const value = event.target.value;
    const selectedOption = options.find(opt => opt.optionValue === value);
    this.setState({ selectedOption });
  }

  render() {
    const { selectedOption } = this.state;
    return (
      <Dropdown
        labelText={selectedOption.optionText}
        options={options}
        validationState={selectedOption.optionValue}
        onChange={this.optionChanged}
        value={selectedOption.optionValue}
      />
    );
  }
}

<DropdownExample />
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

class DropdownExample extends React.Component {
  constructor() {
    this.state = { selectedValue: '' };

    this.optionChanged = this.optionChanged.bind(this)
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.selectedValue !== this.state.selectedValue && this.state.selectedValue !== '') {
      alert(`You selected ${this.state.selectedValue}`);
    }
  }

  optionChanged(event) {
    this.setState({ selectedValue: event.target.value });
  }

  render() {
    return (
      <Dropdown
        labelText="Suffix"
        options={options}
        value="sr"
        disabled
      />
    );
  }
}

<DropdownExample />
````
