import {omit} from 'lodash'
import {initDb, generate} from 'til-server-test-utils'
import * as usersController from '../users.bug.todo'
import db from '../../utils/db'

// this setup is common across controllers, so it may be useful to
// add this to the utils, but I'll leave it here for you :)
function setup() {
  const req = {
    body: {},
  }
  const res = {}
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
  return {req, res}
}

const safeUser = u => omit(u, ['salt', 'hash'])

beforeEach(() => initDb())

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

test('deleteUser deletes a user', async () => {
  const testUser = await db.insertUser(generate.userData())
  const {req, res} = setup()
  req.user = {id: testUser.id}
  req.params = {id: testUser.id}

  await usersController.deleteUser(req, res)

  expect(res.json).toHaveBeenCalledTimes(1)
  const firstCall = res.json.mock.calls[0]
  const firstArg = firstCall[0]
  const {user} = firstArg
  expect(user).toEqual(safeUser(testUser))
  const userFromDb = await db.getPost(user.id)
  expect(userFromDb).not.toBeDefined()
})

test('deleteUser will 404 if made to a non-existing user', async () => {
  const {req, res} = setup()
  const nonExistantId = generate.id()
  req.params = {id: nonExistantId}
  req.user = {id: nonExistantId}
  await usersController.deleteUser(req, res)

  expect(res.json).not.toHaveBeenCalled()
  expect(res.status).toHaveBeenCalledTimes(1)
  expect(res.status).toHaveBeenCalledWith(404)
  expect(res.send).toHaveBeenCalledTimes(1)
})

test('deleteUser will 403 if not made by the author', async () => {
  const testUser = await db.insertPost(generate.userData())
  const {req, res} = setup()
  req.params = {id: testUser.id}

  await usersController.deleteUser(req, res)

  expect(res.json).not.toHaveBeenCalled()
  expect(res.status).toHaveBeenCalledTimes(1)
  expect(res.status).toHaveBeenCalledWith(403)
  expect(res.send).toHaveBeenCalledTimes(1)
  const userFromDb = await db.getPost(testUser.id)
  expect(userFromDb).toEqual(testUser)
})

// Here's where you'll add your bug-fixing test! 🐛
// You'll need to setup req and res objects to pass
// to `usersController.getUsers`
// Then ensure res.json was called with the right users
// You can get the users in the database with await db.getUsers()
// but you'll want to make sure that the users res.json was
// called with don't have the hash and salt. You can use
// the safeUser helper method to map all the users in the
// database to "safe users"
//
// Once your test is properly failing (because you've uncovered
// the bug), then go to the file with the bug and fix it.
// The file is `server/src/controllers/users.bug.todo.js`

//////// Elaboration & Feedback /////////
// When you've finished with the exercises:
// 1. Copy the URL below into your browser and fill out the form
// 2. remove the `.skip` from the test below
// 3. Change submitted from `false` to `true`
// 4. And you're all done!
/*
http://ws.kcd.im/?ws=Testing&e=users%20bug&em=
*/
test.skip('I submitted my elaboration and feedback', () => {
  const submitted = false // change this when you've submitted!
  expect(submitted).toBe(true)
})
////////////////////////////////
