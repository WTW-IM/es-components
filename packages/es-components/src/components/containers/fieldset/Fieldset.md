Use a `Fieldset` component to group related fields.

### Fieldset example without a legend:
```
const Control = require('../../controls/Control').default;

<Fieldset>
  <Control>
    <Label htmlFor="firstName">First name</Label>
    <Textbox id="firstName" />
  </Control>

  <Control>
    <Label htmlFor="middleInitial">Middle initial</Label>
    <Textbox id="middleInitial" />
  </Control>

  <Control>
    <Label htmlFor="lastName">Last name</Label>
    <Textbox id="lastName" />
  </Control>
</Fieldset>
```

### Fieldset with a legend

```
const Control = require('../../controls/Control').default;


<Fieldset legendContent="Please enter your name">
  <Control>
    <Label htmlFor="firstName">First name</Label>
    <Textbox id="firstName" />
  </Control>

  <Control>
    <Label htmlFor="middleInitial">Middle initial</Label>
    <Textbox id="middleInitial" />
  </Control>

  <Control>
    <Label htmlFor="lastName">Last name</Label>
    <Textbox id="lastName" />
  </Control>
</Fieldset>
```
