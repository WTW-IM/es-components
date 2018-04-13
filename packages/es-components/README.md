Exchange Solutions React components
==================

[![Build Status](https://travis-ci.org/WTW-IM/es-components.svg?branch=master)](https://travis-ci.org/WTW-IM/es-components)
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

## Versioning

Use [semantic versioning](http://semver.org/) to ensure that a consistent version is always available for publish. Use ``npm version`` in order to increase the version numbers. Push version updates as a separate commit.

### Major

Consider a major version update when any of the following is true:
- a dependency is updated to the next major version
- a new dependency is added that requires major infrastructure changes (build tools, testing tools, etc.)

### Minor

Consider a minor version update when any of the following is true:
- a new component is added to the package exports
- a new feature is added to an existing component
- build tooling is updated or fixed

### Patch

Consider a patch version update when any of the following is true:
- a bug fix is made to an existing component

## Publishing

### Publishing to npm

Consider publishing to npm when any of the following is true
- a new component is added to the package exports

### Publishing Documentation

Any time the npm package is published, the documentation should be updated as well. Execute ``npm run styleguide-build`` to generate a new version of the docs. Push documentation build as a seperate commit.

## Contributing

When adding a component, refer to the [Exchange Solutions UI Guidelines](http://prototypes-wtw.net/). This is a work-in-progress, so communicate with the UX team if you have any questions.

Submit a pull request when you're ready to have your code reviewed and apply the ``ready for review`` label. Once it has been reviewed, ensure the version and documentation commits have been added and apply the ``ready for merge`` label.

See [CONTRIBUTING.md](CONTRIBUTING.md) for more information on standards.

## Tools

Components are built using [React](https://facebook.github.io/react/) and [styled-components](https://styled-components.com/). Tests are written using
[Jest](https://facebook.github.io/jest/) with [Enzyme](http://airbnb.io/enzyme/) for rendering.

The component guide is built using [react-styleguidist](https://github.com/styleguidist/react-styleguidist).

## Project Structure
```
- src
| - components
  | - base
    | - icons
      | - Icon.js
      | - Icon.md
      | - Icon.specs.js
```


## Build commands
```
npm run build (build javascript)
npm run styleguide-server (run the styleguide on localhost:6060)
```
