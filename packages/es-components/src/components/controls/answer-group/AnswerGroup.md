Group answer buttons together using a `AnswerGroup` component.


```
const options = [{
  optionText: 'Yes',
  optionValue: 'yes'
}, {
  optionText: 'No',
  optionValue: 'no'
}];

class AnswerGroupExample extends React.Component {
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
    console.log(value);
  }

  render() {
    return (
      <AnswerGroup 
        name="yes-no-question"
        itemWidth='50px'
        radioOptions={options}
        onChange={this.optionChanged}
        value={this.state.value}
      />
    );
  }
}

<AnswerGroupExample />
```

```
const familyOptions = [{
  optionText: 'Single',
  optionValue: 'yes'
}, {
  optionText: 'Married',
  optionValue: 'no'
}, {
   optionText: 'Head of Household',
   optionValue: 'head'
 }];

class AnswerGroupExample extends React.Component {
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
    console.log(value);
  }

  render() {
    return (
      <AnswerGroup
        name="filing-status"
        itemWidth='200px'
        radioOptions={familyOptions}
        onChange={this.optionChanged}
        value={this.state.value}
      />
    );
  }
}

<AnswerGroupExample />
```


### Alternative button types

Setting the `isOutline` prop will apply an alternative outline style.


```
const options = [{
  optionText: 'Yes',
  optionValue: 'yes'
}, {
  optionText: 'No',
  optionValue: 'no'
}];

class AnswerGroupExample extends React.Component {
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
    console.log(value);
  }

  render() {
    return (
      <AnswerGroup 
        name="yes-no-question"
        itemWidth='50px'
        radioOptions={options}
        onChange={this.optionChanged}
        value={this.state.value}
        isOutline
      />
    );
  }
}

<AnswerGroupExample />
```


