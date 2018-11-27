Any additional props passed to the Button component will get passed to the HTML button element.

## Button Style Types

```
const buttonStyle = {
  display: 'inline-block',
  margin: '10px 15px 0 0'
};

<div>
  <div style={buttonStyle}><Button>Default</Button></div>

  <div style={buttonStyle}><Button styleType="darkDefault">Dark Default</Button></div>

  <div style={buttonStyle}><Button styleType="primary">Primary</Button></div>

  <div style={buttonStyle}><Button styleType="success">Success</Button></div>

  <div style={buttonStyle}><Button styleType="info">Information</Button></div>

  <div style={buttonStyle}><Button styleType="warning">Warning</Button></div>

  <div style={buttonStyle}><Button styleType="danger">Danger</Button></div>
</div>
```

## Button sizes

Including a size will set buttons to a specific size

```
const wrapperStyle = {
  marginBottom: '15px'
};

const buttonStyle = {
  marginRight: '15px'
};

<div>
  <div style={wrapperStyle}>
    <Button size="lg" style={buttonStyle} styleType="primary">Large</Button>
    <Button size="lg" style={buttonStyle}>Large</Button>
    <OutlineButton size="lg" style={buttonStyle} styleType="magenta">Large</OutlineButton>
  </div>

  <div style={wrapperStyle}>
    <Button style={buttonStyle} styleType="primary">Default</Button>
    <Button style={buttonStyle}>Default</Button>
    <OutlineButton style={buttonStyle} styleType="magenta">Default</OutlineButton>
  </div>

  <div style={wrapperStyle}>
    <Button size="sm" style={buttonStyle} styleType="primary">Small</Button>
    <Button size="sm" style={buttonStyle}>Small</Button>
    <OutlineButton size="sm" style={buttonStyle} styleType="magenta">Small</OutlineButton>
  </div>

  <div style={wrapperStyle}>
    <Button size="xs" style={buttonStyle} styleType="primary">Extra Small</Button>
    <Button size="xs" style={buttonStyle}>Extra Small</Button>
    <OutlineButton size="xs" style={buttonStyle} styleType="magenta">Extra Small</OutlineButton>
  </div>
</div>
```

Setting the `block` property will force the button to expand to the width of it's parent container.

```
const buttonContainerStyle = {
  width: '300px',
  padding: '10px',
  backgroundColor: '#ddd',
  border: '1px solid #444'
};

<div style={buttonContainerStyle}>
  <Button block styleType="primary">Block button</Button>
</div>
```

Any additional prop sent will be included on the button. For example, setting the `disabled` property will put the button into a disabled state, making it unclickable.

```
const buttonStyle = {
  display: 'inline-block',
  margin: '10px 15px 0 0'
};

<div>
  <div style={buttonStyle}><Button disabled>Default</Button></div>

  <div style={buttonStyle}><Button styleType="primary" disabled>Primary</Button></div>

  <div style={buttonStyle}><Button isOutline styleType="success" disabled>Success</Button></div>

  <div style={buttonStyle}><Button styleType="info" disabled>Information</Button></div>

  <div style={buttonStyle}><Button styleType="warning" disabled>Warning</Button></div>

  <div style={buttonStyle}><Button styleType="danger" disabled>Danger</Button></div>

  <div style={buttonStyle}><Button styleType="primary" isLinkButton disabled>Link</Button></div>
</div>
```
