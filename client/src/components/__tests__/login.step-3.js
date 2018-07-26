import React from 'react'
import {generate} from 'til-client-test-utils'
import {render, cleanup} from 'react-testing-library'
import Login from '../login'

// If you render your components with render via react-testing-library
// then you can get automatic cleanup of any components rendered like this:
afterEach(cleanup)

test('calls onSubmit with the username and password when submitted', () => {
  // Arrange
  const fakeUser = generate.loginForm()
  const handleSubmit = jest.fn()
  const {getByLabelText, getByText} = render(<Login onSubmit={handleSubmit} />)

  const usernameNode = getByLabelText(/username/i)
  const passwordNode = getByLabelText(/password/i)

  // Act
  usernameNode.value = fakeUser.username
  passwordNode.value = fakeUser.password
  getByText(/submit/i).click()

  // Assert
  expect(handleSubmit).toHaveBeenCalledTimes(1)
  expect(handleSubmit).toHaveBeenCalledWith(fakeUser)
})
