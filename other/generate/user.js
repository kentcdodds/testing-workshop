import crypto from 'crypto'
import faker from 'faker'

export default generateUserData
export {generateUserForClient}

function generateUserData(overrides = {}) {
  const baseUser = generateUserForClient(overrides)
  const password = baseUser.password || faker.internet.password()
  const otherOverrides = Object.assign({}, baseUser)
  delete otherOverrides.password

  const salt = crypto.randomBytes(16).toString('hex')
  const hash = crypto
    .pbkdf2Sync(password, salt, 10000, 512, 'sha512')
    .toString('hex')

  return Object.assign(
    {},
    baseUser,
    {
      _id: faker.random.uuid(),
      hash,
      salt,
    },
    otherOverrides,
  )
}

function generateUserForClient(overrides = {}) {
  const {username, email, avatar: image} = faker.helpers.contextualCard()

  return Object.assign(
    {
      username: username.toLowerCase().replace(/[ |.|_|-]/g, ''),
      email: email.toLowerCase(),
      bio: faker.hacker.phrase(),
      image,
      favorites: [],
      following: [],
    },
    overrides,
  )
}
