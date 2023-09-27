The Textbox component will accept typical input attributes as props such as onChange, onBlur, value, placeholder, etc.

```javascript
import Control from '../Control';
import Label from '../label/Label';

const refCb = React.useCallback(ref => console.log('textbox', ref), []);

<>
  <Control>
    <Label htmlFor="stacked">Stacked</Label>
    <Textbox ref={refCb} id="stacked" className="custom-class" />
  </Control>

  <Control orientation="inline">
    <Label htmlFor="inline">Inline</Label>
    <Textbox id="inline" />
  </Control>

  <Control>
    <Label htmlFor="stacked">Stacked Flat-Style</Label>
    <Textbox id="stacked" flat className="custom-class" />
  </Control>

  <Control orientation="inline">
    <Label htmlFor="inline">Inline Flat-Style</Label>
    <Textbox id="inline" flat />
  </Control>
</>;
```

Pass an `onChange` function to execute any time the input box value changes. This function will have the current value of the input box passed to it. The following is a simple controlled example, where state is handled outside the component. (See [Controlled Components](https://facebook.github.io/react/docs/htmlForms.html#controlled-components) and [Uncontrolled Components](https://facebook.github.io/react/docs/uncontrolled-components.html).)

```
import Control from '../Control';
import Label from '../label/Label';

function TextboxExample() {
  const [value, setValue] = React.useState('')

  function handleOnTextChange(event) {
    console.log(event.target.value)
    setValue(event.target.value)
  }

  return (
    <Control>
      <Label htmlFor="controlled-example">Controlled Example</Label>
      <Textbox
        id="controlled-example"
        value={value}
        onChange={handleOnTextChange}
      />
    </Control>
  )
};

<TextboxExample />
```

Pass an `onBlur` function to execute when the text box loses focus. This function will have the current value of the input passed to it. To provide a default value in an uncontrolled `Textbox` component, use `defaultValue`.

```
import Control from '../Control';
import Label from '../label/Label';

function handleOnBlur(event) {
  if(event.target.value.length > 0) {
    confirm(`You entered ${event.target.value}. Is that correct?`);
  }
}

<Control>
  <Label htmlFor="first-name">First name</Label>
  <Textbox
    id="first-name"
    defaultValue="Default"
    onBlur={handleOnBlur}
  />
</Control>
```

### Validation states

Validation states are driven from the `Control` component.

<a href="https://8lf1uv.axshare.com/#id=mjvdz7&p=incomplete_fields&dp=0&g=1" target="blank"><div style="color:#cc0000;text-transform:uppercase;margin-bottom:1em;">View Error Pattern Examples</div></a>

```
import Control from '../Control';
import Label from '../label/Label';
import AdditionalHelp from '../AdditionalHelp';

<>
  <Control validationState="success">
    <Label htmlFor="success">Success</Label>
    <Textbox id="success" aria-describedby="success-help" />
    <AdditionalHelp id="success-help">When validationState is set to success</AdditionalHelp>
  </Control>

  <Control validationState="warning">
    <Label htmlFor="warning">Warning</Label>
    <Textbox id="warning" aria-describedby="warning-help" />
    <AdditionalHelp id="warning-help">When validationState is set to warning</AdditionalHelp>
  </Control>

  <Control validationState="danger">
    <Label htmlFor="danger">Danger</Label>
    <Textbox id="danger" aria-describedby="danger-help" />
    <AdditionalHelp id="danger-help">When validationState is set to danger</AdditionalHelp>
  </Control>
</>
```

### Appending and Prepending text

Provide an `appendText` or `prependText` prop htmlFor appending and prepending inputs. Validation state colorings will also be applied.

```
import Control from '../Control';
import Label from '../label/Label';

<>
  <Control>
    <Label htmlFor="appended">Appended</Label>
    <Textbox
      id="appended"
      appendIconName="calendar"
    />
  </Control>

  <Control>
    <Label htmlFor="prepended">Prepended</Label>
    <Textbox
      id="prepended"
      prependIconName="phone"
    />
  </Control>

  <Control>
    <Label htmlFor="both">Appended and prepended</Label>
    <Textbox
      id="both"
      appendIconName="user"
      prependIconName="phone"
    />
  </Control>

  <Control validationState="success">
    <Label htmlFor="state-appended">Appended</Label>
    <Textbox
      id="state-appended"
      appendIconName="calendar"
    />
  </Control>

  <Control validationState="warning">
    <Label htmlFor="state-prepended">Prepended</Label>
    <Textbox
      id="state-prepended"
      prependIconName="phone"
    />
  </Control>

  <Control validationState="danger">
    <Label htmlFor="state-both">Appended and prepended</Label>
    <Textbox
      id="state-both"
      appendIconName="user"
      prependIconName="phone"
    />
  </Control>
</>
```

### Additional props

Other typical input attributes passed to `Textbox` are allowed. The react `autoFocus` property is also accepted.

```
import Control from '../Control';
import Label from '../label/Label';

<>
  <Control>
    <Label htmlFor="disabled">Disabled</Label>
    <Textbox
      id="disabled"
      defaultValue="John Doe"
      disabled
    />
  </Control>

  <Control>
    <Label htmlFor="readonly">Readonly</Label>
    <Textbox
      id="readonly"
      defaultValue="Jane Doe"
      readOnly
    />
  </Control>

  <Control>
    <Label htmlFor="placeholder">Placeholder</Label>
    <Textbox
      id="placeholder"
      placeholder="Placeholder is one of many input attributes"
    />
  </Control>
</>
```
