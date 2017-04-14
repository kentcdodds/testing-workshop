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

// WORKSHOP_START
//////// Elaboration & Feedback /////////
/*
http://ws.kcd.im/?ws=ASTs&e=API%20Unit&em=
*/
test('I submitted my elaboration and feedback', () => {
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

//////// EXTRA CREDIT ////////

// If you get this far, try adding a few more tests,
// then file a pull request to add them to the extra credit!
// Learn more here: http://kcd.im/asts-workshop-contributing
