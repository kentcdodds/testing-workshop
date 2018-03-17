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

test('snapshot', () => {
  // render the login, this will give you back an object with a `root` property
  // expect the `root` property to match a snapshot
})

//////// Elaboration & Feedback /////////
// When you've finished with the exercises:
// 1. Copy the URL below into your browser and fill out the form
// 2. remove the `.skip` from the test below
// 3. Change submitted from `false` to `true`
// 4. And you're all done!
/*
http://ws.kcd.im/?ws=Testing&e=login.step-3&em=
*/
test.skip('I submitted my elaboration and feedback', () => {
  const submitted = false // change this when you've submitted!
  expect(submitted).toBe(true)
})
////////////////////////////////
