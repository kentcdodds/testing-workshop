import crypto from 'crypto'
import faker from 'faker'

export default generateUserData

function generateUserData(overrides = {}) {
  const {
    username,
    email,
    avatar: image,
  } = faker.helpers.contextualCard()
  const {password = faker.internet.password(), ...otherOverrides} = overrides

  const salt = crypto.randomBytes(16).toString('hex')
  const hash = crypto
    .pbkdf2Sync(password, salt, 10000, 512, 'sha512')
    .toString('hex')

  return {
    _id: faker.random.uuid(),
    username: username.toLowerCase().replace(/[ |.|_|-]/g, ''),
    email: email.toLowerCase(),
    bio: faker.hacker.phrase(),
    image,
    favorites: [],
    following: [],
    hash,
    salt,
    ...otherOverrides,
  }
}
