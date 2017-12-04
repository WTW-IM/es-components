Icons will inherit their size unless otherwise specified. The full <a href="http://prototypes-wtw.net/media/#glyphicons" target="blank">icon set</a> shows all the available icons.

```
const containerStyle = {
  backgroundColor: '#ddd',
  padding: '10px',
  width: '400px',
};

<div>
  <div style={containerStyle}>
    <Icon size={48} name="federal" /> Regular
  </div>
  <div style={containerStyle}>
    <Icon size={48} name="home" lightweight /> Light icons use a lighter weight icon font
  </div>
</div>
```

**Note:** Icons will not work if the `oecom-icons` and `oe-icons-light` font faces are not loaded into a stylesheet prior to using the Icon component.

<pre>
&lt;head&gt;
  &lt;style&gt;
    @font-face {
      font-family: 'oecom-icons';
      src:url('webfonts/oecom-icons.eot');
      src:url('webfonts/oecom-icons.eot') format('embedded-opentype'),
          url('webfonts/oecom-icons.woff') format('woff'),
          url('webfonts/oecom-icons.ttf') format('truetype'),
          url('webfonts/oecom-icons.svg') format('svg');
    }

    @font-face {
      font-family: 'oe-icons-light';
      src:url('webfonts/oe-icons-light.eot');
      src:url('webfonts/oe-icons-light.eot') format('embedded-opentype'),
          url('webfonts/oe-icons-light.woff') format('woff'),
          url('webfonts/oe-icons-light.ttf') format('truetype'),
          url('webfonts/oe-icons-light.svg') format('svg');
    }
  &lt;/style&gt;
&lt;/head&gt;
</pre>

You can find these fonts in the `public/webfonts` folder
where you installed es-components (e.g. `npm_modules/es-components/public/webfonts`). You'll likely want to copy them into your own projects `public` folder.
