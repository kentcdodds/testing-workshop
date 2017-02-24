import jestMatchers from 'jest-matchers/build/matchers'

expect.extend({
  toStrictlyMatchObject(received, argument) {
    const matches = jestMatchers.toMatchObject(received, argument)
    if (!matches.pass) {
      return matches
    }
    const receivedKeys = Object.keys(received)
    const expectedKeysLength = Object.keys(argument).length
    return jestMatchers.toHaveLength(receivedKeys, expectedKeysLength)
  },
})
