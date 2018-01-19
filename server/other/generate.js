import faker from 'faker'
import * as auth from '../src/auth'
import db from '../src/db'

function initDb() {
  const users = Array.from({length: 10}, () =>
    generateUserData({id: faker.random.uuid()})
  )

  const posts = users.map(u =>
    generatePostData({authorId: u.id, id: faker.random.uuid()})
  )
  db.users = users
  db.posts = posts

  const testUser = generateUserData({
    id: faker.random.uuid(),
    username: 'til',
    password: 'til',
  })
  db.users.push(testUser)
}

function generateUserData({
  password = faker.internet.password(),
  ...overrides
} = {}) {
  return {
    username: faker.internet.userName(),
    ...auth.getSaltAndHash(password),
    ...overrides,
  }
}

function generatePostData(overrides) {
  return {
    title: faker.lorem.words(),
    content: faker.lorem.paragraphs(),
    tags: [faker.lorem.word(), faker.lorem.word(), faker.lorem.word()].filter(
      (w, i, a) => a.indexOf(w) === i
    ),
    authorId: faker.random.uuid(),
    date: faker.date.past(),
    ...overrides,
  }
}

export {generateUserData, generatePostData, initDb}
