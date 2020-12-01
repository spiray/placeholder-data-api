module.exports = {
  env: {
    node: true,
    es2021: true
  },
  extends: ['airbnb-base', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    'prettier/prettier': 'error'
  },
  overrides: [
    {
      files: '**/*.ts',
      rules: {
        'import/no-unresolved': 0,
        'import/extensions': 0,
        'import/prefer-default-export': 0
      }
    }
  ]
};
