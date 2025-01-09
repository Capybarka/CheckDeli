import js from '@eslint/js';
import vue from 'eslint-plugin-vue';
import globals from 'globals';
import vueEslintParser from 'vue-eslint-parser';

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
      parser: vueEslintParser,
    },
    plugins: {
      vue,
    },
    rules: {
      'vue/no-mutating-props': 'error',
      'vue/no-unused-vars': 'off',
      'vue/multi-word-component-names': 'off',
      'vue/no-reserved-component-names': 'off',
      'vue/singleline-html-element-content-newline': 'off',
      'vue/v-slot-style': 'off',
      'vue/valid-template-root': 'warn',
    },
  },
];
