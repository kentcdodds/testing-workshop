import React from 'react'
import App from '../app'
// eslint-disable-next-line
import {mountWithRouter, flushAllPromises} from 'til-test-utils'

test('renders without crashing', async () => {
  const {findNodeByTestId, wrapper} = mountWithRouter(<App />)
  await flushAllPromises()
  wrapper.update()
  expect(findNodeByTestId('login-link').length).toBe(1)
})
