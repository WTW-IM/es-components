Use `SideNav` to create an uncontrolled navigation menu. Each `SideNav.Item` will render with the same styling. A `SideNav.Item` only accepts one child component and will typically be a `a`, `button`, or client side routing `Link`-type component.
For accessibility, the `SideNav` will be rendered with the role of `tablist` and each `HorizontalNav.Item` will be rendered with the role of `tab`.

```
<>
  <h3>Standard</h3>
  <SideNav selected="home">
    <SideNav.Item id="home">
      <a href="#home">Home</a>
    </SideNav.Item>
    <SideNav.Item id="cart">
      <a href="#cart">Cart</a>
    </SideNav.Item>
    <SideNav.Item id="help">
      <a href="#help">Help</a>
    </SideNav.Item>
    <SideNav.Item id="info">
      <a href="#info">About</a>
    </SideNav.Item>
    <SideNav.Item id="disabled" isDisabled>
      <a href="#disabled">Disabled</a>
    </SideNav.Item>
  </SideNav>
  <br />
  <h3>Alternate Style</h3>
  <SideNav useAltStyle selected="home">
    <SideNav.Item id="home">
      <a href="#home">Home</a>
    </SideNav.Item>
    <SideNav.Item id="cart">
      <a href="#cart">Cart</a>
    </SideNav.Item>
    <SideNav.Item id="help">
      <a href="#help">Help</a>
    </SideNav.Item>
    <SideNav.Item id="info">
      <a href="#info">About</a>
    </SideNav.Item>
    <SideNav.Item id="disabled" isDisabled>
      <a href="#disabled">Disabled</a>
    </SideNav.Item>
  </SideNav>
</>
```

Change the `selected` prop that is passed to `SideNav` to change when an item is clicked. This item will be rendered with the aria-selected attribute set to true, all other items will have it set to false.

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
    <>
      <div style={{width: '30%'}}>
        <SideNav selected={ selected } useAltStyle={useAltStyle}>
          <SideNav.Item id="home">
            <button onClick={onItemSelected('home')}>
              <Icon name="home" style={{ marginRight: '10px' }} />
              Time to go home!
            </button>
          </SideNav.Item>
          <SideNav.Item id="cart">
            <a href="#shopping-cart" onClick={onItemSelected('cart')}>
              <Icon name="shopping-cart" style={{ marginRight: '10px' }} />
              Shopping Cart
            </a>
          </SideNav.Item>
          <SideNav.Item id="edit">
            <Link onClick={onItemSelected('edit')}>
              <Icon name="edit" style={{ marginRight: '10px' }} />
              Edit account
            </Link>
          </SideNav.Item>
        </SideNav>
      </div>
      <hr />
      <Button onClick={switchStyle}>Switch to Alternative Style</Button>
    </>
  )
};

<NavExample />
```
