A date of birth input that renders a masked input on desktop, and the native
`input type='date'` in mobile viewports. Because of the mixed controls, the
onChange value is a string (_yyyy-mm-dd_ when valid) that can be parsed with
`date-fns` functions.

```
const Control = require('../../controls/Control').default;
const AdditionalHelp = require('../../controls/AdditionalHelp').default;
const isValid = require('date-fns/is_valid');
const parse = require('date-fns/parse');
const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

function DobExample() {
  const [birthDate, setBirthDate] = React.useState('');
  const [validation, setValidation] = React.useState();
  const [validDate, setValidDate] = React.useState();

  function handleOnChange(date) {
    setBirthDate(date);
    console.log(`Date selected: ${date}`);
  }

  function handleOnBlur(event) {
    const date = event.target.value;
    if (!!date && isValid(parse(date))) {
      setValidation('success');
      setValidDate(parse(date));
    } else {
      setValidation('danger');
    }
  }

  return (
    <Control validationState={validation}>
      <Label htmlFor="test-dob">Enter Date of Birth</Label>
      <DateOfBirth
        id="test-dob"
        name="birthdate"
        onChange={handleOnChange}
        onBlur={handleOnBlur}
        value={birthDate}
      />
      <AdditionalHelp>
        <span>{validDate && `You were born: ${validDate.toLocaleDateString("en-US", options)}`}</span>
      </AdditionalHelp>
    </Control>
  );
}

<DobExample />
```

Slightly simpler uncontrolled example (the value is not persisted between desktop and mobile views)

```
const Control = require('../../controls/Control').default;
const AdditionalHelp = require('../../controls/AdditionalHelp').default;
const isValid = require('date-fns/is_valid');
const parse = require('date-fns/parse');
const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

function DobExample() {
  const [validation, setValidation] = React.useState();
  const [validDate, setValidDate] = React.useState();

  function handleOnBlur(event) {
    const date = event.target.value;
    if (!!date && isValid(parse(date))) {
      setValidation('success');
      setValidDate(parse(date));
    } else {
      setValidation('danger');
    }
  }

  return (
    <Control validationState={validation}>
      <Label htmlFor="test-dob">Enter Date of Birth</Label>
      <DateOfBirth
        id="test-dob"
        name="birthdate"
        onBlur={handleOnBlur}
      />
      <AdditionalHelp>
        <span>{validDate && `You were born: ${validDate.toLocaleDateString("en-US", options)}`}</span>
      </AdditionalHelp>
    </Control>
  );
}

<DobExample />
```
