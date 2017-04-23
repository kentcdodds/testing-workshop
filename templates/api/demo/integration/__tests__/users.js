// FINAL_START
import axios from 'axios'
import faker from 'faker'
import startServer from '../start-server'

const api = axios.create({
  baseURL: 'http://localhost:3001/api',
})

let server

beforeAll(async () => {
  server = await startServer()
})

afterAll(done => {
  server.close(done)
})

describe('unauthorized', () => {
  test('can limit the users', async () => {
    const users = await api.get('users?limit=10').then(r => r.data.users)
    expect(users).toHaveLength(10)
  })

  test('can get users with an offset', async () => {
    const [, user1] = await api
      .get('users?offset=0&limit=2')
      .then(r => r.data.users)
    const [user2] = await api
      .get('users?offset=1&limit=1')
      .then(r => r.data.users)
    expect(user1).toEqual(user2)
  })

  test('cannot add a user', async () => {
    const response = await api.post('users', {}).catch(error => error.response)
    expect(response.status).toBe(401)
  })
})

describe('authorized', () => {
  beforeAll(async () => {
    const currentUser = await api
      .post('auth', {
        username: 'jane',
        password: 'I have a secure password',
      })
      .then(r => r.data.user)
    api.defaults.headers.common.authorization = `Token ${currentUser.token}`
  })

  afterAll(() => {
    api.defaults.headers.common.authorization = ''
  })

  test('can add a user', async () => {
    const user = generateRandomUserData()
    const result = await api.post('users', {user}).then(r => r.data.user)
    expect(result).toEqual(user)
    const getResult = await api
      .get(`users/${user.username}`)
      .then(r => r.data.user)
    expect(getResult).toEqual(user)
  })

  test('can delete a user', async () => {
    const user = generateRandomUserData()
    await api.post('users', {user})
    await api.delete(`users/${user.username}`)

    const result = await api
      .get(`users/${user.username}`)
      .catch(error => error.response)
    expect(result.status).toBe(404)
  })
})

/**
 * This makes all the types primitive
 * @return {Object} the random user
 */
function generateRandomUserData() {
  return JSON.parse(JSON.stringify(faker.helpers.contextualCard()))
}
// FINAL_END
// WORKSHOP_START
test('todo', () => {})
// WORKSHOP_END
