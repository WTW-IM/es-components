Use a `Tooltip` component to display a small hover tip over content.

### Basic Tooltip:
```
<div>Hover over <Tooltip name="tip1" content="This is the tooltip"><span>this text</span></Tooltip> to see the tooltip in action.</div>
```

### Tooltip with HTML:
```
<div>Hover over <Tooltip name="tip2" content={<span>This contains <em>some</em> <strong>HTML</strong></span>} position="left"><span>this text</span></Tooltip> to see the tooltip in action.</div>
```
