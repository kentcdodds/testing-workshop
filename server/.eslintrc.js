module.exports = {
  overrides: [
    {
      files: ['**/__tests__/**', '**/__mocks__/**'],
      settings: {
        'import/resolver': {
          jest: {
            jestConfigFile: require.resolve('./jest.config.js'),
          },
        },
      },
    },
  ],
}
