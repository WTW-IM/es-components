A `Heading` component can be used for various heading levels. Wrap secondary text in `<small>` tags. Provide an `underlineColor` to display a styled border.
Larger headings will resize appropriately in mobile viewports.

```jsx
<div>
  <Heading level={1} underlineColor="#00a0d2">
    h1. Heading <small>Secondary Text</small>
  </Heading>
  <Heading level={2} underlineColor="#979797">
    h2. Heading <small>Secondary Text</small>
  </Heading>
  <Heading level={3}>
    h3. Heading <small>Secondary Text</small>
  </Heading>
  <Heading level={4}>
    h4. Heading <small>Secondary Text</small>
  </Heading>
  <Heading level={5}>
    h5. Heading <small>Secondary Text</small>
  </Heading>
  <Heading level={6}>
    h6. Heading <small>Secondary Text</small>
  </Heading>
</div>
```

Use `isKnockoutStyle` to display a special page-level heading style.

```jsx
<Heading level={1} isKnockoutStyle>
  Knockout Heading
</Heading>
```

Many pages use this style as a page-level Heading, so for simplicity, we're also
exporting a `PageHeading` component:

```jsx
import { PageHeading } from './Heading';
<div>
  <div style={{ backgroundColor: 'lightgray', padding: 15, marginBottom: 10 }}>
    <pre
      style={{ margin: 0 }}
    >{`<PageHeading>Welcome to the Page!</PageHeading>`}</pre>
  </div>
  <PageHeading>Welcome to the Page!</PageHeading>
</div>;
```

The font size may be overridden by that of another level by providing the `size` prop.

```jsx
<div>
  <Heading level={1} size={3}>
    h1. Heading in h3 size
  </Heading>
</div>
```
