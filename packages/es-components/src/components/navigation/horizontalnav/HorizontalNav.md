Use `HorizontalNav` to create an uncontrolled navigation menu. Each `HorizontalNav.Item` will render with the same styling. A `HorizontalNav.Item` only accepts one child component and will typically be a `a`, `button`, or client side routing `Link`-type component.

```
<>
  <h3>Standard</h3>
  <HorizontalNav selected="home">
    <HorizontalNav.Item id="home">
      <a href="#home">Home</a>
    </HorizontalNav.Item>
    <HorizontalNav.Item id="cart">
      <a href="#cart">Cart</a>
    </HorizontalNav.Item>
    <HorizontalNav.Item id="help">
      <a href="#help">Help</a>
    </HorizontalNav.Item>
    <HorizontalNav.Item id="info">
      <a href="#info">About</a>
    </HorizontalNav.Item>
    <HorizontalNav.Item id="disabled" isDisabled>
      <a href="#disabled">Disabled</a>
    </HorizontalNav.Item>
  </HorizontalNav>
  <br />
  <h3>Alternate Style</h3>
  <HorizontalNav useAltStyle selected="home">
    <HorizontalNav.Item id="home">
      <a href="#home">Home</a>
    </HorizontalNav.Item>
    <HorizontalNav.Item id="cart">
      <a href="#cart">Cart</a>
    </HorizontalNav.Item>
    <HorizontalNav.Item id="help">
      <a href="#help">Help</a>
    </HorizontalNav.Item>
    <HorizontalNav.Item id="info">
      <a href="#info">About</a>
    </HorizontalNav.Item>
    <HorizontalNav.Item id="disabled" isDisabled>
      <a href="#disabled">Disabled</a>
    </HorizontalNav.Item>
  </HorizontalNav>
</>
```

Change the `selected` prop that is passed to `HorizontalNav` to change when an item is clicked.

```
import Icon from '../../base/icons/Icon';
import Button from '../../controls/buttons/Button';

function Link({ className, children, isVertical, ...rest }) {
  return <a className={className} href="#" {...rest}>{children}</a>;
}

function NavExample(props) {
  const [selected, setSelected] = React.useState("home")
  const [useAltStyle, setUseAltStyle] = React.useState(false);

  function onItemSelected(value) {
    return e => {
      e.preventDefault();
      setSelected(value);
      alert(`you selected ${value}`);
    }
  }

  function switchStyle() {
    setUseAltStyle(!useAltStyle);
  }

  return (
    <div>
      <HorizontalNav selected={ selected } useAltStyle={useAltStyle}>
        <HorizontalNav.Item id="home">
          <button onClick={onItemSelected('home')}>
            <Icon name="home" style={{ marginRight: '10px' }} />
            Time to go home!
          </button>
        </HorizontalNav.Item>
        <HorizontalNav.Item id="cart">
          <a href="#shopping-cart" onClick={onItemSelected('cart')}>
            <Icon name="shopping-cart" style={{ marginRight: '10px' }} />
            Shopping Cart
          </a>
        </HorizontalNav.Item>
        <HorizontalNav.Item id="edit">
          <Link onClick={onItemSelected('edit')}>
            <Icon name="edit" style={{ marginRight: '10px' }} />
            Edit account
          </Link>
        </HorizontalNav.Item>
      </HorizontalNav>
      <hr />
      <Button onClick={switchStyle}>Switch to Alternative Style</Button>
    </div>
  )
};

<NavExample />
```
