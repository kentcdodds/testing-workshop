import faker from 'faker'
import {createUser, createTIL} from './generate'
import db from '../src/db'

async function resetDb() {
  const users = Array.from({length: 10}, () =>
    createUser({id: faker.random.uuid()})
  )
  const tils = users.map(u =>
    createTIL({authorId: u.id, id: faker.random.uuid()})
  )
  db.users = users
  db.tils = tils
  return {users, tils}
}

export {resetDb}
