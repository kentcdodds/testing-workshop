/*
 * This is a simple unit test for a function component.
 * These are quite easy to test generally.
 */

import React from 'react'
import ReactDOM from 'react-dom'
// eslint-disable-next-line
import {generate} from 'client-test-utils'
import Login from '../login'

const findElementByTestId = (node, id) =>
  node.querySelector(`[data-test="${id}"]`)

test('calls onSubmit with the username and password when submitted', () => {
  const fakeUser = generate.loginForm()
  const handleSubmit = jest.fn()
  const div = document.createElement('div')
  ReactDOM.render(<Login onSubmit={handleSubmit} />, div)
  const usernameNode = findElementByTestId(div, 'username-input')
  const passwordNode = findElementByTestId(div, 'password-input')
  const formWrapper = findElementByTestId(div, 'login-form')
  usernameNode.value = fakeUser.username
  passwordNode.value = fakeUser.password
  const event = new window.Event('submit')
  formWrapper.dispatchEvent(event)
  expect(handleSubmit).toHaveBeenCalledTimes(1)
  expect(handleSubmit).toHaveBeenCalledWith(fakeUser)
})
