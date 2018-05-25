Any additional props passed to the Button component will get passed to the HTML button element.

## Button Style Types

```
const buttonStyle = {
  display: 'inline-block',
  margin: '10px 15px 0 0'
};

function noop() { }

<div>
  <div style={buttonStyle}><Button handleOnClick={noop}>Default</Button></div>

  <div style={buttonStyle}><Button handleOnClick={noop} styleType="darkDefault">Dark Default</Button></div>

  <div style={buttonStyle}><Button handleOnClick={noop} styleType="primary">Primary</Button></div>

  <div style={buttonStyle}><Button handleOnClick={noop} styleType="success">Success</Button></div>

  <div style={buttonStyle}><Button handleOnClick={noop} styleType="info">Information</Button></div>

  <div style={buttonStyle}><Button handleOnClick={noop} styleType="warning">Warning</Button></div>

  <div style={buttonStyle}><Button handleOnClick={noop} styleType="danger">Danger</Button></div>
</div>
```

### Alternative button types

Setting the `isOutline` prop will apply an alternative outline style. Setting `isLinkButton`
will render the button as a text link, using the color of the primary `styleType` provided.

```
const buttonStyle = {
  display: 'inline-block',
  margin: '10px 15px 0 0'
};

function noop() { }

<div>
  <div style={buttonStyle}><Button handleOnClick={noop} styleType="default" isOutline>Default</Button></div>

  <div style={buttonStyle}><Button handleOnClick={noop} styleType="primary" isOutline>Primary</Button></div>

  <div style={buttonStyle}><Button handleOnClick={noop} styleType="success" isOutline>Success</Button></div>

  <div style={buttonStyle}><Button handleOnClick={noop} styleType="info" isOutline>Information</Button></div>

  <div style={buttonStyle}><Button handleOnClick={noop} styleType="warning" isOutline>Warning</Button></div>

  <div style={buttonStyle}><Button handleOnClick={noop} styleType="danger" isOutline>Danger</Button></div>

  <div style={buttonStyle}><Button handleOnClick={noop} styleType="primary" isLinkButton>Link</Button></div>
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

function noop() {}

<div>
  <div style={wrapperStyle}>
    <Button
      handleOnClick={noop}
      size="lg"
      style={buttonStyle}
    >
      Large
    </Button>

    <Button
      handleOnClick={noop}
      size="lg"
      style={buttonStyle}
      isOutline
    >
      Large
    </Button>
  </div>

  <div style={wrapperStyle}>
    <Button
      handleOnClick={noop}
      size="default"
      style={buttonStyle}
    >
      Default
    </Button>

    <Button
      handleOnClick={noop}
      size="default"
      style={buttonStyle}
      isOutline
    >
      Default
    </Button>
  </div>

  <div style={wrapperStyle}>
    <Button
      handleOnClick={noop}
      size="sm"
      style={buttonStyle}
    >
      Small
    </Button>

    <Button
      handleOnClick={noop}
      size="sm"
      style={buttonStyle}
      isOutline
    >
      Small
    </Button>
  </div>

  <div style={wrapperStyle}>
    <Button
      handleOnClick={noop}
      size="xs"
      style={buttonStyle}
    >
      Extra small
    </Button>

    <Button
      handleOnClick={noop}
      size="xs"
      style={buttonStyle}
      isOutline
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
const buttonStyle = {
  display: 'inline-block',
  margin: '10px 15px 0 0'
};

function noop() { }

<div>
  <div style={buttonStyle}><Button handleOnClick={noop} disabled>Default</Button></div>

  <div style={buttonStyle}><Button handleOnClick={noop} styleType="primary" disabled>Primary</Button></div>

  <div style={buttonStyle}><Button handleOnClick={noop} isOutline styleType="success" disabled>Success</Button></div>

  <div style={buttonStyle}><Button handleOnClick={noop} styleType="info" disabled>Information</Button></div>

  <div style={buttonStyle}><Button handleOnClick={noop} styleType="warning" disabled>Warning</Button></div>

  <div style={buttonStyle}><Button handleOnClick={noop} styleType="danger" disabled>Danger</Button></div>

  <div style={buttonStyle}><Button handleOnClick={noop} styleType="primary" isLinkButton disabled>Link</Button></div>
</div>
```
