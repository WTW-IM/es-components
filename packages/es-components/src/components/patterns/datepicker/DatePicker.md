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
const Control = require('../../controls/Control').default;
const AdditionalHelp = require('../../controls/AdditionalHelp').default;

function handleOnChange(date) {
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

<Control>
  <Label>Pick a Date</Label>
  <DatePicker
    onChange={handleOnChange}
    onChangeRaw={handleOnChangeRaw}
    onBlur={handleOnBlur}
    allowNativeDatepickerOnMobile={false}
  />
  <AdditionalHelp>
    <small>View the console to see the events.</small>
  </AdditionalHelp>
</Control>
```

### Date Ranges

```
const addDays = require('date-fns/add_days');
const isAfter = require('date-fns/is_after');

const Control = require('../../controls/Control').default;

function RangeExample() {
  const currentDate = new Date();
  const [range, setRange] = React.useState({ startDate: addDays(currentDate, -5), endDate: currentDate });

  function handleChange({ startDate, endDate }) {
    startDate = startDate || range.startDate
    endDate = endDate || range.endDate

    if (isAfter(startDate, endDate)) {
      var temp = startDate
      startDate = endDate
      endDate = temp
    }

    setRange({ startDate, endDate })
  }

  function handleChangeStart(startDate) {
    handleChange({ startDate })
  }

  function handleChangeEnd(endDate) {
    handleChange({ endDate })
  }

  return (
    <div style={{ display: 'flex', width: '70%', justifyContent: 'space-between' }}>
      <Control>
        <Label htmlFor="range-start-date">Start Date</Label>
        <DatePicker
          id="range-start-date"
          onChange={handleChangeStart}
          selectsStart
          startDate={range.startDate}
          endDate={range.endDate}
          selectedDate={range.startDate}
          allowNativeDatepickerOnMobile={false}
        />
      </Control>
      <Control>
        <Label htmlFor="range-end-date">End Date</Label>
        <DatePicker
          id="range-end-date"
          onChange={handleChangeEnd}
          selectsEnd
          startDate={range.startDate}
          endDate={range.endDate}
          selectedDate={range.endDate}
          allowNativeDatepickerOnMobile={false}
        />
      </Control>
    </div>
  )
};

<RangeExample />
```

### Native Mobile Date Picker

The `allowNativeDatepickerOnMobile` prop allows for the substitution of the React DatePicker with the
native one on mobile devices. This defaults to `true`.

```
const Control = require('../../controls/Control').default;
const AdditionalHelp = require('../../controls/AdditionalHelp').default;

<Control>
  <Label htmlFor="pick-a-date">Pick a Date</Label>
  <DatePicker id="pick-a-date" onChange={()=>{}} />
  <AdditionalHelp>
    <small>Change the screen size to see the transformation.</small>
  </AdditionalHelp>
</Control>
```

### Filter Dates

The `filterDate` prop accepts a function used to filter the available dates.

```
const getDay = require('date-fns/get_day');

const Control = require('../../controls/Control').default;


function isWeekday(date) {
  const day = getDay(date);
  return day !== 0 && day !== 6
}

<Control>
  <Label htmlFor="weekday-only">No Weekends</Label>
  <DatePicker id="weekday-only" onChange={()=>{}} filterDate={isWeekday}  allowNativeDatepickerOnMobile={false} />
</Control>
```

### Include Dates (whitelist)

```
const addDays = require('date-fns/add_days');

const Control = require('../../controls/Control').default;

<Control>
  <Label htmlFor="today-and-tomorrow">Today and Tomorrow</Label>
  <DatePicker id="today-and-tomorrow" onChange={()=>{}} includeDates={[new Date(), addDays(new Date(), 1)]} allowNativeDatepickerOnMobile={false} />
</Control>
```

### Exclude Dates (blacklist)

```
const addDays = require('date-fns/add_days');

const Control = require('../../controls/Control').default;

<Control>
  <Label htmlFor="not-today-nor-tomorrow">Not Today or Yesterday</Label>
  <DatePicker id="not-today-nor-tomorrow" onChange={()=>{}} excludeDates={[new Date(), addDays(new Date(), -1)]}  allowNativeDatepickerOnMobile={false} />
</Control>
```

### Child Content

```
const Control = require('../../controls/Control').default;

<Control>
  <Label>Child Content</Label>
  <DatePicker onChange={()=>{}} allowNativeDatepickerOnMobile={false}>
    <div style={{textAlign: 'center', padding: '8px', clear: 'both', borderTop: '1px solid #aeaeae', backgroundColor: 'whitesmoke'}}><strong>Year: Home / End <br/> Month: PgUp / PgDn</strong></div>
  </DatePicker>
</Control>
```
