import axios from 'axios'
import db from '../src/db'
import {resetDb} from '../other/db-test-utils'
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

test('can get users', async () => {
  const users = await api.get('users').then(getData)
  expect(users).toEqual(mockData.users)
})
