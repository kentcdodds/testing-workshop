import React from 'react'
import ReactDOM from 'react-dom'
import {Simulate} from 'react-dom/test-utils'
import {Router} from 'react-router-dom'
import {createMemoryHistory} from 'history'
import * as generate from 'til-shared/generate'

function renderWithRouter(ui, {route = '/'} = {}) {
  const history = createMemoryHistory({initialEntries: [route]})
  const utils = render(<Router history={history}>{ui}</Router>)
  return {
    ...utils,
    history,
  }
}

function sel(id) {
  return `[data-test="${id}"]`
}

function queryDivByTestId(div, id) {
  return div.querySelector(sel(id))
}

function render(ui) {
  const div = document.createElement('div')
  ReactDOM.render(ui, div)
  return {
    div,
    root: div.children[0],
    queryByTestId: queryDivByTestId.bind(null, div),
  }
}

// this returns a new promise and is just a simple way to
// wait until the next tick so resolved promises chains will continue
function flushAllPromises() {
  return new Promise(resolve => setImmediate(resolve))
}

export {
  render,
  renderWithRouter,
  queryDivByTestId,
  sel,
  flushAllPromises,
  generate,
  Simulate,
}
