/*
 * This is a simple unit test for a function component.
 * These are quite easy to test generally.
 */

import React from 'react'
import {generate, render, Simulate} from 'client-test-utils'
import Login from '../login'

test('calls onSubmit with the username and password when submitted', () => {
  // Arrange
  const fakeUser = generate.loginForm()
  const handleSubmit = jest.fn()
  const {queryByTestId} = render(<Login onSubmit={handleSubmit} />)

  const usernameNode = queryByTestId('username-input')
  const passwordNode = queryByTestId('password-input')
  const formNode = queryByTestId('login-form')
  const submitButtonNode = queryByTestId('login-submit')

  // Act
  usernameNode.value = fakeUser.username
  passwordNode.value = fakeUser.password
  Simulate.submit(formNode)

  // Assert
  expect(handleSubmit).toHaveBeenCalledTimes(1)
  expect(handleSubmit).toHaveBeenCalledWith(fakeUser)
  expect(submitButtonNode.type).toBe('submit')
})

test('renders with the proper CSS', () => {
  const {root} = render(<Login />)
  expect(root).toMatchSnapshot()
})
