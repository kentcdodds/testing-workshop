// FINAL_START
import axiosMock from 'axios'
import Register from '../../src/screens/register'
import {renderApp, sel, flushAllPromises} from './helpers/utils'

test('logs in when the form is submitted', async () => {
  const setItemMock = jest.spyOn(window.localStorage, 'setItem')
  const token = 'Luke, I am your father'
  const user = {
    password: 'my-password',
    email: 'me@example.com',
    username: 'vador',
  }
  axiosMock.__mock.instance.post.mockImplementation(() => {
    return Promise.resolve({data: {user: {token}}})
  })

  const {history, wrapper} = renderApp({route: '/register'})
  wrapper.find(sel('username')).node.value = user.username
  wrapper.find(sel('email')).node.value = user.email
  wrapper.find(sel('password')).node.value = user.password
  wrapper.find('form').simulate('submit')
  await flushAllPromises()
  expect(axiosMock.__mock.instance.post).toHaveBeenCalledTimes(1)
  expect(axiosMock.__mock.instance.post).toHaveBeenCalledWith('/users', {
    user,
  })
  expect(history.location.pathname).toBe('/')
  expect(setItemMock).toHaveBeenCalledTimes(1)
  expect(setItemMock).toHaveBeenCalledWith('jwt', token)
  setItemMock.mockRestore()
})
// FINAL_END
// WORKSHOP_START
test('todo', () => {})
// WORKSHOP_END
