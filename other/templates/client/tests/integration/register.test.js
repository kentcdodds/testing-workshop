// FINAL_START
import axiosMock from 'axios'
import Register from '../../src/screens/register'
import {renderWithState, sel, flushAllPromises} from './helpers/utils'

test('logs in when the form is submitted', async () => {
  const setItemMock = jestv19.spyOn(window.localStorage, 'setItem')
  const token = 'Luke, I am your father'
  const user = {
    password: 'my-password',
    email: 'me@example.com',
    username: 'vador',
  }
  axiosMock.__mock.instance.post.mockImplementation(() => {
    return Promise.resolve({data: {user: {token}}})
  })

  const {wrapper} = renderWithState(Register)
  wrapper.find(sel('username')).node.value = user.username
  wrapper.find(sel('email')).node.value = user.email
  wrapper.find(sel('password')).node.value = user.password
  wrapper.find('form').simulate('submit')
  await flushAllPromises()
  expect(axiosMock.__mock.instance.post).toHaveBeenCalledTimes(1)
  expect(axiosMock.__mock.instance.post).toHaveBeenCalledWith('/users', {
    user,
  })
  expect(setItemMock).toHaveBeenCalledTimes(1)
  expect(setItemMock).toHaveBeenCalledWith('jwt', token)
  setItemMock.mockRestore()
})
// FINAL_END
// WORKSHOP_START
test('todo', () => {})
// WORKSHOP_END
