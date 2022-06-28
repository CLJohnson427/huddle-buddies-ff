module.exports = {
  env: {
    node: true,
  },
  extends: [
    "eslint:recommended", // https://eslint.org/docs/rules/
    "plugin:vue/vue3-essential", // https://eslint.vuejs.org/user-guide/#usage
    "prettier", // https://prettier.io/docs/en/options.html
  ],
  rules: {
    // override/add rules settings here, such as:
    // 'vue/no-unused-vars': 'error'
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "brace-style": ["error", "stroustrup", { allowSingleLine: true }]
  },
};
