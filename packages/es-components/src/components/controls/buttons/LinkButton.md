Additional props supplied to the LinkButton component will be passed to the underlying button element.

### LinkButton Style Types

```
<p aria-live="polite">
  <LinkButton styleType="primary">Primary</LinkButton><br />
  <LinkButton styleType="success">Success</LinkButton><br />
  <LinkButton styleType="information">Info</LinkButton><br />
  <LinkButton styleType="warning">Warning</LinkButton><br />
  <LinkButton styleType="danger">Danger</LinkButton><br />
</p>
```

Use the `inherited` styleType in order to inherit colors from the parent.

```
<div style={{ color: "red" }}>
  <LinkButton styleType="inherited">I am red because of my parent!</LinkButton>
</div>
```
