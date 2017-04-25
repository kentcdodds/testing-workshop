import makeMeASandwich from '../make-me-a-sandwich'

test('returns null if there is no sandwich query', () => {
  const req = getReq()
  const result = makeMeASandwich(req)
  expect(result).toBe(null)
})

test('returns the sandwich if there is a sandwich query', () => {
  const sandwich = 'Peanut Butter & Raspberry Jam'
  const req = getReq(sandwich)
  const result = makeMeASandwich(req)
  // Rather than typing out the full value twice, we're using a variable.
  // Not to be "DRY" per-se, but rather to indicate to the reader that
  // these values are directly related to one another.
  expect(result).toBe(sandwich)
})

// writing and using this may be going a tiny bit overboard
// considering the req object for these tests is so small anyway
// but often your test data is much larger than this so making
// the differences in the input more readily noticeable can be
// quite valuable.
function getReq(sandwich) {
  return {query: {sandwich}}
}

