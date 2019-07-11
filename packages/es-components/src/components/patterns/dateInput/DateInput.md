Using the `onChange` callback returns an object:

```html
{
  value: [Date | undefined]
  isInRange: [true | false]
}
```

The `value` is a Date created from the combined inputs. The `value` is `undefined` when the date is invalid.
`isInRange` is provided for validation help.

`DateInput.Month` also accepts an array of month names (`monthName` prop) for localization support.

```
const Control = require('../../controls/Control').default;
const AdditionalHelp = require('../../controls/AdditionalHelp').default;

function DateInputExample() {
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const [myDate, setMyDate] = React.useState();
  const [validation, setValidation] = React.useState();

  function handleChange(date) {
    console.log(date);
    setMyDate(date.value);
  }

  function handleOnBlur() {
    setValidation(myDate ? 'success' : 'danger');
  }

  return (
    <Control validationState={validation}>
      <Label htmlFor="someDate">Enter a Date</Label>
      <DateInput id="someDate" name="someDate" onChange={handleChange} onBlur={handleOnBlur}>
        <DateInput.Month monthNames={['01 - Jan', '02 - Feb', '03 - Mar']} />
        <DateInput.Day />
        <DateInput.Year />
      </DateInput>
      <AdditionalHelp>
        {myDate && <span>You entered: {myDate.toLocaleDateString("en-US", options)}</span>}
      </AdditionalHelp>
    </Control>
  );
}

<DateInputExample />
```

You can set the value of the component with `defaultValue`.

```
<DateInput defaultValue={new Date()} onChange={()=>{}}>
  <DateInput.Month name="month" />
  <DateInput.Day name="day" />
  <DateInput.Year name="year" />
</DateInput>
```

### Min and Max dates

Use `minDate` and `maxDate` to set restrictions on valid dates.

```
const Control = require('../../controls/Control').default;
const AdditionalHelp = require('../../controls/AdditionalHelp').default;

function DateInputExample() {
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const [myDate, setMyDate] = React.useState();
  const [validation, setValidation] = React.useState('default');

  function handleChange(date) {
    console.log(date);
    setMyDate(date);
    setValidation('default');
  }

  function handleOnBlur() {
    setValidation(myDate && myDate.isInRange ? 'success' : 'danger');
  }

  return (
    <Control validationState={validation}>
      <Label htmlFor="demoDate">Enter a Date between 1900 and 2020</Label>
      <DateInput id="demoDate"
        onChange={handleChange}
        onBlur={handleOnBlur}
        minDate={new Date('1900/1/1')}
        maxDate={new Date('2020/1/1')}
      >
        <DateInput.Month />
        <DateInput.Day />
        <DateInput.Year />
      </DateInput>
      <AdditionalHelp>
        <span>{myDate && myDate.isInRange
                  ? `You entered: ${myDate.value.toLocaleDateString("en-US", options)}`
                  : validation !== 'default' && 'The date you entered is outside the valid range.'}</span>
      </AdditionalHelp>
    </Control>
  );
}

<DateInputExample />
```

### Display

You may omit Month and/or Day, but Year is required.

```
<DateInput id="anotherDate" onChange={()=>{}}>
  <DateInput.Month />
  <DateInput.Year />
</DateInput>
```

Year, Month, and Day will display in the order you provide them.

```
const Control = require('../../controls/Control').default;

<Control>
  <Label htmlFor="orderDate">Enter a Date</Label>
  <DateInput id="orderDate" defaultValue={new Date()} onChange={()=>{}}>
    <DateInput.Year />
    <DateInput.Month />
    <DateInput.Day />
  </DateInput>
</Control>
```
