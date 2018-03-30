// in a real app, a file like this would connect to a real database
// and calls into that database would be async, which is why
// these functions are set as async functions even though they
// actually can run synchronously.
import * as generate from 'til-shared/generate'
import db from '../src/utils/db'

async function initDb({
  users = Array.from({length: 10}, () =>
    generate.userData({id: generate.id()}),
  ),
  posts = users.map(u =>
    generate.postData({authorId: u.id, id: generate.id()}),
  ),
} = {}) {
  db.users = users
  db.posts = posts
  return {users, posts}
}

async function insertTestUser() {
  const testUser = generate.userData({
    id: generate.id(),
    username: 'til',
    password: 'til',
  })
  db.users.push(testUser)
  return testUser
}

async function resetDb({users, posts, testUser} = {}) {
  await initDb({users, posts})
  if (testUser) {
    db.users.push(testUser)
  }
  return {users: db.users, posts: db.posts}
}

export {resetDb, initDb, insertTestUser, generate}
