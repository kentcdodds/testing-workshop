import React from 'react'
import {Router} from 'react-router-dom'
import {render, flushPromises, Simulate} from 'react-testing-library'
import {createMemoryHistory} from 'history'
import * as generate from 'til-shared/generate'

function renderWithRouter(ui, {route = '/', ...renderOptions} = {}) {
  const history = createMemoryHistory({initialEntries: [route]})
  const utils = render(<Router history={history}>{ui}</Router>, renderOptions)
  return {
    ...utils,
    history,
  }
}

export {renderWithRouter, generate, render, flushPromises, Simulate}
