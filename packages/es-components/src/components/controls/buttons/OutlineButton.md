Additional props supplied to the OutlineButton component will be passed to the underlying button element.

### OutlineButton Style Types

```javascript
const buttonStyle = {
  margin: '0 5px 15px 0'
};

function noop() { }

<div aria-live="polite">
  <OutlineButton style={buttonStyle} onClick={noop}>Default</OutlineButton>
  <OutlineButton style={buttonStyle} onClick={noop} styleType="primary">Primary</OutlineButton>
  <OutlineButton style={buttonStyle} onClick={noop} styleType="success">Success</OutlineButton>
  <OutlineButton style={buttonStyle} onClick={noop} styleType="info">Information</OutlineButton>
  <OutlineButton style={buttonStyle} onClick={noop} styleType="warning">Warning</OutlineButton>
  <OutlineButton style={buttonStyle} onClick={noop} styleType="danger">Danger</OutlineButton>
  <OutlineButton style={buttonStyle} onClick={noop} styleType="magenta">Magenta</OutlineButton>
  <OutlineButton style={buttonStyle} onClick={noop} styleType="violet">Violet</OutlineButton>
</div>
```
