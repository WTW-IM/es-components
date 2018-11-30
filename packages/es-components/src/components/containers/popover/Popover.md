Popover utilizes a [render prop](https://reactjs.org/docs/render-props.html) to display the popover trigger, which is typically a button component.
This function will require `ref`, `toggleShow`, and `isOpen` parameters to function properly.

```
const styles = {
    display: 'inline-block',
    margin: '10px'
};

<div>
    <div style={styles}>
    <Popover
      name="topEx"
      title="Top"
      content="This is the popover's content. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch."
      placement="top"
      render={({ ref, toggleShow, isOpen }) => (
        <Button
          onClick={toggleShow}
          aria-expanded={isOpen}
          ref={ref}
          styleType="primary"
        >
          Popover on Top
        </Button>
      )}
    />
    </div>

    <div style={styles}>
    <Popover
        name="bottomEx"
        title="Bottom"
        content="This is the popover's content. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch."
        render={({ ref, toggleShow, isOpen }) => (
          <Button
            onClick={toggleShow}
            aria-expanded={isOpen}
            ref={ref}
            styleType="primary"
          >
            Popover on Bottom
          </Button>
        )}
      />
    </div>

    <div style={styles}>
    <Popover
        name="leftEx"
        title="Left"
        content="This is the popover's content. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch."
        placement="left"
        render={({ ref, toggleShow, isOpen }) => (
          <Button
            onClick={toggleShow}
            aria-expanded={isOpen}
            ref={ref}
            styleType="primary"
          >
            Popover on Left
          </Button>
        )}
      />
    </div>

    <div style={styles}>
    <Popover
        name="rightEx"
        title="Right"
        content="This is the popover's content. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch."
        placement="right"
        render={({ ref, toggleShow, isOpen }) => (
          <Button
            onClick={toggleShow}
            aria-expanded={isOpen}
            ref={ref}
            styleType="primary"
          >
            Popover on Right
          </Button>
        )}
      />
    </div>

</div>
```

```
<div>
Here's an example of a
<Popover
    name="popEx"
    title="Popover"
    content="This is the popover's content. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch."
    hasCloseButton
    render={({ ref, toggleShow, isOpen }) => (
      <PopoverLink
        onClick={toggleShow}
        aria-expanded={isOpen}
        ref={ref}
        styleType="primary"
      >
        Popover
      </PopoverLink>
    )}
  />
styled like a link.
</div>
```

Popovers can include Icons or other components. Keep accessibility in mind and provide aria labels where appropriate.

```
<div>
Click the icon for some help text.
<Popover
    name="iconEx"
    title="Icon Popover"
    content="Here's some help text!"
    suppressUnderline
    ariaLabel="Icon"
    render={({ ref, toggleShow, isOpen }) => (
      <PopoverLink
        onClick={toggleShow}
        aria-expanded={isOpen}
        ref={ref}
        suppressUnderline
        styleType="primary"
      >
        <span aria-hidden="true"><Icon name='question-circle' /></span>
        <span style={{ fontSize: '0', height: '1px', display: 'block', overflow: 'hidden' }}>Icon</span>
      </PopoverLink>
    )}
/>
</div>
```

```
const styles = {
    display: 'inline-block',
    margin: '0 10px'
};

<div>
    <div style={styles}>
    <Popover
        name="smEx"
        title="Small Arrow"
        content="This is the popover's content."
        placement="top"
        arrowSize="sm"
        render={({ ref, toggleShow, isOpen }) => (
          <OutlineButton
            onClick={toggleShow}
            aria-expanded={isOpen}
            ref={ref}
            styleType="primary"
          >
            Small Arrow
          </OutlineButton>
        )}
    />
    </div>

    <div style={styles}>
    <Popover
        name="dfltEx"
        title="Default Arrow"
        content="This is the popover's content."
        render={({ ref, toggleShow, isOpen }) => (
          <OutlineButton
            onClick={toggleShow}
            aria-expanded={isOpen}
            ref={ref}
            styleType="primary"
          >
            Default Arrow
          </OutlineButton>
        )}
    />
    </div>

    <div style={styles}>
    <Popover
        name="lgEx"
        title="Large Arrow"
        content="This is the popover's content."
        placement="top"
        arrowSize="lg"
        render={({ ref, toggleShow, isOpen }) => (
          <OutlineButton
            onClick={toggleShow}
            aria-expanded={isOpen}
            ref={ref}
            styleType="primary"
          >
            Large Arrow
          </OutlineButton>
        )}
    />
    </div>

    <div style={styles}>
    <Popover
        name="noneEx"
        title="No Arrow"
        content="This is the popover's content."
        placement="bottom"
        arrowSize="none"
        render={({ ref, toggleShow, isOpen }) => (
          <OutlineButton
            onClick={toggleShow}
            aria-expanded={isOpen}
            ref={ref}
            styleType="primary"
          >
            No Arrow
          </OutlineButton>
        )}
    />
    </div>
</div>
```
