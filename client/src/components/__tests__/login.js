import React from 'react'
import {mount} from 'enzyme'
import Login from '../login'

const sel = id => `[data-test="${id}"]`
const findWrapperNodeByTestId = (wrapper, id) =>
  wrapper.find(sel(id)).hostNodes()

test('calls onSubmit with the username and password when submitted', () => {
  const handleSubmit = jest.fn()
  const fakeUser = {username: 'barry', password: 'allen'}
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
