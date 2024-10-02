import eslint from "@eslint/js";
import tsEslint from 'typescript-eslint';
import prettierConfig from 'eslint-config-prettier';
import turboConfig from 'eslint-config-turbo';

export default tsEslint.config(
  eslint.configs.recommended,
  ...tsEslint.configs.strict,
  ...tsEslint.configs.stylistic,
  // ...turboConfig,
  // ...prettierConfig,
);
