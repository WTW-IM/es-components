Any additional props passed to the Button component will get passed to the HTML button element.

## Button Style Types

```
const buttonExampleStyle = {
  display: 'flex',
  flexFlow: 'row wrap',
  justifyContent: 'space-between',
  paddingTop: '20px'
};

function noop() { }

<div style={buttonExampleStyle}>
  <Button handleOnClick={noop}>Default</Button>

  <Button handleOnClick={noop} styleType="primary">Primary</Button>

  <Button handleOnClick={noop} styleType="accent">Accent</Button>

  <Button handleOnClick={noop} styleType="success">Success</Button>

  <Button handleOnClick={noop} styleType="info">Information</Button>

  <Button handleOnClick={noop} styleType="warning">Warning</Button>

  <Button handleOnClick={noop} styleType="danger">Danger</Button>

  <Button handleOnClick={noop} styleType="link">Link</Button>

  <div style={{'fontSize':'30px'}}>
    <Button handleOnClick={noop} styleType="success" styledLink={true}>Styled Link</Button>
  </div>
</div>
```

### Alternative button types

Setting the `alternative` prop will give the button the alternative style for each type.

```
const buttonExampleStyle = {
  display: 'flex',
  flexFlow: 'row wrap',
  justifyContent: 'space-between',
  paddingTop: '20px'
};

function noop() { }

<div style={buttonExampleStyle}>
  <Button handleOnClick={noop} alternative>Default</Button>

  <Button handleOnClick={noop} styleType="primary" alternative>Primary</Button>

  <Button handleOnClick={noop} styleType="accent" alternative>Accent</Button>

  <Button handleOnClick={noop} styleType="success" alternative>Success</Button>

  <Button handleOnClick={noop} styleType="info" alternative>Information</Button>

  <Button handleOnClick={noop} styleType="warning" alternative>Warning</Button>

  <Button handleOnClick={noop} styleType="danger" alternative>Danger</Button>
</div>
```

## Button sizes

Including a size will set buttons to a specific size

```
const buttonExampleStyle = {
  marginBottom: '5px'
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
const buttonExampleStyle = {
  display: 'flex',
  flexFlow: 'row wrap',
  justifyContent: 'space-between',
  paddingTop: '20px'
};

function noop() { }

<div style={buttonExampleStyle}>
  <Button handleOnClick={noop} disabled>Default</Button>

  <Button handleOnClick={noop} styleType="primary" disabled>Primary</Button>

  <Button handleOnClick={noop} styleType="accent" disabled>Accent</Button>

  <Button handleOnClick={noop} styleType="success" disabled>Success</Button>

  <Button handleOnClick={noop} styleType="info" disabled>Information</Button>

  <Button handleOnClick={noop} styleType="warning" disabled>Warning</Button>

  <Button handleOnClick={noop} styleType="danger" disabled>Danger</Button>

  <Button handleOnClick={noop} styleType="link" disabled>Link</Button>
</div>


```
