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
import Control from '../../controls/Control';
import Label from '../../controls/label/Label';
import AdditionalHelp from '../../controls/AdditionalHelp';

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

### Date Ranges

```
import { addDays, isAfter } from 'date-fns';
import Control from '../../controls/Control';
import Label from '../../controls/label/Label';

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
import Control from '../../controls/Control';
import Label from '../../controls/label/Label';
import AdditionalHelp from '../../controls/AdditionalHelp';

function DatePickerExample() {
  const [selectedValue, setSelectedValue] = React.useState(null);
  function handleOnChange(date) {
    setSelectedValue(date);
  }
  return (
    <Control>
      <Label htmlFor="pick-a-date">Pick a Date</Label>
      <DatePicker
        id="pick-a-date"
        onChange={handleOnChange}
        selectedDate={selectedValue}
      />
      <AdditionalHelp>
        <small>Change the screen size to see the transformation.</small>
      </AdditionalHelp>
    </Control>
  )
}
<DatePickerExample />
```

### Suppress Date Picker

The `suppressDatepicker` prop allows for the suppression of the React DatePicker on desktop and Android mobile devices. This defaults to `false`.

```
import Control from '../../controls/Control';
import Label from '../../controls/label/Label';

function DatePickerExample() {
  const [selectedValue, setSelectedValue] = React.useState(null);
  function handleOnChange(date) {
    setSelectedValue(date);
  }
  return (
    <Control>
      <Label htmlFor="pick-a-date">Enter a Date</Label>
      <DatePicker
        id="pick-a-date"
        onChange={handleOnChange}
        selectedDate={selectedValue}
        suppressDatepicker
        placeholder="mm/dd/yyyy"
      />
    </Control>
  )
}
<DatePickerExample />
```

### Filter Dates

The `filterDate` prop accepts a function used to filter the available dates.

```
import { getDay } from 'date-fns';
import Control from '../../controls/Control';
import Label from '../../controls/label/Label';

function DatePickerExample() {
  const [selectedValue, setSelectedValue] = React.useState(null);
  function handleOnChange(date) {
    setSelectedValue(date);
  }
  function isWeekday(date) {
    const day = getDay(date);
    return day !== 0 && day !== 6
  }
  return (
    <Control>
      <Label htmlFor="weekday-only">No Weekends</Label>
      <DatePicker
        id="weekday-only"
        onChange={handleOnChange}
        selectedDate={selectedValue}
        filterDate={isWeekday}
        allowNativeDatepickerOnMobile={false}
      />
    </Control>
  )
}
<DatePickerExample />
```

### Include Dates (whitelist)

```
import { addDays } from 'date-fns';
import Control from '../../controls/Control';
import Label from '../../controls/label/Label';

function DatePickerExample() {
  const [selectedValue, setSelectedValue] = React.useState(null);
  function handleOnChange(date) {
    setSelectedValue(date);
  }
  return (
    <Control>
      <Label htmlFor="today-and-tomorrow">Today and Tomorrow</Label>
      <DatePicker
        id="today-and-tomorrow"
        onChange={handleOnChange}
        selectedDate={selectedValue}
        includeDates={[new Date(), addDays(new Date(), 1)]}
        allowNativeDatepickerOnMobile={false}
      />
    </Control>
  )
}
<DatePickerExample />
```

### Exclude Dates (blacklist)

```
import { subDays } from 'date-fns';
import Control from '../../controls/Control';
import Label from '../../controls/label/Label';

function DatePickerExample() {
  const [selectedValue, setSelectedValue] = React.useState(null);
  function handleOnChange(date) {
    setSelectedValue(date);
  }
  return (
    <Control>
      <Label htmlFor="not-today-nor-tomorrow">Not Today or Yesterday</Label>
      <DatePicker
        id="not-today-nor-tomorrow"
        onChange={handleOnChange}
        selectedDate={selectedValue}
        excludeDates={[new Date(), subDays(new Date(), 1)]}
        allowNativeDatepickerOnMobile={false} />
    </Control>
  )
}
<DatePickerExample />
```

### Child Content

```
import Control from '../../controls/Control';
import Label from '../../controls/label/Label';

function DatePickerExample() {
  const [selectedValue, setSelectedValue] = React.useState(null);
  function handleOnChange(date) {
    setSelectedValue(date);
  }
  return (
    <Control>
      <Label>Child Content</Label>
      <DatePicker
        onChange={handleOnChange}
        selectedDate={selectedValue}
        allowNativeDatepickerOnMobile={false}
      >
        <div style={{textAlign: 'center', padding: '8px', clear: 'both', borderTop: '1px solid #aeaeae', backgroundColor: 'whitesmoke'}}><strong>Year: Home / End <br/> Month: PgUp / PgDn</strong></div>
      </DatePicker>
    </Control>
  )
}
<DatePickerExample />
```

### Inline (no textbox)

```
import Control from '../../controls/Control';
import Label from '../../controls/label/Label';

function DatePickerExample() {
  const [selectedValue, setSelectedValue] = React.useState(null);
  function handleOnChange(date) {
    setSelectedValue(date);
  }
  return (
    <Control>
      <Label>Inline Calendar</Label>
      <DatePicker
        inline
        onChange={handleOnChange}
        selectedDate={selectedValue}
        allowNativeDatepickerOnMobile={false}
      />
    </Control>
  )
}
<DatePickerExample />
```
