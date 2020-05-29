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
    onClick={alertButtonValues}>First Button</DropdownButton.Button>
  <DropdownButton.Button
    name="second"
    onClick={alertButtonValues}>Second Button</DropdownButton.Button>
  <DropdownButton.Button
    name="third"
    onClick={alertButtonValues}>Third Button</DropdownButton.Button>
</DropdownButton>
```

In some cases you may want to update the text on the drop down with the last clicked button in the panel if this is the case pass the `shouldUpdateButtonValue` prop.

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
    onClick={alertButtonValues}>First Button</DropdownButton.Button>
  <DropdownButton.Button
    name="second"
    onClick={alertButtonValues}>Second Button</DropdownButton.Button>
  <DropdownButton.Button
    name="third"
    onClick={alertButtonValues}>Third Button</DropdownButton.Button>
</DropdownButton>
```

```
const logValue = (event, name) => {
  alert("Button Key is: " + name);
}

<>
  Putting it inline will work
  <DropdownButton
    buttonValue='Dropdown'
    shouldUpdateButtonValue
    shouldCloseOnButtonClick
    inline
  >
    <DropdownButton.Button
      name="first"
      onClick={logValue}>First Button</DropdownButton.Button>
    <DropdownButton.Button
      name="second"
      onClick={logValue}>Second Button</DropdownButton.Button>
    <DropdownButton.Button
      name="third"
      onClick={logValue}>Third Button</DropdownButton.Button>
  </DropdownButton> as well.
</>
```
