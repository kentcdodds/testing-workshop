import faker from 'faker'
import {generateUserData, generatePostData} from './generate'
import db from '../src/db'

async function resetDb() {
  const users = Array.from({length: 10}, () =>
    generateUserData({id: faker.random.uuid()})
  )
  const posts = users.map(u =>
    generatePostData({authorId: u.id, id: faker.random.uuid()})
  )
  db.users = users
  db.posts = posts
  return {users, posts}
}

export {resetDb}
