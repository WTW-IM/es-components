The Textarea component will accept typical textarea attributes as props such as rows, cols, onChange, onBlur, value, etc.
The `rows` prop will work normally but `cols` does not when using the default stacked orientation (due to flexbox). Simply set the width by styling if required.

```
const Control = require('../Control').default;

<>
  <Control>
    <Label htmlFor="stacked">Stacked</Label>
    <Textarea rows="6" id="stacked" className="custom-class" />
  </Control>

  <Control orientation="inline">
    <Label htmlFor="inline">Inline</Label>
    <Textarea id="inline" rows="4" cols="25" />
  </Control>
</>
```

### Validation states

Validation states are driven from the `Control` component.

```
const Control = require('../Control').default;
const AdditionalHelp = require('../AdditionalHelp').default;

<>
  <Control validationState="success">
    <Label htmlFor="success">Success</Label>
    <Textarea id="success" aria-describedby="success-help" />
    <AdditionalHelp id="success-help">When validationState is set to success</AdditionalHelp>
  </Control>

  <Control validationState="warning">
    <Label htmlFor="warning">Warning</Label>
    <Textarea id="warning" aria-describedby="warning-help" />
    <AdditionalHelp id="warning-help">When validationState is set to warning</AdditionalHelp>
  </Control>

  <Control validationState="danger">
    <Label htmlFor="danger">Danger</Label>
    <Textarea id="danger" aria-describedby="danger-help" />
    <AdditionalHelp id="danger-help">When validationState is set to danger</AdditionalHelp>
  </Control>
</>
```
