import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin'; // Убедитесь, что этот плагин установлен
import pluginReact from 'eslint-plugin-react';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ['/*.{js,mjs,cjs,ts,jsx,tsx}'],
    ignores: ['/node_modules/', '/dist/', 'dist/index.js', '/build/**'],
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
  {
    rules: {
      // Отключаем правило @typescript-eslint/no-unused-vars
      '@typescript-eslint/no-unused-vars': 'off',

      // Или настраиваем его, чтобы игнорировать переменные, начинающиеся с "_"
      '@typescript-eslint/no-unused-vars': [
        'warn', // или 'error', если хотите видеть предупреждения/ошибки
        {
          vars: 'all',
          args: 'after-used',
          ignoreRestSiblings: true,
          argsIgnorePattern: '^_', // Игнорировать переменные, начинающиеся с "_"
          varsIgnorePattern: '^_', // Игнорировать переменные, начинающиеся с "_"
        },
      ],
    },
  },
];