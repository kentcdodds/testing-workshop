import React from 'react'
import {Provider} from 'react-redux'
import {mount} from 'enzyme'
import createStore from '../../../src/store'

export {renderWithState, sel, flushAllPromises}

// this renders the given component with a react-redux Provider
// which is how we render it in our application.
function renderWithState(Component, state = {}) {
  const store = createStore(state)
  const wrapper = mount(
    <Provider store={store}>
      <Component />
    </Provider>,
  )
  return {store, wrapper}
}

function sel(id) {
  return `[data-test="${id}"]`
}

// this returns a new promise and is just a simple way to
// wait until the next tick so resolved promises chains will continue
function flushAllPromises() {
  return new Promise(resolve => setImmediate(resolve))
}
