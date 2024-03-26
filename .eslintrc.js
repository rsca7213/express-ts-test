module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint/eslint-plugin', 'filename-rules'],
  extends: ['plugin:@typescript-eslint/recommended', 'plugin:@typescript-eslint/strict'],
  root: true,
  env: {
    node: true
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/no-non-null-assertion': 'off',
    'no-magic-numbers': 'error',
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'variableLike',
        format: ['strictCamelCase', 'UPPER_CASE']
      }
    ],
    'filename-rules/match': [
      'error',
      {
        pattern: 'kebab-case'
      }
    ]
  }
}
