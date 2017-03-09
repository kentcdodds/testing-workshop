import React from 'react'
import {Provider} from 'react-redux'
import {mount} from 'enzyme'
import createStore from '../../../src/store'

export default renderWithState

function renderWithState(state, children) {
  const store = createStore(state)
  const wrapper = mount(
    <Provider store={store}>
      {children}
    </Provider>,
  )
  return {store, wrapper}
}
