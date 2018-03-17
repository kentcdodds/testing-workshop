import React from 'react'
import ReactDOM from 'react-dom'
import Login from '../login'

test('calls onSubmit with the username and password when submitted', () => {
  // Arrange
  const fakeUser = {username: 'chucknorris', password: '(╯°□°）╯︵ ┻━┻'}
  const handleSubmit = jest.fn()
  const div = document.createElement('div')
  ReactDOM.render(<Login onSubmit={handleSubmit} />, div)
  const queryByTestId = id => div.querySelector(`[data-test="${id}"]`)

  const usernameNode = queryByTestId('username-input')
  const passwordNode = queryByTestId('password-input')
  const formNode = queryByTestId('login-form')
  const submitButtonNode = queryByTestId('login-submit')

  usernameNode.value = fakeUser.username
  passwordNode.value = fakeUser.password

  // Act
  const event = new window.Event('submit')
  formNode.dispatchEvent(event)

  // Assert
  expect(handleSubmit).toHaveBeenCalledTimes(1)
  expect(handleSubmit).toHaveBeenCalledWith(fakeUser)
  expect(submitButtonNode.type).toBe('submit')
})
