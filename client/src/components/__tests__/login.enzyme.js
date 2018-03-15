/*
 * This is a simple unit test for a function component.
 * These are quite easy to test generally.
 */

import React from 'react'
import {mount} from 'enzyme'
// eslint-disable-next-line
import {generate} from 'client-test-utils'
import Login from '../login'

const sel = id => `[data-test="${id}"]`

const findNodeByTestId = (wrapper, id) =>
  wrapper
    .find(sel(id))
    .hostNodes()
    .instance()
const findWrapperByTestId = (wrapper, id) => wrapper.find(sel(id))

test('calls onSubmit with the username and password when submitted', () => {
  // Arrange
  const fakeUser = generate.loginForm()
  const handleSubmit = jest.fn()
  const wrapper = mount(<Login onSubmit={handleSubmit} />)

  const usernameNode = findNodeByTestId(wrapper, 'username-input')
  const passwordNode = findNodeByTestId(wrapper, 'password-input')
  const formWrapper = findWrapperByTestId(wrapper, 'login-form')
  const submitButtonNode = findNodeByTestId(wrapper, 'login-submit')

  // Act
  usernameNode.value = fakeUser.username
  passwordNode.value = fakeUser.password
  formWrapper.simulate('submit')

  // Assert
  expect(handleSubmit).toHaveBeenCalledTimes(1)
  expect(handleSubmit).toHaveBeenCalledWith(fakeUser)
  expect(submitButtonNode.type).toBe('submit')
})
