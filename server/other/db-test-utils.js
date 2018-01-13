import faker from 'faker'
import {createUser, createPost} from './generate'
import db from '../src/db'

async function resetDb() {
  const users = Array.from({length: 10}, () =>
    createUser({id: faker.random.uuid()})
  )
  const posts = users.map(u =>
    createPost({authorId: u.id, id: faker.random.uuid()})
  )
  db.users = users
  db.posts = posts
  return {users, posts}
}

export {resetDb}
