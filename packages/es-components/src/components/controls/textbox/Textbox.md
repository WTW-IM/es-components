The Textbox component will accept typical input attributes as props such as onChange, onBlur, value, placeholder, etc.

```
<div>
  <Textbox labelText="Stacked" id="foo" />

  <div style={{ display: 'flex', flexWrap: 'wrap' }}>
    <Textbox labelText="First name" style={{ marginRight: 25 }} inline />
    <Textbox labelText="Middle initial" inline />
    <Textbox labelText="Last name" inline />
  </div>
</div>
```

Pass an `onChange` function to execute any time the input box value changes. This function will have the current value of the input box passed to it. The following is a simple controlled example, where state is handled outside the component. (See [Controlled Components](https://facebook.github.io/react/docs/forms.html#controlled-components) and [Uncontrolled Components](https://facebook.github.io/react/docs/uncontrolled-components.html).)

```
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
      <Textbox
        labelText="Controlled Example"
        value={state.value}
        onChange={this.handleOnTextChange}
      />
    )
  }
}
<TextboxExample />
```

Pass an `onBlur` function to execute when the text box loses focus. This function will have the current value of the input passed to it. To provide a default value in an uncontrolled `Textbox` component, use `defaultValue`.

```
function handleOnBlur(event) {
  if(event.target.value.length > 0) {
    confirm(`You entered ${event.target.value}. Is that correct?`);
  }
}

<Textbox
  defaultValue="Default"
  labelText="First name"
  onBlur={handleOnBlur}
/>
```

The `labelSuffix` prop will display additional styled content after the label text.

```
<Textbox
  labelText="Middle name"
  labelSuffix={<span>Optional</span>}
/>
```

Adding an `additionalHelpContent` prop will provide additional help content underneath the text box.

```
<Textbox
  labelText="First name"
  additionalHelpContent="Enter your first name to continue."
/>
```

### Validation states

```
<div>
  <Textbox
    labelText="Success"
    validationState="success"
    additionalHelpContent="When validationState is set to Success"
  />

  <Textbox
    labelText="Warning"
    validationState="warning"
    additionalHelpContent="When validationState is set to Warning"
  />

  <Textbox
    labelText="Danger"
    validationState="danger"
    additionalHelpContent="When validation state is set to Error"
  />

</div>
```

### Appending and Prepending text

Provide an `appendText` or `prependText` prop for appending and prepending inputs. Validation state colorings will also be applied.

```
<div>
  <Textbox
    labelText="Appended"
    appendIconName="calendar"
  />

  <Textbox
    labelText="Prepended"
    prependIconName="phone"
  />

  <Textbox
    labelText="Appended and prepended"
    appendIconName="user"
    prependIconName="phone"
  />

  <Textbox
    labelText="Success"
    appendIconName="user"
    prependIconName="phone"
    validationState="success"
  />

  <Textbox
    labelText="Warning"
    appendIconName="user"
    prependIconName="phone"
    validationState="warning"
  />

  <Textbox
    labelText="Danger"
    appendIconName="user"
    prependIconName="phone"
    validationState="danger"
  />

</div>
```

### Text masks

```
<div>
  <Textbox labelText="US Dollar" maskType="dollar" />

  <Textbox
    labelText="Phone Number"
    maskType="phone"
    title="Providing a title will override the default mask title text"
  />

  <Textbox
    labelText="Social Security Number"
    maskType="ssnum"
  />

  <Textbox
    labelText="Zip Code"
    maskType="zip"
  />

  <Textbox
    labelText="Date"
    maskType="date"
    placeholder="mm/dd/yyyy"
  />
</div>
```

### Custom masks

Create your own text mask using the structure documented [here](https://github.com/text-mask/text-mask/blob/master/componentDocumentation.md#text-mask-documentation).

```
const mask = {
    mask: [/[A-Za-z]/, /[A-Za-z]/, /[A-Za-z]/, '-', /[A-Za-z]/, /[A-Za-z]/, /[A-Za-z]/],
    showMask: true,
    keepCharPositions: false,
    placeholderChar: '_'
  };

<Textbox name="maskExample" labelText="Enter 6 Letters (No Numbers)" maskType="custom" customMask={mask} />
```

### Additional props

Other typical input attributes passed to `Textbox` are allowed. The react `autoFocus` property is also accepted.

```
<div>
  <Textbox
    labelText="Disabled"
    defaultValue="John Doe"
    disabled
  />

  <Textbox
    labelText="Readonly"
    defaultValue="Jane Doe"
    readOnly
  />

  <Textbox
    labelText="Placeholder"
    placeholder="Placeholder is one of many input attributes"
  />

</div>
```
