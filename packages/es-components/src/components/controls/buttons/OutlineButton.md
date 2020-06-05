Additional props supplied to the OutlineButton component will be passed to the underlying button element.

### OutlineButton Style Types

```
const buttonStyle = {
  display: 'inline-block',
  margin: '0 5px 15px 0'
};

function noop() { }

<div>
  <div style={buttonStyle}><OutlineButton onClick={noop}>Default</OutlineButton></div>

  <div style={buttonStyle}><OutlineButton onClick={noop} styleType="primary">Primary</OutlineButton></div>

  <div style={buttonStyle}><OutlineButton onClick={noop} styleType="success">Success</OutlineButton></div>

  <div style={buttonStyle}><OutlineButton onClick={noop} styleType="info">Information</OutlineButton></div>

  <div style={buttonStyle}><OutlineButton onClick={noop} styleType="warning">Warning</OutlineButton></div>

  <div style={buttonStyle}><OutlineButton onClick={noop} styleType="danger">Danger</OutlineButton></div>

  <div style={buttonStyle}><OutlineButton onClick={noop} styleType="magenta">Magenta</OutlineButton></div>

  <div style={buttonStyle}><OutlineButton onClick={noop} styleType="violet">Violet</OutlineButton></div>
</div>
```
