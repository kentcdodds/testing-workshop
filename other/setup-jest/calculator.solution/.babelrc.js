module.exports = {
  presets: [
    [
      'env',
      {modules: String(process.env.NODE_ENV) === 'test' ? 'commonjs' : false},
    ],
    'react',
  ],
  plugins: ['transform-class-properties', 'transform-object-rest-spread'],
}
