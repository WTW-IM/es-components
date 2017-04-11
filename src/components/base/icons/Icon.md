Icons will inherit their size unless otherwise specified. The full <a href="https://qa-es-ui-guidelines-whitlockjohn.c9users.io/media/#glyphicons" target="_blank">icon set</a> shows all the available icons.

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

**Note:** Icons will not work if the ``oecom-icons`` and ``oe-icons-light`` font faces are not loaded into a stylesheet prior to using the Icon component.