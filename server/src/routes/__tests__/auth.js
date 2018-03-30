import axios from 'axios'
import {resetDb, generate} from 'til-server-test-utils'
import db from '../../utils/db'
import {getUserToken} from '../../utils/auth'
import startServer from '../../start'

jest.unmock('axios')

const getData = res => res.data
const getError = error => error.response
const getUser = res => res.data.user

let baseURL, api, authAPI, server, testUser

beforeAll(async () => {
  server = await startServer({port: 8778})
  baseURL = `http://localhost:${server.address().port}/api`
  api = axios.create({baseURL})
})

afterAll(() => server.close())

beforeEach(async () => {
  testUser = generate.userData({id: generate.id()})
  await resetDb({testUser})
  const token = getUserToken(testUser)
  authAPI = axios.create({baseURL})
  authAPI.defaults.headers.common.authorization = `Bearer ${token}`
})

test('get me', async () => {
  const {user} = await authAPI.get('auth/me').then(getData)
  expect({...testUser, token: generate.token(testUser)}).toMatchObject(user)
})

test('username required to register', async () => {
  const error = await api
    .post('auth/register', {password: generate.password()})
    .catch(getError)
  expect(error).toMatchObject({
    status: 422,
    data: {errors: {username: expect.any(String)}},
  })
  expect(error.data.errors).toMatchSnapshot()
})

test('password required to register', async () => {
  const error = await api
    .post('auth/register', {username: generate.username()})
    .catch(getError)
  expect(error).toMatchObject({
    status: 422,
    data: {errors: {password: expect.any(String)}},
  })
  expect(error.data.errors).toMatchSnapshot()
})

test('username required to login', async () => {
  const error = await api
    .post('auth/login', {password: generate.password()})
    .catch(getError)
  expect(error).toMatchObject({
    status: 422,
    data: {errors: {username: expect.any(String)}},
  })
  expect(error.data.errors).toMatchSnapshot()
})

test('password required to login', async () => {
  const error = await api
    .post('auth/login', {username: generate.username()})
    .catch(getError)
  expect(error).toMatchObject({
    status: 422,
    data: {errors: {password: expect.any(String)}},
  })
  expect(error.data.errors).toMatchSnapshot()
})

test('user must exist to login', async () => {
  const error = await api
    .post('auth/login', generate.loginForm({username: '__will_never_exist__'}))
    .catch(getError)
  expect(error).toMatchObject({
    status: 422,
    data: {errors: {'username or password': expect.any(String)}},
  })
  expect(error.data.errors).toMatchSnapshot()
})

test('username must be unique', async () => {
  const username = generate.username()
  await db.insertUser(generate.userData({username}))
  const error = await api
    .post('auth/register', {username, password: 'nancy'})
    .catch(getError)
  expect(error).toMatchObject({
    status: 422,
    data: {errors: {username: expect.any(String)}},
  })
  expect(error.data.errors).toMatchSnapshot()
})

test('successful login', async () => {
  const password = generate.password()
  const newTestUser = await db.insertUser(generate.userData({password}))
  const user = await api
    .post('auth/login', {
      username: newTestUser.username,
      password,
    })
    .then(getUser)
  expect(user).toEqual({
    token: expect.any(String),
    id: newTestUser.id,
    username: newTestUser.username,
  })
})
