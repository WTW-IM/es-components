Group radio buttons together using a `RadioGroup` component. Providing a `legendText` prop will render a legend with the grouped radio buttons. Individual options can also be disabled.


```
const options = [{
  optionText: 'Hiking',
  optionValue: 'hiking'
}, {
  optionText: 'Biking',
  optionValue: 'biking'
}, {
  optionText: 'Kayaking',
  optionValue: 'kayaking'
}, {
  optionText: 'Camping',
  optionValue: 'camping',
  isDisabled: true
}];

class RadioGroupExample extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: ''
    };

    this.optionChanged = this.optionChanged.bind(this);
  }

  optionChanged(event) {
    const value = event.target.value;
    this.setState({ value });
  }

  render() {
    return (
      <RadioGroup
        name="recreational-activities"
        legendText="Recreational activities"
        radioOptions={options}
        onClick={this.optionChanged}
        value={this.state.value}
      />
    );
  }
}

<RadioGroupExample />
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

class RadioGroupExample extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: ''
    };

    this.optionChanged = this.optionChanged.bind(this);
  }

  optionChanged(event) {
    this.setState({ value: event.target.value });
  }

  render() {
    return (
      <RadioGroup
        name="plates"
        radioOptions={options}
        inline={false}
        onClick={this.optionChanged}
        value={this.state.value}
      />
    );
  }
}

<RadioGroupExample />
```

Each radio is displayed as an error when the `hasError` prop is true. An errored radio group with a default checked option is rendered with a filled radio button.

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

class RadioGroupExample extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: 'plane'
    };

    this.optionChanged = this.optionChanged.bind(this);
  }

  optionChanged(event) {
    this.setState({ value: event.target.value });
  }

  render() {
    return (
      <RadioGroup
        name="transports"
        radioOptions={options}
        onClick={this.optionChanged}
        value={this.state.value}
        hasError
      />
    );
  }
}

<RadioGroupExample />
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

class RadioGroupExample extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: 'pear'
    };

    this.optionChanged = this.optionChanged.bind(this);
  }

  optionChanged(event) {
    this.setState({ value: event.target.value });
  }

  render() {
    return (
      <RadioGroup
        name="fruits"
        radioOptions={options}
        value={this.state.value}
        disableAllOptions
      />
    );
  }
}

<RadioGroupExample />
```
