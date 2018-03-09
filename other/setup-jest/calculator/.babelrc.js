module.exports = {
  presets: [['env', {modules: false}], 'react'],
  plugins: ['transform-class-properties', 'transform-object-rest-spread'],
}

/*
Solution snippets below

































































for the env plugin modules config:

String(process.env.NODE_ENV) === 'test' ? 'commonjs' : false
 */
