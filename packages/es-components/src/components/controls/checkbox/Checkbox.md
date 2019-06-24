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
    return (
      <Control orientation="inline">
        <Checkbox
          value="Apple"
          checked={this.state.isAppleChecked}
          onChange={this.toggleCheckbox('isAppleChecked')}
        >
          Apple
        </Checkbox>
        <Checkbox
          value="Banana"
          checked={this.state.isBananaChecked}
          onChange={this.toggleCheckbox('isBananaChecked')}
        >
          Banana
        </Checkbox>
        <Checkbox
          value="Strawberry"
          checked={this.state.isStrawberryChecked}
          onChange={this.toggleCheckbox('isStrawberryChecked')}
          disabled
        >
          Strawberry
        </Checkbox>
      </Control>
    );
  }
}

<CheckboxExample />
```

### Validation States

```
const Control = require('../Control').default;
const AdditionalHelp = require('../AdditionalHelp').default;
const Fieldset = require('../../containers/fieldset/Fieldset').default;
const Legend = require('../../containers/fieldset/Legend').default;

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
      <>
        <Fieldset legendContent="Fruits">
          <Control validationState="success">
            <Checkbox
              value="Apple"
              checked={this.state.isAppleChecked}
              onChange={this.toggleCheckbox('isAppleChecked')}
            >
              Apple
            </Checkbox>
            <Checkbox
              value="Strawberry"
              checked={this.state.isStrawberryChecked}
              onChange={this.toggleCheckbox('isStrawberryChecked')}
            >
              Strawberry
            </Checkbox>
            <Checkbox
              value="Banana"
              checked={this.state.isBananaChecked}
              onChange={this.toggleCheckbox('isBananaChecked')}
            >
              Banana
            </Checkbox>
            <AdditionalHelp>
              When validation state is set to success.
            </AdditionalHelp>
          </Control>
        </Fieldset>

        <Fieldset legendContent="Fruits">
          <Control validationState="warning">
            <Checkbox
              value="Apple"
              checked={this.state.isAppleChecked}
              onChange={this.toggleCheckbox('isAppleChecked')}
            >
              Apple
            </Checkbox>
            <Checkbox
              value="Strawberry"
              checked={this.state.isStrawberryChecked}
              onChange={this.toggleCheckbox('isStrawberryChecked')}
            >
              Strawberry
            </Checkbox>
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
        </Fieldset>

        <Fieldset>
          <Control validationState="danger" useDangerBorder>
            <Legend>Fruits</Legend>
            <Checkbox
              value="Apple"
              checked={this.state.isAppleChecked}
              onChange={this.toggleCheckbox('isAppleChecked')}
            >
              Apple
            </Checkbox>
            <Checkbox
              value="Strawberry"
              checked={this.state.isStrawberryChecked}
              onChange={this.toggleCheckbox('isStrawberryChecked')}
            >
              Strawberry
            </Checkbox>
            <Checkbox
              value="Banana"
              checked={this.state.isBananaChecked}
              onChange={this.toggleCheckbox('isBananaChecked')}
            >
              Banana
            </Checkbox>
            <AdditionalHelp>
              When validation state is set to danger.
            </AdditionalHelp>
          </Control>
        </Fieldset>
      </>
    );
  }
}

<CheckboxExample />
```
