#!/bin/sh
cd packages/es-components
npm run styleguide-build
mv docs/ ../../
cd ../../
git add docs/
