// this is the jest setupTestFrameworkScriptFile

// here we set up a fake localStorage because jsdom doesn't support it
// https://github.com/tmpvar/jsdom/issues/1137
if (!window.localStorage) {
  window.localStorage = {}
  Object.assign(window.localStorage, {
    removeItem: function removeItem(key) {
      delete this[key]
    }.bind(window.localStorage),
    setItem: function setItem(key, val) {
      this[key] = String(val)
    }.bind(window.localStorage),
    getItem: function getItem(key) {
      return this[key]
    }.bind(window.localStorage),
  })
}
