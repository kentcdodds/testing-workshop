import axios from 'axios'
import {omit} from 'lodash'
// eslint-disable-next-line
import {initDb, generate} from 'server-test-utils'
import startServer from '../../start'

jest.unmock('axios')

const getData = res => res.data
const getUser = res => res.data.user

let baseURL, api, server, mockData

beforeAll(async () => {
  server = await startServer({port: 8788})
  baseURL = `http://localhost:${server.address().port}/api`
  api = axios.create({baseURL})
})

afterAll(() => server.close())

beforeEach(async () => {
  mockData = await initDb()
})

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

test('get users', async () => {
  const {users} = await api.get('users').then(getData)
  expect(users).toEqual(mockData.users.map(u => omit(u, ['hash', 'salt'])))
})
