Icons will inherit their size unless otherwise specified. <a href="https://bdaim-webexcdn-p.azureedge.net/es-assets/icon-demo.html" target="blank">This page</a> displays all the available icons.

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

**Note:** Icons require the `bds-func-icons-v2` font. Icons will load the font automatically, but you can use the following `link` to preload the required font and classes in your project:

```html
<link
  rel="preload"
  href="https://bdaim-webexcdn-p.azureedge.net/es-assets/icons.css"
  as="style"
/>
```
