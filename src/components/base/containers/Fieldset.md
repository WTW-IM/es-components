Use a ``Fieldset`` component to group related fields.

### Fieldset example without a legend:
```
<Fieldset>
  <Textbox labelText="First name:" />
  <Textbox labelText="Middle initial:" />
  <Textbox labelText="Last name:" />
</Fieldset>
```

### Fieldset with a legend

```
<Fieldset legendText="Please enter your name">
  <Textbox labelText="First name:" />
  <Textbox labelText="Middle initial:" />
  <Textbox labelText="Last name:" />
</Fieldset>
```