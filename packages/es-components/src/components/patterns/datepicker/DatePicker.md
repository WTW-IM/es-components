Based on <a href="https://hacker0x01.github.io/react-datepicker" target="blank">React-Datepicker</a> and supports most of the props documented there.

Props are passed props through to the TextBox component unless they belong to the set of React Datepicker props.

**Keyboard support**

- Left: Move to the previous day
- Right: Move to the next day
- Up: Move to the previous week
- Down: Move to the next week
- PgUp: Move to the previous month
- PgDn: Move to the next month
- Home: Move to the previous year
- End: Move to the next year
- Enter/Esc/Tab: Close the calendar
```
const Control = require('../../controls/Control').default;
const AdditionalHelp = require('../../controls/AdditionalHelp').default;

function DatePickerExample() {
  const [selectedValue, setSelectedValue] = React.useState(null);

  function handleOnChange(date) {
    setSelectedValue(date);
    console.log(`Date selected: ${date}`);
  }

  function handleOnChangeRaw(event) {
    console.log(`OnChangeRaw: ${event.target.value}`);
  }

  function handleOnBlur(event) {
    if (event) {
      console.log(`OnBlur: ${event.target.value}`);
    }
  }

  return (
    <Control>
      <Label>Pick a Date</Label>
      <DatePicker
        onChange={handleOnChange}
        onChangeRaw={handleOnChangeRaw}
        onBlur={handleOnBlur}
        selectedDate={selectedValue}
      />
      <AdditionalHelp>
        <small>View the console to see the events.</small>
      </AdditionalHelp>
    </Control>
  );
}

<DatePickerExample />
```
