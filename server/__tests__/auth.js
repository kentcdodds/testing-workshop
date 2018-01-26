import faker from 'faker'
import axios from 'axios'
import db from '../src/db'
import {resetDb} from '../other/db-test-utils'
import {getUserToken} from '../src/auth'
import {generateUserData} from '../../other/generate'
import startServer from '../src/start'

const getData = res => res.data
const getError = error => error.response
const getUser = res => res.data.user

let baseURL, api, authAPI, server, testUser

beforeAll(async () => {
  server = await startServer({port: 8778})
  baseURL = `http://localhost:${server.address().port}/api`
  api = axios.create({baseURL})
})

afterAll(async () => {
  await server.close()
})

beforeEach(async () => {
  testUser = generateUserData({id: faker.random.uuid()})
  await resetDb({testUser})
  const token = getUserToken(testUser)
  authAPI = axios.create({baseURL})
  authAPI.defaults.headers.common.authorization = `Bearer ${token}`
})

test('get me', async () => {
  const {user} = await authAPI.get('auth/me').then(getData)
  expect(testUser).toMatchObject(user)
})

test('username required to register', async () => {
  const error = await api
    .post('auth/register', {password: 'puppies'})
    .catch(getError)
  expect(error).toMatchObject({
    status: 422,
    data: {errors: {username: expect.any(String)}},
  })
  expect(error.data.errors).toMatchSnapshot()
})

test('password required to register', async () => {
  const error = await api
    .post('auth/register', {username: 'kittens'})
    .catch(getError)
  expect(error).toMatchObject({
    status: 422,
    data: {errors: {password: expect.any(String)}},
  })
  expect(error.data.errors).toMatchSnapshot()
})

test('username required to login', async () => {
  const error = await api
    .post('auth/login', {password: 'puppies'})
    .catch(getError)
  expect(error).toMatchObject({
    status: 422,
    data: {errors: {username: expect.any(String)}},
  })
  expect(error.data.errors).toMatchSnapshot()
})

test('password required to login', async () => {
  const error = await api
    .post('auth/login', {username: 'kittens'})
    .catch(getError)
  expect(error).toMatchObject({
    status: 422,
    data: {errors: {password: expect.any(String)}},
  })
  expect(error.data.errors).toMatchSnapshot()
})

test('user must exist to login', async () => {
  const error = await api
    .post('auth/login', {
      username: 'username_will_never_exist',
      password: 'haha',
    })
    .catch(getError)
  expect(error).toMatchObject({
    status: 422,
    data: {errors: {'username or password': expect.any(String)}},
  })
  expect(error.data.errors).toMatchSnapshot()
})

test('username must be unique', async () => {
  const username = 'frank_sinatra'
  await db.insertUser(generateUserData({username}))
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
  const password = 'some password'
  const newTestUser = await db.insertUser(generateUserData({password}))
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
