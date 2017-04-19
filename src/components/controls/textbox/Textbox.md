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

Pass a ``handleOnChange`` function to execute any time the input box value changes. This function will have the current value of the input box passed to it.

```
function onChange(value) {
  console.log(value);
}

<Textbox
  labelText="First name"
  handleOnChange={onChange}
/>
```

Pass a ``handleFocusLost`` function to execute when the text box loses focus. This function will have the current value of the input passed to it.

```
function onFocusLost(value) {
  confirm(`You entered ${value}. Is that correct?`);
}

<Textbox
  labelText="First name"
  handleFocusLost={onFocusLost}
/>
```

Adding an ``additionalHelpContent`` prop will provide additional help content underneath the text box.

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

Provide an ``appendText`` or ``prependText`` prop for appending and prepending inputs. Validation state colorings will also be applied.

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

#### Disabled and Readonly

```
<div>
  <Textbox
    labelText="Disabled"
    value="John Doe"
    disabled
  />

  <Textbox
    labelText="Readonly"
    value="Jane Doe"
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