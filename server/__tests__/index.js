import axios from 'axios'
import {omit} from 'lodash'
import db from '../src/db'
import {resetDb} from '../other/db-test-utils'
import {generateUserData} from '../other/generate'
import startServer from '../src/start'

const baseURL = 'http://localhost:3000/api'
const api = axios.create({baseURL})

const getData = res => res.data
const getUser = res => res.data.user

let server, mockData

beforeAll(async () => {
  server = await startServer()
})

afterAll(async () => {
  await server.close()
})

beforeEach(async () => {
  mockData = await resetDb()
})

test('user CRUD', async () => {
  // create
  const registerData = {username: 'my-user', password: 'abc123'}
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
  const updates = {username: 'my-user2'}
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

test('get users', async () => {
  const {users} = await api.get('users').then(getData)
  expect(users).toEqual(mockData.users.map(u => omit(u, ['hash', 'salt'])))
})

test('successful login', async () => {
  const password = 'some password'
  const testUser = await db.insertUser(generateUserData({password}))
  const user = await api
    .post('auth/login', {
      username: testUser.username,
      password,
    })
    .then(getUser)
  expect(user).toEqual({
    token: expect.any(String),
    id: testUser.id,
    username: testUser.username,
  })
})
