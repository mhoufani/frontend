import eslint from "@eslint/js";
import tsEslint from 'typescript-eslint';
import globals from "globals";
import prettierConfig from 'eslint-config-prettier';
import turboConfig from 'eslint-config-turbo';

export default tsEslint.config(
  eslint.configs.recommended,
  ...tsEslint.configs.strict,
  ...tsEslint.configs.stylistic,
  // ...turboConfig,
  // ...prettierConfig,
  {
    languageOptions: {
      sourceType: 'commonjs',
      globals: { ...globals.node }
    },
    rules: {
      "@typescript-eslint/no-dynamic-delete": "off",
      "@typescript-eslint/no-unused-expressions": ["error", { "allowShortCircuit": true, "allowTernary": true }]
  }}
);
