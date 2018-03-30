// This is how we'd implement unit tests for the auth controller
// compare this to the integration tests :)
import passport from 'passport'
import {generate} from 'til-server-test-utils'
import db from '../../utils/db'
import * as authController from '../auth.todo'

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

// Here's where you'll add your test to fix the bug!
// The bug lives in the file `../auth.todo` and is fixed
// in the file `../auth` if you need to reference that.
//
// Create an async test to test the authController.me function
// You'll notice that authController.me expects a user object
// on the `req.user` property, so you'll need to generate a
// new user with an id property. Like so:
// generate.userData({id: generate.id()})
// Your test should ensure that res.json was called once and
// only with the right data from the user.
//
// The bug is that the controller is not sending back the token
// which is resulting in authentication not working.
// The response should include the token.
//
// You can verify the token using expect.any(String) or any
// other means you feel bring you confidence this wont break
// again. (There is a generate.token method if you want to try that).

//////// Elaboration & Feedback /////////
// When you've finished with the exercises:
// 1. Copy the URL below into your browser and fill out the form
// 2. remove the `.skip` from the test below
// 3. Change submitted from `false` to `true`
// 4. And you're all done!
/*
http://ws.kcd.im/?ws=Testing&e=postsController&em=
*/
test.skip('I submitted my elaboration and feedback', () => {
  const submitted = false // change this when you've submitted!
  expect(submitted).toBe(true)
})
////////////////////////////////
