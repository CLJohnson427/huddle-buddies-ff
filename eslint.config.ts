import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'
import pluginVue from 'eslint-plugin-vue'
import { globalIgnores } from 'eslint/config'

// To allow more languages other than `ts` in `.vue` files, uncomment the following lines:
// import { configureVueProject } from '@vue/eslint-config-typescript'
// configureVueProject({ scriptLangs: ['ts', 'tsx'] })
// More info at https://github.com/vuejs/eslint-config-typescript/#advanced-setup

export default defineConfigWithVueTs(
  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,mts,tsx,vue}'],
  },

  globalIgnores(['**/dist/**', '**/dist-ssr/**', '**/coverage/**']),

  pluginVue.configs['flat/essential'],
  vueTsConfigs.recommended,


  // Custom override configuration.
  // https://deepwiki.com/vuejs/eslint-config-typescript/5.3-custom-rules-configuration#integration-with-defineconfigwithvuets
  {
    name: 'overrides',
    files: ['**/*.{ts,vue}'],
    rules: {
      // Rule configurations...
      // "ruleName": ["off, warn, error", { ruleOptions }]
      /*** ESLint ***/
      "brace-style": ["error", "stroustrup", { "allowSingleLine": true }],
      "curly": ["error"],
      "eqeqeq": ["error", "smart"],
      "no-multi-spaces": ["error", { "ignoreEOLComments": false }],
      "no-unused-vars": ["warn"],
      // "semi": ["error", "always", { "omitLastInOneLineBlock": true }],
      "semi": ["error", "never"],
      "quotes": ["error", "single", { "avoidEscape": true, "allowTemplateLiterals": true }],
      /*** TypeScript ***/
      "@typescript-eslint/no-inferrable-types": ["error", { "ignoreParameters": true, "ignoreProperties": false }],
      "@typescript-eslint/no-explicit-any": ["warn", { "fixToUnknown": false, "ignoreRestArgs": false }],
      "@typescript-eslint/no-unused-vars": ["warn"],
      // "@typescript-eslint/semi": ["error", "never"],
      /*** Vue ***/
      "vue/max-attributes-per-line": ["error", { "singleline": 3, "multiline": 1 }]
    },
  },

  skipFormatting,
)
