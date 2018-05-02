```
const styles = {
    display: 'inline-block',
    margin: '10px'
};

<div>
    <div style={styles}>
    <PopoverTest
        name="topEx"
        title="Top"
        content="This is the popover's content. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch."
        placement="top"
    >
        Popover on Top
    </PopoverTest>
    </div>
    
    <div style={styles}>
    <PopoverTest
        name="bottomEx"
        title="Bottom"
        content="This is the popover's content. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch."
    >
        Popover on Bottom
    </PopoverTest>
    </div>

    <div style={styles}>
    <PopoverTest
        name="leftEx"
        title="Left"
        content="This is the popover's content. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch."
        placement="left"
    >
        Popover on Left
    </PopoverTest>
    </div>

    <div style={styles}>
    <PopoverTest
        name="rightEx"
        title="Right"
        content="This is the popover's content. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch."
        placement="right"
    >
        Popover on Right
    </PopoverTest>
    </div>
</div>
```

```
<div>
Here's an example of a
<PopoverTest
    name="popEx"
    title="Popover"
    content="This is the popover's content. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch."
    isLinkButton
    hasCloseButton
>
    Popover
</PopoverTest> 
styled like a link.
</div>
```

Popovers can wrap Icons or other components. These wrapped elements should include the `ariaLabel` prop for screen readers to identify them.
```
<div>
Click the icon for some help text.
<PopoverTest
    name="iconEx"
    title="Icon Popover"
    content="Here's some help text!"
    suppressUnderline
    ariaLabel="Icon"
    isLinkButton
> 
    <Icon name='question-sign' />
</PopoverTest> 
</div>
```

```
const styles = {
    display: 'inline-block',
    margin: '0 10px'
};

<div>
    <div style={styles}>
    <PopoverTest
        name="smEx"
        title="Small Arrow"
        content="This is the popover's content."
        placement="top"
        isOutline
        arrowSize="sm"
    >
        Small Arrow
    </PopoverTest>
    </div>
    
    <div style={styles}>
    <PopoverTest
        name="dfltEx"
        title="Default Arrow"
        content="This is the popover's content."
        isOutline
    >
        Default Arrow
    </PopoverTest>
    </div>

    <div style={styles}>
    <PopoverTest
        name="lgEx"
        title="Large Arrow"
        content="This is the popover's content."
        placement="top"
        isOutline
        arrowSize="lg"
    >
        Large Arrow
    </PopoverTest>
    </div>

    <div style={styles}>
    <PopoverTest
        name="noneEx"
        title="No Arrow"
        content="This is the popover's content."
        placement="bottom"
        isOutline
        arrowSize="none"
    >
        No Arrow
    </PopoverTest>
    </div>
</div>
```