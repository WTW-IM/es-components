Keyboard support

* Left: Move to the previous day
* Right: Move to the next day
* Up: Move to the previous week
* Down: Move to the next week
* PgUp: Move to the previous month
* PgDn: Move to the next month
* Home: Move to the previous year
* End: Move to the next year
* Enter/Esc/Tab: Close the calendar

```
function handleOnChange(date) {
  console.log(`Date selected: ${date}`);
}

function handleOnChangeRaw(event) {
  console.log(`Input value: ${event.target.value}`);
}

<DatePicker labelText="Pick a Date" onChange={handleOnChange} onChangeRaw={handleOnChangeRaw} />
```
