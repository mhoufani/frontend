import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import unusedImports from "eslint-plugin-unused-imports";
import reactPlugin from 'eslint-plugin-react';
import jestDomPlugin from "eslint-plugin-jest-dom"
import turboPlugin from "eslint-plugin-turbo";

export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.recommended,
  reactPlugin.configs.flat.recommended, // This is not a plugin object, but a shareable config object
  reactPlugin.configs.flat['jsx-runtime'],
  jestDomPlugin.configs['flat/recommended'],
  turboPlugin.configs['flat/recommended'],
  {
    plugins: {
      'unused-imports': unusedImports,
    },
    rules: {
      'no-unused-vars': 'off', // or "@typescript-eslint/no-unused-vars": "off",
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],
    },
  },
);

// export default defineConfig([
//   {
//     extends: [
//       js.configs.recommended,
//       'turbo',
//       'plugin:react/recommended',
//       // 'plugin:jest-dom/recommended',
//       // 'plugin:jest/recommended',
//       'plugin:security-node/recommended',
//     ],
//     plugins: ['unused-imports', 'security-node'],
//
//   },
// ]);
  // env: {
  //   browser: true,
  //   node: true,
  //   es2021: true,
  //   worker: true,
  //   "jest/globals": true
  // },
  // parserOptions: {
  //   sourceType: 'module',
  //   ecmaVersion: 'latest',
  //   ecmaFeatures: {
  //     modules: true,
  //     spread: true,
  //     restParams: true,
  //   },
  // },
  // rules: {
  //   'unused-imports/no-unused-imports': 'error',
  //   'unused-imports/no-unused-vars': [
  //     'warn',
  //     {
  //       vars: 'all',
  //       varsIgnorePattern: '^_',
  //       args: 'after-used',
  //       argsIgnorePattern: '^_',
  //     },
  //   ],
  //   'react/react-in-jsx-scope': 'off',
  //   'react/no-array-index-key': 'off',
  //   'react/button-has-type': 'off',
  //   'react/jsx-props-no-spreading': 'off',
  //   'react/forbid-prop-types': 'off',
  //   'react/prop-types': 'warn',
  //   'react/jsx-closing-bracket-location': 'warn',
  //   'react/jsx-filename-extension': [
  //     1,
  //     {
  //       extensions: ['.js', '.jsx'],
  //     },
  //   ],
  //   'react/function-component-definition': [
  //     1,
  //     {
  //       namedComponents: [
  //         'function-expression',
  //         'arrow-function',
  //         'function-declaration',
  //       ],
  //       unnamedComponents: 'arrow-function',
  //     },
  //   ],
  //   'react/jsx-no-useless-fragment': 'warn',
  //   'react/jsx-boolean-value': 'warn',
  //   'react/no-unused-prop-types': 'warn',
  //   'react/no-unstable-nested-components': 'warn',
  //   'react/no-danger': 'off',
  //   'react/display-name': 'off',
  //   'no-empty-function': 'off',
  //   'import/no-anonymous-default-export': [2, { allowObject: true }],
  //   'no-console': [
  //     'error',
  //     {
  //       allow: ['warn', 'error', 'info'],
  //     },
  //   ],
  //   'no-param-reassign': [
  //     'warn',
  //     {
  //       props: true,
  //     },
  //   ],
  //   'prefer-destructuring': 'off',
  //   'no-shadow': 'off',
  //   'jsx-a11y/anchor-is-valid': 'off',
  //   'max-len': [
  //     'warn',
  //     {
  //       code: 100,
  //       ignoreComments: true,
  //       ignoreTrailingComments: true,
  //       ignoreUrls: true,
  //       ignoreStrings: true,
  //     },
  //   ],
  //   'no-unused-expressions': [
  //     'error',
  //     {
  //       allowShortCircuit: true,
  //       allowTernary: true,
  //     },
  //   ],
  //   'object-shorthand': 'warn',
  //   'import/no-self-import': 'warn',
  //   'spaced-comment': 'warn',
  //   'nonblock-statement-body-position': 'warn',
  //   'operator-linebreak': 'warn',
  //   'prefer-const': 'warn',
  //   'no-await-in-loop': 'warn',
  //   'no-nested-ternary': 'warn',
  //   'no-unused-vars': 'off',
  //   'default-param-last': 'warn',
  //   'arrow-body-style': 'off',
  //   'eol-last': 'warn',
  //   'jsx-a11y/label-has-associated-control': 'warn',
  //   'jsx-a11y/control-has-associated-label': 'warn',
  //   'no-underscore-dangle': 'off',
  //   'no-return-await': 'off',
  //   'import/prefer-default-export': 'off',
  //   'no-restricted-syntax': 'off',
  //   'arrow-parens': 'off',
  //   'implicit-arrow-linebreak': 'off',
  //   'no-confusing-arrow': 'off',
  //   'no-plusplus': 'off',
  //   'no-extra-boolean-cast': 'off',
  //   'no-empty-pattern': 'off',
  //   'prefer-arrow-callback': 'off',
  //   'import/order': [
  //     'warn',
  //     {
  //       groups: ['builtin', 'external', 'internal'],
  //       pathGroups: [
  //         {
  //           pattern: 'react',
  //           group: 'external',
  //           position: 'before',
  //         },
  //         // Import all .scss files before react components, because of a next.js bug where css is not correctly
  //         // applied when using dynamic imports: https://github.com/vercel/next.js/issues/33286
  //         {
  //           pattern: './*.module.scss',
  //           group: 'external',
  //           position: 'after',
  //         },
  //       ],
  //       pathGroupsExcludedImportTypes: ['react'],
  //     },
  //   ],
  // },
// };
