module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'airbnb-base',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    'no-underscore-dangle': 0,
    'arrow-parens': 0,
    'guard-for-in': 0,
    "no-restricted-syntax": 0,
    'no-param-reassign': ["error", { "props": false }],
    'arrow-body-style' : 1,
    'no-unused-vars': 1,
  },
};
