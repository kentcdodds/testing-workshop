import {userToJSON} from '../auth'

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
