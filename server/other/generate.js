import faker from 'faker'

function createUser(overrides) {
  return {username: faker.internet.userName(), ...overrides}
}

function createTIL(overrides) {
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

export {createUser, createTIL}
