`AdditionalHelp` is used to show extra information you may want to display, usually in conjunction with an input control.
Used within a `Control`, it will recieve validation state styling and display an icon (supressed with the `hasValidationIcon` prop).

Don't forget to use `aria-describedby` on your input to associate it with your `AdditionalHelp` text!

```
const Control = require('./Control').default;
const AdditionalHelp = require('./AdditionalHelp').default;

<>
  <Control validationState="success">
    <Label htmlFor="ah-success">Success</Label>
    <Textbox id="ah-success" aria-describedby="ah-success-help" />
    <AdditionalHelp id="ah-success-help" hasValidationIcon={false}>Here is some additional help text, without an icon</AdditionalHelp>
  </Control>

  <Control validationState="danger">
    <Label htmlFor="ah-danger">Danger</Label>
    <Textbox id="ah-danger" aria-describedby="ah-danger-help" />
    <AdditionalHelp id="ah-danger-help">Here is some more additional help text, with an icon</AdditionalHelp>
  </Control>
</>
```
