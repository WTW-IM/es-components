Control components are used to manage form inputs. There are several components for composing controls with the same look and feel.

<a href="https://8lf1uv.axshare.com/#id=mjvdz7&p=incomplete_fields&dp=0&g=1" target="blank"><div style="color:#cc0000;text-transform:uppercase;margin:1em 0;">View Error Pattern Examples</div></a>

## Control

A `Control` should be used to wrap individual form controls. The `orientation` prop has two possible values (`stacked` and `inline`) to control how to display the label in correlation to the control. This does not affect `Checkbox` and `RadioButton` controls individually because those labels should always appear next to their respective control. The `validationState` prop affects the coloring of elements within the `Control`. The possible values for `validationState` are `default`, `success`, `danger`, and `warning`.

The examples below use the `Control` component to demonstrate these various options.

## AdditionalHelp

An `AdditionalHelp` component can be used to provide more context for a control. It will inherit text color from its parent `Control` component.

## Composed Example

Here is an example of a composed form using the elements above.

```jsx
import Control from './Control';
import Label from './label/Label';
import Textbox from './textbox/Textbox';
import AdditionalHelp from './AdditionalHelp';

function FormExample() {
  const [name, setName] = React.useState();

  function handleNameChange(event) {
    setName(event.target.value);
  }

  return (
    <>
      <Control>
        <Label htmlFor="my-form-example">First Name</Label>
        <Textbox id="my-form-example" onBlur={handleNameChange} />
        <AdditionalHelp>
          The name below will update when the textbox loses focus.
        </AdditionalHelp>
      </Control>
      <div>Name: {name}</div>
    </>
  );
}

<FormExample />;
```
