Use a `Fieldset` component to group related fields.

### Fieldset example without a legend:

```
import Control from '../../controls/Control';
import Label from '../../controls/label/Label';
import Textbox from '../../controls/textbox/Textbox';

<Fieldset>
  <Control>
    <Label htmlFor="first-name-1">First name</Label>
    <Textbox id="first-name-1" />
  </Control>

  <Control>
    <Label htmlFor="middle-initial-1">Middle initial</Label>
    <Textbox id="middle-initial-1" />
  </Control>

  <Control>
    <Label htmlFor="last-name-1">Last name</Label>
    <Textbox id="last-name-1" />
  </Control>
</Fieldset>
```

### Fieldset with a legend

```
import Control from '../../controls/Control';
import Label from '../../controls/label/Label';
import Textbox from '../../controls/textbox/Textbox';

<Fieldset legendContent="Please enter your name">
  <Control>
    <Label htmlFor="first-name-2">First name</Label>
    <Textbox id="first-name-2" />
  </Control>

  <Control>
    <Label htmlFor="middle-initial-2">Middle initial</Label>
    <Textbox id="middle-initial-2" />
  </Control>

  <Control>
    <Label htmlFor="last-name-2">Last name</Label>
    <Textbox id="last-name-2" />
  </Control>
</Fieldset>
```

### Fieldset validation

You can wrap a `Fieldset` in a `Control` when you want to apply validation state
to a more complex element with a legend, like a `RadioGroup`.

```
import Control from '../../controls/Control';
import RadioButton from '../../controls/radio-buttons/RadioButton';
import RadioGroup from '../../controls/radio-buttons/RadioGroup';

<Control validationState="danger" hasValidationBorder>
  <Fieldset legendContent="Please select your preference">
    <RadioGroup name="plates">
      <RadioButton value="meat">Meat</RadioButton>
      <RadioButton value="seafood">Seafood</RadioButton>
      <RadioButton value="vegetarian">Vegetarian</RadioButton>
    </RadioGroup>
  </Fieldset>
</Control>
```
