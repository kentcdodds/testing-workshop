// this file is not transpiled
// we could probably make it work
// but meh... ¯\_(ツ)_/¯
const faker = require('faker')
const {getSaltAndHash} = require('../server/src/auth')

function generateUserData({
  password = faker.internet.password(),
  ...overrides
} = {}) {
  return {
    username: faker.internet.userName(),
    ...getSaltAndHash(password),
    ...overrides,
  }
}

function generatePostData(overrides) {
  return {
    title: faker.lorem.words(),
    content: faker.lorem.paragraphs(),
    tags: [faker.lorem.word(), faker.lorem.word(), faker.lorem.word()].filter(
      (w, i, a) => a.indexOf(w) === i,
    ),
    authorId: faker.random.uuid(),
    date: faker.date.past().toJSON(),
    ...overrides,
  }
}

module.exports = {generateUserData, generatePostData}
