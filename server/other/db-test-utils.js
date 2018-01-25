import faker from 'faker'
import db from '../src/db'
import {generateUserData, generatePostData} from './generate'

async function resetDb({testUser} = {}) {
  const users = Array.from({length: 10}, () =>
    generateUserData({id: faker.random.uuid()}),
  )
  const posts = users.map(u =>
    generatePostData({authorId: u.id, id: faker.random.uuid()}),
  )
  db.users = users
  db.posts = posts
  if (testUser) {
    db.users.push(testUser)
  }
  return {users, posts}
}

export {resetDb}
