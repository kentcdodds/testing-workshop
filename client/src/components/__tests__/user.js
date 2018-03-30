/*
 * This is a unit test for the <User /> component.
 * It's a little bit of a tricky one because it
 * runs code on componentDidMount and it interacts
 * with the API a lot. Because this is a unit test,
 * we have an inline mock of the API.
 */

import React from 'react'
import ReactDOM from 'react-dom'
import {wait, generate} from 'til-client-test-utils'
import User from '../user'
import * as apiMock from '../../utils/api'

jest.mock('../../utils/api', () => {
  const mock = {}
  const authResponse = {user: null}
  function reset() {
    Object.assign(mock, {
      auth: Object.assign(mock.auth || {}, {
        me: jest.fn(() => Promise.resolve(authResponse)),
        login: jest.fn(() => Promise.resolve(authResponse)),
        register: jest.fn(() => Promise.resolve(authResponse)),
        logout: jest.fn(() => Promise.resolve(authResponse)),
      }),
      reset,
    })
  }
  reset()
  return mock
})

beforeEach(() => {
  // eslint-disable-next-line
  apiMock.reset()
})

test('attempts to get the current user on mount', async () => {
  await setup()
  expect(apiMock.auth.me).toHaveBeenCalledTimes(1)
})

test('login rerenders with the retrieved user', async () => {
  const {children, controller} = await setup()
  const fakeUser = {username: generate.username()}
  apiMock.auth.login.mockImplementationOnce(() =>
    Promise.resolve({user: fakeUser}),
  )
  const form = generate.loginForm(fakeUser)
  controller.login(form)
  expect(apiMock.auth.login).toHaveBeenCalledTimes(1)
  expect(apiMock.auth.login).toHaveBeenCalledWith(form)

  await wait(() => expect(children).toHaveBeenCalledTimes(2))

  expect(children).toHaveBeenCalledWith(
    expect.objectContaining({
      pending: true,
      error: null,
      user: null,
    }),
  )
  expect(children).toHaveBeenLastCalledWith(
    expect.objectContaining({
      error: null,
      pending: false,
      user: fakeUser,
    }),
  )
})

test('logout rerenders with a null user', async () => {
  const {children, controller} = await setup()
  controller.logout()
  expect(apiMock.auth.logout).toHaveBeenCalledTimes(1)
  await wait(() => expect(children).toHaveBeenCalledTimes(2))
  expect(children).toHaveBeenCalledWith(
    expect.objectContaining({
      pending: true,
      error: null,
      user: null,
    }),
  )
  expect(children).toHaveBeenLastCalledWith(
    expect.objectContaining({
      error: null,
      pending: false,
      user: null,
    }),
  )
})

test('on register failure, rerenders with the error', async () => {
  const {children, controller} = await setup()
  const fakeError = {mock: 'failure'}
  apiMock.auth.register.mockImplementationOnce(() =>
    Promise.reject({error: fakeError}),
  )
  const form = generate.loginForm()
  // the catch below is simply to ignore the error thrown
  controller.register(form).catch(i => i)
  expect(apiMock.auth.register).toHaveBeenCalledTimes(1)
  expect(apiMock.auth.register).toHaveBeenCalledWith(form)
  await wait(() => expect(children).toHaveBeenCalledTimes(2))
  expect(children).toHaveBeenCalledWith(
    expect.objectContaining({
      pending: true,
      error: null,
      user: null,
    }),
  )
  expect(children).toHaveBeenLastCalledWith(
    expect.objectContaining({
      error: fakeError,
      pending: false,
      user: null,
    }),
  )
})

async function setup() {
  let controller
  const children = jest.fn(c => {
    controller = c
    return null
  })
  const div = document.createElement('div')
  ReactDOM.render(<User>{children}</User>, div)
  children.mockClear()
  await wait(() => expect(children).toHaveBeenCalledTimes(1))
  children.mockClear()
  return {controller, children}
}
