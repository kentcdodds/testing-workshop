import React from 'react'
import User from '../user'
import * as apiMock from '../../utils/api'
// eslint-disable-next-line
import {mountWithRouter, flushAllPromises} from 'til-test-utils'

jest.mock('../../utils/api', () => {
  const mock = {}
  const authResponse = {user: null}
  function reset() {
    Object.assign(mock, {
      auth: Object.assign(mock.auth || {}, {
        me: jest.fn(() => Promise.resolve(authResponse)),
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
  const children = jest.fn(() => null)
  mountWithRouter(<User>{children}</User>)
  await flushAllPromises()
  expect(apiMock.auth.me).toHaveBeenCalledTimes(1)
})
