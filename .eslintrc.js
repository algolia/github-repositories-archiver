module.exports = {
  extends: ['algolia', 'algolia/jest'],
  rules: {
    'import/no-commonjs': 'off',
    'no-console': 'off',
    'no-process-exit': 'off',
    'no-warning-comments': 'off',
    'no-nested-ternary': 'off',
    'no-param-reassign': 'off',
    'prettier/prettier': 'off',
  },
};
