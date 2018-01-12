import faker from 'faker'
import {createUser, createTIL} from '../other/generate'

const users = Array.from(
  {0: {username: 'kentcdodds', id: 'kentcdodds'}, length: 10},
  () => createUser({id: faker.random.uuid()})
)

const tils = users.map(u =>
  createTIL({authorId: u.id, id: faker.random.uuid()})
)

const db = {
  users,
  tils,

  insertUser,
  getUser,
  getUsers,
  updateUser,
  deleteUser,

  insertTIL,
  getTIL,
  getTILs,
  updateTIL,
  deleteTIL,
}

async function insertUser(user) {
  const newUser = {
    ...user,
    id: faker.random.uuid(),
  }
  db.users.push(newUser)
  return newUser
}

async function getUsers(filter) {
  return db.users.filter(filter)
}

async function getUser(id) {
  return (await getUsers(u => u.id === id))[0]
}

async function updateUser(id, newInfo) {
  const user = await getUser(id)
  Object.assign(user, newInfo)
  return user
}

async function deleteUser(id) {
  const user = await getUser(id)
  db.users = db.users.filter(u => u.id !== id)
  return user
}

async function insertTIL(til) {
  const newTIL = {
    ...til,
    id: faker.random.uuid(),
  }
  db.tils.push(newTIL)
  return newTIL
}

async function getTILs(filter) {
  return db.tils.filter(filter)
}

async function getTIL(id) {
  return (await getTILs(t => t.id === id))[0]
}

async function updateTIL(id, newInfo) {
  const til = await getTIL(id)
  Object.assign(til, newInfo)
  return til
}

async function deleteTIL(id) {
  const til = await getTIL(id)
  db.tils = db.tils.filter(t => t.id !== id)
  return til
}

export default db
