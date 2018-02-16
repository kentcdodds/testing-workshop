import * as postsController from '../posts.todo'
import db from '../../utils/db'
// eslint-disable-next-line
import {initDb, generate} from 'server-test-utils'

// this setup is common across controllers, so it may be useful to
// add this to the utils, but I'll leave it here for you :)
function setup() {
  const req = {
    params: {},
    body: {},
  }
  const res = {}
  const next = jest.fn()
  Object.assign(res, {
    status: jest.fn(
      function status() {
        return this
      }.bind(res),
    ),
    json: jest.fn(
      function json() {
        return this
      }.bind(res),
    ),
    send: jest.fn(
      function send() {
        return this
      }.bind(res),
    ),
  })
  return {req, res, next}
}

beforeEach(() => initDb())

test('getPosts returns all posts in the database', async () => {
  const {req, res} = setup()

  await postsController.getPosts(req, res)

  expect(res.json).toHaveBeenCalledTimes(1)
  const firstCall = res.json.mock.calls[0]
  const firstArg = firstCall[0]
  const {posts} = firstArg
  expect(posts.length).toBeGreaterThan(0)
  const actualPosts = await db.getPosts()
  expect(posts).toEqual(actualPosts)
})

test('getPost returns the specific post', async () => {
  const testPost = await db.insertPost(generate.postData())
  const {res, req} = setup()
  req.params = {id: testPost.id}

  await postsController.getPost(req, res)

  expect(res.json).toHaveBeenCalledTimes(1)
  const firstCall = res.json.mock.calls[0]
  const firstArg = firstCall[0]
  const {post} = firstArg
  expect(post).toEqual(testPost)
  const postFromDb = await db.getPost(post.id)
  expect(postFromDb).toEqual(testPost)
})

test('updatePost updates the post with the given changes', async () => {
  const testUserId = generate.id()
  const testPost = await db.insertPost(
    generate.postData({authorId: testUserId}),
  )
  const {req, res} = setup()
  req.user = {id: testUserId}
  req.params = {id: testPost.id}
  const title = generate.title()
  req.body = {title}
  const updatedPost = {...testPost, title}

  await postsController.updatePost(req, res)

  expect(res.json).toHaveBeenCalledTimes(1)
  const firstCall = res.json.mock.calls[0]
  const firstArg = firstCall[0]
  const {post} = firstArg
  expect(post).toEqual(updatedPost)
  const postFromDb = await db.getPost(post.id)
  expect(postFromDb).toEqual(updatedPost)
})

// Here's where you'll add your tests!
// - Think more about use cases than code coverage and use those use cases to title your tests
// - Write the code and tests iteratively as little as necessary at a time.

//////// Elaboration & Feedback /////////
// When you've finished with the exercises:
// 1. Copy the URL below into your browser and fill out the form
// 2. remove the `.skip` from the test below
// 3. Change submitted from `false` to `true`
// 4. And you're all done!
/*
http://ws.kcd.im/?ws=Testing&e=postsController&em=
*/
test.skip('I submitted my elaboration and feedback', () => {
  const submitted = false // change this when you've submitted!
  expect(true).toBe(submitted)
})
////////////////////////////////
