Icons will inherit their size unless otherwise specified. The full <a href="http://prototypes-wtw.net/media/#indv-mkt-icons" target="blank">icon set</a> shows all the available icons.

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

**Note:** Icons will not work if the `indv-mkt-icons` font face is not loaded into a stylesheet prior to using the Icon component. For example:

<pre>
&lt;head&gt;
  &lt;style&gt;
  @font-face {
    font-family: 'indv-mkt-icons';
    src: url('webfonts/indv-mkt-icons.eot?3tk8wr');
    src: url('webfonts/indv-mkt-icons.eot?3tk8wr#iefix') format('embedded-opentype'),
      url('webfonts/indv-mkt-icons.ttf?3tk8wr') format('truetype'),
      url('webfonts/indv-mkt-icons.woff?3tk8wr') format('woff'),
      url('webfonts/indv-mkt-icons.svg?3tk8wr#indv-mkt-icons') format('svg');
    font-weight: normal;
    font-style: normal;
  }
  &lt;/style&gt;
&lt;/head&gt;
</pre>

You can find these fonts in the `public/webfonts` folder
where you installed es-components (e.g. `npm_modules/es-components/public/webfonts`). You'll likely want to copy them into your own project's `public` folder.
