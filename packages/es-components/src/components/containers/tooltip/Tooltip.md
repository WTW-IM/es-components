Use a `Tooltip` component to display a small hover tip over content.

### Basic Tooltip:

```javascript
<div>
  Hover over{' '}
  <Tooltip name="tip1" content="This is the tooltip">
    <span>this text</span>
  </Tooltip>{' '}
  to see the tooltip in action.
</div>
```

### Basic Tooltip with `disableFocus` and `disableHover` selected:

```javascript
<div>
  Hover over{' '}
  <Tooltip name="tip1" content="This is the tooltip" disableFocus disableHover>
    <span>this text</span>
  </Tooltip>{' '}
  to see the tooltip in action.
</div>
```

### Tooltip with HTML:

```javascript
<div>
  Hover over{' '}
  <Tooltip
    name="tip2"
    content={
      <span>
        This contains <em>some</em> <strong>HTML</strong>
      </span>
    }
    position="left"
  >
    <span>this text</span>
  </Tooltip>{' '}
  to see the tooltip in action.
</div>
```

## `<Fade>` Utility

### Multiple-Child Fades

`Tooltip` utilizes a `Fade` utility which can fade in and out one or more children.

```javascript
import Fade from '../../util/Fade';
const [isFadedIn, setIsFadedIn] = React.useState(false);
const onHover = () => setIsFadedIn(true);
const onHoverOff = () => setIsFadedIn(false);

<div onMouseEnter={onHover} onMouseLeave={onHoverOff}>
  Hover me!
  <Fade in={isFadedIn} mountOnEnter unmountOnExit opacity={1}>
    <div>This Fade</div>
    <div>Has multiple</div>
    <div>Children</div>
  </Fade>
</div>;
```
