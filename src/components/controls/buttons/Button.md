Any additional props passed to the Button component will get passed to the HTML button element.

## Button Style Types

```
const buttonDemoStyle = {
  margin: '15px 15px 0 0'
};

function noop() { }

<div style={{display: 'flex'}}>
  <div style={buttonDemoStyle}><Button handleOnClick={noop}>Default</Button></div>

  <div style={buttonDemoStyle}><Button handleOnClick={noop} styleType="primary">Primary</Button></div>

  <div style={buttonDemoStyle}><Button handleOnClick={noop} styleType="success">Success</Button></div>

  <div style={buttonDemoStyle}><Button handleOnClick={noop} styleType="info">Information</Button></div>

  <div style={buttonDemoStyle}><Button handleOnClick={noop} styleType="warning">Warning</Button></div>

  <div style={buttonDemoStyle}><Button handleOnClick={noop} styleType="danger">Danger</Button></div>
</div>
```

### Alternative button types

Setting the `isOutline` prop will apply an alternative outline style. Setting `isLinkButton`
will render the button as a text link, using the color of the primary `styleType` provided.

```
const buttonDemoStyle = {
  margin: '15px 15px 0 0'
};

function noop() { }

<div>
  <Button handleOnClick={noop} isOutline style={buttonDemoStyle}>Default</Button>

  <Button handleOnClick={noop} styleType="primary" isOutline style={buttonDemoStyle}>Primary</Button>

  <Button handleOnClick={noop} styleType="success" isOutline style={buttonDemoStyle}>Success</Button>

  <Button handleOnClick={noop} styleType="info" isOutline style={buttonDemoStyle}>Information</Button>

  <Button handleOnClick={noop} styleType="warning" isOutline style={buttonDemoStyle}>Warning</Button>

  <Button handleOnClick={noop} styleType="danger" isOutline style={buttonDemoStyle}>Danger</Button>

  <Button handleOnClick={noop} styleType="primary" isLinkButton style={buttonDemoStyle}>Link</Button>
</div>
```

## Button sizes

Including a size will set buttons to a specific size

```
const buttonExampleStyle = {
  marginBottom: '15px'
};

function noop() {}

<div>
  <div style={buttonExampleStyle}>
    <Button
      handleOnClick={noop}
      size="lg"
    >
      Large
    </Button>
  </div>

  <div style={buttonExampleStyle}>
    <Button
      handleOnClick={noop}
      size="default"
    >
      Default
    </Button>
  </div>

  <div style={buttonExampleStyle}>
    <Button
      handleOnClick={noop}
      size="sm"
    >
      Small
    </Button>
  </div>

  <div style={buttonExampleStyle}>
    <Button
      handleOnClick={noop}
      size="xs"
    >
      Extra small
    </Button>
  </div>

</div>
```

Setting the `block` property will force the button to expand to the width of it's parent container.

```
const buttonContainerStyle = {
  width: '300px',
  height: '50px',
  padding: '10px',
  backgroundColor: '#ddd',
  border: '1px solid #444'
};

function noop() { }

<div style={buttonContainerStyle}>
  <Button handleOnClick={noop} block styleType="primary">Block button</Button>
</div>

```

Any additional prop sent will be included on the button. For example, setting the `disabled` property will put the button into a disabled state, making it unclickable.

```
const buttonDemoStyle = {
  margin: '15px 15px 0 0'
};

function noop() { }

<div>
  <Button handleOnClick={noop} disabled style={buttonDemoStyle}>Default</Button>

  <Button handleOnClick={noop} styleType="primary" disabled style={buttonDemoStyle}>Primary</Button>

  <Button handleOnClick={noop} styleType="success" disabled style={buttonDemoStyle}>Success</Button>

  <Button handleOnClick={noop} styleType="info" disabled style={buttonDemoStyle}>Information</Button>

  <Button handleOnClick={noop} styleType="warning" disabled style={buttonDemoStyle}>Warning</Button>

  <Button handleOnClick={noop} styleType="danger" disabled style={buttonDemoStyle}>Danger</Button>

  <Button handleOnClick={noop} styleType="primary" isLinkButton disabled style={buttonDemoStyle}>Link</Button>
</div>


```
