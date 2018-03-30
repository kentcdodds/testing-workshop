import {initDb, generate} from 'til-server-test-utils'
import * as postsController from '../posts'
import db from '../../utils/db'

// this setup is common across controllers, so it may be useful to
// add this to the utils, but I'll leave it here for you :)
function setup() {
  const req = {
    params: {},
    body: {},
  }
  const res = {}
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
  return {req, res}
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
  expect(post).toEqual(postFromDb)
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
  expect(post).toEqual(postFromDb)
})

test('deletePost deletes a post', async () => {
  const testUserId = generate.id()
  const testPost = await db.insertPost(
    generate.postData({authorId: testUserId}),
  )
  const {req, res} = setup()
  req.user = {id: testUserId}
  req.params = {id: testPost.id}

  await postsController.deletePost(req, res)

  expect(res.json).toHaveBeenCalledTimes(1)
  const firstCall = res.json.mock.calls[0]
  const firstArg = firstCall[0]
  const {post} = firstArg
  expect(post).toEqual(testPost)
  const postFromDb = await db.getPost(post.id)
  expect(postFromDb).not.toBeDefined()
})

test('deletePost will 404 if made to a non-existing post', async () => {
  const {req, res} = setup()
  req.params = {id: 'blah'}
  await postsController.deletePost(req, res)

  expect(res.json).not.toHaveBeenCalled()
  expect(res.status).toHaveBeenCalledTimes(1)
  expect(res.status).toHaveBeenCalledWith(404)
  expect(res.send).toHaveBeenCalledTimes(1)
})

test('deletePost will 403 if not made by the author', async () => {
  const testPost = await db.insertPost(generate.postData())
  const {req, res} = setup()
  req.params = {id: testPost.id}

  await postsController.deletePost(req, res)

  expect(res.json).not.toHaveBeenCalled()
  expect(res.status).toHaveBeenCalledTimes(1)
  expect(res.status).toHaveBeenCalledWith(403)
  expect(res.send).toHaveBeenCalledTimes(1)
  const postFromDb = await db.getPost(testPost.id)
  expect(postFromDb).toEqual(testPost)
})
