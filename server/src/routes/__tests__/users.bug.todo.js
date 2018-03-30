import axios from 'axios'
import {omit} from 'lodash'
import {initDb, generate} from 'til-server-test-utils'
// comment this back in
// import db from '../../utils/db'
import startServer from '../../start'

jest.unmock('axios')

const getUser = res => res.data.user

let baseURL, api, server

beforeAll(async () => {
  server = await startServer({port: 8789})
  baseURL = `http://localhost:${server.address().port}/api`
  api = axios.create({baseURL})
})

afterAll(() => server.close())

beforeEach(() => initDb())

test('user CRUD', async () => {
  // create
  const registerData = generate.loginForm()
  const testUser = await api.post('auth/register', registerData).then(getUser)
  expect(testUser.username).toBe(registerData.username)

  // read (unauthenticated)
  const readUserUnauthenticated = await api
    .get(`users/${testUser.id}`)
    .then(getUser)
  expect(readUserUnauthenticated).toEqual(omit(testUser, ['token']))

  // get authenticated client
  const authAPI = axios.create({
    baseURL,
  })
  authAPI.defaults.headers.common.authorization = `Bearer ${testUser.token}`

  // read (authenticated)
  const readUserAuthenticated = await api
    .get(`users/${testUser.id}`)
    .then(getUser)
  expect(readUserAuthenticated).toEqual(testUser)

  // update
  const updates = {username: generate.username()}
  const updatedTestUser = await authAPI
    .put(`users/${testUser.id}`, updates)
    .then(getUser)
  expect(updatedTestUser).toMatchObject(updates)

  // delete
  const deletedTestUser = await authAPI
    .delete(`users/${testUser.id}`)
    .then(getUser)
  expect(deletedTestUser).toEqual(updatedTestUser)

  // read of deleted user
  const error = await api
    .get(`users/${updatedTestUser.id}`)
    .catch(e => e.response)
  expect(error.status).toBe(404)
})

// Here's where you'll write your bug-fixing test! 🐛
// It's relatively simple (should only be a few lines).
//
// Use the existing axios instance in this file called "api"
// to make a get request to the 'users' endpoint.
// This should return you an object with a users array.
// Then you can uncomment the db import at the top of the file
// to get all the users that currently exist in the database with
// `await db.getUsers()`. Then verify that the users you got back
// from the endpoint are the same ones that are in the database.
// This should pass: expect(usersFromEndpoint).toEqual(usersFromDatabase))
//
// Next, to actually reproduce the bug, update the assertion so
// usersFromDatabase is mapped to omit the hash and salt properties.
// (You can use the omit function from lodash).
// This should fail.
//
// Now go fix the bug to make your test pass!

//////// Elaboration & Feedback /////////
// When you've finished with the exercises:
// 1. Copy the URL below into your browser and fill out the form
// 2. remove the `.skip` from the test below
// 3. Change submitted from `false` to `true`
// 4. And you're all done!
/*
http://ws.kcd.im/?ws=Testing&e=users%20integration&em=
*/
test.skip('I submitted my elaboration and feedback', () => {
  const submitted = false // change this when you've submitted!
  expect(submitted).toBe(true)
})
////////////////////////////////
