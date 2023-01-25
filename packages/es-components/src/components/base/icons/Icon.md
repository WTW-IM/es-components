Icons will inherit their size unless otherwise specified. <a href="{{ASSETS_PATH}}icon-demo.html" target="blank">This page</a> displays all the available icons.

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

**Note:** Icons require the `bds-func-icons-v2` font. Icons will load the font
automatically, but you can use the following `link` tags to preload the required font
and classes in your project. To ensure that fonts load on the global scope
([@font-face won't work inside a Shadow Root unless they are](https://github.com/stevematney/writing/blob/master/web-components/micro-frontend-composition-with-web-components.md#fonts)),
you can also add the same script as a preload `<link>` with `as="font"`.

```html
<link rel="preload" href="{{ASSETS_PATH}}icons.css" as="style" />
<link rel="preload" href="{{ASSETS_PATH}}icons.css" as="font" />
```
