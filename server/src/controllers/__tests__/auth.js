// This is how we'd implement unit tests for the auth controller
// compare this to the integration tests :)
import passport from 'passport'
import {generate} from 'til-server-test-utils'
import db from '../../utils/db'
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

test('error returned by passport.authenticate will be thrown through', async () => {
  jest.spyOn(passport, 'authenticate')
  const fakeError = new Error('fake error')
  passport.authenticate.mockImplementationOnce((type, options, cb) => {
    cb(fakeError)
  })
  const {req, res, next} = setup()
  req.body = generate.loginForm()
  const error = await authController.login(req, res, next).catch(e => e)
  expect(error).toBe(fakeError)
  passport.authenticate.mockRestore()
})

test('username must be unique', async () => {
  const username = generate.username()
  const {id: userId} = await db.insertUser(generate.userData({username}))

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

  await db.deleteUser({id: userId})
})

test('me without req.user returns 404', async () => {
  const {req, res, next} = setup()
  await authController.me(req, res, next)
  expect(res.status).toHaveBeenCalledTimes(1)
  expect(res.status).toHaveBeenCalledWith(404)
  expect(res.send).toHaveBeenCalledTimes(1)
  expect(res.send).toHaveBeenCalledWith()
})

test('successful login returns user', async () => {
  jest.spyOn(passport, 'authenticate')
  const loginInfo = generate.loginForm()
  const fakeUser = generate.userData({id: generate.id(), ...loginInfo})
  const fakeToken = generate.token(fakeUser)
  passport.authenticate.mockImplementationOnce((type, options, cb) => {
    cb(null, fakeUser)
  })
  const {req, res, next} = setup()
  req.body = loginInfo
  await authController.login(req, res, next)
  expect(res.status).not.toHaveBeenCalled()
  expect(res.json).toHaveBeenCalledTimes(1)
  expect(res.json).toHaveBeenCalledWith({
    user: {id: fakeUser.id, token: fakeToken, username: fakeUser.username},
  })

  passport.authenticate.mockRestore()
})

test('failed login returns info', async () => {
  jest.spyOn(passport, 'authenticate')
  const fakeInfo = {error: {username: 'is not cool'}}
  passport.authenticate.mockImplementationOnce((type, options, cb) => {
    cb(null, false, fakeInfo)
  })
  const {req, res, next} = setup()
  req.body = generate.loginForm()
  await authController.login(req, res, next)
  expect(res.status).toHaveBeenCalledTimes(1)
  expect(res.status).toHaveBeenCalledWith(422)
  expect(res.json).toHaveBeenCalledTimes(1)
  expect(res.json).toHaveBeenCalledWith(fakeInfo)

  passport.authenticate.mockRestore()
})

test('registering a user inserts the user into the database', async () => {
  const {req, res, next} = setup()
  const loginForm = generate.loginForm()
  req.body = loginForm
  await authController.register(req, res, next)
  const [userInDb] = await db.getUsers(u => u.username === loginForm.username)
  expect(res.status).not.toHaveBeenCalled()
  expect(res.json).toHaveBeenCalledTimes(1)
  expect(res.json).toHaveBeenCalledWith({
    user: {
      id: userInDb.id,
      username: userInDb.username,
      token: generate.token(userInDb),
    },
  })
})

test('if req.user exists, me returns req.user', async () => {
  const {req, res, next} = setup()
  const fakeUser = generate.userData({id: generate.id()})
  const token = generate.token(fakeUser)
  req.user = fakeUser
  await authController.me(req, res, next)
  expect(res.status).not.toHaveBeenCalled()
  expect(res.json).toHaveBeenCalledTimes(1)
  expect(res.json).toHaveBeenCalledWith({
    user: {
      id: fakeUser.id,
      username: fakeUser.username,
      token,
    },
  })
})
