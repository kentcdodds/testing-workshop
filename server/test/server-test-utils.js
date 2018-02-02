import faker from 'faker'
import db from '../src/db'
import * as generate from '../../other/generate'

function initDb() {
  const users = Array.from({length: 10}, () =>
    generate.userData({id: faker.random.uuid()}),
  )

  const posts = users.map(u =>
    generate.postData({authorId: u.id, id: faker.random.uuid()}),
  )
  db.users = users
  db.posts = posts

  const testUser = generate.userData({
    id: faker.random.uuid(),
    username: 'til',
    password: 'til',
  })
  db.users.push(testUser)
}

async function resetDb({testUser} = {}) {
  const users = Array.from({length: 10}, () =>
    generate.userData({id: faker.random.uuid()}),
  )
  const posts = users.map(u =>
    generate.postData({authorId: u.id, id: faker.random.uuid()}),
  )
  db.users = users
  db.posts = posts
  if (testUser) {
    db.users.push(testUser)
  }
  return {users, posts}
}

export {resetDb, initDb, generate}
