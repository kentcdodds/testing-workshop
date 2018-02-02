/*
 * This is a simple unit test for a function component.
 * These are quite easy to test generally.
 */

import React from 'react'
import {mount} from 'enzyme'
// eslint-disable-next-line
import {findWrapperNodeByTestId, generate} from 'client-test-utils'
import Login from '../login'

test('calls onSubmit with the username and password when submitted', () => {
  const handleSubmit = jest.fn()
  const fakeUser = generate.loginForm()
  const wrapper = mount(<Login onSubmit={handleSubmit} />)
  const findNodeByTestId = findWrapperNodeByTestId.bind(null, wrapper)
  const usernameNode = findNodeByTestId('username-input').instance()
  const passwordNode = findNodeByTestId('password-input').instance()
  const formWrapper = findNodeByTestId('login-form')
  usernameNode.value = fakeUser.username
  passwordNode.value = fakeUser.password
  formWrapper.simulate('submit')
  expect(handleSubmit).toHaveBeenCalledTimes(1)
  expect(handleSubmit).toHaveBeenCalledWith(fakeUser)
})
