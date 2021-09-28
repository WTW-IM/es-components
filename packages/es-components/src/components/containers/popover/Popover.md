Popover utilizes a [render prop](https://reactjs.org/docs/render-props.html) to display the popover trigger, which is typically a button component.
This function will require `ref`, `toggleShow`, and `isOpen` parameters to function properly.

```
import Button from '../../controls/buttons/Button';

const styles = {
    display: 'inline-block',
    margin: '10px'
};

<>
    <div style={styles}>
    <Popover
      name="topEx"
      title="Top"
      content="This is the popover's content. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch."
      placement="top"
      renderTrigger={({ ref, toggleShow, isOpen }) => (
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
        renderTrigger={({ ref, toggleShow, isOpen }) => (
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
        renderTrigger={({ ref, toggleShow, isOpen }) => (
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
        renderTrigger={({ ref, toggleShow, isOpen }) => (
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

</>
```

```
import PopoverLink from '../../controls/buttons/PopoverLink';

<>
Here's an example of a
<Popover
    name="popEx"
    content="This is the popover's content. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch."
    renderTrigger={({ ref, toggleShow, isOpen }) => (
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
</>
```

Popovers can include Icons or other components. Keep accessibility in mind and provide aria labels where appropriate.

```
import PopoverLink from '../../controls/buttons/PopoverLink';
import Icon from '../../base/icons/Icon';

<>
Click the icon for some help text.
<Popover
    name="iconEx"
    title="Icon Popover"
    disableRootClose
    hasAltCloseButton
    content="Here's some help text!"
    suppressUnderline
    ariaLabel="Icon"
    renderTrigger={({ ref, toggleShow, isOpen }) => (
      <PopoverLink
        onClick={toggleShow}
        aria-expanded={isOpen}
        ref={ref}
        suppressUnderline
        styleType="primary"
      >
        <span aria-hidden="true"><Icon name='question-circle' size={22} /></span>
        <span style={{ fontSize: '0', height: '1px', display: 'block', overflow: 'hidden' }}>Icon</span>
      </PopoverLink>
    )}
/>
</>
```

```
import OutlineButton from '../../controls/buttons/OutlineButton';

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
        renderTrigger={({ ref, toggleShow, isOpen }) => (
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
        renderTrigger={({ ref, toggleShow, isOpen }) => (
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
        renderTrigger={({ ref, toggleShow, isOpen }) => (
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
        renderTrigger={({ ref, toggleShow, isOpen }) => (
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

Extra props will be passed through to the popup container, allowing you to override default styling.

```
import Button from '../../controls/buttons/Button';
import styled from 'styled-components';

const StyledPopover = styled(Popover)`
  min-width: 100px;
  max-width: 200px;
`;

<StyledPopover
  name="customStylingExample"
  title="Custom Styling"
  content="This is the popover's content. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch."
  placement="bottom"
  renderTrigger={({ ref, toggleShow, isOpen }) => (
    <Button
      onClick={toggleShow}
      aria-expanded={isOpen}
      ref={ref}
      styleType="primary"
    >
      Popover with custom styling
    </Button>
  )}
/>
```

Alternatively, you can pass a styleType prop to the Popover just like you can with Button

```
import Button from '../../controls/buttons/Button';

<Popover
  name="styleTypeExample"
  title="style typing"
  styleType="primary" // match button style
  content="This is the popover's content. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch."
  placement="bottom"
  renderTrigger={({ ref, toggleShow, isOpen }) => (
    <Button
      onClick={toggleShow}
      aria-expanded={isOpen}
      ref={ref}
      styleType="primary"
    >
      Popover with custom styling
    </Button>
  )}
/>
```

A render prop is also available for the content body in the form of `renderContent`. The render function provides access to the `toggleShow` function. This allows
popover content to control the visibility, such as with a custom close button;

```
import Button from '../../controls/buttons/Button';

<Popover
  name="customStylingExample"
  title="Custom Styling"
  renderContent={({ toggleShow }) => {
    return (
      <>
        <p>This is the popover's content. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch.</p>
        <Button onClick={toggleShow}>Close</Button>
      </>
    )
  }}
  placement="bottom"
  renderTrigger={({ ref, toggleShow, isOpen }) => (
    <Button
      onClick={toggleShow}
      aria-expanded={isOpen}
      ref={ref}
      styleType="primary"
    >
      Popover with Closable Content
    </Button>
  )}
/>
```
If the popover elements ever need to be detected or queried as part of the DOM you can pass a popoverWrapperClassName to check for in your javascript

```
import Button from '../../controls/buttons/Button';

<Popover
  name="wrapperClassName"
  popoverWrapperClassName="classForAncestorOfPopoverContentAndHeader"
  title="Class One"
  content="This is the popover's content. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch."
  placement="bottom"
  renderTrigger={({ ref, toggleShow, isOpen }) => (
    <Button
      onClick={toggleShow}
      aria-expanded={isOpen}
      ref={ref}
      styleType="primary"
    >
      Pop Me
    </Button>
  )}
/>

// Get currently active (Popovers that have been inserted into the DOM via the render trigger) Popover nodes
const popoverNodes = document.getElementsByClassName("classForAncestorOfPopoverContentAndHeader");
```