module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    'eslint:recommended'
  ],
  rules: {
    'no-console': 'off',
    // 'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': 'off',
    "no-mixed-spaces-and-tabs": 0,
    "no-unused-vars": "off"
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
