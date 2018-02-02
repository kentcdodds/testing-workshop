import * as generate from 'til-shared/generate'
import db from '../src/db'

function initDb() {
  const users = Array.from({length: 10}, () =>
    generate.userData({id: generate.id()}),
  )

  const posts = users.map(u =>
    generate.postData({authorId: u.id, id: generate.id()}),
  )
  db.users = users
  db.posts = posts

  const testUser = generate.userData({
    id: generate.id(),
    username: 'til',
    password: 'til',
  })
  db.users.push(testUser)
}

async function resetDb({testUser} = {}) {
  const users = Array.from({length: 10}, () =>
    generate.userData({id: generate.id()}),
  )
  const posts = users.map(u =>
    generate.postData({authorId: u.id, id: generate.id()}),
  )
  db.users = users
  db.posts = posts
  if (testUser) {
    db.users.push(testUser)
  }
  return {users, posts}
}

export {resetDb, initDb, generate}
