import {isPasswordAllowed, userToJSON} from '../auth'

// During instruction, just have a single `test` that includes all assertions
// then refactor it to this and explain why it's cleaner/easier to maintain
// for some situations. If you need a real world example, show the tests
// from rtl-css-js:
// https://github.com/kentcdodds/rtl-css-js/blob/96ec6a000d8fe03ae7d45603ece81eb185bf0618/src/__tests__/index.js

describe('isPasswordAllowed only allows some passwords', () => {
  const allowedPasswords = []
  const disallowedPasswords = []

  allowedPasswords.forEach(password => {
    test(`allows ${password}`, () => {
      expect(isPasswordAllowed(password)).toBe(true)
    })
  })

  disallowedPasswords.forEach(password => {
    test(`disallows ${password}`, () => {
      expect(isPasswordAllowed(password)).toBe(true)
    })
  })
})

test('userToJSON excludes secure properties', () => {
  const safeUser = {
    id: 'abc123',
    username: 'alex',
  }
  const user = {
    ...safeUser,
    exp: Date.now() / 1000,
    iat: Date.now() / 1000,
    hash: 'super-duper-long-string-of-nonsense',
    salt: 'shorter-string-of-nonsense',
  }
  const jsonUser = userToJSON(user)
  expect(jsonUser).toEqual(safeUser)
})
