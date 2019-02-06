The Textbox component will accept typical input attributes as props such as onChange, onBlur, value, placeholder, etc.

```
const Control = require('../Control').default;

<>
  <Control>
    <Label for="stacked">Stacked</Label>
    <Textbox id="stacked" />
  </Control>

  <Control orientation="inline">
    <Label for="inline">Inline</Label>
    <Textbox id="inline" />
  </Control>
</>
```

Pass an `onChange` function to execute any time the input box value changes. This function will have the current value of the input box passed to it. The following is a simple controlled example, where state is handled outside the component. (See [Controlled Components](https://facebook.github.io/react/docs/forms.html#controlled-components) and [Uncontrolled Components](https://facebook.github.io/react/docs/uncontrolled-components.html).)

```
const Control = require('../Control').default;

class TextboxExample extends React.Component {
  constructor() {
    this.state = { value: "" };
    this.handleOnTextChange = this.handleOnTextChange.bind(this);
  }

  handleOnTextChange(event) {
    console.log(event.target.value);
    this.setState({ value: event.target.value });
  }

  render() {
    return (
      <Control>
        <Label for="controlled-example">Controlled Example</Label>
        <Textbox
          id="controlled-example"
          value={state.value}
          onChange={this.handleOnTextChange}
        />
      </Control>
    )
  }
}

<TextboxExample />
```

Pass an `onBlur` function to execute when the text box loses focus. This function will have the current value of the input passed to it. To provide a default value in an uncontrolled `Textbox` component, use `defaultValue`.

```
const Control = require('../Control').default;

function handleOnBlur(event) {
  if(event.target.value.length > 0) {
    confirm(`You entered ${event.target.value}. Is that correct?`);
  }
}

<Control>
  <Label>First name</Label>
  <Textbox
    defaultValue="Default"
    labelText="First name"
    onBlur={handleOnBlur}
  />
</Control>
```

### Validation states

Validation states are driven from the `Control` component. This is what they look like for Textboxes.

```
const Control = require('../Control').default;
const AdditionalHelp = require('../AdditionalHelp').default;

<>
  <Control validationState="success">
    <Label for="success">Success</Label>
    <Textbox id="success" aria-describedby="success-help" />
    <AdditionalHelp id="success-help">When validationState is set to success</AdditionalHelp>
  </Control>

  <Control validationState="warning">
    <Label for="warning">Warning</Label>
    <Textbox id="warning" aria-describedby="warning-help" />
    <AdditionalHelp id="warning-help">When validationState is set to warning</AdditionalHelp>
  </Control>

  <Control validationState="danger">
    <Label for="danger">Danger</Label>
    <Textbox id="danger" aria-describedby="danger-help" />
    <AdditionalHelp id="danger-help">When validationState is set to danger</AdditionalHelp>
  </Control>
</>
```

### Appending and Prepending text

Provide an `appendText` or `prependText` prop for appending and prepending inputs. Validation state colorings will also be applied.

```
const Control = require('../Control').default;

<>
  <Control>
    <Label for="appended">Appended</Label>
    <Textbox
      id="appended"
      appendIconName="calendar"
    />
  </Control>

  <Control>
    <Label for="prepended">Prepended</Label>
    <Textbox
      id="prepended"
      prependIconName="phone"
    />
  </Control>

  <Control>
    <Label for="both">Appended and prepended</Label>
    <Textbox
      id="both"
      appendIconName="user"
      prependIconName="phone"
    />
  </Control>

  <Control validationState="success">
    <Label for="appended">Appended</Label>
    <Textbox
      id="appended"
      appendIconName="calendar"
    />
  </Control>

  <Control validationState="warning">
    <Label for="prepended">Prepended</Label>
    <Textbox
      id="prepended"
      prependIconName="phone"
    />
  </Control>

  <Control validationState="danger">
    <Label for="both">Appended and prepended</Label>
    <Textbox
      id="both"
      appendIconName="user"
      prependIconName="phone"
    />
  </Control>
</>
```

### Text masks

```
const Control = require('../Control').default;

<>
  <Control>
    <Label for="dollar">US Dollar</Label>
    <Textbox id="dollar" maskType="dollar" />
  </Control>

  <Control>
    <Label for="phone-number">Phone number</Label>
    <Textbox 
      id="phone-number"
      maskType="phone"
      title="Providing a title will override the default mask title text"
    />
  </Control>

  <Control>
    <Label for="ssn">Social Security Number</Label>
    <Textbox id="ssn" maskType="ssnum" />
  </Control>

  <Control>
    <Label for="zip">Zip code</Label>
    <Textbox id="zip" maskType="zip" />
  </Control>

  <Control>
    <Label for="date">Date</Label>
    <Textbox id="date" maskType="date" placeholder="mm/dd/yyyy" />
  </Control>
</>
```

### Custom masks

Create your own text mask using the structure documented [here](https://github.com/text-mask/text-mask/blob/master/componentDocumentation.md#text-mask-documentation).

```
const Control = require('../Control').default;

const mask = {
    mask: [/[A-Za-z]/, /[A-Za-z]/, /[A-Za-z]/, '-', /[A-Za-z]/, /[A-Za-z]/, /[A-Za-z]/],
    showMask: true,
    keepCharPositions: false,
    placeholderChar: '_'
  };

<Control>
  <Label for="mask">Enter 6 letters (no numbers)</Label>
  <Textbox id="mask" maskType="custom" customMask={mask} />
</Control>
```

### Additional props

Other typical input attributes passed to `Textbox` are allowed. The react `autoFocus` property is also accepted.

```
const Control = require('../Control').default;

<>
  <Control>
    <Label for="disabled">Disabled</Label>
    <Textbox
      id="disabled"
      defaultValue="John Doe"
      disabled
    />
  </Control>

  <Control>
    <Label for="readonly">Readonly</Label>
    <Textbox
      id="readonly"
      defaultValue="Jane Doe"
      readOnly
    />
  </Control>

  <Control>
    <Label for="placeholder">Placeholder</Label>
    <Textbox
      id="placeholder"
      placeholder="Placeholder is one of many input attributes"
    />
  </Control>
</>
```
