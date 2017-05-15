The default date picker will start with current year and descend back 120 years. Selecting a date will run the passed ``daySelected`` function with the selected date as a parameter.

```
function daySelected(date) {
  document.getElementById('selected-date-ex-1').innerHTML = `You've selected <strong>${dateFormat(date, 'MMMM D, YYYY')}</strong>`;
}

<div className="datepicker-example">
  <DatePicker dateSelected={daySelected}  descentAmount={24} />

  <div id="selected-date-ex-1" className="datepicker-example__result" />
</div>
```

Setting the ``descentAmount`` to anything less than 12 with a ``startingSelectionMode`` of "month" will start the datepicker with the day selection and suppress the ability to select a month without using the Previous and Next buttons.

```
function daySelected(date) {
  document.getElementById('selected-date-ex-3').innerHTML = `You've selected <strong>${dateFormat(date, 'MMMM D, YYYY')}</strong>`;
}

<div className="datepicker-example">
  <DatePicker dateSelected={daySelected} startingSelectionMode="month" descentAmount={6} startingYear={2005} />

  <div id="selected-date-ex-3" className="datepicker-example__result" />
</div>
```

Setting the ``preSelectedDate`` will set the currently selected date.

```
function daySelected(date) {
  document.getElementById('selected-date-ex-4').innerHTML = `You've selected <strong>${dateFormat(date, 'MMMM D, YYYY')}</strong>`;
}

<div className="datepicker-example">
  <DatePicker dateSelected={daySelected} preselectedDate="1/13/1989" />

  <div id="selected-date-ex-4" className="datepicker-example__result" />
</div>
```

