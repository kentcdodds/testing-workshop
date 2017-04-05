import axios from 'axios'
import startServer from '../../src/start-server'

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
})

let server

beforeAll(async () => {
  server = await startServer()
})

afterAll(done => {
  server.close(done)
})

test('gets with limit', async () => {
  const limit = 10
  const {data: {articles}} = await api.get(`articles?limit=${limit}&offset=0`)
  expect(articles).toHaveLength(limit)
})

test('gets with offset', async () => {
  const {data: {articles: articles1}} = await api.get(
    `articles?limit=2&offset=0`,
  )
  const {data: {articles: articles2}} = await api.get(
    `articles?limit=1&offset=1`,
  )
  expect(articles1[1]).toEqual(articles2[0])
})
