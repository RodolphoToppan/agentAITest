module.exports = {
  root: true,
  env: {
    browser: true,
    'jest/globals': true,
    node: true
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended'
  ],
  plugins: [
    'jest'
  ],
  rules: {
    'spaced-comment': 2,
    'vue/multi-word-component-names': 'off',
    semi: [2, 'always'],
    'no-trailing-spaces': 0,
    'arrow-parens': 0,
    'no-multi-spaces': 0,
    'brace-style': [2, 'stroustrup'],
    'array-callback-return': 0,
    'vue/attribute-hyphenation': 0,
    'vue/html-closing-bracket-spacing': 2,
    curly: 0,
    'vue/html-self-closing': 2,
    'vue/order-in-components': 'off',
    'import/order': 'off',
    'import/default': 0,
    'vue/no-v-html': 'off',
    'max-len': [
      'error',
      {
        code: 120,
        ignoreStrings: true,
        ignoreComments: true,
        ignoreUrls: true,
        ignoreRegExpLiterals: true,
        ignoreTemplateLiterals: true
      }
    ]
  }
};
