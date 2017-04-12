// WORKSHOP_START
// you're going to need to start the server before all the tests
// start and close the server after all the tests are finished.
// startServer is a function that returns a promise which resolves
// to the server object. The server object has a `close` function
// which accepts a callback. Kinda wonky, I know... But you should
// learn how to use both async styles with these tests sooo... :)
// eslint-disable-next-line no-unused-vars
// WORKSHOP_END
import startServer from '../../src/start-server'
// WORKSHOP_START
// pulling this in for you. Hint, you'll want it for at least one
// of the tests :)
// eslint-disable-next-line no-unused-vars
// WORKSHOP_END
import {generateArticleForClient} from '../../../other/generate/article'
// WORKSHOP_START
// from here you're pretty much on your own.
// Tip: create a ./helpers/api-client where you can have
//   some of the logic for dealing with articles and users
//   (because you'll need to perform basic CRUD and it's
//   nice to avoid that cruft in your tests)
// WORKSHOP_END

// FINAL_START
import {api, user, article} from './helpers/api-client'

let server

beforeAll(async () => {
  server = await startServer()
})

afterAll(done => {
  server.close(done)
})

// FINAL_END
describe('unauthorized', () => {
  test('get with limit', async () => {
    // WORKSHOP_START
    // TODO
    // WORKSHOP_END
    // FINAL_START
    const limit = 10
    const {data: {articles}} = await api.get(
      `articles?limit=${limit}&offset=0`,
    )
    expect(articles).toHaveLength(limit)
    // FINAL_END
  })

  test('get with offset', async () => {
    // WORKSHOP_START
    // TODO
    // WORKSHOP_END
    // FINAL_START
    const {data: {articles: articles1}} = await api.get(
      `articles?limit=2&offset=0`,
    )
    const {data: {articles: articles2}} = await api.get(
      `articles?limit=1&offset=1`,
    )
    expect(articles1[1]).toEqual(articles2[0])
    // FINAL_END
  })
})

describe('authorized', () => {
  // WORKSHOP_START
  // // TODO
  // tip: you're going to need to create a new user
  //   for these tests and set up the API client to
  //   use that user's token. You can look at the
  //   API client in the client application to see
  //   how this is done: client/src/shared/agent.js
  // WORKSHOP_END
  // FINAL_START
  beforeAll(async () => {
    const currentUser = await user.create()
    api.defaults.headers.common.authorization = `Token ${currentUser.token}`
  })

  afterAll(() => {
    api.defaults.headers.common.authorization = ''
  })
  // FINAL_END

  test('post a new article', async () => {
    // WORKSHOP_START
    // TODO
    // WORKSHOP_END
    // FINAL_START
    const newArticle = generateArticleForClient()
    const result = await article.create(newArticle)
    expect(result).toMatchObject(newArticle)
    // FINAL_END
  })

  test('update an article', async () => {
    // WORKSHOP_START
    // TODO
    // WORKSHOP_END
    // FINAL_START
    const {slug, updatedAt, title} = await article.create()
    const newTitle = title + Math.random()
    const result = await article.update({title: newTitle, slug})
    expect(result.title).toEqual(newTitle)
    expect(result.updatedAt).not.toBe(updatedAt)
    // FINAL_END
  })

  test('delete an article', async () => {
    // WORKSHOP_START
    // TODO
    // WORKSHOP_END
    // FINAL_START
    const articleData = await article.create()
    await article.delete(articleData)
    const error = await article.get(articleData).catch(e => e)
    expect(error.response.status).toBe(404)
    // FINAL_END
  })
})
