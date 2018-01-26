import db from '../db'
import {generateUserData, generatePostData} from '../../../other/generate'
import {resetDb} from '../../other/db-test-utils'

let mockData

beforeEach(async () => {
  mockData = await resetDb()
})

/************ users ****************/

test('can get a user', async () => {
  const [firstUser] = mockData.users
  const user = await db.getUser(firstUser.id)
  expect(user).toEqual(firstUser)
})

test('can get multiple users', async () => {
  const {0: firstUser, 3: fourthUser} = mockData.users
  const users = await db.getUsers(
    u => u.id === firstUser.id || u.id === fourthUser.id,
  )
  expect(users).toEqual([firstUser, fourthUser])
})

test('can insert a user', async () => {
  const newUser = generateUserData()
  const insertedUser = await db.insertUser(newUser)
  expect(insertedUser).toMatchObject(newUser)

  // verify that the updated user is retrievable
  const retrievedUser = await db.getUser(insertedUser.id)
  expect(retrievedUser).toEqual(insertedUser)
})

test('can update a user', async () => {
  const {4: fifthUser} = mockData.users
  const updates = {username: 'some-username'}
  const updatedUser = await db.updateUser(fifthUser.id, updates)
  expect(updatedUser).toMatchObject(updates)

  // verify that the updated user is retrievable
  const retrievedUser = await db.getUser(fifthUser.id)
  expect(retrievedUser).toEqual(updatedUser)
})

test('can delete a user', async () => {
  const {6: seventhUser} = mockData.users
  const deletedUser = await db.deleteUser(seventhUser.id)
  expect(deletedUser).toEqual(seventhUser)

  // verify that the updated user is retrievable
  const retrievedUser = await db.getUser(seventhUser.id)
  expect(retrievedUser).toBeFalsy()
})

/************* posts ****************/

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
  const newPost = generatePostData()
  const insertedPost = await db.insertPost(newPost)
  expect(insertedPost).toMatchObject(newPost)

  // verify that the updated post is retrievable
  const retrievedPost = await db.getPost(insertedPost.id)
  expect(retrievedPost).toEqual(insertedPost)
})

test('can update a post', async () => {
  const {4: fifthPost} = mockData.posts
  const newTitle = 'the new title'
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
