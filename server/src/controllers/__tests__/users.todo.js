import {omit} from 'lodash'
import * as usersController from '../users'
import db from '../../utils/db'
// eslint-disable-next-line
import {initDb, generate} from 'server-test-utils'

// this setup is common across controllers, so it may be useful to
// add this to the utils, but I'll leave it here for you :)
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

const safeUser = u => omit(u, ['salt', 'hash'])

beforeEach(() => initDb())

test('getUsers returns all users in the database', async () => {
  const {req, res} = setup()

  await usersController.getUsers(req, res)

  expect(res.json).toHaveBeenCalledTimes(1)
  const firstCall = res.json.mock.calls[0]
  const firstArg = firstCall[0]
  const {users} = firstArg
  expect(users.length).toBeGreaterThan(0)
  const actualUsers = await db.getUsers()
  expect(users).toEqual(actualUsers.map(safeUser))
})

test('getUser returns the specific user', async () => {
  const testUser = await db.insertUser(generate.userData())
  const {res, req} = setup()
  req.params = {id: testUser.id}

  await usersController.getUser(req, res)

  expect(res.json).toHaveBeenCalledTimes(1)
  const firstCall = res.json.mock.calls[0]
  const firstArg = firstCall[0]
  const {user} = firstArg
  expect(user).toEqual(safeUser(testUser))
  const userFromDb = await db.getUser(user.id)
  expect(userFromDb).toEqual(testUser)
})

test('updateUser updates the user with the given changes', async () => {
  const testUser = await db.insertUser(generate.userData())
  const {req, res} = setup()
  req.user = {id: testUser.id}
  req.params = {id: testUser.id}
  const username = generate.username()
  req.body = {username}
  const updatedUser = {...testUser, username}

  await usersController.updateUser(req, res)

  expect(res.json).toHaveBeenCalledTimes(1)
  const firstCall = res.json.mock.calls[0]
  const firstArg = firstCall[0]
  const {user} = firstArg
  expect(user).toEqual(safeUser(updatedUser))
  const userFromDb = await db.getUser(user.id)
  expect(userFromDb).toEqual(updatedUser)
})

// Here's where you'll add your tests!
// - Think more about use cases than code coverage and use those use cases to title your tests
// - Write the code and tests iteratively as little as necessary at a time.

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
  expect(true).toBe(submitted)
})
////////////////////////////////
