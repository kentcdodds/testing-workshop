import React from 'react'
import ReactDOM from 'react-dom'
import {Router} from 'react-router-dom'
import {createMemoryHistory} from 'history'
import * as generate from 'til-shared/generate'

function mountWithRouter(ui, {route = '/'} = {}) {
  const history = createMemoryHistory({initialEntries: [route]})
  const div = document.createElement('div')
  ReactDOM.render(<Router history={history}>{ui}</Router>, div)
  return {
    history,
    div,
    queryByTestId: id => div.querySelector(sel(id)),
    queryAll: (...args) => div.querySelectorAll(...args),
  }
}

function sel(id) {
  return `[data-test="${id}"]`
}

// this returns a new promise and is just a simple way to
// wait until the next tick so resolved promises chains will continue
function flushAllPromises() {
  return new Promise(resolve => setImmediate(resolve))
}

export {mountWithRouter, sel, flushAllPromises, generate}
