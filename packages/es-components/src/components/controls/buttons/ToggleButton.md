A simple button that maintains the "depressed" state/display when clicked.

```
function noop() { }
<div>
  <span style={{marginRight: '15px'}}>
    <ToggleButton size="lg" styleType="primary" onClick={noop}>Toggle Me!</ToggleButton>
  </span>
  <ToggleButton styleType="success" isOutline onClick={noop}>Toggle Me!</ToggleButton>
</div>
```
