/* eslint no-unused-vars: 0, import/no-unresolved: 0 */
import React from 'react'
import axiosMock from 'axios'
import Login from '../../src/screens/login'
import {renderWithState, sel, flushAllPromises} from './helpers/utils'

test('logs in when the form is submitted', async () => {
  const token = 'Luke, I am your father'
  const user = {password: 'my-password', email: 'me@example.com'}
  axiosMock.__mock.instance.post.mockImplementation(() => {
    return Promise.resolve({data: {user: {token}}})
  })

  const {wrapper} = renderWithState({}, <Login />)
  wrapper.find(sel('email')).node.value = user.email
  wrapper.find(sel('password')).node.value = user.password
  wrapper.find('form').simulate('submit')
  await flushAllPromises()
  expect(axiosMock.__mock.instance.post).toHaveBeenCalledTimes(1)
  expect(axiosMock.__mock.instance.post).toHaveBeenCalledWith('/users/login', {
    user,
  })
  expect(window.localStorage.setItem).toHaveBeenCalledTimes(1)
  expect(window.localStorage.setItem).toHaveBeenCalledWith('jwt', token)
})
