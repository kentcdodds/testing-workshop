import {initDb, generate} from 'til-server-test-utils'
import db from '../db'

let mockData

beforeEach(async () => {
  mockData = await initDb()
})

test('can get a post', async () => {
  const [firstPost] = mockData.posts
  const post = await db.getPost(firstPost.id)
  expect(post).toEqual(firstPost)
})

test('can get multiple posts', async () => {
  const {0: firstPost, 3: fourthPost} = mockData.posts
  const posts = await db.getPosts(
    u => u.id === firstPost.id || u.id === fourthPost.id,
  )
  expect(posts).toEqual([firstPost, fourthPost])
})

test('can insert a post', async () => {
  const newPost = generate.postData()
  const insertedPost = await db.insertPost(newPost)
  expect(insertedPost).toMatchObject(newPost)

  // verify that the updated post is retrievable
  const retrievedPost = await db.getPost(insertedPost.id)
  expect(retrievedPost).toEqual(insertedPost)
})

test('can update a post', async () => {
  const {4: fifthPost} = mockData.posts
  const newTitle = generate.title()
  const updates = {title: newTitle}
  const updatedPost = await db.updatePost(fifthPost.id, updates)
  expect(updatedPost).toMatchObject(updates)

  // verify that the updated post is retrievable
  const retrievedPost = await db.getPost(fifthPost.id)
  expect(retrievedPost).toEqual(updatedPost)
})

test('can delete a post', async () => {
  const {6: seventhPost} = mockData.posts
  const deletedPost = await db.deletePost(seventhPost.id)
  expect(deletedPost).toEqual(seventhPost)

  // verify that the updated post is retrievable
  const retrievedPost = await db.getPost(seventhPost.id)
  expect(retrievedPost).toBeFalsy()
})
