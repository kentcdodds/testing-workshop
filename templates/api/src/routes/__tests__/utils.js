// WORKSHOP_START
// Your task: Write these unit tests :)
// eslint-disable-next-line no-unused-vars
// WORKSHOP_END
import {getTokenFromHeader} from '../utils'

test('returns null if there is no token', () => {
  // WORKSHOP_START
  // TODO
  // WORKSHOP_END
  // FINAL_START
  const result = getTokenFromHeader({headers: {}})
  expect(result).toBe(null)
  // FINAL_END
})

test('returns the token from the headers', () => {
  // WORKSHOP_START
  // TODO
  // WORKSHOP_END
  // FINAL_START
  const token = 'hi.mom!'
  const authHeader = `Token ${token}`
  const req = {
    headers: {
      authorization: authHeader,
    },
  }

  const result = getTokenFromHeader(req)
  expect(result).toBe(token)
  // FINAL_END
})
