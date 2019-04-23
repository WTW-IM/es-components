Using the `onChange` callback returns an object:

```html
{
  value: [Date | undefined]
  isInRange: [true | false]
}
```

The `value` is a Date created from the combined inputs. The `value` is `undefined` when the date is invalid.
`isInRange` is provided for validation help.

`DateInput` also accepts an array of month names for localization support.

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
      <DateInput id="someDate" name="someDate" onChange={handleChange} onBlur={handleOnBlur} />
      <AdditionalHelp>
        <span>{myDate && `You entered: ${myDate.toLocaleDateString("en-US", options)}`}</span>
      </AdditionalHelp>
    </Control>
  );
}

<DateInputExample />
```

You can set the value of the component with `defaultValue`.

```
<DateInput defaultValue={new Date()} onChange={()=>{}} />
```

### Min and Max dates

Use `minDate` and `maxDate` to set restrictions on valid dates.

```
const Control = require('../../controls/Control').default;
const AdditionalHelp = require('../../controls/AdditionalHelp').default;

function DateInputExample() {
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const [myDate, setMyDate] = React.useState();
  const [validation, setValidation] = React.useState();

  function handleChange(date) {
    console.log(date);
    setMyDate(date);
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
      />
      <AdditionalHelp>
        <span>{myDate &&
                (myDate.isInRange
                  ? `You entered: ${myDate.value.toLocaleDateString("en-US", options)}`
                  : validation && 'The date you entered is outside the valid range.')}</span>
      </AdditionalHelp>
    </Control>
  );
}

<DateInputExample />
```

### Display

Use `includeDay` to toggle the Day portion of the date input.

```
<DateInput id="anotherDate" includeDay={false} onChange={()=>{}} />
```

You can rearrange the inputs by providing a `dateOrder` prop with a "mdy" string.

```
const Control = require('../../controls/Control').default;

<Control>
  <Label htmlFor="orderDate">Enter a Date</Label>
  <DateInput id="orderDate" defaultValue={new Date()} dateOrder="dmy" onChange={()=>{}} />
</Control>
```
