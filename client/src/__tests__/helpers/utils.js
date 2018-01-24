import React from 'react'
import ReactDOM from 'react-dom'
import {Router} from 'react-router-dom'
import {mount} from 'enzyme'
import {createMemoryHistory} from 'history'

function renderWithRouter(ui, {route = '/'} = {}) {
  const history = createMemoryHistory({initialEntries: [route]})
  const wrapper = mount(<Router history={history}>{ui}</Router>)
  return {
    history,
    wrapper,
    findNodes: findNodes.bind(null, wrapper),
    findNodeByTestId: findWrapperNodeByTestId.bind(null, wrapper),
  }
}

function renderToNodeWithRouter(ui, {route = '/'} = {}) {
  const history = createMemoryHistory({initialEntries: [route]})
  const div = document.createElement('div')
  ReactDOM.render(<Router history={history}>{ui}</Router>, div)
  return {history, div}
}

function sel(id) {
  return `[data-test="${id}"]`
}

function findNodes(wrapper, query) {
  return wrapper.find(query).hostNodes()
}

// this returns a new promise and is just a simple way to
// wait until the next tick so resolved promises chains will continue
function flushAllPromises() {
  return new Promise(resolve => setImmediate(resolve))
}

function findWrapperNodeByTestId(wrapper, id) {
  return findNodes(wrapper, sel(id))
}

export {
  renderWithRouter,
  renderToNodeWithRouter,
  findWrapperNodeByTestId,
  sel,
  flushAllPromises,
  findNodes,
}
