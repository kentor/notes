module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['prettier', 'react', 'react-hooks', '@typescript-eslint'],
  rules: {
    'prefer-const': 'error',

    'prettier/prettier': 'error',

    'react/jsx-sort-props': ['error', {ignoreCase: true}],
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': ['error'],

    'react-hooks/rules-of-hooks': 'error',

    '@typescript-eslint/array-type': ['error', 'generic'],
    '@typescript-eslint/no-unused-vars': ['error', {ignoreRestSiblings: true}],
  },
};
