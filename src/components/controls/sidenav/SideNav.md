```
<div style={{display: 'flex'}}>
  <div style={{width: '30%', marginRight: '4em'}}>
    <h3>Standard</h3>
    <SideNav defaultSelected="home">
      <SideNav.Item id="home"><a>Home</a></SideNav.Item>
      <SideNav.Item id="cart">Cart</SideNav.Item>
      <SideNav.Item id="help">Help</SideNav.Item>
      <SideNav.Item id="info"><a>About</a></SideNav.Item>
      <SideNav.Item id="info" isDisabled>Disabled</SideNav.Item>
    </SideNav>
  </div>

  <div style={{width: '30%'}}>
    <h3>Alternate Style</h3>
    <SideNav defaultSelected="home" altStyle>
      <SideNav.Item id="home"><a>Home</a></SideNav.Item>
      <SideNav.Item id="cart">Cart</SideNav.Item>
      <SideNav.Item id="help">Help</SideNav.Item>
      <SideNav.Item id="info"><a>About</a></SideNav.Item>
      <SideNav.Item id="info" isDisabled>Disabled</SideNav.Item>
    </SideNav>
  </div>
</div>
```

Setting ```onItemSelected``` will fire the function when a ```SideNav.Item``` is clicked.
```
<div style={{width: '30%'}}>
  <SideNav defaultSelected="home" onItemSelection={ (id) => {alert(id); }}>
    <SideNav.Item id="home">Home</SideNav.Item>
    <SideNav.Item id="cart">Cart</SideNav.Item>
    <SideNav.Item id="info" isDisabled>Disabled</SideNav.Item>
  </SideNav>
</div>
```

Set ```onNavClick``` on an individual ```SideNav.Item```.
```
<div style={{width: '30%'}}>
  <SideNav defaultSelected="home" altStyle>
    <SideNav.Item id="home" onNavClick={ () => (alert('Time to go Home!'))}>Home</SideNav.Item>
    <SideNav.Item id="cart" onNavClick={ () => (alert('You clicked the Cart!'))}>Cart</SideNav.Item>
    <SideNav.Item id="info" isDisabled>Disabled</SideNav.Item>
  </SideNav>
</div>
```

Manage selected item state manually using ```selected``` instead of ```defaultSelected```.
```
<div style={{width: '30%'}}>
  <SideNav selected={state.selected} onItemSelection={ (id) => {setState({selected: id})} }>
    <SideNav.Item id="home"><a>Home</a></SideNav.Item>
    <SideNav.Item id="cart">Cart</SideNav.Item>
    <SideNav.Item id="info"><a>Help</a></SideNav.Item>
  </SideNav>
</div>
```
