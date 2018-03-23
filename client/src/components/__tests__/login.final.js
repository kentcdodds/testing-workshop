import React from 'react'
import {generate, render, Simulate} from 'client-test-utils'
import Login from '../login'

test('calls onSubmit with the username and password when submitted', () => {
  // Arrange
  const fakeUser = generate.loginForm()
  const handleSubmit = jest.fn()
  const {container, queryByLabelText, queryByText} = render(
    <Login onSubmit={handleSubmit} />,
  )

  const usernameNode = queryByLabelText('username')
  const passwordNode = queryByLabelText('password')
  const formNode = container.querySelector('form')
  const submitButtonNode = queryByText('submit')

  // Act
  usernameNode.value = fakeUser.username
  passwordNode.value = fakeUser.password
  Simulate.submit(formNode)

  // Assert
  expect(handleSubmit).toHaveBeenCalledTimes(1)
  expect(handleSubmit).toHaveBeenCalledWith(fakeUser)
  expect(submitButtonNode.type).toBe('submit')
})

test('snapshot', () => {
  const {container} = render(<Login />)
  expect(container.firstChild).toMatchSnapshot()
})
