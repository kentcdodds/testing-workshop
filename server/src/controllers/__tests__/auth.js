// This is how we'd implement unit tests for the auth controller
// compare this to the integration tests :)
import db from '../../db'
// eslint-disable-next-line
import {generate} from 'server-test-utils'
import * as authController from '../auth'

function setup() {
  const req = {
    body: {},
  }
  const res = {}
  const next = jest.fn()
  Object.assign(res, {
    status: jest.fn(
      function status() {
        return this
      }.bind(res),
    ),
    json: jest.fn(
      function json() {
        return this
      }.bind(res),
    ),
    send: jest.fn(
      function send() {
        return this
      }.bind(res),
    ),
  })
  return {req, res, next}
}

test('username required to register', async () => {
  const {req, res, next} = setup()
  req.body = {password: generate.password()}
  await authController.register(req, res, next)
  expect(res.status).toHaveBeenCalledTimes(1)
  expect(res.status).toHaveBeenCalledWith(422)
  expect(res.json).toHaveBeenCalledTimes(1)
  expect(res.json).toHaveBeenCalledWith({
    errors: {username: expect.any(String)},
  })
  expect(res.json.mock.calls[0][0]).toMatchSnapshot()
})

test('password required to register', async () => {
  const {req, res, next} = setup()
  req.body = {username: generate.username()}
  await authController.register(req, res, next)
  expect(res.status).toHaveBeenCalledTimes(1)
  expect(res.status).toHaveBeenCalledWith(422)
  expect(res.json).toHaveBeenCalledTimes(1)
  expect(res.json).toHaveBeenCalledWith({
    errors: {password: expect.any(String)},
  })
  expect(res.json.mock.calls[0][0]).toMatchSnapshot()
})

test('username required to login', async () => {
  const {req, res, next} = setup()
  req.body = {password: generate.password()}
  await authController.login(req, res, next)
  expect(res.status).toHaveBeenCalledTimes(1)
  expect(res.status).toHaveBeenCalledWith(422)
  expect(res.json).toHaveBeenCalledTimes(1)
  expect(res.json).toHaveBeenCalledWith({
    errors: {username: expect.any(String)},
  })
  expect(res.json.mock.calls[0][0]).toMatchSnapshot()
})

test('password required to login', async () => {
  const {req, res, next} = setup()
  req.body = {username: generate.username()}
  await authController.login(req, res, next)
  expect(res.status).toHaveBeenCalledTimes(1)
  expect(res.status).toHaveBeenCalledWith(422)
  expect(res.json).toHaveBeenCalledTimes(1)
  expect(res.json).toHaveBeenCalledWith({
    errors: {password: expect.any(String)},
  })
  expect(res.json.mock.calls[0][0]).toMatchSnapshot()
})

test('username must be unique', async () => {
  const username = generate.username()
  await db.insertUser(generate.userData({username}))

  const {req, res, next} = setup()
  req.body = generate.loginForm({username})
  await authController.register(req, res, next)
  expect(res.status).toHaveBeenCalledTimes(1)
  expect(res.status).toHaveBeenCalledWith(422)
  expect(res.json).toHaveBeenCalledTimes(1)
  expect(res.json).toHaveBeenCalledWith({
    errors: {username: expect.any(String)},
  })
  expect(res.json.mock.calls[0][0]).toMatchSnapshot()
})

test('me without req.user returns 404', async () => {
  const {req, res, next} = setup()
  await authController.me(req, res, next)
  expect(res.status).toHaveBeenCalledTimes(1)
  expect(res.status).toHaveBeenCalledWith(404)
  expect(res.send).toHaveBeenCalledTimes(1)
  expect(res.send).toHaveBeenCalledWith()
})
