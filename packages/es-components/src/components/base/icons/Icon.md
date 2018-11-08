Icons will inherit their size unless otherwise specified. <a href="https://wtw-bdaim-cdn.azureedge.net/es-assets/es-assets-master/font-demo.html" target="blank">This page</a> displays all the available icons.

```
const containerStyle = {
  backgroundColor: '#ddd',
  padding: '10px',
  width: '150px',
};

<div>
  <div style={containerStyle}>
    <Icon size={24} name="accessibility" />
  </div>
  <div style={containerStyle}>
    <Icon size={48} name="home" />
  </div>
</div>
```

**Note:** Icons require the `indv-mkt-icons` font from [es-assets](https://github.com/WTW-IM/es-assets). You can use the following link to reference the required font styles in your project:

```html
  <link rel="stylesheet" href="https://wtw-bdaim-cdn.azureedge.net/es-assets/es-assets-master/font.css">
```
