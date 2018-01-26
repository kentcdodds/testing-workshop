import React from 'react'
import axiosMock from 'axios'
// eslint-disable-next-line
import {mountWithRouter, flushAllPromises} from 'til-test-utils'
import App from '../app'

beforeEach(() => {
  window.localStorage.removeItem('jwt')
  axiosMock.__mock.reset()
})

test('register a new user', async () => {
  const {findNodeByTestId, wrapper} = mountWithRouter(<App />)

  // wait for /me request to settle
  await flushAllPromises()
  wrapper.update()

  // navigate to register
  const leftClick = {button: 0}
  findNodeByTestId('register-link').simulate('click', leftClick)
  expect(window.location.href).toContain('register')

  // fill out form
  const fakeUser = {username: 'barry', password: 'allen'}
  const usernameNode = findNodeByTestId('username-input').instance()
  const passwordNode = findNodeByTestId('password-input').instance()
  const formWrapper = findNodeByTestId('login-form')
  usernameNode.value = fakeUser.username
  passwordNode.value = fakeUser.password

  // submit form
  const {post} = axiosMock.__mock.instance
  const token = 'my-mock-token'
  post.mockImplementation(() =>
    Promise.resolve({
      data: {user: {...fakeUser, token}},
    }),
  )
  formWrapper.simulate('submit')

  // assert calls
  expect(axiosMock.__mock.instance.post).toHaveBeenCalledTimes(1)
  expect(axiosMock.__mock.instance.post).toHaveBeenCalledWith(
    '/auth/register',
    fakeUser,
  )

  // wait for promises to settle
  await flushAllPromises()
  wrapper.update()

  // assert the state of the world
  expect(window.localStorage.getItem('jwt')).toBe(token)
  expect(window.location.href).not.toContain('register')
  expect(findNodeByTestId('username-display').text()).toEqual(fakeUser.username)
  expect(findNodeByTestId('logout-button').length).toBe(1)
})

test('login', async () => {
  const {findNodeByTestId, wrapper} = mountWithRouter(<App />)

  // wait for /me request to settle
  await flushAllPromises()
  wrapper.update()

  // navigate to register
  const leftClick = {button: 0}
  findNodeByTestId('login-link').simulate('click', leftClick)
  expect(window.location.href).toContain('login')

  // fill out form
  const fakeUser = {username: 'barry', password: 'allen'}
  const usernameNode = findNodeByTestId('username-input').instance()
  const passwordNode = findNodeByTestId('password-input').instance()
  const formWrapper = findNodeByTestId('login-form')
  usernameNode.value = fakeUser.username
  passwordNode.value = fakeUser.password

  // submit form
  const {post} = axiosMock.__mock.instance
  const token = 'my-mock-token'
  post.mockImplementation(() =>
    Promise.resolve({
      data: {user: {...fakeUser, token}},
    }),
  )
  formWrapper.simulate('submit')

  // assert calls
  expect(axiosMock.__mock.instance.post).toHaveBeenCalledTimes(1)
  expect(axiosMock.__mock.instance.post).toHaveBeenCalledWith(
    '/auth/login',
    fakeUser,
  )

  // wait for promises to settle
  await flushAllPromises()
  wrapper.update()

  // assert the state of the world
  expect(window.localStorage.getItem('jwt')).toBe(token)
  expect(window.location.href).not.toContain('login')
  expect(findNodeByTestId('username-display').text()).toEqual(fakeUser.username)
  expect(findNodeByTestId('logout-button').length).toBe(1)
})
