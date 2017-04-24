// this is actually in Jest v19, but we don't have that in our
// project (we're using Create React App),
// so instead we'll fake it 🙃
global.jestv19 = {
  spyOn(obj, key, impl) {
    const original = obj[key]
    obj[key] = jest.fn(impl)
    obj[key].mockRestore = function mockRestore() {
      obj[key] = original
    }
    return obj[key]
  },
}

const inMemoryLocalStorage = {}
window.localStorage = {
  setItem(key, val) {
    inMemoryLocalStorage[key] = val
  },
  getItem(key) {
    return inMemoryLocalStorage[key]
  },
  removeItem(key) {
    delete inMemoryLocalStorage[key]
  },
}
