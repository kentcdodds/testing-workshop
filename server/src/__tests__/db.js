import faker from 'faker'
import db from '../db'
import {createUser, createTIL} from '../../other/generate'
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
    u => u.id === firstUser.id || u.id === fourthUser.id
  )
  expect(users).toEqual([firstUser, fourthUser])
})

test('can insert a user', async () => {
  const newUser = createUser()
  const insertedUser = await db.insertUser(newUser)
  expect(insertedUser).toMatchObject(newUser)

  // verify that the updated user is retrievable
  const retrievedUser = await db.getUser(insertedUser.id)
  expect(retrievedUser).toEqual(insertedUser)
})

test('can update a user', async () => {
  const {4: fifthUser} = mockData.users
  const newUsername = 'some-username'
  const updates = {username: newUsername}
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

/************* tils ****************/

test('can get a til', async () => {
  const [firstTIL] = mockData.tils
  const til = await db.getTIL(firstTIL.id)
  expect(til).toEqual(firstTIL)
})

test('can get multiple tils', async () => {
  const {0: firstTIL, 3: fourthTIL} = mockData.tils
  const tils = await db.getTILs(
    u => u.id === firstTIL.id || u.id === fourthTIL.id
  )
  expect(tils).toEqual([firstTIL, fourthTIL])
})

test('can insert a til', async () => {
  const newTIL = createTIL()
  const insertedTIL = await db.insertTIL(newTIL)
  expect(insertedTIL).toMatchObject(newTIL)

  // verify that the updated til is retrievable
  const retrievedTIL = await db.getTIL(insertedTIL.id)
  expect(retrievedTIL).toEqual(insertedTIL)
})

test('can update a til', async () => {
  const {4: fifthTIL} = mockData.tils
  const newTitle = 'the new title'
  const updates = {title: newTitle}
  const updatedTIL = await db.updateTIL(fifthTIL.id, updates)
  expect(updatedTIL).toMatchObject(updates)

  // verify that the updated til is retrievable
  const retrievedTIL = await db.getTIL(fifthTIL.id)
  expect(retrievedTIL).toEqual(updatedTIL)
})

test('can delete a til', async () => {
  const {6: seventhTIL} = mockData.tils
  const deletedTIL = await db.deleteTIL(seventhTIL.id)
  expect(deletedTIL).toEqual(seventhTIL)

  // verify that the updated til is retrievable
  const retrievedTIL = await db.getTIL(seventhTIL.id)
  expect(retrievedTIL).toBeFalsy()
})
