import typescriptEslint from '@typescript-eslint/eslint-plugin';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import parser from '@typescript-eslint/parser';

export default [
  {
    ignores: [
      'public/**/*',
      'src/js/components/icons/*',
      'src/js/components/Icon.tsx',
    ],
    files: ['**/*.{js,ts,tsx}'],
    languageOptions: {
      parser,
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      '@typescript-eslint': typescriptEslint,
    },
    rules: {
      'prefer-const': 'error',

      'react/jsx-sort-props': ['error', { ignoreCase: true }],
      'react/jsx-uses-react': 'error',
      'react/jsx-uses-vars': ['error'],

      'react-hooks/rules-of-hooks': 'error',

      '@typescript-eslint/array-type': [
        'error',
        { default: 'generic', readonly: 'generic' },
      ],
      '@typescript-eslint/no-unused-vars': [
        'error',
        { caughtErrors: 'none', ignoreRestSiblings: true },
      ],
    },
  },
];
