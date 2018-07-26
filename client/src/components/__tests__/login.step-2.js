import React from 'react'
import {generate} from 'til-client-test-utils'
import {render, fireEvent} from 'react-testing-library'
import Login from '../login'

test('calls onSubmit with the username and password when submitted', () => {
  // Arrange
  const fakeUser = generate.loginForm()
  const handleSubmit = jest.fn()
  const {container, getByLabelText, getByText} = render(
    <Login onSubmit={handleSubmit} />,
  )

  const usernameNode = getByLabelText(/username/i)
  const passwordNode = getByLabelText(/password/i)
  const formNode = container.querySelector('form')
  const submitButtonNode = getByText(/submit/i)

  // Act
  usernameNode.value = fakeUser.username
  passwordNode.value = fakeUser.password
  fireEvent.submit(formNode)

  // Assert
  expect(handleSubmit).toHaveBeenCalledTimes(1)
  expect(handleSubmit).toHaveBeenCalledWith(fakeUser)
  expect(submitButtonNode.type).toBe('submit')
})
