/* eslint-env node */


module.exports = {
  root: true,
  'extends': [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier'
  ],
  settings: {
    react: {
      version: 'detect'
    }
  },
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    'react/react-in-jsx-scope': 'off'
  }
}
