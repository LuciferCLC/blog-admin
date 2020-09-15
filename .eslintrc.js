module.exports = {
  env: {
    es6: true,
    browser: true,
    node: true
  },
  extends: [
    'airbnb',
    'plugin:prettier/recommended'
  ],
  plugins: ['import'],
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['@', './src']
        ],
        extensions: ['.js', '.jsx']
      }
    }
  },
  parser: 'babel-eslint',
  rules: {
    quotes: [2, 'single'],
    'react/jsx-props-no-spreading': 1,
    'react/state-in-constructor': 1,
    'react/destructuring-assignment': 1,
    'react/static-property-placement': 0,
    'react/jsx-curly-newline': 0,
    'react/jsx-one-expression-per-line': 0,
    'react/jsx-wrap-multilines': [2, {
      prop: 'ignore'
    }],
    'react/prop-types': [2, {
      ignore: ['children'],
      skipUndeclared: false,
    }],
    'no-use-before-define': 1,
    'no-underscore-dangle': 1,
    'no-unused-expressions': 0,
    'comma-dangle': [2, 'never'],
    'import/no-named-as-default': 0,
    'import/prefer-default-export': 0,
    'prefer-promise-reject-errors': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'jsx-a11y/anchor-is-valid': 0,
    'prettier/prettier': [2, {
      eslintIntegration: true,
      useTabs: false,
      tabWidth: 2,
      semi: true,
      singleQuote: true,
      jsxBracketSameLine: false,
      trailingComma: 'none',
      bracketSpacing: true,
      parser: 'flow'
    }]
  }
}