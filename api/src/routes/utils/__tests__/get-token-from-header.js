import getTokenFromHeader from '../get-token-from-header'

test('getTokenFromHeader returns null if there is no token', () => {
  const result = getTokenFromHeader({headers: {}})
  expect(result).toBe(null)
})

test('getTokenFromHeader returns the token from the headers', () => {
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
test('I submitted my elaboration and feedback', () => {
  const submitted = true
  expect(true).toBe(submitted)
})
