Additional props supplied to the Button component will be passed to the underlying button element.

## Button Style Types

```
const buttonStyle = {
  margin: '10px 15px 0 0'
};

<div>
  <Button style={buttonStyle}>Default</Button>

  <Button styleType="darkDefault" style={buttonStyle}>Dark Default</Button>

  <Button styleType="primary" style={buttonStyle}>Primary</Button>

  <Button styleType="success" style={buttonStyle}>Success</Button>

  <Button styleType="info" style={buttonStyle}>Information</Button>

  <Button styleType="warning" style={buttonStyle}>Warning</Button>

  <Button styleType="danger" style={buttonStyle}>Danger</Button>
</div>
```

## Button sizes

Including a `size` will set buttons to a specific size.

```
import OutlineButton from './OutlineButton';

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
    <OutlineButton size="lg" style={buttonStyle} styleType="primary">Large</OutlineButton>
  </div>

  <div style={wrapperStyle}>
    <Button style={buttonStyle} styleType="primary">Default</Button>
    <Button style={buttonStyle}>Default</Button>
    <OutlineButton style={buttonStyle} styleType="primary">Default</OutlineButton>
  </div>

  <div style={wrapperStyle}>
    <Button size="sm" style={buttonStyle} styleType="primary">Small</Button>
    <Button size="sm" style={buttonStyle}>Small</Button>
    <OutlineButton size="sm" style={buttonStyle} styleType="primary">Small</OutlineButton>
  </div>

  <div style={wrapperStyle}>
    <Button size="xs" style={buttonStyle} styleType="primary">Extra Small</Button>
    <Button size="xs" style={buttonStyle}>Extra Small</Button>
    <OutlineButton size="xs" style={buttonStyle} styleType="primary">Extra Small</OutlineButton>
  </div>
</div>
```

Setting the `block` property will force the button to expand to the width of it's parent container. Buttons will default to `block` at the mobile breakpoint.

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
  <Button disabled style={buttonStyle}>Default</Button>

  <Button styleType="primary" disabled style={buttonStyle}>Primary</Button>

  <Button isOutline styleType="success" disabled style={buttonStyle}>Success</Button>

  <Button styleType="info" disabled style={buttonStyle}>Information</Button>

  <Button styleType="warning" disabled style={buttonStyle}>Warning</Button>

  <Button styleType="danger" disabled style={buttonStyle}>Danger</Button>

  <Button styleType="primary" isLinkButton disabled style={buttonStyle}>Link</Button>
</div>
```
