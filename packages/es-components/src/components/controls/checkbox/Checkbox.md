```
<div>
  <Checkbox labelText="I am unchecked by default" />
  <Checkbox labelText="I am checked by default" isChecked />
  <Checkbox labelText="I am disabled" isDisabled />
  <Checkbox labelText="I am checked and disabled" isChecked isDisabled />
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
          labelText="Apple"
          value="Apple"
          isChecked={this.state.isAppleChecked}
          onClick={this.toggleCheckbox('isAppleChecked')}
        />
        <Checkbox 
          labelText="Banana"
          value="Banana"
          isChecked={this.state.isBananaChecked}
          onClick={this.toggleCheckbox('isBananaChecked')}
        />
        <Checkbox 
          labelText="Strawberry"
          value="Strawberry"
          isChecked={this.state.isStrawberryChecked}
          onClick={this.toggleCheckbox('isStrawberryChecked')}
          isDisabled
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
          labelText="Apple"
          value="Apple"
          isChecked={this.state.isAppleChecked}
          onClick={this.toggleCheckbox('isAppleChecked')}
          validationState="success"
          additionalHelpContent="When validationState is set to success."
        />
        <Checkbox 
          labelText="Banana"
          value="Banana"
          isChecked={this.state.isBananaChecked}
          onClick={this.toggleCheckbox('isBananaChecked')}
          validationState="warning"
          additionalHelpContent="When validationState is set to warning."
        />
        <Checkbox 
          labelText="Strawberry"
          value="Strawberry"
          isChecked={this.state.isStrawberryChecked}
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
