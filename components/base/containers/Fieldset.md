Use a ``Fieldset`` component to group related fields.

### Fieldset example without a legend:
```
<Fieldset>
  <FormGroup>
    <label>
      <span className="label-style">First name:</span>
      <input type="text" />
    </label>
  </FormGroup>
  <FormGroup>
    <label>
      <span className="label-style">Middle initial:</span>
      <input type="text" />
    </label>
  </FormGroup>
  <FormGroup>
    <label>
      <span className="label-style">Last name:</span>
      <input type="text" />
    </label>
  </FormGroup>
</Fieldset>
```

### Fieldset with a legend

```
<Fieldset legendText="Please enter your name">
  <FormGroup>
    <label>
      <span className="label-style">First name:</span>
      <input type="text" />
    </label>
  </FormGroup>
  <FormGroup>
    <label>
      <span className="label-style">Middle initial:</span>
      <input type="text" />
    </label>
  </FormGroup>
  <FormGroup>
    <label>
      <span className="label-style">Last name:</span>
      <input type="text" />
    </label>
  </FormGroup>
</Fieldset>
```