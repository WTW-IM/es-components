# Exchange Solutions React components

[![Build Status](https://github.com/WTW-IM/es-components/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/WTW-IM/es-components/actions/workflows/ci.yml)
[![npm version](https://badge.fury.io/js/es-components.svg)](https://badge.fury.io/js/es-components)

## Documentation and Demos

[https://wtw-im.github.io/es-components/](https://wtw-im.github.io/es-components/)

## Installation and Usage

```shell
npm install --save es-components
```

`es-components` comes optimized for tree shaking. If your build tool does not support tree shaking please direct your imports towards `es-components/lib`.
You may use either direct file paths or destructure from the index file.

```js
// use this to keep the size of your bundles light
import Component from 'es-components/lib/path/to/component';
// or
import { Component } from 'es-components/lib';
```

## Typescript

es-components is functional with both `styled-components@5` and `styled-components@6`. However, if you are using typescript, we recommend using `styled-components@6` **without** `@types/styled-components`. If on `styled-components@5` with `@types/styled-components`, some types within es-components will break.

````shell

### Using The UMD Bundle

Because ES Components needs a reference to `document.body` on startup, you must either include the `defer` attribute, or place the `<script>` tag somwhere within the `body` of your html page. Here we're showing it using the `defer` attribute.

```html
<!DOCTYPE html>
<head>
  <meta charset="UTF-8" />
  <title>My ES Components Site</title>
  <!-- These fonts are used by es-components -->
  <link
    rel="stylesheet"
    href="https://app.viabenefits.com/static/cdn/es-assets/icons.css"
  />
  <link
    rel="stylesheet"
    href="https://app.viabenefits.com/static/cdn/es-assets/source-sans-pro.css"
  />
  <!-- You must include React, ReactDOM, PropTypes and Styled Components. ES Components depends on those packages. -->
  <script
    crossorigin
    src="https://app.viabenefits.com/static/third-party/react@16/umd/react.production.min.js"
  ></script>
  <script
    crossorigin
    src="https://app.viabenefits.com/static/third-party/react-dom@16/umd/react-dom.production.min.js"
  ></script>
  <script
    crossorigin
    src="https://app.viabenefits.com/static/third-party/prop-types@15/prop-types.js"
  ></script>
  <script
    crossorigin
    src="https://app.viabenefits.com/static/third-party/styled-components/dist/styled-components.min.js"
  ></script>
  <script
    crossorigin
    defer
    src="https://app.viabenefits.com/static/third-party/es-components/bundle/main.min.js"
  ></script>
</head>

<body>
  <!-- My ES Components Site Body -->
</body>
````

### Jest

es-components uses `ResizeObserver`, but if you're using jsdom, it doesn't come with it. You can set
up jest to work with es-components by using `build-utils/jest` in your `setupFilesAfterEnv`
configuration. Eg:

```jsx
// jest.config.js

module.exports = {
  // other jest config
  setupFilesAfterEnv: [
    'es-components/build-utils/jest'
    // others...
  ]
};
```
