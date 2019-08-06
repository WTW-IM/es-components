A `Dropdown` component works exactly like a native `<select>` tag with style attached. It supports any HTML attributes that a native `<select>` tag supports.

```
import Control from '../Control';
import Label from '../label/Label';

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
```

Wrap the dropdown in a `Control` with `inline` passed htmlFor the `orientation` prop to render the label and input horizontally.

```
import Control from '../Control';
import Label from '../label/Label';
import AdditionalHelp from '../AdditionalHelp';

<Control orientation="inline" validationState="danger">
  <Label htmlFor="dropdown-2">Choose your favorite vehicle</Label>
  <Dropdown id="dropdown-2" aria-describedby="dropdown-2-help">
    <option value="">--</option>
    <option value="car">Car</option>
    <option value="truck">Truck</option>
    <option value="suv">SUV</option>
    <option disabled value="atv">ATV</option>
    <option value="boat">Boat</option>
  </Dropdown>
  <AdditionalHelp id="dropdown-2-help">
    Here's some extra help!
  </AdditionalHelp>
</Control>
```
