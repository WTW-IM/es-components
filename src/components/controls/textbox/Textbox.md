```
<div>
  <Textbox labelText="Stacked" />

  <div style={{ display: 'flex', flexWrap: 'wrap' }}>
    <Textbox labelText="First name" inline />
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
  confirm(`You entered ${event.target.value}. Is that correct?`);
}

<Textbox
  defaultValue="Default"
  labelText="First name"
  onBlur={handleOnBlur}
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
    appendContent=".00"
  />

  <Textbox
    labelText="Prepended"
    prependContent="@"
  />

  <Textbox
    labelText="Appended and prepended"
    appendContent=".00"
    prependContent="$"
  />

  <Textbox
    labelText="Success"
    appendContent=".00"
    prependContent="$"
    validationState="success"
  />

  <Textbox
    labelText="Warning"
    appendContent=".00"
    prependContent="$"
    validationState="warning"
  />

  <Textbox
    labelText="Danger"
    appendContent=".00"
    prependContent="$"
    validationState="danger"
  />

</div>
```

### Additional props

Any unspecified props that get passed get added as a prop to the input in order to allow for additional HTML attributes to be provided.
The react `autoFocus` property is also accepted.

#### Disabled and Readonly

```
<div>
  <Textbox
    labelText="Disabled"
    initialValue="John Doe"
    disabled
  />

  <Textbox
    labelText="Readonly"
    initialValue="Jane Doe"
    readOnly
  />

</div>
```
#### Placeholder

```
<Textbox
  labelText="Placeholder"
  placeholder="Placeholder is not a specified prop"
/>
```
