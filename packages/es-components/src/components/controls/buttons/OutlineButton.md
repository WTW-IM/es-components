Additional props passed to the OutlineButton component will be passed to the underlying button element.

## OutlineButton Style Types

```
const buttonStyle = {
  display: 'inline-block',
  margin: '10px 15px 0 0'
};

function noop() { }

<div>
  <div style={buttonStyle}><OutlineButton handleOnClick={noop}>Default</OutlineButton></div>

  <div style={buttonStyle}><OutlineButton handleOnClick={noop} styleType="primary">Primary</OutlineButton></div>

  <div style={buttonStyle}><OutlineButton handleOnClick={noop} styleType="success">Success</OutlineButton></div>

  <div style={buttonStyle}><OutlineButton handleOnClick={noop} styleType="info">Information</OutlineButton></div>

  <div style={buttonStyle}><OutlineButton handleOnClick={noop} styleType="warning">Warning</OutlineButton></div>

  <div style={buttonStyle}><OutlineButton handleOnClick={noop} styleType="danger">Danger</OutlineButton></div>
</div>
```
