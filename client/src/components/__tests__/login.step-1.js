import React from 'react'
import ReactDOM from 'react-dom'
import Login from '../login'

test('calls onSubmit with the username and password when submitted', () => {
  // Arrange
  const fakeUser = {username: 'chucknorris', password: '(╯°□°）╯︵ ┻━┻'}
  const handleSubmit = jest.fn()
  const div = document.createElement('div')
  ReactDOM.render(<Login onSubmit={handleSubmit} />, div)

  const inputs = div.querySelectorAll('input')
  const usernameNode = inputs[0]
  const passwordNode = inputs[1]
  const formNode = div.querySelector('form')
  const submitButtonNode = div.querySelector('button')

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
