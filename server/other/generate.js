import faker from 'faker'
import {getSaltAndHash} from '../src/auth'

function createUser(overrides) {
  return {
    username: faker.internet.userName(),
    ...getSaltAndHash(faker.internet.password()),
    ...overrides,
  }
}

function createPost(overrides) {
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

export {createUser, createPost}
