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
  plugins,
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      destructuring: true,
      experimentalObjectRestSpread: true,
      ecmaVersion: 'latest'
    }
  },
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
          '**/ExampleWrapper.js',
          '**/test-utils.js'
        ]
      }
    ],
    'prefer-arrow-callback': 0,
    'id-length': 0
  },
  overrides: [
    {
      files: ['.eslintrc*', '*.config.js', '**/config/*'],
      env: {
        node: true
      }
    },
    {
      files: ['*.specs.*'],
      extends: [
        ...exts,
        'plugin:jest/recommended',
        'plugin:testing-library/react'
      ]
    }
  ],
  env: {
    browser: true
  }
};
