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
  beforeAll(async () => {
    const currentUser = await createNewUser()
    api.defaults.headers.common.authorization = `Token ${currentUser.token}`
  })

  afterAll(() => {
    api.defaults.headers.common.authorization = ''
    // TODO: create a delete method to delete the user after the tests are done.
  })

  test('post a new article', async () => {
    const newArticle = generateArticleForClient()
    const result = await createNewArticle(newArticle)
    expect(result).toMatchObject(newArticle)
  })

  test('update an article', async () => {
    const {slug, updatedAt, title} = await createNewArticle()
    const newTitle = title + Math.random()
    const result = await api
      .put(`articles/${slug}`, {
        article: {title: newTitle},
      })
      .then(getArticle)
    expect(result.title).toEqual(newTitle)
    expect(result.updatedAt).not.toBe(updatedAt)
  })

  test('delete an article', async () => {
    const {slug} = await createNewArticle()
    await api.delete(`articles/${slug}`)
    const error = await api.get(`/articles/${slug}`).catch(e => e)
    expect(error.response.status).toBe(404)
  })
})

function createNewUser(overrides) {
  const password = faker.internet.password()
  const userData = generateUserData(overrides)
  const {email, username} = userData
  return api.post('users', {user: {email, password, username}}).then(getUser)
}

function createNewArticle(overrides) {
  const newArticle = generateArticleForClient(overrides)
  return api.post('articles', {article: newArticle}).then(getArticle)
}

test('I submitted my elaboration and feedback', () => {
  const submitted = true
  expect(true).toBe(submitted)
})

//////// EXTRA CREDIT ////////

// If you get this far, try adding a few more tests,
// then file a pull request to add them as extra credit!
// Learn more here: http://kcd.im/testing-workshop-contributing
