module.exports = {
  env: {
    node: true,
  },
  extends: [
    'eslint:recommended', // https://eslint.org/docs/rules/
    'plugin:vue/vue3-essential' // https://eslint.vuejs.org/user-guide/#usage
  ],
  rules: {
    // 'ruleName': ['off, warn, error', { ruleOptions }]
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'brace-style': ['error', 'stroustrup', { allowSingleLine: true }],
    'no-unused-vars': ['warn']
  },
};
