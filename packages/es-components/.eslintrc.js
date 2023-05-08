const path = require('path');
const plugins = ['import', '@babel'];
const exts = [
  'eslint:recommended',
  'plugin:jsx-a11y/recommended',
  'plugin:react/recommended',
  'plugin:react-hooks/recommended'
];
module.exports = {
  extends: exts,
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      destructuring: true,
      experimentalObjectRestSpread: true
    },
    babelOptions: {
      configFile: path.join(__dirname, 'babel.config.js')
    }
  },
  env: {
    browser: true,
    es2021: true
  },
  plugins,
  rules: {
    'no-unused-vars': ['warn'],
    'max-len': 0,
    'jsx-a11y/img-uses-alt': 0,
    'jsx-a11y/redundant-alt': 0,
    'jsx-a11y/valid-aria-role': 0,
    'import/prefer-default-export': 0,
    'react/jsx-filename-extension': 0,
    'import/no-named-as-default': 0,
    'react/forbid-prop-types': 0,
    'react/no-find-dom-node': 0,
    'react/jsx-no-bind': 0,
    'react/destructuring-assignment': 0,
    'linebreak-style': 0,
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          '**/*.specs.js',
          '**/test-utils.js',
          '**/styleguide/*.{js,jsx,ts,tsx}'
        ]
      }
    ],
    'prefer-arrow-callback': 0,
    'id-length': 0,
    'react/no-unknown-property': ['error', { ignore: ['css'] }]
  },
  globals: {
    ASSETS_PATH: 'readonly'
  },
  overrides: [
    {
      files: ['.eslintrc*', '*.config.js', '**/config/*', '**/build-scripts/*'],
      env: {
        node: true
      },
      rules: {
        'import/no-extraneous-dependencies': [
          'error',
          {
            devDependencies: true
          }
        ]
      }
    },
    {
      files: ['*.specs.*'],
      env: {
        es2021: true
      },
      extends: [
        ...exts,
        'plugin:jest/recommended',
        'plugin:testing-library/react'
      ]
    }
  ]
};
