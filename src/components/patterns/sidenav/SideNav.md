```
<div style={{display: 'flex'}}>
  <div style={{width: '30%', marginRight: '4em'}}>
    <h3>Standard</h3>
    <SideNav defaultSelected="home">
      <SideNav.Item id="home" title="Home" targetUrl="#home" />
      <SideNav.Item id="cart" title="Cart">Cart</SideNav.Item>
      <SideNav.Item id="help" title="Help" />
      <SideNav.Item id="info" title="About" />
      <SideNav.Item id="disabled" title="Diabled" isDisabled />
    </SideNav>
  </div>

  <div style={{width: '30%'}}>
    <h3>Alternate Style</h3>
    <SideNav defaultSelected="home" altStyle>
      <SideNav.Item id="home" title="Home" />
      <SideNav.Item id="cart" title="Cart">Cart</SideNav.Item>
      <SideNav.Item id="help" title="Help" />
      <SideNav.Item id="info" title="About" />
      <SideNav.Item id="disabled" title="Diabled" isDisabled />
    </SideNav>
  </div>
</div>
```

Assign a ```targetUrl``` to set the nav link href location. Use ```isExternalLink``` to open the link in a new browser window.
```
<div style={{width: '30%'}}>
  <SideNav defaultSelected="home">
    <SideNav.Item id="home" targetUrl="/" title="Home" onNavClick={ () => (alert('Time to go Home!'))} />
    <SideNav.Item id="medicare" targetUrl="https://medicare.oneexchange.com" title="Medicare" isExternalLink />
    <SideNav.Item id="alerts" targetUrl="#alert" title="Alert Section" />
  </SideNav>
</div>
```

Setting ```onItemSelected``` will execute the function when a ```SideNav.Item``` is clicked.
```
<div style={{width: '30%'}}>
  <SideNav defaultSelected="home" onItemSelected={ (id) => {alert(id); }}>
    <SideNav.Item id="home" title="Home" />
    <SideNav.Item id="cart" title="Cart" />
    <SideNav.Item id="info" isDisabled title="Disabled" />
  </SideNav>
</div>
```

Set ```onNavClick``` on an individual ```SideNav.Item```.
```
<div style={{width: '30%'}}>
  <SideNav defaultSelected="home" altStyle>
    <SideNav.Item id="home" onNavClick={ () => (alert('Time to go Home!'))} title="Home" />
    <SideNav.Item id="cart" onNavClick={ () => (alert('You clicked the Cart!'))} title="Cart" />
    <SideNav.Item id="info" isDisabled title="Disabled" />
  </SideNav>
</div>
```

Manage selected item state manually using ```selected``` instead of ```defaultSelected```.
```
<div style={{width: '30%'}}>
  <SideNav selected={state.selected} onItemSelected={ (id) => {setState({selected: id})} }>
    <SideNav.Item id="home" title="Home" />
    <SideNav.Item id="cart" title="Cart" />
    <SideNav.Item id="help" title="Help" />
  </SideNav>
</div>
```
