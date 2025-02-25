import eslint from '@eslint/js';
import tseslint, { configs as tseslintConfigs } from 'typescript-eslint';
import importPlugin from 'eslint-plugin-import';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import cypressPlugin from 'eslint-plugin-cypress/flat';
import jestPlugin from 'eslint-plugin-jest';
import testingLibraryPlugin from 'eslint-plugin-testing-library';
import globals from 'globals';

const __dirname = import.meta.dirname;

const plugins = {
  react: reactPlugin,
  'react-hooks': reactHooksPlugin
};

export default tseslint.config(
  eslint.configs.recommended,
  jsxA11yPlugin.flatConfigs.recommended,
  reactPlugin.configs.flat.recommended,
  importPlugin.flatConfigs.recommended,
  importPlugin.flatConfigs.typescript,
  tseslintConfigs.recommendedTypeChecked,
  {
    // ignores needs to be its own config block
    ignores: [
      '**/node_modules/',
      '**/dist/',
      '**/cjs/',
      '**/lib/',
      '**/bundle/',
      '**/docs/',
      '**/es-components/types/',
      '**/es-components/shared/'
    ]
  },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2021,
        ASSETS_PATH: 'readonly'
      },
      ecmaVersion: 'latest',
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        },
        // project: [
        //   './tsconfig.json',
        //   './packages/*/tsconfig.json',
        //   './shared/*/tsconfig.json'
        // ],
        projectService: true,
        tsConfigRootDir: __dirname
      }
    },
    plugins,
    settings: {
      react: {
        version: 'detect'
      },
      'import/core-modules': ['es-components-shared-types'],
      'import/resolver': {
        node: true,
        typescript: true
      }
    },
    rules: {
      ...reactHooksPlugin.configs.recommended.rules,
      '@typescript-eslint/no-unused-vars': ['warn'],
      '@typescript-eslint/restrict-template-expressions': [
        'error',
        { allowNumber: true, allowBoolean: true, allowNullish: true }
      ],
      'max-len': 0,
      'jsx-a11y/img-uses-alt': 0,
      'jsx-a11y/redundant-alt': 0,
      'jsx-a11y/valid-aria-role': 0,
      'import/prefer-default-export': 0,
      'react/jsx-filename-extension': 0,
      'import/no-named-as-default': 0,
      'react/no-find-dom-node': 0,
      'react/jsx-no-bind': 0,
      'react/destructuring-assignment': 0,
      'linebreak-style': 0,

      // import rules handled by typescript
      'import/default': 0,
      'import/named': 0,
      'import/namespace': 0,
      'import/no-named-as-default-member': 0,
      'import/no-unresolved': 0,

      // other rules handled by typescript
      'no-undefined': 'off',
      'no-unused-vars': 'off',

      'import/no-extraneous-dependencies': [
        'error',
        {
          devDependencies: [
            '*.config.{js,jsx,mjs,ts,tsx}',
            '**/config/*.{js,jsx,mjs,ts,tsx}',
            '**/*.config.{js,jsx,mjs,ts,tsx}',
            '**/*.specs.{js,jsx,ts,tsx}',
            '**/test-utils.{js,jsx,ts,tsx}',
            '**/styleguide/*.{js,jsx,ts,tsx}',
            '**/cypress/**/*.js',
            '**/global.d.ts',
            '**/full-color-icons.tsx',
            '**/workflow-helpers/*.{js,jsx,mjs,ts,tsx}'
          ]
        }
      ],
      'prefer-arrow-callback': 0,
      'id-length': 0,
      'react/no-unknown-property': ['error', { ignore: ['css'] }]
    }
  },
  {
    files: ['**/*-theme/**/index.ts'],
    rules: {
      '@typescript-eslint/no-unused-vars': 0
    }
  },
  {
    files: [
      '**/*.config.{js,jsx,mjs,ts,tsx}',
      '**/config/*.{js,jsx,mjs,ts,tsx}',
      '**/build-scripts/*.{js,jsx,mjs,ts,tsx}',
      '**/test-utils.{js,jsx,mjs,ts,tsx}',
      '**/build-utils/*.{js,jsx,mjs,ts,tsx}',
      '**/workflow-helpers/*.{js,jsx,mjs,ts,tsx}',
      '**/.prettierrc.{js,jsx,mjs,ts,tsx}'
    ],
    languageOptions: {
      globals: {
        ...globals.node
      }
    },
    rules: {
      '@typescript-eslint/no-require-imports': 0,
      '@typescript-eslint/no-var-requires': 0
    }
  },
  {
    files: [
      '**/cypress/*.{js,jsx,mjs,ts,tsx}',
      '**/cypress/**/*.{js,jsx,mjs,ts,tsx}'
    ],
    extends: [cypressPlugin.configs.globals, cypressPlugin.configs.recommended]
  },
  {
    files: [
      '**/cypress/plugins/**/*.{js,jsx,mjs,ts,tsx}',
      '**/cypress/plugins/*.{js,jsx,mjs,ts,tsx}'
    ],
    languageOptions: {
      globals: {
        ...cypressPlugin.configs.globals.languageOptions.globals,
        ...globals.node
      }
    }
  },
  {
    files: ['**/*.specs.{js,jsx,ts,tsx}', '**/test-utils.{js,jsx,ts,tsx}'],
    plugins: {
      jest: jestPlugin
    },
    extends: [
      jestPlugin.configs['flat/recommended'],
      testingLibraryPlugin.configs['flat/react']
    ],
    rules: {
      'testing-library/prefer-screen-queries': 'warn',
      'testing-library/no-node-access': 'warn',
      'testing-library/prefer-presence-queries': 'warn',
      'testing-library/no-container': 'warn'
    }
  },
  {
    files: ['**/*.{js,jsx,mjs}', '*.{js,jsx,mjs}'],
    extends: [tseslintConfigs.disableTypeChecked, eslint.configs.recommended],
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
);
