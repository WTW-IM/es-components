Icon buttons will display an icon in a circle with optional text being placed below.

```
import IconButton from './IconButton';

function IconButtonExample() {
    const [isHighlighted, setIsHighlighted] = React.useState(false);

    return (
      <div style={{width:'20%'}}>
        <IconButton iconName="man" isHighlighted={isHighlighted} onClick={() => setIsHighlighted(!isHighlighted)}>Toggle Me</IconButton>
      </div>
    );
}

<IconButtonExample/>
```

Using the `isIncomplete` prop will apply a style representing an incomplete state.

```
import IconButton from './IconButton';

function IconButtonExample() {
    const [isHighlighted, setIsHighlighted] = React.useState(false);

    return (
      <div style={{width:'20%'}}>
        <IconButton iconName="man" isIncomplete isHighlighted={isHighlighted} onClick={() => setIsHighlighted(!isHighlighted)}>Text</IconButton>
      </div>
    );
}

<IconButtonExample/>
```

Restricting the width will result in text overflow displayed by an ellipsis.

```
<div style={{display:'flex',justifyContent:'space-between',width:'50%'}}>
  <IconButton iconName="user" maxWidth="175px">Loooooooooooooooooooooooooooooooooooooooooooooooooooooong Texttttttttttttttttttttttttttttttttttttttttttttttttttttttt</IconButton>

  <IconButton iconName="user" isHighlighted={true} maxWidth="175px">Loooooooooooooooooooooooooooooooooooooooooooooooooooooong Texttttttttttttttttttttttttttttttttttttttttttttttttttttttt</IconButton>
</div>
```

Here's an example of multiple buttons together and toggling between them.

```
import IconButton from './IconButton';

function IconButtonExample() {
    const [highlighted, setHighlighted] = React.useState({
      one: true,
      two: false,
      three: false,
      four: false
    });

    function changeHighlightedButton(buttonId) {
      const newHighlighted = { ...highlighted };

      Object.keys(newHighlighted).forEach(propertyName => newHighlighted[`${propertyName}`] = false);

      newHighlighted[buttonId] = true;

      setHighlighted(newHighlighted);
    }

    return (
      <div style={{display:'flex',justifyContent:'space-between',width:'50%'}}>
        <IconButton iconName="man" isHighlighted={highlighted["one"]} onClick={() => changeHighlightedButton("one")}>One</IconButton>
        <IconButton iconName="man" isHighlighted={highlighted["two"]} onClick={() => changeHighlightedButton("two")}>Two</IconButton>
        <IconButton isIncomplete iconName="man" isHighlighted={highlighted["three"]} onClick={() => changeHighlightedButton("three")}>Three</IconButton>
        <IconButton iconName="man" isHighlighted={highlighted["four"]} onClick={() => changeHighlightedButton("four")}>Four</IconButton>
      </div>
    );
}

<IconButtonExample/>
```

Disabling the button will prevent the `onChange` function from firing and will remove the styling around clicking and hover.

```
import IconButton from './IconButton';

function IconButtonExample() {
    const [isHighlighted, setIsHighlighted] = React.useState(false);

    return (
      <div style={{width:'20%'}}>
        <IconButton disabled iconName="man" isHighlighted={isHighlighted} onClick={() => setIsHighlighted(!isHighlighted)}>Text</IconButton>
      </div>
    );
}

<IconButtonExample/>
```
