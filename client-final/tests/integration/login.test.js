/* eslint no-unused-vars: 0, import/no-unresolved: 0 */
import axiosMock from 'axios'
import Login from '../../src/screens/login'
import {renderApp, sel, flushAllPromises} from './helpers/utils'

test('logs in when the form is submitted', async () => {
  const setItemMock = jest.spyOn(window.localStorage, 'setItem')
  const token = 'Luke, I am your father'
  const user = {password: 'my-password', email: 'me@example.com'}
  axiosMock.__mock.instance.post.mockImplementation(() => {
    return Promise.resolve({data: {user: {token}}})
  })

  const {history, wrapper} = renderApp({route: '/login'})
  wrapper.find(sel('email')).node.value = user.email
  wrapper.find(sel('password')).node.value = user.password
  wrapper.find('form').simulate('submit')
  await flushAllPromises()
  expect(axiosMock.__mock.instance.post).toHaveBeenCalledTimes(1)
  expect(axiosMock.__mock.instance.post).toHaveBeenCalledWith('/users/login', {
    user,
  })
  expect(history.location.pathname).toBe('/')
  expect(setItemMock).toHaveBeenCalledTimes(1)
  expect(setItemMock).toHaveBeenCalledWith('jwt', token)
  setItemMock.mockRestore()
})

test('I submitted my elaboration and feedback', () => {
  const submitted = true
  expect(true).toBe(submitted)
})
