import React from 'react'
import ReactDOM from 'react-dom'
// you'll need these:
// import {generate, render, Simulate} from 'client-test-utils'
import Login from '../login'

test('calls onSubmit with the username and password when submitted', () => {
  // Arrange
  // use generate.userForm() here
  const fakeUser = {username: 'chucknorris', password: '(╯°□°）╯︵ ┻━┻'}
  const handleSubmit = jest.fn()
  // use: render(<Login onSubmit={handleSubmit} />)
  // It'll give you back an object with
  // `queryByLabelText` and `queryByText` functions
  // so you don't need a div anymore!
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
  // Use Simulate.submit(formNode) instead of these two lines
  const event = new window.Event('submit')
  formNode.dispatchEvent(event)

  // Assert
  // no change necessary here
  expect(handleSubmit).toHaveBeenCalledTimes(1)
  expect(handleSubmit).toHaveBeenCalledWith(fakeUser)
  expect(submitButtonNode.type).toBe('submit')
})

//////// Elaboration & Feedback /////////
// When you've finished with the exercises:
// 1. Copy the URL below into your browser and fill out the form
// 2. remove the `.skip` from the test below
// 3. Change submitted from `false` to `true`
// 4. And you're all done!
/*
http://ws.kcd.im/?ws=Testing&e=login.step-2&em=
*/
test.skip('I submitted my elaboration and feedback', () => {
  const submitted = false // change this when you've submitted!
  expect(submitted).toBe(true)
})
////////////////////////////////
