A `Heading` component can be used for various heading levels. Wrap secondary text in `<small>` tags.

```
<div>
  <Heading level={1}>h1. Heading <small>Secondary Text</small></Heading>
  <Heading level={2}>h2. Heading <small>Secondary Text</small></Heading>
  <Heading level={3}>h3. Heading <small>Secondary Text</small></Heading>
  <Heading level={4}>h4. Heading <small>Secondary Text</small></Heading>
  <Heading level={5}>h5. Heading <small>Secondary Text</small></Heading>
  <Heading level={6}>h6. Heading <small>Secondary Text</small></Heading>
</div>
```

The font size may be overridden by that of another level by providing the `size` prop.

```
<div>
  <Heading level={1} size={3}>h1. Heading in h3 size</Heading>
</div>
```
