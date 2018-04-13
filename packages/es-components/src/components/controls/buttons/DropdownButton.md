
```
const alertButtonValues = (event, key) => {
  alert("Button Key is: " + key)
}

<DropdownButton 
  buttonValue='Dropdown'
  shouldCloseOnButtonClick
  rootClose>
  <DropdownButton.Button
    name="first"
    styleType="link" 
    handleOnClick={alertButtonValues}>First Button</DropdownButton.Button>
  <DropdownButton.Button
    name="second"
    styleType="link" 
    handleOnClick={alertButtonValues}>Second Button</DropdownButton.Button>
  <DropdownButton.Button
    name="third"
    styleType="link" 
    handleOnClick={alertButtonValues}>Third Button</DropdownButton.Button>
</DropdownButton>

```

In some cases you may want to update the the text on the drop down with the last clicked button in the panel if this is the case pass the `shouldUpdateButtonValue` prop.

```
const alertButtonValues = (event, name) => {
  alert("Button Key is: " + name);
}

<DropdownButton 
  buttonValue='Dropdown'
  shouldUpdateButtonValue
  shouldCloseOnButtonClick>
  <DropdownButton.Button
    name="first"
    styleType="link" 
    handleOnClick={alertButtonValues}>First Button</DropdownButton.Button>
  <DropdownButton.Button
    name="second"
    styleType="link" 
    handleOnClick={alertButtonValues}>Second Button</DropdownButton.Button>
  <DropdownButton.Button
    name="third"
    styleType="link" 
    handleOnClick={alertButtonValues}>Third Button</DropdownButton.Button>
</DropdownButton>
```