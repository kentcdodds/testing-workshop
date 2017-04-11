import {getTokenFromHeader} from '../utils'

test('returns null if there is no token', () => {
  const result = getTokenFromHeader({headers: {}})
  expect(result).toBe(null)
})

test('returns the token from the headers', () => {
  const token = 'hi.mom!'
  const authHeader = `Token ${token}`
  const req = {
    headers: {
      authorization: authHeader,
    },
  }

  const result = getTokenFromHeader(req)
  expect(result).toBe(token)
})
