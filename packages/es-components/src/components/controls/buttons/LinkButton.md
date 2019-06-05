Additional props supplied to the LinkButton component will be passed to the underlying button element.

## LinkButton Style Types

```
<LinkButton styleType="primary">Link Button Example</LinkButton>
```

Use the `inherited` styleType in order to inherit colors from the parent.

```
<div style={{ color: "red" }}>
  <LinkButton styleType="inherited">I am red because of my parent!</LinkButton>
</div>
```