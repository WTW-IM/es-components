```
<div>
  <Checkbox name="uncheckedByDefault" labelText="I am unchecked by default" />
  <Checkbox name="checkedByDefault" labelText="I am checked by default" checked />
  <Checkbox name="disabled" labelText="I am disabled" disabled />
  <Checkbox name="uncheckedByDefault" labelText="I am checked and disabled" checked disabled />
</div>
```

Passing a function will execute with the current selection status of the Checkbox.

```
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
    return (
      <div>
        <Checkbox 
          name="Apple"
          labelText="Apple"
          value="Apple"
          checked={this.state.isAppleChecked}
          onClick={this.toggleCheckbox('isAppleChecked')}
        />
        <Checkbox 
          name="Banana"
          labelText="Banana"
          value="Banana"
          checked={this.state.isBananaChecked}
          onClick={this.toggleCheckbox('isBananaChecked')}
        />
        <Checkbox 
          name="Strawberry"
          labelText="Strawberry"
          value="Strawberry"
          checked={this.state.isStrawberryChecked}
          onClick={this.toggleCheckbox('isStrawberryChecked')}
          disabled
        />
      </div>
    );
  }
}

<CheckboxExample />
```
### Validation States
```
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
        <Checkbox 
          name="Apple_Success"
          labelText="Apple"
          value="Apple"
          checked={this.state.isAppleChecked}
          onClick={this.toggleCheckbox('isAppleChecked')}
          validationState="success"
          additionalHelpContent="When validationState is set to success."
        />
        <Checkbox 
          name="Banana_Success"
          labelText="Banana"
          value="Banana"
          checked={this.state.isBananaChecked}
          onClick={this.toggleCheckbox('isBananaChecked')}
          validationState="warning"
          additionalHelpContent="When validationState is set to warning."
        />
        <Checkbox 
          name="Strawberry_danger"
          labelText="Strawberry"
          value="Strawberry"
          checked={this.state.isStrawberryChecked}
          onClick={this.toggleCheckbox('isStrawberryChecked')}
          validationState="danger"
          additionalHelpContent="When validationState is set to danger."
        />
      </div>
    );
  }
}

<CheckboxExample />
```
