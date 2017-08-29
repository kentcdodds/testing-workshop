import React from 'react'
import {Provider} from 'react-redux'
import {Router} from 'react-router'
import {createMemoryHistory} from 'history'
import {mount} from 'enzyme'
import App from '../../../src/app'
import createStore from '../../../src/store'

export {renderApp, sel, flushAllPromises}

// this renders the given component with a react-redux Provider
// which is how we render it in our application.
// Also renders with a react-router-dom MemoryRouter
// which is how we render to a specific URL.
function renderApp({route = '/', state = {}}) {
  const store = createStore(state)
  const history = createMemoryHistory({initialEntries: [route]})
  const wrapper = mount(
    <Provider store={store}>
      <Router history={history}>
        <App />
      </Router>
    </Provider>,
  )
  return {history, store, wrapper}
}

function sel(id) {
  return `[data-test="${id}"]`
}

// this returns a new promise and is just a simple way to
// wait until the next tick so resolved promises chains will continue
function flushAllPromises() {
  return new Promise(resolve => setImmediate(resolve))
}
