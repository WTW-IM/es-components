const path = require('path');
const plugins = [
  'import',
  '@typescript-eslint',
  'react',
  'react-hooks',
  'jsx-a11y'
];
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
    project: [path.join(__dirname, 'lint-tsconfig.json')]
  },
  env: {
    browser: true,
    es2021: true
  },
  extends: exts,
  plugins,
  root: true,
  settings: {
    react: {
      version: 'detect'
    },
    'import/core-modules': ['es-components-shared-types']
  },
  ignorePatterns: [
    '**/node_modules/**',
    'node_modules/**',
    'dist/**',
    'cjs/**',
    'lib/**',
    'bundle/**',
    'docs/**'
  ],
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
          '**/*.specs.{js,jsx,ts,tsx}',
          '**/test-utils.*',
          '**/styleguide/*.{js,jsx,ts,tsx}',
          '**/cypress/**/*.js'
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
      files: ['**/*.js', '**/*.jsx'],
      rules: {
        '@typescript-eslint/no-unsafe-assignment': 0,
        '@typescript-eslint/no-unsafe-return': 0,
        '@typescript-eslint/no-unsafe-member-access': 0
      }
    },
    {
      files: [
        '.eslintrc*',
        '*.config.*',
        '**/config/*',
        '**/build-scripts/*',
        '**/test-utils.*'
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
        ],
        '@typescript-eslint/no-var-requires': 0
      }
    },
    {
      files: ['cypress/**/*'],
      plugins: ['cypress', ...plugins],
      env: {
        'cypress/globals': true
      },
      extends: ['plugin:cypress/recommended', ...exts]
    },
    {
      files: ['*.specs.*', '**/test-utils.*'],
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        },
        ecmaVersion: 'latest',
        project: [path.join(__dirname, 'config', 'test-tsconfig.json')]
      },
      env: {
        es2021: true,
        jest: true,
        browser: true
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
