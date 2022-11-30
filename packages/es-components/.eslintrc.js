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
      files: ['*.ts', '*.tsx'],
      extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking'
      ],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        },
        ecmaVersion: 'latest',
        project: path.join(__dirname, 'tsconfig.json')
      },
      plugins: ['@typescript-eslint']
    },
    {
      files: ['.eslintrc*', '*.config.js', '**/config/*'],
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
