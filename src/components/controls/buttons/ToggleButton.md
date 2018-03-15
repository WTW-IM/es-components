
## Toggle Button

A simple button that maintains the "depressed" state/display when clicked.

```
function noop() { }
<div>
  <span style={{marginRight: '15px'}}><ToggleButton styleType="primary" handleOnClick={noop}>Toggle Me!</ToggleButton></span>
  <ToggleButton styleType="primary" isOutline handleOnClick={noop}>Toggle Me!</ToggleButton>
</div>
```
