import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({adapter: new Adapter()})

// here we set up a fake localStorage because jsdom doesn't support it
// https://github.com/tmpvar/jsdom/issues/1137
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
