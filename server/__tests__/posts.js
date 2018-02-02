import faker from 'faker'
import axios from 'axios'
// eslint-disable-next-line
import {resetDb, generate} from 'server-test-utils'
import {getUserToken} from '../src/auth'
import startServer from '../src/start'

const getData = res => res.data
const getPost = res => res.data.post

let baseURL, api, authAPI, server, mockData, testUser

beforeAll(async () => {
  server = await startServer({port: 8798})
  baseURL = `http://localhost:${server.address().port}/api`
  api = axios.create({baseURL})
})

afterAll(async () => {
  await server.close()
})

beforeEach(async () => {
  testUser = generate.userData({id: faker.random.uuid()})
  mockData = await resetDb({testUser})
  const token = getUserToken(testUser)
  authAPI = axios.create({baseURL})
  authAPI.defaults.headers.common.authorization = `Bearer ${token}`
})

test('post CRUD', async () => {
  // create
  const newPostData = generate.postData({authorId: testUser.id})
  const testPost = await authAPI.post(`posts`, newPostData).then(getPost)
  expect(testPost).toMatchObject(newPostData)

  // read
  const readPost = await authAPI.get(`posts/${testPost.id}`).then(getPost)
  expect(readPost).toEqual(testPost)

  // update
  const updates = {title: generate.title()}
  const updatedTestPost = await authAPI
    .put(`posts/${testPost.id}`, updates)
    .then(getPost)
  expect(updatedTestPost).toMatchObject(updates)

  // delete
  const deletedPost = await authAPI.delete(`posts/${testPost.id}`).then(getPost)
  expect(deletedPost).toEqual(updatedTestPost)

  // read of deleted user
  const error = await api.get(`posts/${deletedPost.id}`).catch(e => e.response)
  expect(error.status).toBe(404)
})

test('get posts', async () => {
  const {posts} = await api.get('posts').then(getData)
  expect(posts).toEqual(mockData.posts)
})
