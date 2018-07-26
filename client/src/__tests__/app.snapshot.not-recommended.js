/*
 * This is an example of integration tests for the client
 * They're still fairly react-specific, but less-so than
 * the unit tests. They are also quite longer than
 * unit tests. They cover more code than the unit tests
 * per test.
 */

import React from 'react'
import axiosMock from 'axios'
import {renderWithRouter} from 'til-client-test-utils'
import {init as initAPI} from '../utils/api'
import App from '../app'

beforeEach(() => {
  window.localStorage.removeItem('token')
  axiosMock.__mock.reset()
  initAPI()
})

test('snapshot', async () => {
  // setup things to simulate being logged in
  const {get} = axiosMock.__mock.instance
  const fakeToken = 'my.fake.token'
  window.localStorage.setItem('token', fakeToken)
  initAPI()
  const fakeUser = {
    username: 'chucknorris',
    id: 'abc-123',
    token: fakeToken,
  }
  get.mockImplementation(url => {
    if (url === '/auth/me') {
      return Promise.resolve({data: {user: fakeUser}})
    } else if (url === '/users') {
      return Promise.resolve({data: {users: [fakeUser]}})
    } else if (url === '/posts') {
      return Promise.resolve({data: {posts: []}})
    } else {
      throw new Error(`Unexpected request to ${url}`)
    }
  })

  const {container, finishLoading} = renderWithRouter(<App />)

  // wait for the app to finish loading the mocked requests
  await finishLoading()
  expect(container).toMatchSnapshot()
})
