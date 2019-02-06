```
const Control = require('../Control').default;

<>
  <Control>
    <Checkbox name="uncheckedByDefault">I am unchecked by default</Checkbox>
  </Control>
  <Control>
    <Checkbox name="checkedByDefault" checked onChange={()=>{}}>I am checked by default</Checkbox>
  </Control>
  <Control>
    <Checkbox name="disabled" disabled>I am a disabled checkbox</Checkbox>
  </Control>
  <Control>
    <Checkbox name="uncheckedByDefault" checked onChange={()=>{}} disabled>I am checked and disabled</Checkbox>
  </Control>
</>
```

Passing a function will execute with the current selection status of the Checkbox.

```
const Control = require('../Control').default;

class CheckboxExample extends React.Component {
  constructor() {
    this.state = {
      isAppleChecked: false,
      isBananaChecked: false,
      isStrawberryChecked: true
    }

    this.toggleCheckbox = this.toggleCheckbox.bind(this);
  }

  toggleCheckbox(key) {
    return event => {
      this.setState({ [key]: event.target.checked });
    }
  }

  render() {
    const wrapperStyle = {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      width: '350px'
    };

    return (
      <div style={wrapperStyle}>
        <Control>
          <Checkbox
            value="Apple"
            checked={this.state.isAppleChecked}
            onChange={this.toggleCheckbox('isAppleChecked')}
          >
            Apple
          </Checkbox>
        </Control>
        <Control>
          <Checkbox
            value="Banana"
            checked={this.state.isBananaChecked}
            onChange={this.toggleCheckbox('isBananaChecked')}
          >
            Banana
          </Checkbox>
        </Control>
        <Control>
          <Checkbox
            value="Strawberry"
            checked={this.state.isStrawberryChecked}
            onChange={this.toggleCheckbox('isStrawberryChecked')}
            disabled
          >
            Strawberry
          </Checkbox>
        </Control>
      </div>
    );
  }
}

<CheckboxExample />
```

### Validation States

```
const Control = require('../Control').default;
const AdditionalHelp = require('../AdditionalHelp').default;

class CheckboxExample extends React.Component {
  constructor() {
    this.state = {
      isAppleChecked: false,
      isBananaChecked: false,
      isStrawberryChecked: false
    }

    this.toggleCheckbox = this.toggleCheckbox.bind(this);
  }

  toggleCheckbox(key) {
    return event => {
      this.setState({ [key]: event.target.checked });
    }
  }

  render() {
    return (
      <div>
        <Control validationState="success">
          <Checkbox
            value="Apple"
            checked={this.state.isAppleChecked}
            onChange={this.toggleCheckbox('isAppleChecked')}
          >
            Apple
          </Checkbox>
          <AdditionalHelp>
            When validation state is set to success.
          </AdditionalHelp>
        </Control>
        <Control validationState="warning">
          <Checkbox
            value="Banana"
            checked={this.state.isBananaChecked}
            onChange={this.toggleCheckbox('isBananaChecked')}
          >
            Banana
          </Checkbox>
          <AdditionalHelp>
            When validation state is set to warning.
          </AdditionalHelp>
        </Control>
        <Control validationState="danger">
          <Checkbox
            value="Strawberry"
            checked={this.state.isStrawberryChecked}
            onChange={this.toggleCheckbox('isStrawberryChecked')}
          >
            Strawberry
          </Checkbox>
          <AdditionalHelp>
            When validation state is set to danger.
          </AdditionalHelp>
        </Control>
      </div>
    );
  }
}

<CheckboxExample />
```
