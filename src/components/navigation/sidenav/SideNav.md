```
class NavExample extends React.Component {
  constructor() {
    this.state = { selected: "home" };
    this.onItemSelected = this.onItemSelected.bind(this);
  }

  onItemSelected(value) {
    this.setState({ selected: value });
  };

  render() {
    return (
      <div style={{display: 'flex'}}>
        <div style={{width: '30%', marginRight: '4em'}}>
          <h3>Standard</h3>
          <SideNav selected={ this.state.selected } onItemSelected={ this.onItemSelected }>
            <SideNav.Item id="home" targetUrl="#home">Home</SideNav.Item>
            <SideNav.Item id="cart">Cart</SideNav.Item>
            <SideNav.Item id="help">Help</SideNav.Item>
            <SideNav.Item id="info">About</SideNav.Item>
            <SideNav.Item id="disabled" isDisabled>Disabled</SideNav.Item>
          </SideNav>
        </div>

        <div style={{width: '30%'}}>
          <h3>Alternate Style</h3>
          <SideNav selected={ this.state.selected } onItemSelected={ this.onItemSelected } useAltStyle>
            <SideNav.Item id="home">Home</SideNav.Item>
            <SideNav.Item id="cart">Cart</SideNav.Item>
            <SideNav.Item id="help">Help</SideNav.Item>
            <SideNav.Item id="info">About</SideNav.Item>
            <SideNav.Item id="disabled" isDisabled>Disabled</SideNav.Item>
          </SideNav>
        </div>
      </div>
    )
  }
}
<NavExample />
```

Use `onItemSelected` to control the `selected` value.
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
      <div style={{width: '30%'}}>
        <SideNav selected={ this.state.selected } onItemSelected={ this.onItemSelected }>
          <SideNav.Item id="home"><Icon name="home" /> Home</SideNav.Item>
          <SideNav.Item id="cart"><Icon name="shopping-cart" /> Cart</SideNav.Item>
          <SideNav.Item id="disabled" isDisabled><Icon name="ban-circle" /> Disabled</SideNav.Item>
        </SideNav>
      </div>
    )
  }
}
<NavExample />
```

Assign a `targetUrl` to set the nav link href location. Use `isExternalLink` to open the link in a new browser window.
```
class NavExample extends React.Component {
  constructor() {
    this.state = { selected: "home" };
    this.onItemSelected = this.onItemSelected.bind(this);
  }

  onItemSelected(value) {
    this.setState({ selected: value });
  };

  render() {
    return (
      <div style={{width: '30%'}}>
        <SideNav selected={ this.state.selected } onItemSelected={ this.onItemSelected }>
          <SideNav.Item id="home" targetUrl="/">Home</SideNav.Item>
          <SideNav.Item id="medicare" targetUrl="https://medicare.oneexchange.com" isExternalLink>Medicare Site</SideNav.Item>
          <SideNav.Item id="sidenav" targetUrl="#sidenav">SideNav Section</SideNav.Item>
        </SideNav>
      </div>
    )
  }
}
<NavExample />
```

Set `onClick` on an individual `SideNav.Item`.
```
class NavExample extends React.Component {
  constructor() {
    this.state = { selected: "home" };
    this.onItemSelected = this.onItemSelected.bind(this);
  }

  onItemSelected(value) {
    this.setState({ selected: value });
  };

  render() {
    return (
      <div style={{width: '30%'}}>
        <SideNav selected={ this.state.selected } onItemSelected={ this.onItemSelected } useAltStyle>
          <SideNav.Item id="home" onClick={ () => (alert('Time to go Home!'))}>Home</SideNav.Item>
          <SideNav.Item id="cart" onClick={ () => (alert('You clicked the Cart!'))}>Cart</SideNav.Item>
          <SideNav.Item id="disabled" isDisabled>Disabled</SideNav.Item>
        </SideNav>
      </div>
    )
  }
}
<NavExample />
```
