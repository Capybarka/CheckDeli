import js from '@eslint/js';
import vue from 'eslint-plugin-vue';
import globals from 'globals';
import * as espree from 'espree'; // Используем именованный импорт для espree

export default [
  js.configs.recommended,
  {
    files: ['**/*.js', '**/*.vue'],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      globals: {
        ...globals.browser,
      },
      parser: espree,
    },
    plugins: {
      vue,
    },
    rules: {
      'vue/no-unused-vars': 'warn',
      quotes: ['error', 'single'],
      'no-console': 'warn',
    },
  },
];
