import faker from 'faker'
import axios from 'axios'
import {resetDb} from '../other/db-test-utils'
import {getUserToken} from '../src/auth'
import {generateUserData} from '../other/generate'
import startServer from '../src/start'

const getData = res => res.data

let baseURL, authAPI, server, testUser

beforeAll(async () => {
  server = await startServer()
  baseURL = `http://localhost:${server.address().port}/api`
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
