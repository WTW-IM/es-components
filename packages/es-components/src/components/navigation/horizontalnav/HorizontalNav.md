(Uncontrolled) Use `defaultSelected` to set an initial selected item.
```
<div>
  <div>
    <h3>Standard</h3>
    <HorizontalNav defaultSelected="home">
      <HorizontalNav.Item id="home" targetUrl="#home">Home</HorizontalNav.Item>
      <HorizontalNav.Item id="cart">Cart</HorizontalNav.Item>
      <HorizontalNav.Item id="help">Help</HorizontalNav.Item>
      <HorizontalNav.Item id="info">About</HorizontalNav.Item>
      <HorizontalNav.Item id="disabled" isDisabled>Disabled</HorizontalNav.Item>
    </HorizontalNav>
  </div>

  <div>
    <h3>Alternate Style</h3>
    <HorizontalNav useAltStyle defaultSelected="snapshot">
      <HorizontalNav.Item id="snapshot">Plan Snapshot</HorizontalNav.Item>
      <HorizontalNav.Item id="medical">Medical Benefits</HorizontalNav.Item>
      <HorizontalNav.Item id="drug">Drug Benefits</HorizontalNav.Item>
      <HorizontalNav.Item id="docs">Plan Documents</HorizontalNav.Item>
      <HorizontalNav.Item id="disabled" isDisabled>Disabled</HorizontalNav.Item>
    </HorizontalNav>
  </div>
</div>
```

(Controlled) Use `onItemSelected` to control the `selected` value.
```
class NavExample extends React.Component {
  constructor() {
    this.state = { selected: "home" };
    this.onItemSelected = this.onItemSelected.bind(this);
  }

  onItemSelected(value) {
    this.setState({ selected: value });
    alert(`${value} selected!`);
  };

  render() {
    return (
      <div>
        <HorizontalNav selected={ this.state.selected } onItemSelected={ this.onItemSelected }>
          <HorizontalNav.Item id="home"><Icon name="home" /> Home</HorizontalNav.Item>
          <HorizontalNav.Item id="cart"><Icon name="shopping-cart" /> Cart</HorizontalNav.Item>
          <HorizontalNav.Item id="disabled" isDisabled><Icon name="no-symbol" /> Disabled</HorizontalNav.Item>
        </HorizontalNav>
      </div>
    )
  }
}
<NavExample />
```

Set `onClick` on an individual `HorizontalNav.Item`.
```
<div>
  <HorizontalNav useAltStyle>
    <HorizontalNav.Item id="home" onClick={ () => (alert('Time to go Home!'))}>Home</HorizontalNav.Item>
    <HorizontalNav.Item id="cart" onClick={ () => (alert('You clicked the Cart!'))}>Cart</HorizontalNav.Item>
    <HorizontalNav.Item id="disabled" isDisabled>Disabled</HorizontalNav.Item>
  </HorizontalNav>
</div>
```

Assign a `targetUrl` to set the nav link href location. Use `isExternalLink` to open the link in a new browser window.
```
<div>
  <HorizontalNav>
    <HorizontalNav.Item id="home" targetUrl="/">Home</HorizontalNav.Item>
    <HorizontalNav.Item id="medicare" targetUrl="https://medicare.oneexchange.com" isExternalLink>Medicare Site</HorizontalNav.Item>
    <HorizontalNav.Item id="sidenav" targetUrl="#sidenav">HorizontalNav Section</HorizontalNav.Item>
  </HorizontalNav>
</div>
```
