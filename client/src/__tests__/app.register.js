/*
 * This is an example of integration tests for the client
 * They're still fairly react-specific, but less-so than
 * the unit tests. They are also quite longer than
 * unit tests. They cover more code than the unit tests
 * per test.
 */

import React from 'react'
import {Simulate} from 'react-dom/test-utils'
import axiosMock from 'axios'
import {renderWithRouter, flushPromises, generate} from 'client-test-utils'
import {init as initAPI} from '../utils/api'
import App from '../app'

beforeEach(() => {
  window.localStorage.removeItem('token')
  axiosMock.__mock.reset()
  initAPI()
})

test('register a new user', async () => {
  const {queryByTestId} = renderWithRouter(<App />)

  // wait for /me request to settle
  await flushPromises()

  // navigate to register
  const leftClick = {button: 0}
  Simulate.click(queryByTestId('register-link'), leftClick)
  expect(window.location.href).toContain('register')

  // fill out form
  const fakeUser = generate.loginForm()
  const usernameNode = queryByTestId('username-input')
  const passwordNode = queryByTestId('password-input')
  const formWrapper = queryByTestId('login-form')
  usernameNode.value = fakeUser.username
  passwordNode.value = fakeUser.password

  // submit form
  const {post} = axiosMock.__mock.instance
  const token = generate.token(fakeUser)
  post.mockImplementationOnce(() =>
    Promise.resolve({
      data: {user: {...fakeUser, token}},
    }),
  )
  Simulate.submit(formWrapper)

  // assert calls
  expect(axiosMock.__mock.instance.post).toHaveBeenCalledTimes(1)
  expect(axiosMock.__mock.instance.post).toHaveBeenCalledWith(
    '/auth/register',
    fakeUser,
  )

  // wait for promises to settle
  await flushPromises()

  // assert the state of the world
  expect(window.localStorage.getItem('token')).toBe(token)
  expect(window.location.href).not.toContain('register')
  expect(queryByTestId('username-display').textContent).toEqual(
    fakeUser.username,
  )
  expect(queryByTestId('logout-button')).toBeTruthy()
})
