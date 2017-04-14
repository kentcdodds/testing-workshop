import {makeMeASandwich} from '../utils'

test('returns null if there is no sandwich query', () => {
  const result = makeMeASandwich({query: {}})
  expect(result).toBe(null)
})

test('returns the sandwich if there is a sandwich query', () => {
  const sandwich = 'Peanut Butter & Raspberry Jam'
  const req = {query: {sandwich}}
  const result = makeMeASandwich(req)
  expect(result).toBe(sandwich)
})
