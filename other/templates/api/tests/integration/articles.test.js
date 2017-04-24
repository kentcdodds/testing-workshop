import axios from 'axios'
import faker from 'faker'
import {generateArticleForClient} from '../../../other/generate/article'
import generateUserData from '../../../other/generate/user'
// WORKSHOP_START
// you're going to need to start the server before all the tests
// start and close the server after all the tests are finished.
// startServer is a function that returns a promise which resolves
// to the server object. The server object has a `close` function
// which accepts a callback. Kinda wonky, I know... But you should
// learn how to use both async styles with these tests so I left it
// like that :)
// WORKSHOP_END
import startServer from '../../src/start-server'

// WORKSHOP_START
// I'm going to give you this just so you don't have to look it up:
// WORKSHOP_END
const api = axios.create({
  baseURL: 'http://localhost:3000/api',
})
// WORKSHOP_START
// Note also that the articles endpoints are at: api/articles
// So to get articles, you can do: api.get('articles') which
// will return a promise that resolves to the response from the
// request.
//
// From here you're pretty much on your own.
// To come up with what to test, try to think of
// the use cases you want to support. Start with
// the unauthenticated stuff.
//
// If you want to do authenticated endpoints,
// you'll need to call createNewUser, and use the
// token you get back like this:
// api.defaults.headers.common.authorization = `Token ${token}`
// then the api is authenticated
// WORKSHOP_END

// just a handy utility for some of our promise-based code
// you might consider making something similar for the articles
// stuff
const getUser = res => res.data.user

// WORKSHOP_START
//////////////////////
// 👋 Put your tests here
///////////////////////
// WORKSHOP_END
// FINAL_START
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
// FINAL_END

// WORKSHOP_START
// I've left this here for you as a little utility that's a little
// domain-specific and isn't super pertinent to learning testing :)
// Just know that utilities like this are pretty darn useful and you
// should probably have things like this in your tests :)
// WORKSHOP_END
function createNewUser(overrides) {
  const password = faker.internet.password()
  const userData = generateUserData(overrides)
  const {email, username} = userData
  return api.post('users', {user: {email, password, username}}).then(getUser)
}

// FINAL_START
function createNewArticle(overrides) {
  const newArticle = generateArticleForClient(overrides)
  return api.post('articles', {article: newArticle}).then(getArticle)
}
// FINAL_END

// WORKSHOP_START
//////// Elaboration & Feedback /////////
/*
http://ws.kcd.im/?ws=Testing&e=API%20Integration&em=
*/
test.skip('I submitted my elaboration and feedback', () => {
  const submitted = false // change this when you've submitted!
  expect(true).toBe(submitted)
})
////////////////////////////////
// WORKSHOP_END
// FINAL_START
test('I submitted my elaboration and feedback', () => {
  const submitted = true
  expect(true).toBe(submitted)
})
// FINAL_END

//////// EXTRA CREDIT ////////

// If you get this far, try adding a few more tests,
// then file a pull request to add them as extra credit!
// Learn more here: http://kcd.im/testing-workshop-contributing
