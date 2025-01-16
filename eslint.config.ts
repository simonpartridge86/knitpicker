import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  {
    plugins: {},
    languageOptions: {
      parserOptions: {
        project: true,
      },
    },
    // ESLint
    rules: {},
  },
  // TypeScript
  {
    rules: {},
  }
);
