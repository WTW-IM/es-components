```
<div>
  <Checkbox name="uncheckedByDefault" labelText="I am unchecked by default" />
  <Checkbox name="checkedByDefault" labelText="I am checked by default" checked onChange={()=>{}} />
  <Checkbox name="disabled" labelText="I am disabled" disabled />
  <Checkbox name="uncheckedByDefault" labelText="I am checked and disabled" checked onChange={()=>{}} disabled />
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
    const wrapperStyle = {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      maxWidth: '40%',
      width: '350px'
    };

    return (
      <div style={wrapperStyle}>
        <Checkbox
          name="Apple"
          labelText="Apple"
          value="Apple"
          checked={this.state.isAppleChecked}
          onChange={this.toggleCheckbox('isAppleChecked')}
        />
        <Checkbox
          name="Banana"
          labelText="Banana"
          value="Banana"
          checked={this.state.isBananaChecked}
          onChange={this.toggleCheckbox('isBananaChecked')}
        />
        <Checkbox
          name="Strawberry"
          labelText="Strawberry"
          value="Strawberry"
          checked={this.state.isStrawberryChecked}
          onChange={this.toggleCheckbox('isStrawberryChecked')}
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
          onChange={this.toggleCheckbox('isAppleChecked')}
          validationState="success"
          additionalHelpContent="When validationState is set to success."
        />
        <Checkbox
          name="Banana_Success"
          labelText="Banana"
          value="Banana"
          checked={this.state.isBananaChecked}
          onChange={this.toggleCheckbox('isBananaChecked')}
          validationState="warning"
          additionalHelpContent="When validationState is set to warning."
        />
        <Checkbox
          name="Strawberry_danger"
          labelText="Strawberry"
          value="Strawberry"
          checked={this.state.isStrawberryChecked}
          onChange={this.toggleCheckbox('isStrawberryChecked')}
          validationState="danger"
          additionalHelpContent="When validationState is set to danger."
        />
      </div>
    );
  }
}

<CheckboxExample />
```
