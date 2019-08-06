```
import Control from '../Control';

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
import Control from '../Control';

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
import Control from '../Control';
import AdditionalHelp from '../AdditionalHelp';
import Fieldset from '../../containers/fieldset/Fieldset';

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
        <Control validationState="success" hasValidationBorder>
          <AdditionalHelp>
            When validation state is set to success.
          </AdditionalHelp>

          <Fieldset legendContent="Fruits">
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
          </Fieldset>
        </Control>

        <Control validationState="warning" hasValidationBorder>
          <AdditionalHelp>
            When validation state is set to warning.
          </AdditionalHelp>

          <Fieldset legendContent="Fruits">
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
          </Fieldset>
        </Control>

        <Control validationState="danger" hasValidationBorder>
          <AdditionalHelp>
            When validation state is set to danger.
          </AdditionalHelp>

          <Fieldset legendContent="Fruits">
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
          </Fieldset>
        </Control>
      </>
    );
  }
}

<CheckboxExample />
```
