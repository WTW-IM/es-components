Icon buttons will display an icon in a circle with optional text being placed below.

```
import IconButton from './IconButton';

function IconButtonExample() {
    const [isHighlighted, setIsHighlighted] = React.useState(false);

    return (
        <IconButton iconName="man" isHighlighted={isHighlighted} onClick={() => setIsHighlighted(!isHighlighted)}>Text</IconButton>
    );
}

<IconButtonExample/>
```

You can highlight the IconButton to invert the colors and bold the text.

```
<div>
  <IconButton iconName="woman" isHighlighted={true}>Text</IconButton>
</div>
```

Disabling the button will prevent the onChange function from firing and remove some of the styling around clicking and hover.

```
import IconButton from './IconButton';

function IconButtonExample() {
    const [isHighlighted, setIsHighlighted] = React.useState(false);

    return (
        <IconButton iconName="man" disabled isHighlighted={isHighlighted} onClick={() => setIsHighlighted(!isHighlighted)}>Text</IconButton>
    );
}

<IconButtonExample/>
```

Restricting the height will result in the the overflow getting cut off by ellipsis.

```
<div>
  <IconButton iconName="user" maxWidth="175px">Loooooooooooooooooooooooooooooooooooooooooooooooooooooong Texttttttttttttttttttttttttttttttttttttttttttttttttttttttt</IconButton>
</div>
<div>
  <IconButton iconName="user" isHighlighted={true} maxWidth="175px">Loooooooooooooooooooooooooooooooooooooooooooooooooooooong Texttttttttttttttttttttttttttttttttttttttttttttttttttttttt</IconButton>
</div>
```

Here's an example of having multiple buttons together and toggling between them.

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
      <>
        <IconButton iconName="man" disabled={highlighted["one"]} isHighlighted={highlighted["one"]} onClick={() => changeHighlightedButton("one")}>One</IconButton>
        <IconButton iconName="man" disabled={highlighted["two"]} isHighlighted={highlighted["two"]} onClick={() => changeHighlightedButton("two")}>Two</IconButton>
        <IconButton iconName="man" disabled={highlighted["three"]} isHighlighted={highlighted["three"]} onClick={() => changeHighlightedButton("three")}>Three</IconButton>
        <IconButton iconName="man" disabled={highlighted["four"]} isHighlighted={highlighted["four"]} onClick={() => changeHighlightedButton("four")}>Four</IconButton>
      </>
    );
}

<IconButtonExample/>
```
