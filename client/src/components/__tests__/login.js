/*
 * This is a simple unit test for a function component.
 * These are quite easy to test generally.
 */

import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-dom/test-utils'
// eslint-disable-next-line
import {generate} from 'client-test-utils'
import Login from '../login'

const findNodeByTestId = (node, id) => node.querySelector(`[data-test="${id}"]`)

test('calls onSubmit with the username and password when submitted', () => {
  // Arrange
  const fakeUser = generate.loginForm()
  const handleSubmit = jest.fn()
  const div = document.createElement('div')
  ReactDOM.render(<Login onSubmit={handleSubmit} />, div)

  const usernameNode = findNodeByTestId(div, 'username-input')
  const passwordNode = findNodeByTestId(div, 'password-input')
  const formNode = findNodeByTestId(div, 'login-form')
  const submitButtonNode = findNodeByTestId(div, 'login-submit')

  // Act
  usernameNode.value = fakeUser.username
  passwordNode.value = fakeUser.password
  TestUtils.Simulate.submit(formNode)

  // Assert
  expect(handleSubmit).toHaveBeenCalledTimes(1)
  expect(handleSubmit).toHaveBeenCalledWith(fakeUser)
  expect(submitButtonNode.type).toBe('submit')
})
