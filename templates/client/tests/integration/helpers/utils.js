// FINAL_START
import React from 'react'
import {Provider} from 'react-redux'
import {mount} from 'enzyme'
import createStore from '../../../src/store'

export {renderWithState, sel, flushAllPromises}

function renderWithState(state, children) {
  const store = createStore(state)
  const wrapper = mount(
    <Provider store={store}>
      {children}
    </Provider>,
  )
  return {store, wrapper}
}

function sel(id) {
  return `[data-test="${id}"]`
}
function flushAllPromises() {
  return new Promise(resolve => setImmediate(resolve))
}
// FINAL_END
