The datepicker will be displayed when the textbox is clicked or focused on. The ``DatePickerTextbox`` component can be passed an object with props that will propagate to the ``DatePicker`` component.

```
const datePickerProps = {
  startingYear: 1995
};

<DatePickerTextbox labelText="Birth Date" datePickerProps={datePickerProps} />
```

When a date is already selected, it will set the DatePicker to that particular date.
```
<DatePickerTextbox labelText="Birth Date" preselectedDate="1/21/1983" />
```

When the textbox loses focus, it will run the passed in ``dateSelected`` function with the date formatted properly if it is a valid date:

```
function displayDate(date) {
  document.getElementById('date-selected').innerHTML = `You selected <strong>${date}</strong>.`;
}

<div>
  <DatePickerTextbox labelText="Birth date" dateSelected={displayDate} />
  <div id="date-selected" />
</div>
```