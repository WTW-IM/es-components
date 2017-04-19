Use a ``Fieldset`` component to group related fields.

### Fieldset example without a legend:
```
<Fieldset>
  <FormGroup>
    <Textbox labelText="First name:" />
  </FormGroup>
  <FormGroup>
    <Textbox labelText="Middle initial:" />
  </FormGroup>
  <FormGroup>
    <Textbox labelText="Last name:" />
  </FormGroup>
</Fieldset>
```

### Fieldset with a legend

```
<Fieldset legendText="Please enter your name">
  <FormGroup>
    <Textbox labelText="First name:" />
  </FormGroup>
  <FormGroup>
    <Textbox labelText="Middle initial:" />
  </FormGroup>
  <FormGroup>
    <Textbox labelText="Last name:" />
  </FormGroup>
</Fieldset>
```