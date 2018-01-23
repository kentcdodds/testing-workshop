import React from 'react'
import App from '../app'
import {
  renderWithRouter,
  flushAllPromises,
  sel,
  findNodes,
} from './helpers/utils'

test('renders without crashing', async () => {
  const {wrapper} = renderWithRouter(<App />)
  await flushAllPromises()
  wrapper.update()
  expect(findNodes(wrapper, sel('login-link')).length).toBe(1)
})
