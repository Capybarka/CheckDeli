import js from '@eslint/js';
import vue from 'eslint-plugin-vue'; // Импортируем плагин для Vue

export default [
    js.configs.recommended,
    {
        files: ['**/*.js', '**/*.vue'],
        languageOptions: {
            ecmaVersion: 2021,
            sourceType: 'module',
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
