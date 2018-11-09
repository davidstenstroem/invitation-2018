module.exports = {
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    'plugin:vue/recommended',
    'standard'
  ],
  plugins: [
    'vue'
  ],
  rules: {
    'vue/max-attributes-per-line': 0
  }
}
