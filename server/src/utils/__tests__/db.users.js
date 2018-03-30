import {initDb, generate} from 'til-server-test-utils'
import db from '../db'

let mockData

beforeEach(async () => {
  mockData = await initDb()
})

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
  const newUser = generate.userData()
  const insertedUser = await db.insertUser(newUser)
  expect(insertedUser).toMatchObject(newUser)

  // verify that the updated user is retrievable
  const retrievedUser = await db.getUser(insertedUser.id)
  expect(retrievedUser).toEqual(insertedUser)
})

test('can update a user', async () => {
  const {4: fifthUser} = mockData.users
  const updates = {username: generate.username()}
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
