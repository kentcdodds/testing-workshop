import axios from 'axios'
import {omit} from 'lodash'
import {resetDb} from '../other/db-test-utils'
import startServer from '../src/start'

const getData = res => res.data
const getUser = res => res.data.user

let baseURL, api, server, mockData

beforeAll(async () => {
  server = await startServer()
  baseURL = `http://localhost:${server.address().port}/api`
  api = axios.create({baseURL})
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
