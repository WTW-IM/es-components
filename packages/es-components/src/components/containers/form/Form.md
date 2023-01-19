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

    <Control orientation="inline">
      <Control style={{ flex: 2, marginRight: 10 }}>
        <Label htmlFor="address-line-1">Address Line 1</Label>
        <Textbox id="address-line-1" />
      </Control>
      <Control style={{ flex: 2, marginRight: 10 }}>
        <Label htmlFor="address-line-2">Address Line 2</Label>
        <Textbox id="address-line-2" />
      </Control>
      <Control style={{ flex: 2, marginRight: 10 }}>
        <Label htmlFor="city">City</Label>
        <Textbox id="city" />
      </Control>
      <Control style={{ flex: 1, marginRight: 10 }}>
        <Label htmlFor="state">State</Label>
        <Dropdown id="state">
          <option value="">--</option>
          <option value="alabama">Alabama</option>
          <option value="alaska">Alaska</option>
          <option value="arizona">Arizona</option>
        </Dropdown>
      </Control>
      <Control style={{ flex: 1, marginRight: 10, marginBottom: 10 }}>
        <Label style={{ marginRight: 10 }} htmlFor="zip">
          Zip Code
        </Label>
        <Textbox style={{ marginRight: 10, maxWidth: 100 }} id="zip" />
      </Control>
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

    <Control orientation="inline">
      <Control style={{ flex: 2, marginRight: 10 }}>
        <Label htmlFor="address-line-1">Address Line 1</Label>
        <Textbox id="address-line-1" />
      </Control>
      <Control style={{ flex: 2, marginRight: 10 }}>
        <Label htmlFor="address-line-2">Address Line 2</Label>
        <Textbox id="address-line-2" />
      </Control>
      <Control style={{ flex: 2, marginRight: 10 }}>
        <Label htmlFor="city">City</Label>
        <Textbox id="city" />
      </Control>
      <Control style={{ flex: 1, marginRight: 10 }}>
        <Label htmlFor="state">State</Label>
        <Dropdown id="state">
          <option value="">--</option>
          <option value="alabama">Alabama</option>
          <option value="alaska">Alaska</option>
          <option value="arizona">Arizona</option>
        </Dropdown>
      </Control>
      <Control style={{ flex: 1, marginRight: 10, marginBottom: 10 }}>
        <Label style={{ marginRight: 10 }} htmlFor="zip">
          Zip Code
        </Label>
        <Textbox style={{ marginRight: 10, maxWidth: 100 }} id="zip" />
      </Control>
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
