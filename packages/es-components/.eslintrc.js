const path = require('path');
const plugins = ['import', '@babel', 'react', 'react-hooks', 'jsx-a11y'];
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
      files: [
        '.eslintrc*',
        '*.config.js',
        '*.config.mjs',
        '**/config/*.js',
        '**/build-scripts/*'
      ],
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
    },
    {
      files: ['**/*.js', '**/*.jsx', '**/*.mjs'],
      rules: {
        '@typescript-eslint/no-unsafe-assignment': 0,
        '@typescript-eslint/no-unsafe-return': 0,
        '@typescript-eslint/no-unsafe-member-access': 0,
        '@typescript-eslint/no-unsafe-argument': 0,
        '@typescript-eslint/no-unsafe-call': 0,
        '@typescript-eslint/restrict-template-expressions': 0,
        '@typescript-eslint/restrict-plus-operands': 0
      }
    }
  ]
};
