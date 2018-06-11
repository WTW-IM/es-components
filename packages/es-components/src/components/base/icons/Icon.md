Icons will inherit their size unless otherwise specified. <a href="https://cdn.rawgit.com/WTW-IM/es-assets/d886bdc4/font-demo.html" target="blank">This page</a> displays all the available icons.

```
const containerStyle = {
  backgroundColor: '#ddd',
  padding: '10px',
  width: '400px',
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

**Note:** Icons require the `indv-mkt-icons` font from [es-assets](https://github.com/WTW-IM/es-assets). You can use the following [rawgit](https://rawgit.com) link to reference the required font styles in your project:

```html
  <link rel="stylesheet" href="https://cdn.rawgit.com/WTW-IM/es-assets/8fbaf85d/font.css">
```
