Based on <a href="https://hacker0x01.github.io/react-datepicker" target="blank">React-Datepicker</a> and supports most of the props documented there.

Passes props through to the TextBox component for additional functionality (for example: validationState).

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

### Events

The `DatePicker` component supports event handlers for `onChange`, `onBlur`, and `onChangeRaw`. The `onChange` event will return a Date object representing the selected date, and only fires when a valid date is selected. The `onBlur` and `onChangeRaw` events will return an event with the raw value of the input.

```
function handleOnChange(date) {
  console.log(`Date selected: ${date}`);
}

function handleOnChangeRaw(event) {
  console.log(`OnChangeRaw: ${event.target.value}`);
}

function handleOnBlur(event) {
  if (event) {
    console.log(`OnBlur: ${event.target.value}`)
  }
}

<DatePicker
  labelText="Pick a Date"
  additionalHelpContent={<small>View the console to see the events.</small>}
  onChange={handleOnChange}
  onChangeRaw={handleOnChangeRaw}
  onBlur={handleOnBlur}
/>
```

### Date Ranges

```
const addDays = require('date-fns/add_days');
const isAfter = require('date-fns/is_after');
class RangeExample extends React.Component {
  constructor() {
    this.state = { startDate: addDays(new Date(), -5), endDate: new Date()}
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeStart = this.handleChangeStart.bind(this);
    this.handleChangeEnd = this.handleChangeEnd.bind(this);
  }

  handleChange({ startDate, endDate }) {
    startDate = startDate || this.state.startDate
    endDate = endDate || this.state.endDate

    if (isAfter(startDate, endDate)) {
      var temp = startDate
      startDate = endDate
      endDate = temp
    }

    this.setState({ startDate, endDate })
  }

  handleChangeStart(startDate) {this.handleChange({ startDate })}

  handleChangeEnd(endDate) {this.handleChange({ endDate })}

  render() {
    return (
      <div style={{ display: 'flex', width: '70%', justifyContent: 'space-between' }}>
        <DatePicker
          labelText="Start Date"
          onChange={this.handleChangeStart}
          selectsStart
          startDate={this.state.startDate}
          endDate={this.state.endDate}
          selectedDate={this.state.startDate}
        />
        <DatePicker
          labelText="End Date"
          onChange={this.handleChangeEnd}
          selectsEnd
          startDate={this.state.startDate}
          endDate={this.state.endDate}
          selectedDate={this.state.endDate}
        />
      </div>
    )
  }
}
<RangeExample />
```

### Filter Dates

The `filterDate` prop accepts a function used to filter the available dates.

```
const getDay = require('date-fns/get_day');

function isWeekday(date) {
  const day = getDay(date);
  return day !== 0 && day !== 6
}

<DatePicker labelText="No Weekends" onChange={()=>{}} filterDate={isWeekday} />
```

### Include Dates (whitelist)

```
const addDays = require('date-fns/add_days');
<DatePicker labelText="Today and Tomorrow" onChange={()=>{}} includeDates={[new Date(), addDays(new Date(), 1)]} />
```

### Exclude Dates (blacklist)

```
const addDays = require('date-fns/add_days');
<DatePicker labelText="Not Today or Yesterday" onChange={()=>{}} excludeDates={[new Date(), addDays(new Date(), -1)]} />
```

### Child Content

```
<DatePicker labelText="Child Content" onChange={()=>{}}>
  <div style={{textAlign: 'center', padding: '8px', clear: 'both', borderTop: '1px solid #aeaeae', backgroundColor: 'whitesmoke'}}><strong>Year: Home / End <br/> Month: PgUp / PgDn</strong></div>
</DatePicker>
```
