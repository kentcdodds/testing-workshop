import React from 'react'
import {generate} from 'til-client-test-utils'
import {render, renderIntoDocument, cleanup} from 'react-testing-library'
import Login from '../login'

afterEach(cleanup)

test('calls onSubmit with the username and password when submitted', () => {
  // Arrange
  const fakeUser = generate.loginForm()
  const handleSubmit = jest.fn()
  const {getByLabelText, getByText} = renderIntoDocument(
    <Login onSubmit={handleSubmit} />,
  )

  const usernameNode = getByLabelText('username')
  const passwordNode = getByLabelText('password')

  // Act
  usernameNode.value = fakeUser.username
  passwordNode.value = fakeUser.password
  getByText('submit').click()

  // Assert
  expect(handleSubmit).toHaveBeenCalledTimes(1)
  expect(handleSubmit).toHaveBeenCalledWith(fakeUser)
})

test('snapshot', () => {
  const {container} = render(<Login />)
  expect(container.firstChild).toMatchSnapshot()
})
