const path = require('path');
const plugins = ['import', '@typescript-eslint'];
const exts = [
  'eslint:recommended',
  'plugin:jsx-a11y/recommended',
  'plugin:react/recommended',
  'plugin:react-hooks/recommended',
  'plugin:@typescript-eslint/recommended',
  'plugin:@typescript-eslint/recommended-requiring-type-checking'
];

module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 'latest',
    project: path.join(__dirname, 'config', 'lint-tsconfig.json')
  },
  extends: exts,
  plugins,
  root: true,

  rules: {
    '@typescript-eslint/no-unused-vars': ['warn'],
    'no-undefined': 'off', // typescript handles this
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
    'import/named': 0,
    'import/namespace': 0, // typescript handles this
    'import/default': 0, // typescript handles this
    'import/no-named-as-default-member': 0, // typescript handles this
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          '**/*.specs.js',
          '**/*.specs.ts',
          '**/*.specs.tsx',
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
      files: ['**/*.js', '**/*.jsx'],
      rules: {
        '@typescript-eslint/no-unsafe-assignment': 0,
        '@typescript-eslint/no-unsafe-return': 0,
        '@typescript-eslint/no-unsafe-member-access': 0
      }
    },
    {
      files: ['.eslintrc.js', '*.config.js', '**/config/*.js'],
      parser: '@babel/eslint-parser',
      plugins: ['import', '@babel'],
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
          destructuring: true,
          experimentalObjectRestSpread: true,
          ecmaVersion: 'latest'
        }
      },
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
        es2021: true,
        jest: true
      },
      extends: [
        ...exts,
        'plugin:jest/recommended',
        'plugin:testing-library/react'
      ],
      rules: {
        'testing-library/prefer-screen-queries': 'warn',
        'testing-library/no-node-access': 'warn',
        'testing-library/prefer-presence-queries': 'warn',
        'testing-library/no-container': 'warn'
      }
    }
  ],
  env: {
    browser: true
  }
};
