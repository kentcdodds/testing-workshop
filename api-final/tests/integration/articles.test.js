import startServer from '../../src/start-server'
import {generateArticleForClient} from '../../../other/generate/article'

import {api, user, article} from './helpers/api-client'

let server

beforeAll(async () => {
  server = await startServer()
})

afterAll(done => {
  server.close(done)
})

describe('unauthorized', () => {
  test('get with limit', async () => {
    const limit = 10
    const {data: {articles}} = await api.get(
      `articles?limit=${limit}&offset=0`,
    )
    expect(articles).toHaveLength(limit)
  })

  test('get with offset', async () => {
    const {data: {articles: articles1}} = await api.get(
      `articles?limit=2&offset=0`,
    )
    const {data: {articles: articles2}} = await api.get(
      `articles?limit=1&offset=1`,
    )
    expect(articles1[1]).toEqual(articles2[0])
  })
})

describe('authorized', () => {
  beforeAll(async () => {
    const currentUser = await user.create()
    api.defaults.headers.common.authorization = `Token ${currentUser.token}`
  })

  afterAll(() => {
    api.defaults.headers.common.authorization = ''
  })

  test('post a new article', async () => {
    const newArticle = generateArticleForClient()
    const result = await article.create(newArticle)
    expect(result).toMatchObject(newArticle)
  })

  test('update an article', async () => {
    const {slug, updatedAt, title} = await article.create()
    const newTitle = title + Math.random()
    const result = await article.update({title: newTitle, slug})
    expect(result.title).toEqual(newTitle)
    expect(result.updatedAt).not.toBe(updatedAt)
  })

  test('delete an article', async () => {
    const articleData = await article.create()
    await article.delete(articleData)
    const error = await article.get(articleData).catch(e => e)
    expect(error.response.status).toBe(404)
  })
})
