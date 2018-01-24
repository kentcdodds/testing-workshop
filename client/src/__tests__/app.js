import React from 'react'
import App from '../app'
import {renderWithRouter, flushAllPromises} from './helpers/utils'

test('renders without crashing', async () => {
  const {findNodeByTestId, wrapper} = renderWithRouter(<App />)
  await flushAllPromises()
  wrapper.update()
  expect(findNodeByTestId('login-link').length).toBe(1)
})
