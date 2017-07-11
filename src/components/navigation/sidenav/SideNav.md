```
<div style={{display: 'flex'}}>
  <div style={{width: '30%', marginRight: '4em'}}>
    <h3>Standard</h3>
    <SideNav defaultSelected="home">
      <SideNav.Item id="home" targetUrl="#home">Home</SideNav.Item>
      <SideNav.Item id="cart">Cart</SideNav.Item>
      <SideNav.Item id="help">Help</SideNav.Item>
      <SideNav.Item id="info">About</SideNav.Item>
      <SideNav.Item id="disabled" isDisabled>Disabled</SideNav.Item>
    </SideNav>
  </div>

  <div style={{width: '30%'}}>
    <h3>Alternate Style</h3>
    <SideNav defaultSelected="home" altStyle>
      <SideNav.Item id="home">Home</SideNav.Item>
      <SideNav.Item id="cart">Cart</SideNav.Item>
      <SideNav.Item id="help">Help</SideNav.Item>
      <SideNav.Item id="info">About</SideNav.Item>
      <SideNav.Item id="disabled" isDisabled>Disabled</SideNav.Item>
    </SideNav>
  </div>
</div>
```

Assign a ```targetUrl``` to set the nav link href location. Use ```isExternalLink``` to open the link in a new browser window.
```
<div style={{width: '30%'}}>
  <SideNav defaultSelected="home">
    <SideNav.Item id="home" targetUrl="/" onNavClick={ () => (alert('Time to go Home!'))}>Home</SideNav.Item>
    <SideNav.Item id="medicare" targetUrl="https://medicare.oneexchange.com" isExternalLink>Medicare Site</SideNav.Item>
    <SideNav.Item id="alerts" targetUrl="#alert">Alert Section</SideNav.Item>
  </SideNav>
</div>
```

Setting ```onItemSelected``` will execute the function when a ```SideNav.Item``` is clicked.
```
<div style={{width: '30%'}}>
  <SideNav defaultSelected="home" onItemSelected={ (id) => {alert(id); }}>
    <SideNav.Item id="home">Home</SideNav.Item>
    <SideNav.Item id="cart">Cart</SideNav.Item>
    <SideNav.Item id="disabled" isDisabled>Disabled</SideNav.Item>
  </SideNav>
</div>
```

Set ```onNavClick``` on an individual ```SideNav.Item```.
```
<div style={{width: '30%'}}>
  <SideNav defaultSelected="home" altStyle>
    <SideNav.Item id="home" onNavClick={ () => (alert('Time to go Home!'))}>Home</SideNav.Item>
    <SideNav.Item id="cart" onNavClick={ () => (alert('You clicked the Cart!'))}>Cart</SideNav.Item>
    <SideNav.Item id="disabled" isDisabled>Disabled</SideNav.Item>
  </SideNav>
</div>
```

Manage selected item state manually using ```selected``` instead of ```defaultSelected```.
```
<div style={{width: '30%'}}>
  <SideNav selected={state.selected} onItemSelected={ (id) => {setState({selected: id})} }>
    <SideNav.Item id="home">Home</SideNav.Item>
    <SideNav.Item id="cart">Cart</SideNav.Item>
    <SideNav.Item id="help">Help</SideNav.Item>
  </SideNav>
</div>
```
