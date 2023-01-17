Use a `Form` component to set the style for all the inputs in the form.

### Form example in the default style

```jsx
import Fieldset from '../../containers/fieldset/Fieldset';
import Control from '../../controls/Control';
import Label from '../../controls/label/Label';
import Textbox from '../../controls/textbox/Textbox';
import Dropdown from '../../controls/dropdown/Dropdown';

<Form>
  <Fieldset>
    <Control>
      <Label htmlFor="first-name-1">First name</Label>
      <Textbox prependIconName="male-user" id="first-name-1" />
    </Control>

    <Control>
      <Label htmlFor="middle-initial-1">Middle initial</Label>
      <Textbox id="middle-initial-1" />
    </Control>

    <Control>
      <Label htmlFor="last-name-1">Last name</Label>
      <Textbox id="last-name-1" />
    </Control>
    <Control>
      <Label htmlFor="dropdown-1">Select an operating system</Label>
      <Dropdown
        id="dropdown-1"
        onChange={({ target }) => console.log(target.value)}
      >
        <option value="">--</option>
        <option value="win">Windows</option>
        <option value="mac">Mac</option>
        <option value="linux">Linux</option>
      </Dropdown>
    </Control>
  </Fieldset>
</Form>;
```

### Form example in the `flat` style

```jsx
import Fieldset from '../../containers/fieldset/Fieldset';
import Control from '../../controls/Control';
import Label from '../../controls/label/Label';
import Textbox from '../../controls/textbox/Textbox';
import Dropdown from '../../controls/dropdown/Dropdown';

<Form flat>
  <Fieldset>
    <Control>
      <Label htmlFor="first-name-1">First name</Label>
      <Textbox prependIconName="male-user" id="first-name-1" />
    </Control>

    <Control>
      <Label htmlFor="middle-initial-1">Middle initial</Label>
      <Textbox id="middle-initial-1" />
    </Control>

    <Control>
      <Label htmlFor="last-name-1">Last name</Label>
      <Textbox id="last-name-1" />
    </Control>
    <Control>
      <Label htmlFor="dropdown-1">Select an operating system</Label>
      <Dropdown
        id="dropdown-1"
        onChange={({ target }) => console.log(target.value)}
      >
        <option value="">--</option>
        <option value="win">Windows</option>
        <option value="mac">Mac</option>
        <option value="linux">Linux</option>
      </Dropdown>
    </Control>
  </Fieldset>
</Form>;
```
