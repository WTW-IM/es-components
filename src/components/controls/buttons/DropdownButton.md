
```
function noop() { }
const buttons = [
  {key: 'first', buttonValue: 'First Button'},
  {key: 'second', buttonValue: 'Second Button'},
  {key: 'third', buttonValue: 'Third Button'}
];

const alertButtonValues = (button) => {
  alert("Button Key: " + button.key);
}

<DropdownButton 
  buttonValue='Dropdown'
  dropdownItems={buttons}
  onDropdownItemClick={alertButtonValues} 
  shouldCloseOnButtonClick/>
```

In some cases you may want to update the the text on the drop down with the last clicked button in the panel if this is the case pass the `shouldUpdateButtonValue` prop.

```
function noop() { }
const buttons = [
  {key: 'first', buttonValue: 'First Button'},
  {key: 'second', buttonValue: 'Second Button'},
  {key: 'third', buttonValue: 'Third Button'}
];

const alertButtonValues = (button) => {
  alert("Button Key: " + button.key);
}

<DropdownButton 
  buttonValue='Dropdown'
  dropdownItems={buttons}
  onDropdownItemClick={alertButtonValues} 
  shouldUpdateButtonValue
  shouldCloseOnButtonClick/>
```