import axios from 'axios'
import faker from 'faker'
import {generateArticleForClient} from '../../../other/generate/article'
import generateUserData from '../../../other/generate/user'
import startServer from '../../src/start-server'

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
})

// just a handy utility for some of our promise-based code
// you might consider making something similar for the articles
// stuff
const getUser = res => res.data.user

const getArticle = res => res.data.article
const getArticles = res => res.data.articles

let server

beforeAll(async () => {
  server = await startServer()
})

afterAll(done => {
  server.close(done)
})

describe('unauthenticated', () => {
  test('get with limit', async () => {
    const limit = 10
    const articles = await api
      .get(`articles?limit=${limit}&offset=0`)
      .then(getArticles)
    expect(articles).toHaveLength(limit)
  })

  test('get with offset', async () => {
    const articles1 = await api
      .get(`articles?limit=2&offset=0`)
      .then(getArticles)
    const articles2 = await api
      .get(`articles?limit=1&offset=1`)
      .then(getArticles)
    expect(articles1[1]).toEqual(articles2[0])
  })
})

describe('authenticated', () => {
  let cleanupUser
  beforeAll(async () => {
    const results = await createNewUser()
    cleanupUser = results.cleanup
    api.defaults.headers.common.authorization = `Token ${results.user.token}`
  })

  afterAll(async () => {
    await cleanupUser()
    api.defaults.headers.common.authorization = ''
  })

  test('post a new article', async () => {
    const newArticle = generateArticleForClient()
    const {article, cleanup} = await createNewArticle(newArticle)
    expect(article).toMatchObject(newArticle)
    cleanup()
  })

  test('update an article', async () => {
    const {
      article: {slug, updatedAt, body},
      cleanup,
    } = await createNewArticle()
    // doesn't matter what it is, just that it's different
    const newBody = `__${body}__`
    const updatedArticle = await api
      .put(`articles/${slug}`, {
        article: {body: newBody},
      })
      .then(getArticle)
    expect(updatedArticle.body).toEqual(newBody)
    expect(updatedArticle.updatedAt).not.toBe(updatedAt)
    await cleanup()
  })

  test('delete an article', async () => {
    const {article: {slug}} = await createNewArticle()
    await api.delete(`articles/${slug}`)
    const error = await api.get(`/articles/${slug}`).catch(e => e)
    expect(error.response.status).toBe(404)
  })
})

async function createNewUser(overrides) {
  const password = faker.internet.password()
  const userData = generateUserData(overrides)
  const {email, username} = userData
  const user = await api
    .post('users', {user: {email, password, username}})
    .then(getUser)
  return {
    user,
    cleanup() {
      return api.delete(`users/${user.username}`)
    },
  }
}

async function createNewArticle(overrides) {
  const newArticle = generateArticleForClient(overrides)
  const article = await api
    .post('articles', {article: newArticle})
    .then(getArticle)
  return {
    article,
    cleanup() {
      return api.delete(`articles/${article.slug}`)
    },
  }
}

test('I submitted my elaboration and feedback', () => {
  const submitted = true
  expect(true).toBe(submitted)
})

//////// EXTRA CREDIT ////////

// If you get this far, try adding a few more tests,
// then file a pull request to add them as extra credit!
// Learn more here: http://kcd.im/testing-workshop-contributing
