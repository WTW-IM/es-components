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
    >
        Popover on Top
    </Popover>
    </div>

    <div style={styles}>
    <Popover
        name="bottomEx"
        title="Bottom"
        content="This is the popover's content. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch."
    >
        Popover on Bottom
    </Popover>
    </div>

    <div style={styles}>
    <Popover
        name="leftEx"
        title="Left"
        content="This is the popover's content. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch."
        placement="left"
    >
        Popover on Left
    </Popover>
    </div>

    <div style={styles}>
    <Popover
        name="rightEx"
        title="Right"
        content="This is the popover's content. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch."
        placement="right"
    >
        Popover on Right
    </Popover>
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
    isLinkButton
    hasCloseButton
>
    Popover
</Popover>
styled like a link.
</div>
```

Popovers can wrap Icons or other components. These wrapped elements should include the `ariaLabel` prop for screen readers to identify them.
```
<div>
Click the icon for some help text.
<Popover
    name="iconEx"
    title="Icon Popover"
    content="Here's some help text!"
    suppressUnderline
    ariaLabel="Icon"
    isLinkButton
>
    <Icon name='question-circle' />
</Popover>
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
        isOutline
        arrowSize="sm"
    >
        Small Arrow
    </Popover>
    </div>

    <div style={styles}>
    <Popover
        name="dfltEx"
        title="Default Arrow"
        content="This is the popover's content."
        isOutline
    >
        Default Arrow
    </Popover>
    </div>

    <div style={styles}>
    <Popover
        name="lgEx"
        title="Large Arrow"
        content="This is the popover's content."
        placement="top"
        isOutline
        arrowSize="lg"
    >
        Large Arrow
    </Popover>
    </div>

    <div style={styles}>
    <Popover
        name="noneEx"
        title="No Arrow"
        content="This is the popover's content."
        placement="bottom"
        isOutline
        arrowSize="none"
    >
        No Arrow
    </Popover>
    </div>
</div>
```
