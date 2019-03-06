The MaskedTextbox component accepts all `Textbox` props, as well as `maskType` and `customMask`.

```
const Control = require('../Control').default;

<>
  <Control>
    <Label htmlFor="dollar">US Dollar</Label>
    <MaskedTextbox id="dollar" maskType="dollar" />
  </Control>

  <Control>
    <Label htmlFor="phone-number">Phone number</Label>
    <MaskedTextbox
      id="phone-number"
      maskType="phone"
      title="Providing a title will override the default mask title text"
    />
  </Control>

  <Control>
    <Label htmlFor="ssn">Social Security Number</Label>
    <MaskedTextbox id="ssn" maskType="ssnum" />
  </Control>

  <Control>
    <Label htmlFor="zip">Zip code</Label>
    <MaskedTextbox id="zip" maskType="zip" />
  </Control>

  <Control>
    <Label htmlFor="date">Date</Label>
    <MaskedTextbox id="date" maskType="date" placeholder="mm/dd/yyyy" />
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
  <Label htmlFor="mask">Enter 6 letters (no numbers)</Label>
  <MaskedTextbox id="mask" maskType="custom" customMask={mask} />
</Control>
```
