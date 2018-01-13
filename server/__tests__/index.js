import axios from 'axios'
import db from '../src/db'
import {resetDb} from '../other/db-test-utils'
import {createUser} from '../other/generate'
import startServer from '../src/start'

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
})

const getData = res => res.data

let server
let mockData

beforeAll(async () => {
  server = await startServer()
})

afterAll(async () => {
  await server.close()
})

beforeEach(async () => {
  mockData = await resetDb()
})

test('get users', async () => {
  const users = await api.get('users').then(getData)
  expect(users).toEqual(mockData.users)
})

test('get a specific user by their ID', async () => {
  const {3: fourthUser} = mockData.users
  const user = await api.get(`users/${fourthUser.id}`).then(getData)
  expect(user).toEqual(fourthUser)
})

test('create a user', async () => {
  const newUser = createUser()
  const createdUser = await api.post('users', newUser).then(getData)
  expect(createdUser).toMatchObject(newUser)
  const retrievedUser = await api.get(`users/${createdUser.id}`).then(getData)
  expect(retrievedUser).toEqual(createdUser)
})

test('update a user', async () => {
  const {2: thirdUser} = mockData.users
  const updates = {username: 'some-username'}
  const updatedUser = await api
    .put(`users/${thirdUser.id}`, updates)
    .then(getData)
  expect(updatedUser).toMatchObject(updates)
  const retrievedUser = await api.get(`users/${updatedUser.id}`).then(getData)
  expect(retrievedUser).toEqual(updatedUser)
})

test('delete a user', async () => {
  const {8: ninthUser} = mockData.users
  const deletedUser = await api.delete(`users/${ninthUser.id}`).then(getData)
  expect(deletedUser).toEqual(ninthUser)
  const error = await api.get(`users/${ninthUser.id}`).catch(r => r.response)
  expect(error.status).toBe(404)
})
