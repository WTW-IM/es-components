Use a ``FormGroup`` to get proper spacing between form elements.

```
<div>
  <FormGroup>
    <label>
      <span className="label-style">First Name</span>
      <input type="text" />
    </label>
  </FormGroup>
  <FormGroup>
      <label>
        <span className="label-style">Last Name</span>
        <input type="text" />
      </label>
  </FormGroup>
</div>
```

A ``FormGroup`` can be rendered with errors as well.
```
<FormGroup hasError>
  <label>
    <span className="label-style">First Name</span>
    <input type="text" />
  </label>
</FormGroup>
```

Render a ``FormGroup`` with the inline prop set to true in order to have inline form elements.
```
<div>
  <FormGroup inline>
    <label>
      <span className="label-style">First Name</span>
      <input type="text" />
    </label>
  </FormGroup>
  <FormGroup inline>
    <label>
      <span className="label-style">Last Name</span>
      <input type="text" />
    </label>
  </FormGroup>
</div>
```
