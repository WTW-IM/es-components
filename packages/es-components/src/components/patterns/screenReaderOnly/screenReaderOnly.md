This higher-order component allows components to be hidden from the user while being
accessible to screen readers.

```
const Hidden = screenReaderOnly('p');

<div>
  <p>I have hidden text below</p>
  <Hidden>I am hiding</Hidden>
</div>
```
