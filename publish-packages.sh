#!/bin/bash

cd packages/es-components
echo "//registry.npmjs.org/:_authToken=\${NPM_TOKEN}" > .npmrc
npm publish || true
rm .npmrc
cd ../es-components-via-theme
echo "//registry.npmjs.org/:_authToken=\${NPM_TOKEN}" > .npmrc
npm publish || true
rm .npmrc
cd ../es-components-wtw-theme
echo "//registry.npmjs.org/:_authToken=\${NPM_TOKEN}" > .npmrc
npm publish || true
rm .npmrc
cd ../..
