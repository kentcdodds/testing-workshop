const defaultResponse = {data: {}}

const __mock = {
  reset() {
    Object.assign(__mock.instance, {
      get: jest.fn(() => Promise.resolve(defaultResponse)),
      put: jest.fn(() => Promise.resolve(defaultResponse)),
      post: jest.fn(() => Promise.resolve(defaultResponse)),
      delete: jest.fn(() => Promise.resolve(defaultResponse)),
      defaults: {headers: {common: {}}},
    })
  },
  instance: {},
}

__mock.reset()

module.exports = {
  __mock,
  create() {
    return __mock.instance
  },
}
