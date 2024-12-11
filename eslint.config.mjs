import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';

/** @type {import('eslint').Linter.Config[]} */
export default [
    {
    files: ['/*.{js,mjs,cjs,ts,jsx,tsx}'],
    ignores: ['**/node_modules/**', '**/dist/**','dist/index.js' ,'**/build/**'],
  },
  {
    languageOptions: {
      globals: globals.browser,
    },
  },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        __dirname: 'readonly', 
      },
    },
  },

  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
];
