// WORKSHOP_START
// Write unit tests for getTokenFromHeader.
// See `api/src/routes/utils/get-token-from-header.js`
// to see how this function has been implemented and
// how it's intended to be used. Write at least two unit
// tests to ensure that that use case is always supported.
// WORKSHOP_END
import getTokenFromHeader from '../get-token-from-header'

// FINAL_START
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
// FINAL_END

// WORKSHOP_START
//////// Elaboration & Feedback /////////
// When you've finished with the exercises:
// 1. Copy the URL below into your browser and fill out the form
// 2. remove the `.skip` from the test below
// 3. Change submitted from `false` to `true`
// 4. And you're all done!
/*
http://ws.kcd.im/?ws=Testing&e=API%20Unit&em=
*/
test.skip('I submitted my elaboration and feedback', () => {
  const submitted = false // change this when you've submitted!
  expect(true).toBe(submitted)
})
////////////////////////////////
// WORKSHOP_END
// FINAL_START
test('I submitted my elaboration and feedback', () => {
  const submitted = true
  expect(true).toBe(submitted)
})
// FINAL_END
