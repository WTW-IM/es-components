```
<div>
  <Checkbox labelText="I am unchecked by default" />
  <Checkbox labelText="I am checked by default" initiallyChecked />
  <Checkbox labelText="I am disabled" disabled />
  <Checkbox labelText="I am checked and disabled" initiallyChecked disabled />
</div>
```

Passing a function will execute with the current selection status of the Checkbox.

```
function printIsChecked(isChecked) {
  console.log(`Is checked? ${isChecked}`);
}

<Checkbox labelText="Check the console when you check and uncheck me" checkedValueChanged={printIsChecked} />
```