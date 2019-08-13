# Exchange Solutions React components

[![Build Status](https://travis-ci.com/WTW-IM/es-components.svg?branch=master)](https://travis-ci.com/WTW-IM/es-components)
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

### Using The UMD Bundle

```html
<!DOCTYPE html>
<head>
  <meta charset="UTF-8" />
  <title>My ES Components Site</title>
  <!-- These fonts are used in the Icon sets, and in general font styles. -->
  <link rel="stylesheet" href="https://cdn.rawgit.com/WTW-IM/es-assets/8fbaf85d/font.css" />
  <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:200,200i,300,300i,400,400i,600,600i,700,700i,900,900i" rel="stylesheet" />
  <!-- You must include React and Styled Components. ES Components depends on those packages. -->
  <script crossorigin src="https://unpkg.com/react@16/umd/react.production.min.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.production.min.js"></script>
  <script crossorigin src="https://unpkg.com/styled-components/dist/styled-components.min.js"></script>
  <script crossorigin src="https://unpkg.com/es-components/bundle/main.min.js"></script>
</head>
<body>
  <!-- My ES Components Site Body -->
</body>
```
