/*
 * This is an example of integration tests for the client
 * They're still fairly react-specific, but less-so than
 * the unit tests. They are also quite longer than
 * unit tests. They cover more code than the unit tests
 * per test.
 */

import React from 'react'
import axiosMock from 'axios'
import {renderWithRouter, fireEvent, generate} from 'til-client-test-utils'
import {init as initAPI} from '../utils/api'
import App from '../app'

beforeEach(() => {
  window.localStorage.removeItem('token')
  axiosMock.__mock.reset()
  initAPI()
})

test('register a new user', async () => {
  const {
    container,
    getByTestId,
    getByText,
    finishLoading,
    getByLabelText,
  } = renderWithRouter(<App />)

  // wait for the app to finish loading the mocked requests
  await finishLoading()

  // navigate to register
  const leftClick = {button: 0}
  fireEvent.click(getByText(/register/i), leftClick)
  expect(window.location.href).toContain('register')

  // fill out form
  const fakeUser = generate.loginForm()
  const usernameNode = getByLabelText('Username')
  const passwordNode = getByLabelText('Password')
  const formWrapper = container.querySelector('form')
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
  fireEvent.submit(formWrapper)

  // wait for the mocked requests to finish
  await finishLoading()

  // assert calls
  expect(axiosMock.__mock.instance.post).toHaveBeenCalledTimes(1)
  expect(axiosMock.__mock.instance.post).toHaveBeenCalledWith(
    '/auth/register',
    fakeUser,
  )

  // assert the state of the world
  expect(window.localStorage.getItem('token')).toBe(token)
  expect(window.location.href).not.toContain('register')
  expect(getByTestId('username-display').textContent).toEqual(fakeUser.username)
  expect(getByText(/logout/i)).toBeTruthy()
})
