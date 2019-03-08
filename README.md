# [es-components](https://github.com/WTW-IM/es-components/blob/master/packages/es-components/README.md)

[![npm version](https://badge.fury.io/js/es-components.svg)](https://badge.fury.io/js/es-components)
[![Build Status](https://travis-ci.com/WTW-IM/es-components.svg?branch=master)](https://travis-ci.com/WTW-IM/es-components)
[![dependency status](https://david-dm.org/wtw-im/es-components.svg?path=packages%2Fes-components)](https://david-dm.org/wtw-im/es-components?path=packages%2Fes-components)

# es-components-via-theme

[![npm version](https://badge.fury.io/js/es-components-via-theme.svg)](https://badge.fury.io/js/es-components-via-theme)

# es-components-wtw-theme

[![npm version](https://badge.fury.io/js/es-components-wtw-theme.svg)](https://badge.fury.io/js/es-components-wtw-theme)

## Contributing

Commit messages should follow the [eslint conventional commit](https://www.npmjs.com/package/conventional-changelog-eslint)
structure. References to github issues are not required.

Submit a pull request when you're ready to have your code reviewed and apply the ``ready for review`` label.

See [CONTRIBUTING.md](CONTRIBUTING.md) for more information on standards.

## Tools

Components are built using [React](https://facebook.github.io/react/) and [styled-components](https://styled-components.com/). Tests are written using
[Jest](https://facebook.github.io/jest/) with [Enzyme](http://airbnb.io/enzyme/) for rendering.

The component guide is built using [react-styleguidist](https://github.com/styleguidist/react-styleguidist).

## Project Structure
```
packages
├── es-components
│   └── src
│       └── components
│           └── base
│               └── icons
│                   ├── Icons..specs.js
│                   ├── Icons.js
│                   └── Icons.md
├── es-components-via-theme
│   └── index.js
└── es-components-wtw-theme
    └── index.js
```

## Build commands
```
npm run build (build javascript)
npm start (run the styleguide on localhost:6060)
```
