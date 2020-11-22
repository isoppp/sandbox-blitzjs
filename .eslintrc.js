module.exports = {
  env: {
    es2020: true,
  },
  extends: ['react-app', 'plugin:jsx-a11y/recommended', 'plugin:react-hooks/recommended'],
  plugins: ['jsx-a11y', 'unused-imports'],
  rules: {
    'import/no-anonymous-default-export': 'error',
    'import/no-webpack-loader-syntax': 'off',
    'react/react-in-jsx-scope': 'off', // React is always in scope with Blitz
    'jsx-a11y/anchor-is-valid': 'off', //Doesn't play well with Blitz/Next <Link> usage
    '@typescript-eslint/no-unused-vars': 'off',
    'unused-imports/no-unused-imports-ts': 'error',
    'unused-imports/no-unused-vars-ts': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '(^_|^watch$|^error$|^errors$)',
        args: 'after-used',
        argsIgnorePattern: '(^_|^ref$|^ctx$|^req$|^res$)',
      },
    ],
  },
}
